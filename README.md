# RoamLocal – Full-stack (SQLite backend + multi-language chatbot)

Community-first travel platform: local guides, hidden-gem experiences, sustainability scores, multi-language UI, and a **multi-language chatbot**.

## What's new

| Feature | Description |
|--------|-------------|
| **SQLite backend** | Guides, experiences, users, bookings, guide applications, chat history |
| **REST API** | `/api/experiences`, `/api/guides`, `/api/bookings`, `/api/login`, `/api/register`, `/api/chat`, `/api/stats` |
| **Multi-language chatbot** | Floating widget on every page; replies in EN / HI / ES / FR / AR / ZH / JA / ID / PT / DE / TE / TA |
| **Guide registration** | Form posts to `/api/guides/register` and is stored in SQLite |
| **Auth** | Demo login/register against SQLite (`demo@roamlocal.com` / `demo123`) |
| **Bookings** | Experience “Request / Book” creates a row in `bookings` |

Original static features (rotating heroes, i18n, currencies, maps, planner, impact dashboard) are preserved.

## Quick start

```bash
cd roamlocal/backend
pip install -r requirements.txt
python seed.py          # creates /tmp/roamlocal.db with demo data
python app.py           # http://127.0.0.1:5000
```

Open **http://127.0.0.1:5000** in a browser.

- Chat bubble (bottom-right) → ask in any supported language  
- Guides / Explore still work offline via `data.js`; API is used for registration, login, booking, chat  
- DB file: `/tmp/roamlocal.db` (override with env `ROAM_DB=/path/to/file.db`)

## API examples

```bash
# Stats
curl http://127.0.0.1:5000/api/stats

# Guides by country
curl "http://127.0.0.1:5000/api/guides?country=India"

# Chat (Hindi)
curl -X POST http://127.0.0.1:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"नमस्ते","lang":"hi"}'

# Login
curl -X POST http://127.0.0.1:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@roamlocal.com","password":"demo123"}'
```

## Project layout

```
roamlocal/
├── backend/
│   ├── app.py          # Flask server + API
│   ├── db.py           # SQLite helpers
│   ├── seed.py         # Demo data
│   ├── chatbot.py      # Multi-lang rule-based assistant
│   └── requirements.txt
├── frontend/           # Static HTML/CSS/JS (served by Flask)
│   ├── css/styles.css
│   ├── js/app.js, data.js, i18n.js, chatbot.js
│   └── *.html
└── README.md
```

## Chatbot languages

Same set as the site language switcher: English, Hindi, Spanish, French, Arabic, Chinese, Japanese, Indonesian, Portuguese, German, Telugu, Tamil.

Intent detection covers greetings, guides, experiences, booking/earning, and sustainability. Responses are stored in `chat_messages` for history.

## Notes

- Passwords are stored as plain text for this demo only — never do this in production.
- Chatbot is rule-based (no external LLM key required) so it runs fully offline after install.
- Frontend still includes `data.js` so pages work if the API is temporarily unavailable.


## Updates (login · profile · smarter chat · live map)

- **Persistent login + profile icon** in the navbar after sign-in (localStorage). Dropdown: profile, impact, map, sign out. New `profile.html`.
- **Chatbot** is more conversational (longer answers, country context, session memory) in 12 languages — still works offline without an OpenAI key.
- **Map**: search real places worldwide via **OpenStreetMap Nominatim**, browser **GPS**, driving **routes via OSRM** (distance + ETA). No Google API key required (Google Maps needs a paid key; OSM/OSRM are free and work out of the box).

```bash
cd roamlocal/backend
python3 -m venv venv && source venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
python seed.py
PORT=5001 python app.py   # if 5000 is busy on Mac
```
