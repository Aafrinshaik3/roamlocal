"""SQLite database helpers for RoamLocal."""
import sqlite3
import json
import os
from contextlib import contextmanager

# Use /tmp to avoid intermittent disk I/O issues on some environments
DB_PATH = os.environ.get("ROAM_DB", "/tmp/roamlocal.db")


def get_connection():
    conn = sqlite3.connect(DB_PATH, timeout=30)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


@contextmanager
def db_cursor():
    conn = get_connection()
    try:
        cur = conn.cursor()
        yield cur
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def init_db():
    conn = get_connection()
    try:
        conn.executescript("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            name TEXT,
            role TEXT DEFAULT 'traveler',
            preferred_lang TEXT DEFAULT 'en',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS guides (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            photo TEXT,
            country TEXT,
            city TEXT,
            languages TEXT,
            specialties TEXT,
            bio TEXT,
            price_per_hour REAL,
            rating REAL DEFAULT 0,
            reviews INTEGER DEFAULT 0,
            verified INTEGER DEFAULT 0,
            earnings_note TEXT,
            phone TEXT,
            experiences TEXT,
            user_id INTEGER,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );

        CREATE TABLE IF NOT EXISTS experiences (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            type TEXT,
            location TEXT,
            city TEXT,
            country TEXT,
            description TEXT,
            image TEXT,
            price REAL,
            duration TEXT,
            crowd_level TEXT,
            accessibility TEXT,
            sustainability_score INTEGER,
            local_impact_score INTEGER,
            lat REAL,
            lng REAL,
            tags TEXT,
            guide_id TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (guide_id) REFERENCES guides(id)
        );

        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            experience_id TEXT,
            guide_id TEXT,
            date TEXT,
            guests INTEGER DEFAULT 1,
            status TEXT DEFAULT 'pending',
            notes TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (experience_id) REFERENCES experiences(id),
            FOREIGN KEY (guide_id) REFERENCES guides(id)
        );

        CREATE TABLE IF NOT EXISTS chat_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT,
            role TEXT,
            content TEXT,
            lang TEXT DEFAULT 'en',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS guide_applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            country TEXT,
            city TEXT,
            languages TEXT,
            specialties TEXT,
            bio TEXT,
            price_per_hour REAL,
            status TEXT DEFAULT 'pending',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
        """)
        conn.commit()
    finally:
        conn.close()
    print("Database initialized at", DB_PATH)


def row_to_dict(row):
    if row is None:
        return None
    d = dict(row)
    for key in ("languages", "specialties", "experiences", "tags"):
        if key in d and isinstance(d[key], str):
            try:
                d[key] = json.loads(d[key])
            except Exception:
                d[key] = []
    return d
