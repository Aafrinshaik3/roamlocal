"""
RoamLocal Backend – Flask + SQLite
Serves frontend static files and JSON API.
"""
import os
import json
import uuid
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory, g
from flask_cors import CORS

from db import init_db, db_cursor, row_to_dict, get_connection
from chatbot import get_reply

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(os.path.dirname(BASE_DIR), "frontend")
DB_PATH = os.path.join(BASE_DIR, "roamlocal.db")

app = Flask(__name__, static_folder=FRONTEND_DIR, static_url_path="")
CORS(app)

# Ensure DB exists
if not os.path.exists(DB_PATH):
    from seed import seed
    seed()
else:
    init_db()


# ─── Static frontend ───────────────────────────────────────────────
@app.route("/")
def index():
    return send_from_directory(FRONTEND_DIR, "index.html")


@app.route("/<path:path>")
def static_files(path):
    # Prefer exact file, fall back to index for SPA-like behaviour
    full = os.path.join(FRONTEND_DIR, path)
    if os.path.isfile(full):
        return send_from_directory(FRONTEND_DIR, path)
    return send_from_directory(FRONTEND_DIR, "index.html")


# ─── API: Experiences ──────────────────────────────────────────────
@app.route("/api/experiences")
def list_experiences():
    country = request.args.get("country")
    q = request.args.get("q", "").strip().lower()
    with db_cursor() as cur:
        sql = "SELECT * FROM experiences WHERE 1=1"
        params = []
        if country and country != "all":
            sql += " AND country = ?"
            params.append(country)
        if q:
            sql += " AND (LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(city) LIKE ? OR LOWER(country) LIKE ?)"
            params.extend([f"%{q}%"] * 4)
        sql += " ORDER BY local_impact_score DESC"
        cur.execute(sql, params)
        rows = [row_to_dict(r) for r in cur.fetchall()]
    return jsonify(rows)


@app.route("/api/experiences/<exp_id>")
def get_experience(exp_id):
    with db_cursor() as cur:
        cur.execute("SELECT * FROM experiences WHERE id = ?", (exp_id,))
        row = row_to_dict(cur.fetchone())
        if not row:
            return jsonify({"error": "Not found"}), 404
        if row.get("guide_id"):
            cur.execute("SELECT * FROM guides WHERE id = ?", (row["guide_id"],))
            row["guide"] = row_to_dict(cur.fetchone())
    return jsonify(row)


# ─── API: Guides ───────────────────────────────────────────────────
@app.route("/api/guides")
def list_guides():
    country = request.args.get("country")
    with db_cursor() as cur:
        if country and country != "all":
            cur.execute("SELECT * FROM guides WHERE country = ? ORDER BY rating DESC", (country,))
        else:
            cur.execute("SELECT * FROM guides ORDER BY rating DESC")
        rows = [row_to_dict(r) for r in cur.fetchall()]
    return jsonify(rows)


@app.route("/api/guides/<guide_id>")
def get_guide(guide_id):
    with db_cursor() as cur:
        cur.execute("SELECT * FROM guides WHERE id = ?", (guide_id,))
        row = row_to_dict(cur.fetchone())
        if not row:
            return jsonify({"error": "Not found"}), 404
    return jsonify(row)


@app.route("/api/guides/register", methods=["POST"])
def register_guide():
    data = request.get_json() or {}
    required = ["name", "email", "country", "city"]
    for k in required:
        if not data.get(k):
            return jsonify({"error": f"Missing {k}"}), 400
    with db_cursor() as cur:
        cur.execute(
            """INSERT INTO guide_applications
               (name, email, country, city, languages, specialties, bio, price_per_hour)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                data["name"], data["email"], data["country"], data["city"],
                json.dumps(data.get("languages", [])),
                json.dumps(data.get("specialties", [])),
                data.get("bio", ""),
                float(data.get("price_per_hour") or 15),
            ),
        )
        app_id = cur.lastrowid
    return jsonify({"ok": True, "id": app_id, "message": "Application received. We will review soon."})


# ─── API: Bookings ─────────────────────────────────────────────────
@app.route("/api/bookings", methods=["POST"])
def create_booking():
    data = request.get_json() or {}
    exp_id = data.get("experience_id")
    if not exp_id:
        return jsonify({"error": "experience_id required"}), 400
    with db_cursor() as cur:
        cur.execute(
            """INSERT INTO bookings (user_id, experience_id, guide_id, date, guests, status, notes)
               VALUES (?, ?, ?, ?, ?, 'pending', ?)""",
            (
                data.get("user_id"),
                exp_id,
                data.get("guide_id"),
                data.get("date") or datetime.utcnow().strftime("%Y-%m-%d"),
                int(data.get("guests") or 1),
                data.get("notes", ""),
            ),
        )
        bid = cur.lastrowid
    return jsonify({"ok": True, "booking_id": bid, "status": "pending"})


@app.route("/api/bookings")
def list_bookings():
    with db_cursor() as cur:
        cur.execute("SELECT * FROM bookings ORDER BY created_at DESC LIMIT 50")
        rows = [row_to_dict(r) for r in cur.fetchall()]
    return jsonify(rows)


# ─── API: Auth (simple demo) ───────────────────────────────────────
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email", "").strip()
    password = data.get("password", "")
    with db_cursor() as cur:
        cur.execute("SELECT id, email, name, role, preferred_lang FROM users WHERE email = ? AND password_hash = ?",
                    (email, password))
        user = row_to_dict(cur.fetchone())
    if not user:
        return jsonify({"error": "Invalid credentials"}), 401
    return jsonify({"ok": True, "user": user})


@app.route("/api/register", methods=["POST"])
def register_user():
    data = request.get_json() or {}
    email = data.get("email", "").strip()
    password = data.get("password", "")
    name = data.get("name", "Traveler")
    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400
    try:
        with db_cursor() as cur:
            role = data.get("role") or "traveler"
            if role not in ("traveler", "guide"):
                role = "traveler"
            cur.execute(
                "INSERT INTO users (email, password_hash, name, preferred_lang, role) VALUES (?, ?, ?, ?, ?)",
                (email, password, name, data.get("lang", "en"), role),
            )
            uid = cur.lastrowid
        return jsonify({"ok": True, "user": {"id": uid, "email": email, "name": name, "role": role}})
    except Exception as e:
        if "UNIQUE" in str(e):
            return jsonify({"error": "Email already registered"}), 409
        raise


# ─── API: Chatbot (multi-language) ─────────────────────────────────
@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json() or {}
    message = (data.get("message") or "").strip()
    lang = data.get("lang") or "en"
    session_id = data.get("session_id") or str(uuid.uuid4())
    if not message:
        return jsonify({"error": "message required"}), 400

    reply = get_reply(message, lang, session_id)

    with db_cursor() as cur:
        cur.execute(
            "INSERT INTO chat_messages (session_id, role, content, lang) VALUES (?, 'user', ?, ?)",
            (session_id, message, lang),
        )
        cur.execute(
            "INSERT INTO chat_messages (session_id, role, content, lang) VALUES (?, 'assistant', ?, ?)",
            (session_id, reply, lang),
        )

    return jsonify({
        "reply": reply,
        "session_id": session_id,
        "lang": lang,
    })


@app.route("/api/chat/history")
def chat_history():
    session_id = request.args.get("session_id")
    if not session_id:
        return jsonify([])
    with db_cursor() as cur:
        cur.execute(
            "SELECT role, content, lang, created_at FROM chat_messages WHERE session_id = ? ORDER BY id",
            (session_id,),
        )
        rows = [row_to_dict(r) for r in cur.fetchall()]
    return jsonify(rows)


# ─── Health / stats ────────────────────────────────────────────────
@app.route("/api/stats")
def stats():
    with db_cursor() as cur:
        cur.execute("SELECT COUNT(*) AS c FROM experiences")
        exp_count = cur.fetchone()["c"]
        cur.execute("SELECT COUNT(*) AS c FROM guides")
        guide_count = cur.fetchone()["c"]
        cur.execute("SELECT COUNT(*) AS c FROM bookings")
        book_count = cur.fetchone()["c"]
        cur.execute("SELECT COUNT(*) AS c FROM guide_applications")
        app_count = cur.fetchone()["c"]
    return jsonify({
        "experiences": exp_count,
        "guides": guide_count,
        "bookings": book_count,
        "guide_applications": app_count,
    })


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"RoamLocal running at http://127.0.0.1:{port}")
    print(f"Frontend: {FRONTEND_DIR}")
    print(f"Database: {DB_PATH}")
    app.run(host="0.0.0.0", port=port, debug=True)
