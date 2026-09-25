/* Via Mare English dynamic layer */
const VM_EN_BASE=window.VM_EN_BASE||"/en/";
const VM_EN_NAMES={
"Standard Triple Studio":"Standard Triple Studio with Balcony",
"Triple Studio with Balcony":"Triple Studio with Balcony",
"Triple Studio with Sea View":"Triple Studio with Sea View",
"Standard One Bedroom Apartment":"Standard One-Bedroom Apartment with Balcony",
"One-Bedroom Apartment with Balcony":"One-Bedroom Apartment with Balcony",
"One-Bedroom Apartment with Sea View":"One-Bedroom Apartment with Sea View",
"Apartment with Sea View - (Attic)":"Sea View Apartment – Attic"
};
const VM_EN_META={
"Standard Triple Studio":"30 m² · 3 guests · Ground / 1st floor · Balcony",
"Triple Studio with Balcony":"30 m² · 3 guests · Ground / 1st floor · Balcony",
"Triple Studio with Sea View":"30 m² · 3 guests · 2nd floor · Sea view",
"Standard One Bedroom Apartment":"40 m² · 4 guests · Ground / 1st floor · Balcony",
"One-Bedroom Apartment with Balcony":"40 m² · 4 guests · Ground / 1st floor · Balcony",
"One-Bedroom Apartment with Sea View":"40 m² · 4 guests · 2nd floor · Sea view",
"Apartment with Sea View - (Attic)":"35 m² · 3 guests · Attic · Sea view"
};
const SB_URL="https://arcjsoupsfdoosspfgvb.supabase.co";
const SB_KEY="sb_publishable_EfnLnRBdRqQ6JQHQdnxWIg_WUifgMhr";
const db=window.supabase?.createClient(SB_URL,SB_KEY);
function photoUrl(p){if(!p)return"";if(/^https?:/.test(p))return p;return SB_URL+"/storage/v1/object/public/accommodation-photos/"+p}
async function loadEnglish(){
 if(!db)return;
 const {data,error}=await db.from("unit_types").select("*").order("name");
 if(error||!data){console.error("Via Mare unit_types:",error);return;}
 const {data:photoRows,error:photoError}=await db.from("photos").select("*").order("sort_order");
 if(photoError){console.error("Via Mare photos:",photoError);return;}
 const byType={};(photoRows||[]).forEach(p=>{if(!byType[p.unit_type_id])byType[p.unit_type_id]=[];byType[p.unit_type_id].push(p)});
 data.forEach(u=>u.photos=byType[u.id]||[]);
 const units=data;
 const hero=document.getElementById("hero-media");
 if(hero){const hp=units.flatMap(u=>(u.photos||[]).map(p=>({u,p}))).sort((a,b)=>(a.p.sort_order||0)-(b.p.sort_order||0))[0];if(hp)hero.style.backgroundImage='url("'+photoUrl(hp.p.storage_path)+'")';}
 const slugs={"Standard Triple Studio":"standard-triple-studio","Triple Studio with Balcony":"triple-studio-with-balcony","Triple Studio with Sea View":"triple-studio-with-sea-view","Standard One Bedroom Apartment":"standard-one-bedroom-apartment","One-Bedroom Apartment with Balcony":"one-bedroom-apartment-with-balcony","One-Bedroom Apartment with Sea View":"one-bedroom-apartment-with-sea-view","Apartment with Sea View - (Attic)":"apartment-with-sea-view-attic"};
 const grid=document.getElementById("unit-grid");
 if(grid)grid.innerHTML=units.map(u=>{const p=(u.photos||[]).sort((a,b)=>(a.sort_order||0)-(b.sort_order||0))[0],slug=slugs[u.name]||"";return '<article class="suite-card"><a class="suite-image" href="'+VM_EN_BASE+slug+'/">'+(p?'<img src="'+photoUrl(p.storage_path)+'" alt="'+(VM_EN_NAMES[u.name]||u.name)+'">':'')+'</a><div class="suite-copy"><span class="kicker">APARTMENTS VIA MARE</span><h3>'+(VM_EN_NAMES[u.name]||u.name)+'</h3><p class="suite-meta">'+(VM_EN_META[u.name]||'')+'</p><a class="text-link" href="'+VM_EN_BASE+slug+'/">View accommodation →</a></div></article>'}).join("");

 const uh=document.querySelector("[data-en-unit-hero]");
 if(uh){const match=units.find(u=>slugs[u.name]===uh.dataset.enUnitHero);const p=match&&(match.photos||[]).sort((a,b)=>(a.sort_order||0)-(b.sort_order||0))[0];if(p){uh.style.position="relative";uh.style.backgroundImage='linear-gradient(rgba(15,44,63,.60),rgba(15,44,63,.60)),url("'+photoUrl(p.storage_path)+'")';uh.style.backgroundSize="cover";uh.style.backgroundPosition="center";}}
 const ug=document.querySelector(".unit-gallery[data-en-unit]");
 if(ug){const wanted=ug.dataset.enUnit,match=units.find(u=>slugs[u.name]===wanted);if(match){const photos=(match.photos||[]).sort((a,b)=>(a.sort_order||0)-(b.sort_order||0));ug.innerHTML=photos.map(p=>'<button type="button"><img src="'+photoUrl(p.storage_path)+'" alt="'+(VM_EN_NAMES[match.name]||match.name)+'"></button>').join("")}}
 const gallery=document.getElementById("full-gallery"),featured=document.getElementById("gallery-featured"),toggle=document.getElementById("gallery-show-all"),filters=document.getElementById("gallery-filters");
 if(gallery){let all=[];units.forEach(u=>(u.photos||[]).forEach(p=>all.push({u,p})));const paint=a=>{gallery.innerHTML=a.map(x=>'<button type="button"><img src="'+photoUrl(x.p.storage_path)+'" alt="'+(VM_EN_NAMES[x.u.name]||x.u.name)+'"></button>').join("");if(featured)featured.innerHTML=a.slice(0,5).map((x,i)=>'<button class="gallery-feature gallery-feature-'+(i+1)+'" type="button"><img src="'+photoUrl(x.p.storage_path)+'" alt="'+(VM_EN_NAMES[x.u.name]||x.u.name)+'">'+(i===4&&a.length>5?'<span>+'+(a.length-5)+' photos</span>':'')+'</button>').join("")};paint(all);if(filters){filters.innerHTML='<button class="active" data-u="">All</button>'+units.map(u=>'<button data-u="'+u.name+'">'+(VM_EN_NAMES[u.name]||u.name)+'</button>').join("");filters.querySelectorAll("button").forEach(b=>b.onclick=()=>{filters.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===b));paint(b.dataset.u?all.filter(x=>x.u.name===b.dataset.u):all)})}if(toggle)toggle.onclick=()=>{gallery.hidden=!gallery.hidden;featured.hidden=!gallery.hidden;toggle.textContent=gallery.hidden?"Show all photos":"Back to collage"}}
 const sel=document.getElementById("payment-unit");
 if(sel){const requested=new URLSearchParams(location.search).get("unit");units.forEach(u=>{const o=document.createElement("option");o.value=u.id;o.dataset.name=u.name;o.textContent=VM_EN_NAMES[u.name]||u.name;if(requested&&(requested===slugs[u.name]||requested===u.name))o.selected=true;sel.appendChild(o)});const paintSelection=()=>{const o=sel.options[sel.selectedIndex],u=units.find(x=>x.id===sel.value),title=document.getElementById("payment-unit-title"),photo=document.querySelector(".payment-unit-photo");if(title)title.textContent=u?(VM_EN_NAMES[u.name]||u.name):"Select accommodation type";if(photo)photo.innerHTML=u&&u.photos&&u.photos[0]?'<img src="'+photoUrl(u.photos[0].storage_path)+'" alt="'+(VM_EN_NAMES[u.name]||u.name)+'">':""};sel.addEventListener("change",paintSelection);paintSelection();}
}
document.querySelector(".menu-toggle")?.addEventListener("click",()=>document.body.classList.toggle("mobile-open"));
const checkout=document.getElementById("checkout-form");
if(checkout){const q=new URLSearchParams(location.search),ai=checkout.querySelector('[name="arrival"]'),di=checkout.querySelector('[name="departure"]');if(ai&&q.get("arrival"))ai.value=q.get("arrival");if(di&&q.get("departure"))di.value=q.get("departure");}
checkout?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget),a=f.get("arrival"),d=f.get("departure"),s=document.getElementById("payment-status");if(!a||!d||!f.get("unit")||!f.get("name")||!f.get("email")){s.textContent="Please complete all required fields.";return}if(d<=a){s.textContent="Departure must be after arrival.";return}s.textContent="Online card payment is not active yet. No reservation has been charged or submitted.";});
document.getElementById("inquiry-form")?.addEventListener("submit",async e=>{e.preventDefault();const f=e.currentTarget,d=new FormData(f),s=document.getElementById("form-status");if(!db){s.textContent="The enquiry service is temporarily unavailable.";return}const {error}=await db.from("contact_inquiries").insert({name:(d.get("name")||"").trim(),email:(d.get("email")||"").trim(),phone:(d.get("phone")||"").trim()||null,message:(d.get("message")||"").trim()});s.textContent=error?"Your enquiry could not be sent. Please try again.":"Thank you. Your enquiry has been sent.";if(!error)f.reset();});
loadEnglish();

function vmEnLightbox(images,start=0){
 if(!images.length)return;let i=start;
 const box=document.createElement("div");box.className="lightbox";box.innerHTML='<button class="lb-prev" aria-label="Previous">‹</button><figure><img><figcaption></figcaption></figure><button class="lb-next" aria-label="Next">›</button><button class="lb-close" aria-label="Close">×</button>';
 const img=box.querySelector("img"),cap=box.querySelector("figcaption");
 const paint=()=>{img.src=images[i].src;cap.textContent=images[i].alt||""};
 box.querySelector(".lb-prev").onclick=()=>{i=(i-1+images.length)%images.length;paint()};
 box.querySelector(".lb-next").onclick=()=>{i=(i+1)%images.length;paint()};
 box.querySelector(".lb-close").onclick=()=>box.remove();
 box.onclick=e=>{if(e.target===box)box.remove()};
 document.addEventListener("keydown",function key(e){if(!box.isConnected){document.removeEventListener("keydown",key);return}if(e.key==="Escape")box.remove();if(e.key==="ArrowLeft")box.querySelector(".lb-prev").click();if(e.key==="ArrowRight")box.querySelector(".lb-next").click()});
 document.body.appendChild(box);paint();
}
document.addEventListener("click",e=>{const b=e.target.closest(".unit-gallery button,.gallery-featured button,.full-gallery button");if(!b)return;const scope=b.closest(".unit-gallery,.gallery-featured,.full-gallery"),buttons=[...scope.querySelectorAll("button")],images=buttons.map(x=>x.querySelector("img")).filter(Boolean).map(x=>({src:x.src,alt:x.alt}));const bi=buttons.indexOf(b);vmEnLightbox(images,Math.max(0,bi));});

document.getElementById("booking-form")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget),a=f.get("arrival")||"",d=f.get("departure")||"";if(!a||!d||d<=a){const r=document.getElementById("booking-result");if(r)r.textContent="Please select valid arrival and departure dates.";return;}const q=new URLSearchParams({arrival:a,departure:d,adults:f.get("adults")||"2",children:f.get("children")||"0",promo:f.get("promo")||""});location.href=VM_EN_BASE+"booking/?"+q.toString();});

(function syncLanguageCounterpart(){
 const a=document.querySelector(".vm-language-switch a:not(.active)");if(!a)return;
 const path=location.pathname.replace(/\/+$/,"");
 const slug=(path.split("/en/")[1]||"").split("/")[0];
 const map={about:"o-nama",accommodation:"smestaj",gallery:"galerija",beaches:"plaze",buljarica:"buljarica",contact:"kontakt",booking:"placanje","standard-triple-studio":"standard-triple-studio","triple-studio-with-balcony":"triple-studio-with-balcony","triple-studio-with-sea-view":"triple-studio-with-sea-view","standard-one-bedroom-apartment":"standard-one-bedroom-apartment","one-bedroom-apartment-with-balcony":"one-bedroom-apartment-with-balcony","one-bedroom-apartment-with-sea-view":"one-bedroom-apartment-with-sea-view","apartment-with-sea-view-attic":"apartment-with-sea-view-attic"};
 const base=VM_EN_BASE.replace(/en\/$/,"");a.href=base+(map[slug]?map[slug]+"/":"");
})();
