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
const VM_EN_DESC={
"Standard Triple Studio":"Comfortable triple studio with balcony, private bathroom and kitchenette.",
"Triple Studio with Balcony":"Triple studio with balcony, private bathroom and kitchenette for a comfortable independent stay.",
"Triple Studio with Sea View":"Triple studio with sea view, balcony, private bathroom and kitchenette.",
"Standard One Bedroom Apartment":"Spacious one-bedroom apartment with balcony, private bathroom and kitchen.",
"One-Bedroom Apartment with Balcony":"One-bedroom apartment with balcony, private bathroom and kitchen, suitable for up to four guests.",
"One-Bedroom Apartment with Sea View":"One-bedroom apartment with sea view, balcony, private bathroom and kitchen.",
"Apartment with Sea View - (Attic)":"Attic apartment with sea view, balcony, private bathroom and kitchenette."
};
const SB_URL="https://arcjsoupsfdoosspfgvb.supabase.co";
const SB_KEY="sb_publishable_EfnLnRBdRqQ6JQHQdnxWIg_WUifgMhr";
const db=window.supabase?.createClient(SB_URL,SB_KEY);
function photoUrl(p){if(!p)return"";if(/^https?:/.test(p))return p;return SB_URL+"/storage/v1/object/public/accommodation-photos/"+p.split("/").map(encodeURIComponent).join("/")}
const VM_EXPECTED_PHOTOS={"Standard Triple Studio":11,"Triple Studio with Balcony":12,"Triple Studio with Sea View":12,"Standard One Bedroom Apartment":10,"One-Bedroom Apartment with Balcony":12,"One-Bedroom Apartment with Sea View":13,"Apartment with Sea View - (Attic)":12};
function cleanEnglishPhotos(u){
 const seen=new Set();
 return (u.photos||[]).sort((a,b)=>(a.sort_order||0)-(b.sort_order||0)).filter(p=>{
  const key=(p.storage_path||"").split("/").pop().toLowerCase();
  if(seen.has(key))return false;
  seen.add(key);return true;
 }).slice(0,VM_EXPECTED_PHOTOS[u.name]||99);
}
const VM_PROPERTY_PHOTOS=[
{storage_path:"https://images.trvl-media.com/lodging/132000000/131340000/131330300/131330285/0fa8bb52.jpg?impolicy=resizecrop&rw=1600&ra=fit",sort_order:0,alt_text:"Apartments Via Mare"},
{storage_path:"https://images.trvl-media.com/lodging/132000000/131340000/131330300/131330285/0fa8bb52.jpg?impolicy=resizecrop&rw=1600&ra=fit",sort_order:1,alt_text:"Apartments Via Mare"},
{storage_path:"https://images.trvl-media.com/lodging/132000000/131340000/131330300/131330285/560a0bab.jpg?impolicy=resizecrop&rw=1600&ra=fit",sort_order:2,alt_text:"Apartments Via Mare"},
{storage_path:"https://images.trvl-media.com/lodging/132000000/131340000/131330300/131330285/8fed9af4.jpg?impolicy=resizecrop&rw=1600&ra=fit",sort_order:3,alt_text:"Apartments Via Mare"},
{storage_path:"https://images.trvl-media.com/lodging/132000000/131340000/131330300/131330285/18f4f010.jpg?impolicy=resizecrop&rw=1600&ra=fit",sort_order:4,alt_text:"Apartments Via Mare"},
{storage_path:"https://images.trvl-media.com/lodging/132000000/131340000/131330300/131330285/c18970fe.jpg?impolicy=resizecrop&rw=1600&ra=fit",sort_order:5,alt_text:"Apartments Via Mare"},
{storage_path:"https://images.trvl-media.com/lodging/132000000/131340000/131330300/131330285/fdd52139.jpg?impolicy=resizecrop&rw=1600&ra=fit",sort_order:6,alt_text:"Apartments Via Mare"},
{storage_path:"https://images.trvl-media.com/lodging/132000000/131340000/131330300/131330285/d1a3c180.jpg?impolicy=resizecrop&rw=1600&ra=fit",sort_order:7,alt_text:"Apartments Via Mare"}
];
function englishGalleryAll(units){
 const seen=new Set(),out=[],propertyUnit={name:"Property and grounds"};
 VM_PROPERTY_PHOTOS.forEach(p=>out.push({u:propertyUnit,p}));
 units.forEach(u=>(u.photos||[]).forEach(p=>{
  const file=((p.storage_path||"").split("/").pop()||p.storage_path||"").toLowerCase();
  const base=file.replace(/\.[^.]+$/,"");
  const m=base.match(/[_-]([0-9a-f]{8,})$/),key=m?m[1]:base;
  if(seen.has(key))return;
  seen.add(key);out.push({u,p});
 }));
 return out;
}
async function loadEnglish(){
 if(!db)return;
 const {data,error}=await db.from("unit_types").select("id,name,description,max_guests,photos(storage_path,sort_order)").eq("active",true).order("name");
 if(error||!data){console.error("Via Mare unit_types:",error);const g=document.getElementById("unit-grid"),pg=document.getElementById("full-gallery"),sel=document.getElementById("payment-unit");if(g)g.innerHTML='<p class="loading">Accommodation cannot be loaded at the moment. Please try again.</p>';if(pg)pg.innerHTML='<p class="loading">The gallery cannot be loaded at the moment. Please try again.</p>';if(sel)sel.disabled=true;return;}
 const units=(data||[]).map(u=>({...u,photos:cleanEnglishPhotos(u)}));
 const hero=document.getElementById("hero-media");
 if(hero){const hp=units.flatMap(u=>(u.photos||[]).map(p=>({u,p})))[0];if(hp)hero.innerHTML='<img src="'+photoUrl(hp.p.storage_path)+'" alt="Apartments Via Mare">';}
 const slugs={"Standard Triple Studio":"standard-triple-studio","Triple Studio with Balcony":"triple-studio-with-balcony","Triple Studio with Sea View":"triple-studio-with-sea-view","Standard One Bedroom Apartment":"standard-one-bedroom-apartment","One-Bedroom Apartment with Balcony":"one-bedroom-apartment-with-balcony","One-Bedroom Apartment with Sea View":"one-bedroom-apartment-with-sea-view","Apartment with Sea View - (Attic)":"apartment-with-sea-view-attic"};
 const grid=document.getElementById("unit-grid");
 if(grid)grid.innerHTML=units.map(u=>{const p=(u.photos||[]).sort((a,b)=>(a.sort_order||0)-(b.sort_order||0))[0],slug=slugs[u.name]||"";return '<article class="suite-card"><a class="suite-image" href="'+VM_EN_BASE+slug+'/">'+(p?'<img src="'+photoUrl(p.storage_path)+'" alt="'+(VM_EN_NAMES[u.name]||u.name)+'">':'')+'</a><div class="suite-copy"><span class="kicker">APARTMENTS VIA MARE</span><h3>'+(VM_EN_NAMES[u.name]||u.name)+'</h3><p>'+(VM_EN_DESC[u.name]||'')+'</p><div class="suite-meta"><span>up to '+(u.max_guests||'')+' guests</span><span>'+(u.photos||[]).length+' photos</span></div><a class="text-link" href="'+VM_EN_BASE+slug+'/">View accommodation →</a></div></article>'}).join("");

 const ug=document.querySelector(".unit-gallery[data-en-unit]");
 if(ug){const wanted=ug.dataset.enUnit,match=units.find(u=>slugs[u.name]===wanted);if(match){const photos=(match.photos||[]).sort((a,b)=>(a.sort_order||0)-(b.sort_order||0)),images=photos.map(p=>({src:photoUrl(p.storage_path),alt:VM_EN_NAMES[match.name]||match.name,unit:match.name}));ug.innerHTML=photos.map((p,i)=>'<button type="button" data-i="'+i+'"><img src="'+photoUrl(p.storage_path)+'" alt="'+(VM_EN_NAMES[match.name]||match.name)+'"></button>').join("");ug.querySelectorAll("button").forEach(b=>b.onclick=()=>vmEnLightbox(images,+b.dataset.i))}}
 const gallery=document.getElementById("full-gallery"),featured=document.getElementById("gallery-featured"),toggle=document.getElementById("gallery-show-all"),filters=document.getElementById("gallery-filters");
 if(gallery){
  const all=englishGalleryAll(units);let selected="";
  const list=()=>selected?all.filter(x=>x.u.name===selected):all;
  const paint=()=>{const a=list();
   if(featured){featured.innerHTML=a.slice(0,5).map((x,i)=>'<button class="gallery-feature gallery-feature-'+(i+1)+'" data-i="'+i+'"><img src="'+photoUrl(x.p.storage_path)+'" alt="Apartments Via Mare">'+(i===4&&a.length>5?'<span>+'+(a.length-5)+' photos</span>':'')+'</button>').join("");featured.querySelectorAll("button").forEach(b=>b.onclick=e=>{e.stopPropagation();vmEnLightbox(a.map(x=>({src:photoUrl(x.p.storage_path),alt:VM_EN_NAMES[x.u.name]||x.u.name,unit:x.u.name})),+b.dataset.i)})}
   gallery.innerHTML=a.map((x,i)=>'<button class="gallery-thumb" data-i="'+i+'"><img src="'+photoUrl(x.p.storage_path)+'" alt="Apartments Via Mare"></button>').join("");
   gallery.querySelectorAll("button").forEach(b=>b.onclick=e=>{e.stopPropagation();vmEnLightbox(a.map(x=>({src:photoUrl(x.p.storage_path),alt:VM_EN_NAMES[x.u.name]||x.u.name,unit:x.u.name})),+b.dataset.i)});
   gallery.hidden=true;if(toggle)toggle.textContent="Show all photos ("+a.length+")";
  };
  if(filters){filters.innerHTML='<button class="active" data-u="">All</button><button data-u="Property and grounds">Property and grounds</button>'+units.map(u=>'<button data-u="'+u.name+'">'+(VM_EN_NAMES[u.name]||u.name)+'</button>').join("");filters.querySelectorAll("button").forEach(b=>b.onclick=()=>{selected=b.dataset.u;filters.querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===b));paint()})}
  paint();if(toggle)toggle.onclick=()=>{gallery.hidden=!gallery.hidden;featured.hidden=!gallery.hidden;toggle.textContent=gallery.hidden?"Show all photos ("+list().length+")":"Back to collage"};
 }
 const sel=document.getElementById("payment-unit");
 if(sel){const requested=new URLSearchParams(location.search).get("unit");const isRequested=u=>!!requested&&(requested===slugs[u.name]||requested===u.name);const ordered=[...units].sort((a,b)=>{const am=isRequested(a),bm=isRequested(b);if(am&&!bm)return -1;if(bm&&!am)return 1;return (VM_EN_NAMES[a.name]||a.name).localeCompare(VM_EN_NAMES[b.name]||b.name,"en")});sel.innerHTML=ordered.map((u,i)=>'<option value="'+u.name+'"'+(i===0?' selected':'')+'>'+(VM_EN_NAMES[u.name]||u.name)+'</option>').join("");const arrival=document.querySelector('#checkout-form [name="arrival"]'),departure=document.querySelector('#checkout-form [name="departure"]');const paintSelection=()=>{const u=units.find(x=>x.name===sel.value),title=document.getElementById("payment-unit-title"),photo=document.querySelector(".payment-unit-photo"),dates=document.getElementById("summary-dates");if(title)title.textContent=u?(VM_EN_NAMES[u.name]||u.name):"";if(photo)photo.innerHTML=u&&u.photos&&u.photos[0]?'<img src="'+photoUrl(u.photos[0].storage_path)+'" alt="'+(VM_EN_NAMES[u.name]||u.name)+'">':"";if(dates){const a=arrival?.value,d=departure?.value;dates.textContent=a&&d?a.split("-").reverse().join(".")+" – "+d.split("-").reverse().join("."):"—"}};sel.addEventListener("change",paintSelection);arrival?.addEventListener("change",paintSelection);departure?.addEventListener("change",paintSelection);paintSelection();}
}
document.querySelector(".menu-toggle")?.addEventListener("click",()=>document.body.classList.toggle("mobile-open"));
function vmDateLogic(form){if(!form)return;const a=form.querySelector('[name="arrival"],[name="checkin"]'),d=form.querySelector('[name="departure"],[name="checkout"]');if(!a||!d)return;const now=new Date(),today=now.getFullYear()+"-"+String(now.getMonth()+1).padStart(2,"0")+"-"+String(now.getDate()).padStart(2,"0");a.min=today;const sync=()=>{if(!a.value){d.min=today;return}const x=new Date(a.value+"T00:00:00");x.setDate(x.getDate()+1);const min=x.getFullYear()+"-"+String(x.getMonth()+1).padStart(2,"0")+"-"+String(x.getDate()).padStart(2,"0");d.min=min;if(d.value&&d.value<min)d.value=""};a.addEventListener("change",sync);sync();}
document.querySelectorAll("#booking-form,#checkout-form,#inquiry-form").forEach(vmDateLogic);
function vmApplyQueryDates(form){if(!form)return;const q=new URLSearchParams(location.search),a=form.querySelector('[name="arrival"]'),d=form.querySelector('[name="departure"]'),today=a?.min||"";let av=q.get("arrival")||"",dv=q.get("departure")||"";if(av&&today&&av<today)av="";if(av)a.value=av;a?.dispatchEvent(new Event("change"));if(dv&&d?.min&&dv<d.min)dv="";if(dv)d.value=dv;}
vmApplyQueryDates(document.getElementById("checkout-form"));
const checkout=document.getElementById("checkout-form");
checkout?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget),a=f.get("arrival"),d=f.get("departure"),s=document.getElementById("payment-status");if(!a||!d||!f.get("unit")||!f.get("name")||!f.get("email")){s.textContent="Please complete all required fields.";return}if(d<=a){s.textContent="Departure must be after arrival.";return}s.textContent="Online card payment is not active yet. No reservation has been charged or submitted.";});
document.getElementById("inquiry-form")?.addEventListener("submit",async e=>{e.preventDefault();const f=e.currentTarget,d=new FormData(f),s=document.getElementById("form-status"),b=f.querySelector('button[type="submit"]'),ci=d.get("checkin"),co=d.get("checkout");if(ci&&co&&co<=ci){s.textContent="Departure must be after arrival.";return}if(!db){s.textContent="The enquiry service is temporarily unavailable.";return}b.disabled=true;s.textContent="Sending enquiry…";const {error}=await db.from("contact_inquiries").insert({name:(d.get("name")||"").trim(),email:(d.get("email")||"").trim()||null,phone:(d.get("phone")||"").trim()||null,message:(d.get("message")||"").trim(),desired_check_in:ci||null,desired_check_out:co||null,guests:d.get("guests")?Number(d.get("guests")):null});s.textContent=error?"Your enquiry could not be sent. Please try again.":"Thank you. Your enquiry has been sent.";if(!error)f.reset();b.disabled=false;});
loadEnglish();

function vmEnLightbox(images,start=0){
 if(!images.length)return;let i=start;
 const box=document.createElement("div");box.className="lightbox";box.innerHTML='<button class="lb-prev" aria-label="Previous">‹</button><figure><img><figcaption></figcaption></figure><button class="lb-next" aria-label="Next">›</button><button class="lb-close" aria-label="Close">×</button>';
 const img=box.querySelector("img"),cap=box.querySelector("figcaption");
 const close=()=>{box.remove();document.body.style.overflow=""};
 const paint=()=>{const x=images[i];img.src=x.src;cap.innerHTML='<span>'+(x.alt||"Apartments Via Mare")+' · '+(i+1)+' / '+images.length+'</span>'+(x.unit?'<a class="gold-btn lb-availability" href="'+VM_EN_BASE+'booking/?unit='+encodeURIComponent(x.unit)+'">Check availability</a>':'')};
 box.querySelector(".lb-prev").onclick=()=>{i=(i-1+images.length)%images.length;paint()};
 box.querySelector(".lb-next").onclick=()=>{i=(i+1)%images.length;paint()};
 box.querySelector(".lb-close").onclick=close;box.onclick=e=>{if(e.target===box)close()};
 document.addEventListener("keydown",function key(e){if(!box.isConnected){document.removeEventListener("keydown",key);return}if(e.key==="Escape")close();if(e.key==="ArrowLeft")box.querySelector(".lb-prev").click();if(e.key==="ArrowRight")box.querySelector(".lb-next").click()});
 document.body.appendChild(box);document.body.style.overflow="hidden";paint();
}

document.getElementById("booking-form")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget),a=f.get("arrival")||"",d=f.get("departure")||"",r=document.getElementById("booking-result");if(r)r.innerHTML=(!a||!d||d<=a)?"Departure must be after arrival.":'<p><b>'+a+' — '+d+'</b><br>Availability and price will be displayed after the channel manager is connected.</p>';});

(function syncLanguageCounterpart(){
 const a=document.querySelector(".vm-language-switch a:not(.active)");if(!a)return;
 const path=location.pathname.replace(/\/+$/,"");
 const slug=(path.split("/en/")[1]||"").split("/")[0];
 const map={about:"o-nama",accommodation:"smestaj",gallery:"galerija",beaches:"plaze",buljarica:"buljarica",contact:"kontakt",booking:"placanje","standard-triple-studio":"standard-triple-studio","triple-studio-with-balcony":"triple-studio-with-balcony","triple-studio-with-sea-view":"triple-studio-with-sea-view","standard-one-bedroom-apartment":"standard-one-bedroom-apartment","one-bedroom-apartment-with-balcony":"one-bedroom-apartment-with-balcony","one-bedroom-apartment-with-sea-view":"one-bedroom-apartment-with-sea-view","apartment-with-sea-view-attic":"apartment-with-sea-view-attic"};
 const base=VM_EN_BASE.replace(/en\/$/,"");a.href=base+(map[slug]?map[slug]+"/":"")+(slug==="booking"?location.search:"");
})();
