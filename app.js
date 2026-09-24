const SB="https://arcjsoupsfdoosspfgvb.supabase.co",KEY="sb_publishable_EfnLnRBdRqQ6JQHQdnxWIg_WUifgMhr",db=supabase.createClient(SB,KEY),purl=p=>SB+"/storage/v1/object/public/accommodation-photos/"+p.split("/").map(encodeURIComponent).join("/");let units=[],light=[],li=0;const expected={"Standard Triple Studio":11,"Triple Studio with Balcony":12,"Triple Studio with Sea View":12,"Standard One Bedroom Apartment":10,"One-Bedroom Apartment with Balcony":12,"One-Bedroom Apartment with Sea View":13,"Apartment with Sea View - (Attic)":12};function clean(u){let s=new Set();return(u.photos||[]).sort((a,b)=>(a.sort_order||0)-(b.sort_order||0)).filter(x=>{let k=x.storage_path.split("/").pop().toLowerCase();if(s.has(k))return false;s.add(k);return true}).slice(0,expected[u.name]||99)}function all(){let s=new Set(),a=[];units.forEach(u=>u.photos.forEach(p=>{let k=p.storage_path.split("/").pop().toLowerCase();if(!s.has(k)){s.add(k);a.push({u,p})}}));return a}const srName={"Standard Triple Studio":"Standardni trokrevetni studio sa balkonom","Triple Studio with Balcony":"Trokrevetni studio sa balkonom","Triple Studio with Sea View":"Trokrevetni studio sa pogledom na more","Standard One Bedroom Apartment":"Standardni jednosobni apartman sa balkonom","One-Bedroom Apartment with Balcony":"Jednosobni apartman sa balkonom","One-Bedroom Apartment with Sea View":"Jednosobni apartman sa pogledom na more","Apartment with Sea View - (Attic)":"Apartman u potkrovlju sa pogledom na more"};const slug={"Standard Triple Studio":"standard-triple-studio.html","Triple Studio with Balcony":"triple-studio-with-balcony.html","Triple Studio with Sea View":"triple-studio-with-sea-view.html","Standard One Bedroom Apartment":"standard-one-bedroom-apartment.html","One-Bedroom Apartment with Balcony":"one-bedroom-apartment-with-balcony.html","One-Bedroom Apartment with Sea View":"one-bedroom-apartment-with-sea-view.html","Apartment with Sea View - (Attic)":"apartment-with-sea-view-attic.html"};function openLight(arr,i=0){light=arr;li=i;drawLight();let l=document.getElementById("lightbox");if(l){l.hidden=false;document.body.style.overflow="hidden"}}function drawLight(){let x=light[li],lb=document.getElementById("lightbox");if(!lb||!x)return;lb.querySelector("img").src=purl(x.p.storage_path);lb.querySelector("figcaption").innerHTML=`<span>${srName[x.u.name]||x.u.name} · ${li+1} / ${light.length}</span><a class="gold-btn lb-availability" href="placanje.html?unit=${encodeURIComponent(x.u.name)}">Provjeri raspoloživost</a>`}function stepLight(d){if(!light.length)return;li=(li+d+light.length)%light.length;drawLight()}async function load(){let{data,error}=await db.from("unit_types").select("name,description,max_guests,photos(storage_path,sort_order)").eq("active",true).order("name");if(error)return;units=(data||[]).map(u=>({...u,photos:clean(u)}));let a=all(),hero=document.getElementById("hero-media");if(hero&&a[0])hero.innerHTML=`<img src="${purl(a[0].p.storage_path)}" alt="Apartments Via Mare">`;let grid=document.getElementById("unit-grid");if(grid)grid.innerHTML=units.map(u=>`<article class="suite-card"><a class="suite-image" href="${slug[u.name]||"smestaj.html"}">${u.photos[0]?`<img src="${purl(u.photos[0].storage_path)}" alt="${u.name}">`:""}</a><div class="suite-copy"><span class="kicker">APARTMENTS VIA MARE</span><h3>${srName[u.name]||u.name}</h3><p>${u.description||""}</p><div class="suite-meta"><span>do ${u.max_guests} gosta</span><span>${u.photos.length} fotografija</span></div><a class="text-link" href="${slug[u.name]||"smestaj.html"}">Saznajte više →</a></div></article>`).join("");document.querySelectorAll(".suite-card[data-name]").forEach(card=>{let u=units.find(x=>x.name===card.dataset.name);if(u?.photos[0])card.querySelector(".suite-image").innerHTML=`<img src="${purl(u.photos[0].storage_path)}" alt="${u.name}">`});document.querySelectorAll("[data-unit-hero]").forEach(h=>{let u=units.find(x=>x.name===h.dataset.unitHero);if(u?.photos[0]){let bg=h.querySelector(".unit-hero-bg");if(bg)bg.innerHTML=`<img src="${purl(u.photos[0].storage_path)}">`}});document.querySelectorAll("[data-unit-gallery]").forEach(g=>{let u=units.find(x=>x.name===g.dataset.unitGallery);if(u){let arr=u.photos.map(p=>({u,p}));g.innerHTML=arr.map((x,i)=>`<button data-i="${i}"><img src="${purl(x.p.storage_path)}"></button>`).join("");g.querySelectorAll("button").forEach(b=>b.onclick=()=>openLight(arr,+b.dataset.i))}});setupPaymentUnit();renderFullGallery()}function setupPaymentUnit(){
  const select=document.getElementById("payment-unit");
  if(!select)return;
  const requested=new URLSearchParams(location.search).get("unit");
  const ordered=[...units].sort((a,b)=>{
    if(a.name===requested)return -1;
    if(b.name===requested)return 1;
    return (srName[a.name]||a.name).localeCompare(srName[b.name]||b.name,"sr");
  });
  select.innerHTML=ordered.map(u=>`<option value="${u.name}"${u.name===requested?" selected":""}>${srName[u.name]||u.name}</option>`).join("");
}
function renderFullGallery(){
  const g=document.getElementById("full-gallery"),featured=document.getElementById("gallery-featured"),filters=document.getElementById("gallery-filters"),showAll=document.getElementById("gallery-show-all");
  if(!g)return;
  const canonical={
    "Standard Triple Studio":"Standard triple studio/",
    "Triple Studio with Balcony":"Classic Studio, Balcony/",
    "Triple Studio with Sea View":"Classic Studio, Balcony, Sea View/",
    "Standard One Bedroom Apartment":"Standard One bedroom apartment/",
    "One-Bedroom Apartment with Balcony":"Classic Apartment, 1 Bedroom, Balcony/",
    "One-Bedroom Apartment with Sea View":"Classic Apartment, 1 Bedroom, Sea View/",
    "Apartment with Sea View - (Attic)":"Basic Apartment, 1 Bedroom, Balcony, Sea View/"
  };
  const seen=new Set(),arr=[];
  units.forEach(u=>{
    const preferred=(u.photos||[]).filter(p=>p.storage_path.includes("/"+canonical[u.name]));
    const source=preferred.length?preferred:u.photos||[];
    source.forEach(p=>{
      const file=p.storage_path.split("/").pop().toLowerCase();
      const fingerprint=(file.match(/_([0-9a-f]+)\.[^.]+$/)||[])[1]||file;
      if(seen.has(fingerprint))return;
      seen.add(fingerprint);arr.push({u,p});
    });
  });
  const total=118;
  const labels={"Standard Triple Studio":"Studio","Triple Studio with Balcony":"Studio balkon","Triple Studio with Sea View":"Studio more","Standard One Bedroom Apartment":"Apartman standard","One-Bedroom Apartment with Balcony":"Apartman balkon","One-Bedroom Apartment with Sea View":"Apartman more","Apartment with Sea View - (Attic)":"Potkrovlje"};
  let current=null;
  function subset(){return current?arr.filter(x=>x.u.name===current):arr}
  function drawGrid(){
    const list=subset();
    g.innerHTML=list.map((x,i)=>`<button class="gallery-thumb" data-i="${i}" aria-label="Otvori fotografiju"><img src="${purl(x.p.storage_path)}" alt="${srName[x.u.name]||x.u.name}"></button>`).join("");
    g.querySelectorAll("button").forEach(b=>b.onclick=()=>openLight(list,+b.dataset.i));
  }
  function drawFeatured(){
    const list=subset(); if(!featured||!list.length)return;
    const picks=[0,Math.min(1,list.length-1),Math.min(2,list.length-1),Math.min(3,list.length-1),Math.min(4,list.length-1)];
    featured.innerHTML=picks.map((n,i)=>{const x=list[n];return `<button class="gallery-feature gallery-feature-${i+1}" data-i="${n}" aria-label="Otvori fotografiju"><img src="${purl(x.p.storage_path)}" alt="${srName[x.u.name]||x.u.name}">${i===4&&list.length>5?`<span>+${list.length-4} fotografija</span>`:""}</button>`}).join("");
    featured.querySelectorAll("button").forEach(b=>b.onclick=()=>openLight(list,+b.dataset.i));
  }
  if(filters){
    const buttons=[`<button class="active" data-unit="">Sve fotografije (${total})</button>`,...units.map(u=>`<button data-unit="${u.name}">${labels[u.name]||srName[u.name]||u.name} (${u.photos.length})</button>`)];
    filters.innerHTML=buttons.join("");
    filters.querySelectorAll("button").forEach(b=>b.onclick=()=>{current=b.dataset.unit||null;filters.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===b));drawFeatured();drawGrid();if(!g.hidden)g.scrollIntoView({behavior:"smooth",block:"start"})});
  }
  drawFeatured();drawGrid();
  if(showAll){showAll.textContent=`Prikaži svih ${total} fotografija`;showAll.onclick=()=>{g.hidden=!g.hidden;featured.hidden=!g.hidden;showAll.textContent=g.hidden?`Prikaži svih ${total} fotografija`:"Vrati pregled galerije";if(!g.hidden)g.scrollIntoView({behavior:"smooth",block:"start"})}}
}
function setupInquiryForm(){const f=document.getElementById("inquiry-form");if(!f)return;f.addEventListener("submit",async e=>{e.preventDefault();const d=new FormData(f),s=document.getElementById("form-status"),b=f.querySelector('button[type="submit"]'),ci=d.get("checkin"),co=d.get("checkout");if(ci&&co&&co<=ci){s.textContent="Datum odlaska mora biti posle datuma dolaska.";return}b.disabled=true;s.textContent="Šaljemo upit…";const{error}=await db.from("contact_inquiries").insert({name:(d.get("name")||"").trim(),email:(d.get("email")||"").trim()||null,phone:(d.get("phone")||"").trim()||null,message:(d.get("message")||"").trim(),desired_check_in:ci||null,desired_check_out:co||null,guests:d.get("guests")?Number(d.get("guests")):null});if(error){s.textContent="Upit trenutno nije poslat. Pokušajte ponovo.";b.disabled=false;return}f.reset();s.textContent="Hvala. Vaš upit je uspješno poslat.";b.disabled=false})}setupInquiryForm();
document.querySelector(".menu-toggle")?.addEventListener("click",()=>document.body.classList.toggle("mobile-open"));document.querySelectorAll("#booking-form").forEach(f=>f.onsubmit=e=>{e.preventDefault();let d=new FormData(f),a=d.get("arrival"),o=d.get("departure"),r=document.getElementById("booking-result");if(r)r.innerHTML=o<=a?"Datum odlaska mora biti posle datuma dolaska.":`<p><b>${a} — ${o}</b><br>Raspoloživost i cijena biće prikazane nakon povezivanja channel managera.</p>`});load();
document.addEventListener("click",e=>{let l=document.getElementById("lightbox");if(e.target.closest(".lb-close")){if(l){l.hidden=true;document.body.style.overflow=""};return}if(e.target.closest(".lb-prev")){stepLight(-1);return}if(e.target.closest(".lb-next")){stepLight(1);return}if(e.target.id==="lightbox"){e.target.hidden=true;document.body.style.overflow=""}});document.addEventListener("keydown",e=>{let l=document.getElementById("lightbox");if(!l||l.hidden)return;if(e.key==="Escape"){l.hidden=true;document.body.style.overflow=""}if(e.key==="ArrowLeft")stepLight(-1);if(e.key==="ArrowRight")stepLight(1)});