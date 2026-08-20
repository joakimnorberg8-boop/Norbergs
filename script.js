const CONTACT = {
  phoneDisplay: '0123 - 45 67 8',
  phoneLink: '+4612345678',
  email: 'info@norbergs.se',
  area: 'Sundsvall med omnejd'
};

const machines = [
  {id:'spidermax', type:'MINIGRÄVARE', name:'Spidermax', image:'grev.jpg', price:'Pris på förfrågan', year:'–', hours:'–', weight:'–', status:'I lager', summary:'Smidig minigrävare för mindre entreprenad-, mark- och fastighetsjobb.', equipment:['Komplett utrustningslista på begäran','Visning efter överenskommelse']},
  {id:'hitachi-zx350', type:'GRÄVMASKIN', name:'Hitachi ZX350-7', image:'produkt_zx350-7_1000x1000_02.jpg', price:'Pris på förfrågan', year:'–', hours:'–', weight:'–', status:'I lager', summary:'Kraftfull grävmaskin för större entreprenad- och anläggningsarbeten.', equipment:['Maskinspecifikation på begäran','Visning efter överenskommelse']},
  {id:'volvo-t15', type:'TRAKTOR', name:'Volvo T15 Krabat', image:'1956_Volvo_T15_Krabat.jpg', price:'Pris på förfrågan', year:'1956', hours:'–', weight:'–', status:'I lager', summary:'Klassisk Volvo T15 Krabat. Skick och historik lämnas på begäran.', equipment:['Mer information på begäran','Visning efter överenskommelse']},
  {id:'volvo-240', type:'FORDON', name:'Volvo 240 GLE', image:'volvo_240_gle_blue.webp', price:'Pris på förfrågan', year:'–', hours:'–', weight:'–', status:'I lager', summary:'Volvo 240 GLE. Aktuell information och visning efter överenskommelse.', equipment:['Mer information på begäran','Visning efter överenskommelse']},
  {id:'maskin-05', type:'MASKIN', name:'Maskin 05', image:'images.jpg', price:'Pris på förfrågan', year:'–', hours:'–', weight:'–', status:'I lager', summary:'Aktuellt objekt hos Norbergs. Mer information lämnas på begäran.', equipment:['Specifikation på begäran']},
  {id:'fordon-06', type:'FORDON', name:'Fordon 06', image:'472159D6-5940-4A4D-92C1-49CE6A599969-1366x1024.jpg', price:'Pris på förfrågan', year:'–', hours:'–', weight:'–', status:'I lager', summary:'Aktuellt objekt hos Norbergs. Mer information lämnas på begäran.', equipment:['Specifikation på begäran']}
];

const app = document.getElementById('app');
const nav = document.getElementById('nav');
const burger = document.getElementById('hamburger');
let currentView = 'home';
let machineFilter = 'ALLA';

const ICONS = {
  arrowRight: `<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>`,
  arrowLeft: `<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H6M11 6l-6 6 6 6"/></svg>`,
  arrowUpRight: `<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>`,
  phone: `<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.8 3.5 9.5 7l-1.8 2.2c1.3 2.5 3.3 4.5 5.8 5.8l2.2-1.8 3.5 2.7-1 3.1c-.3.8-1.1 1.3-2 1.2C9.4 19.3 4.7 14.6 3.8 7.8c-.1-.9.4-1.7 1.2-2l1.8-.3Z"/></svg>`,
  mail: `<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4zM4 7l8 6 8-6"/></svg>`,
  menu: `<svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
  close: `<svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>`,
  check: `<svg class="ui-icon check-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4 10-10"/></svg>`
};

function button(label, view, extra='') {
  return `<button class="${extra}" data-view="${view}">${label}</button>`;
}

function machineCard(m) {
  return `<button class="machine-card" data-machine="${m.id}" aria-label="Visa ${m.name}">
    <div class="machine-photo"><img src="${m.image}" alt="${m.name}"><span>${m.type}</span><b class="stock">${m.status}</b></div>
    <div class="machine-info"><div><h3>${m.name}</h3><p>${m.price}</p></div><b class="card-arrow">${ICONS.arrowUpRight}</b></div>
    <div class="machine-meta"><span>${m.year !== '–' ? `Årsmodell ${m.year}` : 'Info på begäran'}</span><span class="meta-link">Visa objekt ${ICONS.arrowRight}</span></div>
  </button>`;
}

function homeView() {
  const heroMachines = [
    {image:'472159D6-5940-4A4D-92C1-49CE6A599969-1366x1024.jpg', label:'FORDON & MASKINER'},
    {image:'produkt_zx350-7_1000x1000_02.jpg', label:'HITACHI ZX350-7'},
    {image:'grev.jpg', label:'MINIGRÄVARE'},
    {image:'1956_Volvo_T15_Krabat.jpg', label:'VOLVO T15 KRABAT'}
  ];

  return `
    <section class="hero" aria-label="Utvalda maskiner">
      <div class="hero-slides">
        ${heroMachines.map((s,i)=>`<figure class="hero-slide ${i===0?'active':''}" data-hero-slide="${i}">
          <img src="${s.image}" alt="${s.label}">
        </figure>`).join('')}
      </div>
      <div class="hero-shade"></div>

      <div class="hero-inner">
        <span class="hero-label">NORBERGS MASKIN & SERVICE</span>
        <h1>Maskiner som jobbar.<br><em>Service som håller.</em></h1>
        <p>Begagnade maskiner, reparation och service med personlig kontakt och raka besked.</p>
        <div class="hero-buttons">
          ${button(`Se aktuella maskiner ${ICONS.arrowUpRight}`,'machines','btn')}
          ${button('Boka service','service','btn outline')}
        </div>
        <div class="trust-row">
          <span>Personlig kontakt</span>
          <span>Service & reparation</span>
          <span>Maskiner till salu</span>
        </div>
      </div>

      <div class="hero-slider-ui">
        <div class="hero-slide-label" id="heroSlideLabel">${heroMachines[0].label}</div>
        <div class="hero-slider-controls" aria-label="Bildspel">
          <button class="hero-arrow" type="button" data-slide-prev aria-label="Föregående bild">${ICONS.arrowLeft}</button>
          <div class="hero-dots">
            ${heroMachines.map((_,i)=>`<button class="hero-dot ${i===0?'active':''}" type="button" data-slide="${i}" aria-label="Visa bild ${i+1}"></button>`).join('')}
          </div>
          <button class="hero-arrow" type="button" data-slide-next aria-label="Nästa bild">${ICONS.arrowRight}</button>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-title">
        <div><span class="eyebrow">SENAST INKOMMET</span><h2>Aktuella maskiner</h2></div>
        <span class="section-note">Klicka på ett objekt för mer information</span>
      </div>
      <div class="machine-grid">${machines.slice(0,3).map(machineCard).join('')}</div>
    </section>

    <section class="home-service-info">
      <div>
        <span class="eyebrow">SERVICE & REPARATION</span>
        <h2>När maskinen måste fortsätta jobba.</h2>
      </div>
      <div>
        <p>Vi hjälper till med felsökning, reparation och service. I servicefliken kan du skicka maskinuppgifter och problembeskrivning direkt, så får vi bättre underlag från början.</p>
      </div>
    </section>

    <section class="section credibility">
      <div><span class="eyebrow">VARFÖR NORBERGS?</span><h2>Enklare kontakt.<br>Färre omvägar.</h2></div>
      <div class="cred-grid">
        <article><b>01</b><h3>Raka besked</h3><p>Tydlig återkoppling om vad som behöver göras och hur vi går vidare.</p></article>
        <article><b>02</b><h3>Personlig service</h3><p>Kontakt med människor som känner maskiner och kan hjälpa dig vidare.</p></article>
        <article><b>03</b><h3>Helheten</h3><p>Maskiner, service, reparation och utrustning samlat på ett ställe.</p></article>
      </div>
    </section>

    <section class="cta-band">
      <div><span>HAR DU EN MASKIN ATT SÄLJA?</span><h2>Skicka in den till oss.</h2></div>
      ${button(`Sälj din maskin ${ICONS.arrowRight}`,'sell','btn dark')}
    </section>`;
}
function machinesView() {
  const types = ['ALLA', ...new Set(machines.map(m=>m.type))];
  const visible = machineFilter === 'ALLA' ? machines : machines.filter(m=>m.type===machineFilter);
  return `<section class="page-hero"><span class="eyebrow">AKTUELLT LAGER</span><h1>Maskiner till salu</h1><p>Se aktuella objekt och öppna en maskin för mer information. Saknas uppgifter? Hör av dig så kompletterar vi dem.</p></section>
  <section class="section machine-browser">
    <div class="filter-tabs">${types.map(t=>`<button class="${machineFilter===t?'active':''}" data-filter="${t}">${t}</button>`).join('')}</div>
    <div class="result-row"><span>${visible.length} objekt</span><button data-view="sell">Har du en maskin att sälja? ${ICONS.arrowRight}</button></div>
    <div class="machine-grid">${visible.map(machineCard).join('')}</div>
  </section>`;
}

function machineDetailView(m) {
  return `<section class="machine-detail section">
    <button class="back-button" data-view="machines">${ICONS.arrowLeft} Tillbaka till maskiner</button>
    <div class="detail-grid">
      <div class="detail-image"><img src="${m.image}" alt="${m.name}"><span>${m.status}</span></div>
      <div class="detail-copy"><span class="eyebrow">${m.type}</span><h1>${m.name}</h1><div class="detail-price">${m.price}</div><p>${m.summary}</p>
        <div class="spec-grid"><div><span>Årsmodell</span><strong>${m.year}</strong></div><div><span>Timmar</span><strong>${m.hours}</strong></div><div><span>Vikt</span><strong>${m.weight}</strong></div><div><span>Status</span><strong>${m.status}</strong></div></div>
        <div class="detail-actions"><a class="btn" href="tel:${CONTACT.phoneLink}">Ring om maskinen ${ICONS.phone}</a><button class="btn dark" data-machine-inquiry="${m.id}">Skicka förfrågan ${ICONS.mail}</button></div>
      </div>
    </div>
    <div class="detail-lower"><div><span class="eyebrow">UTRUSTNING & INFORMATION</span><h2>Om objektet</h2></div><ul>${m.equipment.map(x=>`<li>${ICONS.check}<span>${x}</span></li>`).join('')}</ul></div>
  </section>`;
}

function serviceView(prefill='') {
  return `<section class="page-hero"><span class="eyebrow">SERVICE & REPARATION</span><h1>Boka service.</h1><p>Det här formuläret är gjort för verkstadsärenden. Fyll i maskinen, vad som hänt och hur brådskande det är så får vi rätt underlag direkt.</p></section>
  <section class="section two-col">
    <div class="service-list"><span class="eyebrow">VAD BEHÖVER MASKINEN?</span><h2>Rätt information från början.</h2>
      <div class="service-items"><article><b>01</b><div><h3>Felsökning</h3><p>Maskinen går dåligt, visar felkod eller har stannat.</p></div></article><article><b>02</b><div><h3>Planerad service</h3><p>Underhåll, genomgång och service innan nästa jobb.</p></div></article><article><b>03</b><div><h3>Reparation</h3><p>Något är trasigt och behöver repareras eller bytas.</p></div></article><article><b>04</b><div><h3>Delar & redskap</h3><p>Hjälp att hitta rätt reservdel eller utrustning.</p></div></article></div>
      <div class="service-callout"><span>MASKINEN STÅR HELT STILL?</span><strong>Ring oss direkt på ${CONTACT.phoneDisplay}</strong><a href="tel:${CONTACT.phoneLink}">Ring Norbergs ${ICONS.phone}</a></div>
    </div>
    <form class="lead-form service-booking" id="serviceForm"><span class="form-kicker">BOKA / BEGÄR SERVICE</span><h3>Maskinuppgifter</h3>
      <div class="form-row"><label>Typ av ärende<select name="serviceType" required><option value="">Välj...</option><option>Felsökning</option><option>Planerad service</option><option>Reparation</option><option>Reservdel / redskap</option><option>Annat</option></select></label><label>Prioritet<select name="priority" required><option>Normal</option><option>Brådskande</option><option>Maskinen står still</option></select></label></div>
      <div class="form-row"><label>Märke / modell<input name="machine" value="${prefill}" required placeholder="Ex. Hitachi ZX350"></label><label>Årsmodell<input name="year" placeholder="Ex. 2021"></label></div>
      <div class="form-row"><label>Timmar<input name="hours" placeholder="Ex. 4 850 h"></label><label>Maskinens plats<input name="location" placeholder="Ex. Sundsvall"></label></div>
      <label>Fel / önskat arbete<textarea name="message" required rows="5" placeholder="Beskriv symtom, felkod eller vilken service du vill boka..."></textarea></label>
      <h3 class="form-subheading">Kontaktuppgifter</h3>
      <div class="form-row"><label>Namn<input name="name" required placeholder="Ditt namn"></label><label>Telefon<input name="phone" required placeholder="Telefonnummer"></label></div>
      <label>E-post<input name="email" type="email" placeholder="din@email.se"></label>
      <button class="btn" type="submit">Skicka serviceärende ${ICONS.arrowUpRight}</button><p class="form-note">Formuläret öppnar ditt e-postprogram med serviceuppgifterna färdigifyllda.</p>
    </form>
  </section>`;
}

function sellView() {
  return `<section class="page-hero yellow-hero"><span class="eyebrow">VI KÖPER & FÖRMEDLAR</span><h1>Sälj din maskin</h1><p>Skicka några grunduppgifter om objektet så kan vi ta kontakt och prata om nästa steg.</p></section>
  <section class="section two-col sell-layout"><div><span class="eyebrow">SÅ FUNKAR DET</span><h2>Från maskin till förfrågan på några minuter.</h2><div class="steps"><article><b>1</b><div><h3>Beskriv maskinen</h3><p>Modell, årsmodell, timmar och skick.</p></div></article><article><b>2</b><div><h3>Skicka dina uppgifter</h3><p>Berätta vad du vill ha för maskinen eller be oss återkomma.</p></div></article><article><b>3</b><div><h3>Vi tar kontakt</h3><p>Vi går vidare om objektet är intressant.</p></div></article></div></div>
  <form class="lead-form" id="sellForm"><span class="form-kicker">MASKINUPPGIFTER</span><h3>Skicka in ditt objekt</h3>
    <div class="form-row"><label>Märke<input name="brand" required placeholder="Ex. Volvo"></label><label>Modell<input name="model" required placeholder="Ex. L60H"></label></div>
    <div class="form-row"><label>Årsmodell<input name="year" placeholder="Ex. 2019"></label><label>Timmar<input name="hours" placeholder="Ex. 4 500 h"></label></div>
    <label>Önskat pris<input name="price" placeholder="Pris eller 'ge förslag'"></label>
    <label>Skick / utrustning<textarea name="details" rows="4" placeholder="Beskriv maskinen kort..."></textarea></label>
    <div class="form-row"><label>Ditt namn<input name="name" required placeholder="Namn"></label><label>Telefon<input name="phone" required placeholder="Telefonnummer"></label></div>
    <label>E-post<input name="email" type="email" placeholder="din@email.se"></label>
    <button class="btn" type="submit">Skicka maskinuppgifter ${ICONS.arrowUpRight}</button><p class="form-note">Formuläret öppnar ditt e-postprogram. Bilder kan sedan bifogas i mejlet.</p>
  </form></section>`;
}

function aboutView() {
  return `<section class="page-hero"><span class="eyebrow">OM NORBERGS</span><h1>Maskiner, erfarenhet och personlig service.</h1><p>Vi vill göra det enkelt att få hjälp, oavsett om du behöver service på en maskin eller letar efter nästa objekt.</p></section>
  <section class="about-page"><div class="about-page-image"><img src="micke.jpg" alt="Norbergs Maskin & Service"></div><div class="about-page-copy"><span class="eyebrow">PERSONEN BAKOM KONTAKTEN</span><h2>Du ska veta vem du pratar med.</h2><p>Norbergs arbetar nära kunderna och fokuserar på raka besked, praktiska lösningar och utrustning som fungerar i verkligheten.</p><p>På den här sidan kan kunder snabbt se aktuella maskiner, skicka serviceförfrågningar eller ta kontakt om ett objekt de vill sälja.</p>${button(`Kontakta Norbergs ${ICONS.arrowRight}`,'contact','btn dark')}</div></section>
  <section class="section values"><article><b>01</b><h3>Personligt</h3><p>Direkt kontakt utan onödiga led.</p></article><article><b>02</b><h3>Praktiskt</h3><p>Fokus på lösningar som fungerar ute på jobbet.</p></article><article><b>03</b><h3>Tydligt</h3><p>Raka besked om maskiner, service och nästa steg.</p></article></section>`;
}

function contactView(subject='') {
  return `<section class="page-hero"><span class="eyebrow">KONTAKT</span><h1>Prata med oss.</h1><p>Kontakt-sidan är för allmänna frågor, maskinköp och annat som inte är ett serviceärende. Behöver din maskin service använder du Service-fliken.</p></section>
  <section class="section contact-page"><div class="contact-options"><a href="tel:${CONTACT.phoneLink}"><span>RING DIREKT</span><strong>${CONTACT.phoneDisplay}</strong><small>Snabbast om du vill prata med oss.</small><b>${ICONS.arrowUpRight}</b></a><a href="mailto:${CONTACT.email}"><span>SKICKA E-POST</span><strong>${CONTACT.email}</strong><small>För frågor, bilder och dokument.</small><b>${ICONS.arrowUpRight}</b></a><button class="contact-option service-option" type="button" data-view="service"><span>SERVICEÄRENDE</span><strong>Boka service</strong><small>Maskin, fel och prioritet.</small><b>${ICONS.arrowUpRight}</b></button></div>
    <div class="contact-message-box"><span class="form-kicker">ENKEL KONTAKT</span><h3>Skicka ett meddelande</h3><p>Har du en allmän fråga eller undrar över en maskin? Här räcker det med några få uppgifter.</p>
      <form class="simple-contact-form" id="contactForm"><label>Namn<input name="name" required placeholder="Ditt namn"></label><label>E-post eller telefon<input name="replyTo" required placeholder="Så når vi dig"></label><label>Vad gäller det?<input name="subject" value="${subject}" placeholder="Ex. Hitachi ZX350-7"></label><label>Meddelande<textarea name="message" required rows="4" placeholder="Skriv din fråga..."></textarea></label><button class="btn" type="submit">Skicka meddelande ${ICONS.arrowUpRight}</button></form>
    </div>
  </section>`;
}

function render(view='home', payload=null) {
  currentView = view;
  document.body.classList.remove('menu-open');
  nav.classList.remove('open');
  burger.innerHTML=ICONS.menu; burger.setAttribute('aria-expanded','false');
  document.querySelectorAll('.nav-link').forEach(x=>x.classList.toggle('active',x.dataset.view===view));
  if(view==='home') app.innerHTML=homeView();
  else if(view==='machines') app.innerHTML=machinesView();
  else if(view==='machine') app.innerHTML=machineDetailView(payload);
  else if(view==='service') app.innerHTML=serviceView(payload?.prefill || '');
  else if(view==='sell') app.innerHTML=sellView();
  else if(view==='about') app.innerHTML=aboutView();
  else if(view==='contact') app.innerHTML=contactView(payload?.subject || '');
  window.scrollTo({top:0,behavior:'instant'});
  bindDynamic();
}

function bindDynamic(){
  app.querySelectorAll('[data-view]').forEach(el=>el.addEventListener('click',(e)=>{
    e.preventDefault();
    render(el.dataset.view);
  }));
  bindHeroSlider();
  app.querySelectorAll('[data-machine]').forEach(el=>el.addEventListener('click',()=>{const m=machines.find(x=>x.id===el.dataset.machine); if(m) render('machine',m)}));
  app.querySelectorAll('[data-machine-inquiry]').forEach(el=>el.addEventListener('click',()=>{const m=machines.find(x=>x.id===el.dataset.machineInquiry); render('contact',{subject:m ? `Förfrågan: ${m.name}` : ''})}));
  app.querySelectorAll('[data-filter]').forEach(el=>el.addEventListener('click',()=>{machineFilter=el.dataset.filter; render('machines')}));
  const serviceForm=document.getElementById('serviceForm'); if(serviceForm) serviceForm.addEventListener('submit',e=>sendFormEmail(e,'Serviceförfrågan'));
  const sellForm=document.getElementById('sellForm'); if(sellForm) sellForm.addEventListener('submit',e=>sendFormEmail(e,'Maskin till salu'));
  const contactForm=document.getElementById('contactForm'); if(contactForm) contactForm.addEventListener('submit',e=>sendFormEmail(e,'Förfrågan från hemsidan'));
}

let heroTimer = null;
function bindHeroSlider(){
  if(heroTimer){ clearTimeout(heroTimer); heroTimer=null; }

  const slides=[...app.querySelectorAll('[data-hero-slide]')];
  const dots=[...app.querySelectorAll('.hero-dot')];
  const label=app.querySelector('#heroSlideLabel');
  if(slides.length < 2) return;

  const labels=['FORDON & MASKINER','HITACHI ZX350-7','MINIGRÄVARE','VOLVO T15 KRABAT'];
  let index=0;

  function show(next){
    index=(next+slides.length)%slides.length;
    slides.forEach((slide,i)=>{
      const active=i===index;
      slide.classList.toggle('active',active);
      slide.setAttribute('aria-hidden',String(!active));
    });
    dots.forEach((dot,i)=>{
      dot.classList.toggle('active',i===index);
      dot.setAttribute('aria-current',i===index?'true':'false');
    });
    if(label) label.textContent=labels[index] || `Bild ${index+1}`;
  }

  function schedule(){
    if(heroTimer) clearTimeout(heroTimer);
    heroTimer=setTimeout(()=>{
      show(index+1);
      schedule();
    },4500);
  }

  app.querySelector('[data-slide-prev]')?.addEventListener('click',()=>{
    show(index-1); schedule();
  });
  app.querySelector('[data-slide-next]')?.addEventListener('click',()=>{
    show(index+1); schedule();
  });
  dots.forEach(dot=>dot.addEventListener('click',()=>{
    show(Number(dot.dataset.slide)); schedule();
  }));

  show(0);
  schedule();
}
function sendFormEmail(e, fallbackSubject){
  e.preventDefault(); const fd=new FormData(e.target); const rows=[];
  for(const [k,v] of fd.entries()) if(String(v).trim()) rows.push(`${k}: ${v}`);
  const subject=fd.get('subject') || fallbackSubject;
  const href=`mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(rows.join('\n'))}`;
  window.location.href=href;
}

document.querySelectorAll('header [data-view], footer [data-view], .topline [data-view], .mobile-actions [data-view]').forEach(el=>el.addEventListener('click',()=>render(el.dataset.view)));
burger.addEventListener('click',()=>{const open=nav.classList.toggle('open');burger.innerHTML=open?ICONS.close:ICONS.menu;burger.setAttribute('aria-expanded',String(open));document.body.classList.toggle('menu-open',open)});
render('home');
