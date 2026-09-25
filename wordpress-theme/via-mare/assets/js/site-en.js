/* Via Mare English dynamic layer */
const VM_EN_NAMES={
"Standard Triple Studio":"Standard Triple Studio",
"Triple Studio with Balcony":"Triple Studio with Balcony",
"Triple Studio with Sea View":"Triple Studio with Sea View",
"Standard One Bedroom Apartment":"Standard One-Bedroom Apartment",
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
 const {data,error}=await db.from("unit_types").select("*,photos(*)").order("sort_order");
 if(error||!data)return;
 const units=data;
 const slugs={"Standard Triple Studio":"standard-triple-studio","Triple Studio with Balcony":"triple-studio-with-balcony","Triple Studio with Sea View":"triple-studio-with-sea-view","Standard One Bedroom Apartment":"standard-one-bedroom-apartment","One-Bedroom Apartment with Balcony":"one-bedroom-apartment-with-balcony","One-Bedroom Apartment with Sea View":"one-bedroom-apartment-with-sea-view","Apartment with Sea View - (Attic)":"apartment-with-sea-view-attic"};
 const grid=document.getElementById("unit-grid");
 if(grid)grid.innerHTML=units.map(u=>{const p=(u.photos||[]).sort((a,b)=>(a.sort_order||0)-(b.sort_order||0))[0],slug=slugs[u.name]||"";return '<article class="suite-card"><a class="suite-image" href="../'+slug+'/">'+(p?'<img src="'+photoUrl(p.storage_path)+'" alt="'+(VM_EN_NAMES[u.name]||u.name)+'">':'')+'</a><div class="suite-copy"><span class="kicker">APARTMENTS VIA MARE</span><h3>'+(VM_EN_NAMES[u.name]||u.name)+'</h3><p class="suite-meta">'+(VM_EN_META[u.name]||'')+'</p><a class="text-link" href="../'+slug+'/">View accommodation →</a></div></article>'}).join("");

 const ug=document.querySelector(".unit-gallery[data-en-unit]");
 if(ug){const wanted=ug.dataset.enUnit,match=units.find(u=>slugs[u.name]===wanted);if(match){const photos=(match.photos||[]).sort((a,b)=>(a.sort_order||0)-(b.sort_order||0));ug.innerHTML=photos.map(p=>'<button type="button"><img src="'+photoUrl(p.storage_path)+'" alt="'+(VM_EN_NAMES[match.name]||match.name)+'"></button>').join("")}}
 const gallery=document.getElementById("full-gallery"),featured=document.getElementById("gallery-featured"),toggle=document.getElementById("gallery-show-all"),filters=document.getElementById("gallery-filters");
 if(gallery){let all=[];units.forEach(u=>(u.photos||[]).forEach(p=>all.push({u,p})));const paint=a=>{gallery.innerHTML=a.map(x=>'<button type="button"><img src="'+photoUrl(x.p.storage_path)+'" alt="'+(VM_EN_NAMES[x.u.name]||x.u.name)+'"></button>').join("");if(featured)featured.innerHTML=a.slice(0,5).map((x,i)=>'<button class="gallery-feature gallery-feature-'+(i+1)+'" type="button"><img src="'+photoUrl(x.p.storage_path)+'" alt="'+(VM_EN_NAMES[x.u.name]||x.u.name)+'">'+(i===4&&a.length>5?'<span>+'+(a.length-5)+' photos</span>':'')+'</button>').join("")};paint(all);if(filters){filters.innerHTML='<button class="active" data-u="">All</button>'+units.map(u=>'<button data-u="'+u.name+'">'+(VM_EN_NAMES[u.name]||u.name)+'</button>').join("");filters.querySelectorAll("button").forEach(b=>b.onclick=()=>{filters.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===b));paint(b.dataset.u?all.filter(x=>x.u.name===b.dataset.u):all)})}if(toggle)toggle.onclick=()=>{gallery.hidden=!gallery.hidden;featured.hidden=!gallery.hidden;toggle.textContent=gallery.hidden?"Show all photos":"Back to collage"}}
 const sel=document.getElementById("payment-unit");
 if(sel)units.forEach(u=>{const o=document.createElement("option");o.value=u.id;o.textContent=VM_EN_NAMES[u.name]||u.name;sel.appendChild(o)});
}
document.querySelector(".menu-toggle")?.addEventListener("click",()=>document.body.classList.toggle("mobile-open"));
document.getElementById("checkout-form")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget),a=f.get("arrival"),d=f.get("departure"),s=document.getElementById("payment-status");if(!a||!d||!f.get("unit")||!f.get("name")||!f.get("email")){s.textContent="Please complete all required fields.";return}if(d<=a){s.textContent="Departure must be after arrival.";return}s.textContent="Online card payment is not active yet. No reservation has been charged or submitted.";});
document.getElementById("inquiry-form")?.addEventListener("submit",async e=>{e.preventDefault();const f=e.currentTarget,d=new FormData(f),s=document.getElementById("form-status");if(!db){s.textContent="The enquiry service is temporarily unavailable.";return}const {error}=await db.from("contact_inquiries").insert({name:(d.get("name")||"").trim(),email:(d.get("email")||"").trim(),phone:(d.get("phone")||"").trim()||null,message:(d.get("message")||"").trim()});s.textContent=error?"Your enquiry could not be sent. Please try again.":"Thank you. Your enquiry has been sent.";if(!error)f.reset();});
loadEnglish();
