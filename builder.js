// Automation Builder (templates -> WhatsApp / Email)
(function(){
  const WA = "972547222023";
  const EMAIL = "autoroybiz@gmail.com";

  const templates = {
    chatbot: "AI צ׳אטבוט לאתר / Shopify",
    leads_wa: "לידים → WhatsApp",
    abandoned_cart: "נטישת עגלה",
    invoice_to_sheets: "חשבונית → Sheets",
  };

  const cards = document.querySelectorAll("[data-template]");
  const wrap = document.getElementById("builderFormWrap");
  const chosen = document.getElementById("builderChosen");
  const form = document.getElementById("builderForm");
  const mailBtn = document.getElementById("builderMail");

  let current = null;

  function show(templateKey){
    current = templateKey;
    chosen.textContent = templates[templateKey] || templateKey;
    wrap.style.display = "block";
    wrap.scrollIntoView({behavior:"smooth", block:"start"});
  }

  cards.forEach(c=>{
    c.addEventListener("click", ()=>{
      cards.forEach(x=>x.classList.remove("active"));
      c.classList.add("active");
      show(c.getAttribute("data-template"));
    });
  });

  function buildPayload(){
    const name = (document.getElementById("bName").value || "").trim();
    const business = (document.getElementById("bBusiness").value || "").trim();
    const contact = (document.getElementById("bContact").value || "").trim();
    const platform = (document.getElementById("bPlatform").value || "").trim();
    const notes = (document.getElementById("bNotes").value || "").trim();

    const title = templates[current] || "אוטומציה";
    return {title, name, business, contact, platform, notes};
  }

  function buildText(p){
    return `היי! אני רוצה להתקדם עם: ${p.title}
` +
      `שם: ${p.name}
` +
      (p.business ? `עסק: ${p.business}
` : "") +
      `יצירת קשר: ${p.contact}
` +
      `פלטפורמה: ${p.platform}
` +
      (p.notes ? `הערות: ${p.notes}
` : "");
  }

  form?.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(!current){ alert("בחר קודם אוטומציה"); return; }
    const p = buildPayload();
    if(!p.contact){ alert("חסר טלפון/מייל"); return; }
    const msg = encodeURIComponent(buildText(p));
    window.open(`https://wa.me/${WA}?text=${msg}`, "_blank");
    form.reset();
  });

  mailBtn?.addEventListener("click", ()=>{
    if(!current){ alert("בחר קודם אוטומציה"); return; }
    const p = buildPayload();
    if(!p.contact){ alert("חסר טלפון/מייל"); return; }
    const subject = encodeURIComponent(`AutoRoy — בקשה לאוטומציה: ${p.title}`);
    const body = encodeURIComponent(buildText(p));
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  });
})();
