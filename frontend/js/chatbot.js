/* RoamLocal multi-language chatbot widget */
(function () {
  const API_BASE = window.location.origin.includes("5000") || window.location.port === "5000"
    ? ""
    : (window.ROAM_API || "");

  let sessionId = localStorage.getItem("roam_chat_session") || null;
  let open = false;

  function currentLang() {
    try {
      return (typeof getLang === "function" ? getLang() : localStorage.getItem("roam_lang")) || "en";
    } catch {
      return "en";
    }
  }

  function tChat(key) {
    const lang = currentLang();
    const dict = {
      en: { title: "RoamLocal Assistant", placeholder: "Ask about guides, trips…", send: "Send", greeting: "Hi! I speak many languages. How can I help?" },
      hi: { title: "RoamLocal सहायक", placeholder: "गाइड, यात्रा के बारे में पूछें…", send: "भेजें", greeting: "नमस्ते! मैं कई भाषाएँ बोलता हूँ। कैसे मदद करूँ?" },
      es: { title: "Asistente RoamLocal", placeholder: "Pregunta por guías, viajes…", send: "Enviar", greeting: "¡Hola! Hablo varios idiomas. ¿Cómo te ayudo?" },
      fr: { title: "Assistant RoamLocal", placeholder: "Guides, voyages…", send: "Envoyer", greeting: "Bonjour ! Je parle plusieurs langues. Comment puis-je aider ?" },
      ar: { title: "مساعد RoamLocal", placeholder: "اسأل عن المرشدين…", send: "إرسال", greeting: "مرحبًا! أتحدث عدة لغات. كيف أساعد؟" },
      zh: { title: "RoamLocal 助手", placeholder: "询问向导、行程…", send: "发送", greeting: "你好！我会多种语言。有什么可以帮你？" },
      ja: { title: "RoamLocalアシスタント", placeholder: "ガイドや旅について…", send: "送信", greeting: "こんにちは！多言語で対応します。ご用件は？" },
      id: { title: "Asisten RoamLocal", placeholder: "Tanya pemandu, perjalanan…", send: "Kirim", greeting: "Halo! Saya bisa banyak bahasa. Ada yang bisa dibantu?" },
      pt: { title: "Assistente RoamLocal", placeholder: "Pergunte sobre guias…", send: "Enviar", greeting: "Olá! Falo vários idiomas. Como posso ajudar?" },
      de: { title: "RoamLocal-Assistent", placeholder: "Guides, Reisen…", send: "Senden", greeting: "Hallo! Ich spreche mehrere Sprachen. Wie kann ich helfen?" },
      te: { title: "RoamLocal సహాయకుడు", placeholder: "గైడ్‌లు, ప్రయాణాలు…", send: "పంపు", greeting: "నమస్కారం! నేను అనేక భాషలు మాట్లాడతాను. ఎలా సహాయం చేయాలి?" },
      ta: { title: "RoamLocal உதவியாளர்", placeholder: "வழிகாட்டிகள், பயணங்கள்…", send: "அனுப்பு", greeting: "வணக்கம்! பல மொழிகள் பேசுவேன். எப்படி உதவலாம்?" },
    };
    return (dict[lang] || dict.en)[key] || dict.en[key];
  }

  function inject() {
    if (document.getElementById("chat-widget")) return;
    const wrap = document.createElement("div");
    wrap.id = "chat-widget";
    wrap.innerHTML = `
      <div id="chat-panel" role="dialog" aria-label="Chat">
        <div id="chat-header">
          <span id="chat-title">${tChat("title")}</span>
          <button type="button" id="chat-close" aria-label="Close">×</button>
        </div>
        <div id="chat-messages"></div>
        <div id="chat-input-row">
          <input id="chat-input" type="text" placeholder="${tChat("placeholder")}" autocomplete="off" />
          <button type="button" id="chat-send">${tChat("send")}</button>
        </div>
      </div>
      <button type="button" id="chat-toggle" aria-label="Open chat">💬</button>
    `;
    document.body.appendChild(wrap);

    document.getElementById("chat-toggle").addEventListener("click", toggle);
    document.getElementById("chat-close").addEventListener("click", toggle);
    document.getElementById("chat-send").addEventListener("click", send);
    document.getElementById("chat-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") send();
    });

    // greeting
    addMsg("bot", tChat("greeting"));
  }

  function toggle() {
    open = !open;
    document.getElementById("chat-panel").classList.toggle("open", open);
    if (open) document.getElementById("chat-input").focus();
  }

  function addMsg(role, text) {
    const box = document.getElementById("chat-messages");
    const div = document.createElement("div");
    div.className = "chat-msg " + (role === "user" ? "user" : "bot");
    div.textContent = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }

  function setTyping(on) {
    const box = document.getElementById("chat-messages");
    let el = document.getElementById("chat-typing");
    if (on) {
      if (!el) {
        el = document.createElement("div");
        el.id = "chat-typing";
        el.className = "chat-typing";
        el.textContent = "…";
        box.appendChild(el);
      }
    } else if (el) {
      el.remove();
    }
    box.scrollTop = box.scrollHeight;
  }

  async function send() {
    const input = document.getElementById("chat-input");
    const msg = (input.value || "").trim();
    if (!msg) return;
    input.value = "";
    addMsg("user", msg);
    setTyping(true);
    document.getElementById("chat-send").disabled = true;

    try {
      const res = await fetch((API_BASE || "") + "/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: msg,
          lang: currentLang(),
          session_id: sessionId,
        }),
      });
      const data = await res.json();
      if (data.session_id) {
        sessionId = data.session_id;
        localStorage.setItem("roam_chat_session", sessionId);
      }
      setTyping(false);
      addMsg("bot", data.reply || "Sorry, something went wrong.");
    } catch (err) {
      setTyping(false);
      // Offline fallback – simple local reply
      const fallback = {
        en: "I'm offline right now, but you can explore Guides and Experiences on the site!",
        hi: "अभी ऑफ़लाइन हूँ, लेकिन Guides और Experiences देख सकते हैं!",
        es: "Estoy desconectado, pero puedes explorar Guías y Experiencias.",
        fr: "Je suis hors ligne, explorez Guides et Expériences sur le site.",
        ja: "オフラインです。サイトのガイドと体験をご覧ください。",
        zh: "我现在离线，请在网站上查看向导和体验。",
        id: "Saya offline, silakan jelajahi Guides dan Experiences.",
        de: "Ich bin offline – schau dir Guides und Erlebnisse an!",
        pt: "Estou offline, explore Guias e Experiências no site.",
        ar: "أنا غير متصل الآن، يمكنك استكشاف المرشدين والتجارب.",
        te: "నేను ఆఫ్‌లైన్‌లో ఉన్నాను. Guides మరియు Experiences చూడండి!",
        ta: "நான் ஆஃப்லைனில் இருக்கிறேன். Guides மற்றும் Experiences பாருங்கள்!",
      };
      const lang = currentLang();
      addMsg("bot", fallback[lang] || fallback.en);
    }
    document.getElementById("chat-send").disabled = false;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
