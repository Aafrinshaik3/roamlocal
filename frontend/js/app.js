/* Shared UI – multi-language + currency + rotating bg + image safety */

function toggleMenu() {
  const links = document.getElementById("navLinks");
  if (links) links.classList.toggle("open");
}

function prefsBarHTML() {
  const lang = getLang();
  const cur = getCurrency();
  return `
  <div class="prefs-bar">
    <div class="prefs-inner">
      <label class="pref">
        <span>${t("lang")}</span>
        <select id="langSelect" onchange="onLangChange(this.value)">
          ${LANGS.map(l => `<option value="${l.code}" ${l.code===lang?"selected":""}>${l.flag} ${l.name}</option>`).join("")}
        </select>
      </label>
      <label class="pref">
        <span>${t("currency")}</span>
        <select id="curSelect" onchange="onCurChange(this.value)">
          ${CURRENCIES.map(c => `<option value="${c.code}" ${c.code===cur?"selected":""}>${c.symbol} ${c.code}</option>`).join("")}
        </select>
      </label>
    </div>
  </div>`;
}

function onLangChange(code) {
  setLang(code);
  // Keep profile preference in sync so nothing overrides the header choice
  try {
    const raw = localStorage.getItem("roam_user");
    if (raw) {
      const u = JSON.parse(raw);
      u.preferred_lang = code;
      localStorage.setItem("roam_user", JSON.stringify(u));
    }
  } catch (e) {}
  location.reload();
}
function onCurChange(code) { setCurrency(code); location.reload(); }

function getLoggedInUser() {
  try {
    const raw = localStorage.getItem("roam_user");
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
function applyUserPreferredLang() {
  /* Language is controlled by rl_lang (header). Profile preferred_lang is kept in sync on change.
     Do NOT override header selection on every page load. */
  try {
    const u = getLoggedInUser();
    const lang = typeof getLang === "function" ? getLang() : localStorage.getItem("rl_lang");
    if (u && lang && u.preferred_lang !== lang) {
      u.preferred_lang = lang;
      localStorage.setItem("roam_user", JSON.stringify(u));
    }
  } catch (e) {}
}
applyUserPreferredLang();


function logoutUser() {
  localStorage.removeItem("roam_user");
  location.href = "index.html";
}

function navHTML(active) {
  const pages = [
    { href: "index.html", id: "home", label: t("nav_home") },
    { href: "explore.html", id: "explore", label: t("nav_explore") },
    { href: "guides.html", id: "guides", label: t("nav_guides") || "Guides" },
    { href: "map.html", id: "map", label: t("nav_map") },
    { href: "planner.html", id: "planner", label: t("nav_build") || "Build ur journey" },
    { href: "dashboard.html", id: "dashboard", label: t("nav_impact") }
  ];
  const user = getLoggedInUser();
  const authBlock = user
    ? `<div class="nav-profile" id="navProfile">
         <button type="button" class="profile-btn" onclick="toggleProfileMenu()" aria-label="Profile">
           <span class="profile-avatar">${(user.name || user.email || "U").charAt(0).toUpperCase()}</span>
           <span class="profile-name">${(user.name || user.email || "Traveler").split(" ")[0]}</span>
         </button>
         <div class="profile-dropdown" id="profileDropdown">
           <div class="profile-drop-head">
             <strong>${user.name || "Traveler"}</strong>
             <span>${user.email || ""}</span>
           </div>
           <a href="profile.html">${t("profile") || "My profile"}</a>
           ${user.role === "guide" ? '<a href="guide-dashboard.html">${t("guide_dashboard") || "Guide dashboard"}</a>' : '<a href="dashboard.html">' + t("nav_impact") + '</a>'}
           <a href="map.html">Map & routes</a>
           <button type="button" onclick="logoutUser()">${t("sign_out") || "Sign out"}</button>
         </div>
       </div>`
    : `<a href="login.html">${t("nav_signin")}</a>`;

  return prefsBarHTML() + `
  <header class="navbar">
    <div class="nav-inner">
      <a href="index.html" class="logo">
        <span class="logo-icon">🌿</span> ${t("brand")}
      </a>
      <button class="menu-btn" onclick="toggleMenu()" aria-label="Menu">☰</button>
      <nav class="nav-links" id="navLinks">
        ${pages.map(p => `<a href="${p.href}" ${p.id === active ? 'style="background:var(--forest-50);font-weight:600"' : ""}>${p.label}</a>`).join("")}
        <a href="guide-register.html" class="nav-earn">${t("nav_earn") || "Earn as Guide"}</a>
        ${authBlock}
      </nav>
    </div>
  </header>`;
}

function toggleProfileMenu() {
  const d = document.getElementById("profileDropdown");
  if (d) d.classList.toggle("open");
}

document.addEventListener("click", (e) => {
  const wrap = document.getElementById("navProfile");
  const d = document.getElementById("profileDropdown");
  if (d && wrap && !wrap.contains(e.target)) d.classList.remove("open");
});


function footerHTML() {
  return `
  <footer>
    <div class="footer-inner">
      <div>
        <div class="logo" style="color:white;margin-bottom:0.75rem"><span class="logo-icon">🌿</span> ${t("brand")}</div>
        <p style="font-size:0.875rem;max-width:22rem;opacity:0.85">${t("hero_sub")}</p>
      </div>
      <div>
        <h4>${t("nav_explore")}</h4>
        <ul>
          <li><a href="explore.html">${t("nav_explore")}</a></li>
          <li><a href="guides.html">Local Guides</a></li>
          <li><a href="guide-register.html">Register as Guide · Earn</a></li>
          <li><a href="map.html">${t("nav_map")}</a></li>
          <li><a href="planner.html">${t("nav_build") || "Build ur journey"}</a></li>
        </ul>
      </div>
      <div>
        <h4>${t("lang")} / ${t("currency")}</h4>
        <ul style="font-size:0.8rem;opacity:0.85">
          <li>EN · हिन्दी · తెలుగు · ES · AR · 中文 · ID …</li>
          <li>USD · INR · EUR · JPY · IDR · AED …</li>
          <li style="margin-top:0.5rem"><a href="guide-register.html" style="color:#91c4af">Guides earn on every booking</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-sos">
      <strong>🚨 ${typeof t==="function"?t("sos_title"):"Emergency / SOS"}</strong>
      <div class="sos-links">
        <a href="tel:112">EU 112</a>
        <a href="tel:911">US 911</a>
        <a href="tel:100">India Police 100</a>
        <a href="tel:108">India Ambulance 108</a>
        <a href="tel:112">Global 112</a>
      </div>
      <p class="sos-note">${typeof t==="function"?t("sos_note"):"In danger? Call local emergency services first."}</p>
    </div>
    <div class="footer-bottom">
      <p>© 2026 RoamLocal · Sustainable tourism</p>
      <p>Build ur journey · Local guides · Open map data</p>
    </div>
  </footer>`;
}

function imgTag(src, alt, cls) {
  const url = src || (typeof IMG !== "undefined" ? IMG.fallback : "");
  return `<img src="${url}" alt="${alt || ""}" class="${cls || ""}" loading="lazy"
    onerror="this.onerror=null;this.src='https://picsum.photos/seed/${encodeURIComponent(alt||"rl")}/800/600';" />`;
}

function renderExpCard(exp) {
  return `
  <a href="experience.html?id=${exp.id}" class="card">
    <div class="card-img">
      ${imgTag(exp.image, exp.name)}
      <span class="impact-badge">${t("impact")} ${exp.localImpactScore}</span>
      <span class="country-badge">${exp.country || ""}</span>
    </div>
    <div class="card-body">
      <div class="card-type">${exp.type} · ${exp.country || ""}</div>
      <div class="card-title">${exp.name}</div>
      <div class="card-meta">${exp.location}</div>
      <div class="card-footer">
        <strong>${t("from")} ${price(exp.price)}</strong>
        <span style="color:#64748b">${exp.duration}</span>
      </div>
    </div>
  </a>`;
}

function renderGuideCard(g) {
  const reviewSnippets = [
    "Patient, local knowledge, fair price.",
    "Felt safe and well looked after the whole day.",
    "Great for travelers who want quieter spots.",
    "Clear communication and flexible timing.",
    "Highly recommend for culture and food."
  ];
  const snip = reviewSnippets[(g.name || "").length % reviewSnippets.length];
  return `
  <div class="guide-card">
    <div class="guide-card-top">
      ${imgTag(g.photo, g.name, "guide-photo")}
      <div>
        <div class="guide-name">${g.name} ${g.verified ? '<span class="verified">✓</span>' : ""}</div>
        <div class="guide-meta">📍 ${g.city}, ${g.country}</div>
        <div class="guide-meta review-stars">★ ${g.rating} · ${g.reviews} reviews</div>
      </div>
    </div>
    <p class="guide-bio">${g.bio}</p>
    <p style="font-size:0.8rem;color:#64748b;font-style:italic;margin:0.35rem 0 0.5rem">“${snip}”</p>
    <div class="guide-tags">
      ${(g.specialties||[]).map(s => `<span class="tag tag-green">${s}</span>`).join("")}
    </div>
    <div class="guide-langs">${(g.languages || []).join(" · ")}</div>
    ${g.phone ? `<div class="guide-langs" style="margin-top:0.25rem">📞 <a href="tel:${String(g.phone).replace(/\s/g,"")}" style="color:var(--forest-700);font-weight:600">${g.phone}</a></div>` : ""}
    <div class="guide-earn">💰 ${g.earningsNote || "Earns from hosted experiences"}</div>
    <div class="guide-footer">
      <strong>${price(g.pricePerHour)}/hr</strong>
      <a href="experience.html?id=${(g.experiences && g.experiences[0]) || "exp-1"}" class="btn-primary" style="padding:0.4rem 0.9rem;font-size:0.8rem">Book / View</a>
    </div>
  </div>`;
}

/** Rotating page background every 60 seconds */
function startRotatingBackground(targetSelector) {
  const el = document.querySelector(targetSelector);
  if (!el || typeof HERO_BACKGROUNDS === "undefined") return;
  let i = 0;
  const apply = () => {
    el.style.backgroundImage = `url('${HERO_BACKGROUNDS[i % HERO_BACKGROUNDS.length]}')`;
    i++;
  };
  apply();
  setInterval(apply, 60 * 1000);
}

/** Soft rotating gradient on body for non-hero pages */
function startBodyAtmosphere() {
  const gradients = [
    "linear-gradient(160deg, #fdf8f3 0%, #e8f5f0 40%, #f0f7f4 100%)",
    "linear-gradient(160deg, #fdf8f3 0%, #e0f2fe 45%, #f9efe3 100%)",
    "linear-gradient(160deg, #f0f7f4 0%, #fdf8f3 50%, #ffedd5 100%)",
    "linear-gradient(160deg, #f9efe3 0%, #f0f7f4 40%, #e0f2fe 100%)",
    "linear-gradient(160deg, #fdf8f3 0%, #dceee6 50%, #fdf8f3 100%)"
  ];
  let i = 0;
  document.body.style.transition = "background 1.5s ease";
  const apply = () => {
    document.body.style.background = gradients[i % gradients.length];
    i++;
  };
  apply();
  setInterval(apply, 60 * 1000);
}



/** Haversine distance in meters */
function roamDistanceM(lat1, lng1, lat2, lng2) {
  if (lat1 == null || lng1 == null || lat2 == null || lng2 == null) return null;
  const R = 6371000;
  const toR = x => x * Math.PI / 180;
  const dLat = toR(lat2 - lat1), dLng = toR(lng2 - lng1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toR(lat1)) * Math.cos(toR(lat2)) * Math.sin(dLng/2)**2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

/**
 * Build transport suggestions + deep links for a destination.
 * opts: { lat, lng, name, fromLat, fromLng }
 */
function transportOptionsHTML(opts) {
  const lat = opts.lat, lng = opts.lng;
  const name = opts.name || "destination";
  const fromLat = opts.fromLat, fromLng = opts.fromLng;
  let distM = null;
  if (fromLat != null && fromLng != null && lat != null && lng != null) {
    distM = roamDistanceM(fromLat, fromLng, lat, lng);
  }
  const km = distM != null ? (distM / 1000) : null;

  // How to explore suggestion
  let exploreTip = "Use a mix of walking for nearby spots and a short ride for longer hops.";
  let primaryMode = "mixed";
  if (km != null) {
    if (km < 0.8) {
      exploreTip = "Best on foot (~" + km.toFixed(1) + " km). Comfortable walk; no ride needed.";
      primaryMode = "walk";
    } else if (km < 3) {
      exploreTip = "About " + km.toFixed(1) + " km — auto / e-rickshaw or short Uber is ideal; walk if you prefer.";
      primaryMode = "auto";
    } else if (km < 12) {
      exploreTip = "About " + km.toFixed(1) + " km — car, Uber, or transit is faster than walking the whole way.";
      primaryMode = "car";
    } else {
      exploreTip = "About " + km.toFixed(1) + " km — prefer car / Uber / intercity options; plan rest stops.";
      primaryMode = "car";
    }
  }

  const drop = (lat != null && lng != null) ? (lat + "," + lng) : encodeURIComponent(name);
  // Uber: set dropoff
  const uber = (lat != null && lng != null)
    ? ("https://m.uber.com/ul/?action=setPickup&dropoff[latitude]=" + lat + "&dropoff[longitude]=" + lng +
       "&dropoff[nickname]=" + encodeURIComponent(name))
    : ("https://m.uber.com/ul/");
  // Rapido (India) — open app/site; deep link support varies by device
  const rapido = "https://rapido.bike/";
  // Google directions (mode chooser)
  const gWalk = (lat != null && lng != null)
    ? ("https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + lng + "&travelmode=walking")
    : "#";
  const gDrive = (lat != null && lng != null)
    ? ("https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + lng + "&travelmode=driving")
    : "#";
  const gTransit = (lat != null && lng != null)
    ? ("https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + lng + "&travelmode=transit")
    : "#";
  const gmaps = (lat != null && lng != null)
    ? ("https://www.google.com/maps/search/?api=1&query=" + lat + "," + lng)
    : ("https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(name));

  const th = (k, fb) => (typeof t === "function" ? t(k) : null) || fb;
  return `<div class="transport-box">
    <div class="transport-tip">🧭 <strong>${th("how_explore","How to explore")}:</strong> ${exploreTip}</div>
    <div class="transport-btns">
      <a class="tbtn walk ${primaryMode==="walk"?"hi":""}" href="${gWalk}" target="_blank" rel="noopener">🚶 ${th("walk","Walk")}</a>
      <a class="tbtn auto ${primaryMode==="auto"?"hi":""}" href="${gDrive}" target="_blank" rel="noopener">🛺 ${th("auto_drive","Auto / drive")}</a>
      <a class="tbtn car ${primaryMode==="car"?"hi":""}" href="${gDrive}" target="_blank" rel="noopener">🚗 ${th("car","Car")}</a>
      <a class="tbtn" href="${gTransit}" target="_blank" rel="noopener">🚌 ${th("transit","Transit")}</a>
      <a class="tbtn uber" href="${uber}" target="_blank" rel="noopener">Uber</a>
      <a class="tbtn rapido" href="${rapido}" target="_blank" rel="noopener">Rapido</a>
      <a class="tbtn" href="${gmaps}" target="_blank" rel="noopener">🗺 Maps</a>
    </div>
  </div>`;
}


function sosBarHTML() {
  return ""; // SOS lives in footer
}

function accessibilityNoteHTML() {
  return `<div class="a11y-note">
    <strong>♿ Accessibility</strong>
    <span>Filter for wheelchair-friendly and low-mobility options in Build ur journey and on place cards. Always verify access with the venue or guide before you go.</span>
  </div>`;
}

/* Apply translations when DOM is ready */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function() { if (typeof applyI18n === "function") applyI18n(); });
} else {
  if (typeof applyI18n === "function") applyI18n();
}
