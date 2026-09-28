/* Via Mare English dynamic layer */
let englishUnits=[];
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
const db=window.supabase?.createClient(SB_URL,SB_KEY);const VM_EN_UNIT_CATALOG=[["a369b416-37fa-4fe5-b61a-6dc25ed5c6fc","Standard Triple Studio",3],["e3a87529-0ee7-4ee4-8f94-558bfe5e86fa","Triple Studio with Balcony",3],["edbc0686-0077-479c-9bca-4a44a187526d","Triple Studio with Sea View",3],["04ed49bf-5804-456e-afad-9bea94eca4f8","Standard One Bedroom Apartment",4],["b3fda6c0-57ec-41a1-b7b8-245fe38edae8","One-Bedroom Apartment with Balcony",4],["484fade2-79a2-4760-abf2-1e3f30e18f9b","One-Bedroom Apartment with Sea View",4],["c1da1412-4de4-46e9-9d1b-c534f584359c","Apartment with Sea View - (Attic)",3]].map(([id,name,max_guests])=>({id,name,max_guests,description:"",photos:[]}));
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
function vmEnCheckoutAvailabilityGate(units,slugs){return window.VMBookingFlow({db,units,slugs,names:VM_EN_NAMES,photoUrl,unitBase:VM_EN_BASE,dateLogic:vmDateLogic,text:{step1:"STEP 1",check:"Check availability",intro:"Enter your dates and guest numbers. We will show only accommodation that is available and suitable for your party.",arrival:"Arrival",departure:"Departure",adults:"Adults",children:"Children",step2:"STEP 2",available:"Available accommodation",change:"Change search",checking:"Checking availability…",locking:"Locking accommodation…",invalid:"Please check the dates and guest numbers.",error:"Availability cannot be checked right now.",none:"No accommodation is available for the selected dates and guest numbers.",requestedAvailable:"The selected apartment is available for your chosen dates.",requestedUnavailable:"The selected apartment is not available for your chosen dates. Below you can view other available apartments that match your dates and number of guests.",taken:"This accommodation was just taken. Please check availability again.",view:"View apartment",upto:"Up to",guests:"guests",free:"available units",select:"Book"}})}
const VM_EN_SLUGS={"Standard Triple Studio":"standard-triple-studio","Triple Studio with Balcony":"triple-studio-with-balcony","Triple Studio with Sea View":"triple-studio-with-sea-view","Standard One Bedroom Apartment":"standard-one-bedroom-apartment","One-Bedroom Apartment with Balcony":"one-bedroom-apartment-with-balcony","One-Bedroom Apartment with Sea View":"one-bedroom-apartment-with-sea-view","Apartment with Sea View - (Attic)":"apartment-with-sea-view-attic"};async function loadEnglish(){
 if(!db){const g=document.getElementById("unit-grid"),pg=document.getElementById("full-gallery"),sel=document.getElementById("payment-unit");englishUnits=VM_EN_UNIT_CATALOG.map(u=>({...u}));if(sel)vmEnCheckoutAvailabilityGate(englishUnits,VM_EN_SLUGS);if(g)g.innerHTML='<p class="loading">Accommodation cannot be loaded at the moment. Please try again.</p>';if(pg)pg.innerHTML='<p class="loading">The gallery cannot be loaded at the moment. Please try again.</p>';return;}
 const {data,error}=await db.from("unit_types").select("id,name,description,max_guests,photos(storage_path,sort_order)").eq("active",true).order("name");
 if(error||!data){console.error("Via Mare unit_types:",error);const g=document.getElementById("unit-grid"),pg=document.getElementById("full-gallery"),sel=document.getElementById("payment-unit");englishUnits=VM_EN_UNIT_CATALOG.map(u=>({...u}));if(sel)vmEnCheckoutAvailabilityGate(englishUnits,VM_EN_SLUGS);if(g)g.innerHTML='<p class="loading">Accommodation cannot be loaded at the moment. Please try again.</p>';if(pg)pg.innerHTML='<p class="loading">The gallery cannot be loaded at the moment. Please try again.</p>';return;}
 const units=(data||[]).map(u=>({...u,photos:cleanEnglishPhotos(u)})); englishUnits=units; if(document.getElementById("payment-unit"))vmEnCheckoutAvailabilityGate(units,VM_EN_SLUGS);
 const hero=document.getElementById("hero-media");
 if(hero){const hp=units.flatMap(u=>(u.photos||[]).map(p=>({u,p})))[0];if(hp)hero.innerHTML='<img src="'+photoUrl(hp.p.storage_path)+'" alt="Apartments Via Mare">';}
 const grid=document.getElementById("unit-grid");
 if(grid)grid.innerHTML=units.map(u=>{const p=(u.photos||[]).sort((a,b)=>(a.sort_order||0)-(b.sort_order||0))[0],slug=slugs[u.name]||"";return '<article class="suite-card"><a class="suite-image" href="'+VM_EN_BASE+slug+'/">'+(p?'<img src="'+photoUrl(p.storage_path)+'" alt="'+(VM_EN_NAMES[u.name]||u.name)+'">':'')+'</a><div class="suite-copy"><span class="kicker">APARTMENTS VIA MARE</span><h3>'+(VM_EN_NAMES[u.name]||u.name)+'</h3><p>'+(VM_EN_DESC[u.name]||'')+'</p><div class="suite-meta"><span>up to '+(u.max_guests||'')+' guests</span><span>'+(u.photos||[]).length+' photos</span></div><a class="text-link" href="'+VM_EN_BASE+slug+'/">View accommodation →</a></div></article>'}).join("");

 const ug=document.querySelector(".unit-gallery[data-en-unit]");
 if(ug){const wanted=ug.dataset.enUnit,match=units.find(u=>slugs[u.name]===wanted);if(match){const photos=(match.photos||[]).sort((a,b)=>(a.sort_order||0)-(b.sort_order||0)),images=photos.map(p=>({src:photoUrl(p.storage_path),alt:VM_EN_NAMES[match.name]||match.name,unit:match.name}));ug.innerHTML=photos.map((p,i)=>'<button type="button" data-i="'+i+'" aria-label="Open photo '+(i+1)+' of '+photos.length+'"><img src="'+photoUrl(p.storage_path)+'" alt="'+(VM_EN_NAMES[match.name]||match.name)+' — photo '+(i+1)+'"></button>').join("");ug.querySelectorAll("button").forEach(b=>b.onclick=()=>vmEnLightbox(images,+b.dataset.i))}}
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
 if(sel){const requested=new URLSearchParams(location.search).get("unit");const isRequested=u=>!!requested&&(requested===slugs[u.name]||requested===u.name);const ordered=[...units].sort((a,b)=>{const am=isRequested(a),bm=isRequested(b);if(am&&!bm)return -1;if(bm&&!am)return 1;return (VM_EN_NAMES[a.name]||a.name).localeCompare(VM_EN_NAMES[b.name]||b.name,"en")});sel.innerHTML=ordered.map((u,i)=>'<option value="'+u.name+'"'+(i===0?' selected':'')+'>'+(VM_EN_NAMES[u.name]||u.name)+'</option>').join("");if(requested){sel.disabled=true;sel.setAttribute("aria-readonly","true");const hidden=document.createElement("input");hidden.type="hidden";hidden.name="unit";hidden.value=ordered[0]?.name||requested;sel.removeAttribute("name");sel.after(hidden);}const arrival=document.querySelector('#checkout-form [name="arrival"]'),departure=document.querySelector('#checkout-form [name="departure"]');const paintSelection=()=>{const u=units.find(x=>x.name===sel.value),title=document.getElementById("payment-unit-title"),photo=document.querySelector(".payment-unit-photo"),dates=document.getElementById("summary-dates"),nights=document.getElementById("summary-nights");if(title)title.textContent=u?(VM_EN_NAMES[u.name]||u.name):"";if(photo)photo.innerHTML=u&&u.photos&&u.photos[0]?'<img src="'+photoUrl(u.photos[0].storage_path)+'" alt="'+(VM_EN_NAMES[u.name]||u.name)+'">':"";if(dates){const a=arrival?.value,d=departure?.value;dates.textContent=a&&d?a.split("-").reverse().join(".")+" – "+d.split("-").reverse().join("."):"—"}if(nights){const a=arrival?.value,d=departure?.value,ms=a&&d?Date.parse(d+"T00:00:00Z")-Date.parse(a+"T00:00:00Z"):0,n=ms>0?Math.round(ms/86400000):0;nights.textContent=n?n+" "+(n===1?"night":"nights"):"—"}};sel.addEventListener("change",paintSelection);arrival?.addEventListener("change",paintSelection);departure?.addEventListener("change",paintSelection);paintSelection();}
}
{const menuButton=document.querySelector(".menu-toggle"),menu=document.querySelector(".main-nav");if(menuButton){menuButton.setAttribute("aria-expanded","false");menuButton.addEventListener("click",()=>{const open=document.body.classList.toggle("mobile-open");menuButton.setAttribute("aria-expanded",String(open));});menu?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{document.body.classList.remove("mobile-open");menuButton.setAttribute("aria-expanded","false");}));}}
function vmDateLogic(form){if(!form)return;const a=form.querySelector('[name="arrival"],[name="checkin"]'),d=form.querySelector('[name="departure"],[name="checkout"]');if(!a||!d)return;const now=new Date(),today=now.getFullYear()+"-"+String(now.getMonth()+1).padStart(2,"0")+"-"+String(now.getDate()).padStart(2,"0");a.min=today;const sync=()=>{if(!a.value){d.min=today;return}const x=new Date(a.value+"T00:00:00");x.setDate(x.getDate()+1);const min=x.getFullYear()+"-"+String(x.getMonth()+1).padStart(2,"0")+"-"+String(x.getDate()).padStart(2,"0");d.min=min;if(d.value&&d.value<min)d.value=""};a.addEventListener("change",sync);sync();}
document.querySelectorAll("#booking-form,#checkout-form,#inquiry-form").forEach(vmDateLogic);
function vmPreserveSearchInUnitBooking(){const q=new URLSearchParams(location.search);if(!q.get("arrival")||!q.get("departure"))return;document.querySelectorAll('a[href*="/en/booking/"]').forEach(a=>{const u=new URL(a.href,location.origin);["arrival","departure","adults","children","prechecked"].forEach(k=>{if(q.has(k))u.searchParams.set(k,q.get(k))});a.href=u.pathname+"?"+u.searchParams.toString();if(a.classList.contains("gold-btn")&&(a.closest(".gallery-availability")||a.classList.contains("lb-availability")))a.textContent="Book"})}
function vmApplyQueryDates(form){if(!form)return;const q=new URLSearchParams(location.search),a=form.querySelector('[name="arrival"]'),d=form.querySelector('[name="departure"]'),today=a?.min||"";let av=q.get("arrival")||"",dv=q.get("departure")||"";if(av&&today&&av<today)av="";if(av)a.value=av;a?.dispatchEvent(new Event("change"));if(dv&&d?.min&&dv<d.min)dv="";if(dv)d.value=dv;}
vmApplyQueryDates(document.getElementById("checkout-form"));vmPreserveSearchInUnitBooking();
const checkout=document.getElementById("checkout-form");
checkout?.addEventListener("submit",async e=>{e.preventDefault();const f=new FormData(e.currentTarget),a=f.get("arrival"),d=f.get("departure"),unit=f.get("unit"),s=document.getElementById("payment-status"),q=new URLSearchParams(location.search),g=Math.max(1,Number(q.get("adults")||1)+Number(q.get("children")||0));if(!a||!d||!unit||!f.get("name")||!f.get("email")){s.textContent="Please complete all required fields.";return}if(d<=a){s.textContent="Departure must be after arrival.";return}if(!db){s.textContent="Availability cannot be verified right now. Payment has not started.";return}s.textContent="Verifying your locked reservation…";let hold=null;try{hold=JSON.parse(sessionStorage.getItem("vm_booking_hold")||"null")}catch(_e){};const adults=Number(q.get("adults")||1),children=Number(q.get("children")||0);const {data:validHold,error}=await window.VMValidateBookingHold(db,hold,a,d,adults,children,unit);const ok=!error&&validHold?.length&&validHold[0].valid===true;if(!ok){s.textContent=error?"The reservation cannot be safely verified right now. Payment has not started.":"Your temporary accommodation hold has expired or is no longer valid. Please check availability again.";return}s.textContent="Availability confirmed. Online card payment is not active yet. No reservation has been charged or submitted.";});
document.getElementById("inquiry-form")?.addEventListener("submit",async e=>{e.preventDefault();const f=e.currentTarget,d=new FormData(f),s=document.getElementById("form-status"),b=f.querySelector('button[type="submit"]'),ci=d.get("checkin"),co=d.get("checkout");if(ci&&co&&co<=ci){s.textContent="Departure must be after arrival.";return}if(!db){s.textContent="The enquiry service is temporarily unavailable.";return}b.disabled=true;s.textContent="Sending enquiry…";const {error}=await db.from("contact_inquiries").insert({name:(d.get("name")||"").trim(),email:(d.get("email")||"").trim()||null,phone:(d.get("phone")||"").trim()||null,message:(d.get("message")||"").trim(),desired_check_in:ci||null,desired_check_out:co||null,guests:d.get("guests")?Number(d.get("guests")):null});s.textContent=error?"Your enquiry could not be sent. Please try again.":"Thank you. Your enquiry has been sent.";if(!error)f.reset();b.disabled=false;});
loadEnglish();

function vmEnLightbox(images,start=0){
 if(!images.length)return;let i=start;
 const box=document.createElement("div");box.className="lightbox";box.setAttribute("role","dialog");box.setAttribute("aria-modal","true");box.setAttribute("aria-label","Photo gallery");box.innerHTML='<button type="button" class="lb-prev" aria-label="Previous photo">‹</button><figure><img alt=""><figcaption></figcaption></figure><button type="button" class="lb-next" aria-label="Next photo">›</button><button type="button" class="lb-close" aria-label="Close gallery">×</button>';
 const img=box.querySelector("img"),cap=box.querySelector("figcaption");
 const previousFocus=document.activeElement;const close=()=>{box.remove();document.body.style.overflow="";if(previousFocus&&previousFocus.focus)previousFocus.focus()};
 const paint=()=>{const x=images[i],label=x.alt||"Apartments Via Mare",slug=x.unit?VM_EN_SLUGS[x.unit]:"";img.src=x.src;img.alt=label+" — photo "+(i+1)+" of "+images.length;cap.innerHTML='<span>'+label+' · '+(i+1)+' / '+images.length+'</span>'+(slug?'<a class="gold-btn lb-availability" href="'+VM_EN_BASE+slug+'/">View apartment</a>':'')};
 box.querySelector(".lb-prev").onclick=()=>{i=(i-1+images.length)%images.length;paint()};
 box.querySelector(".lb-next").onclick=()=>{i=(i+1)%images.length;paint()};
 box.querySelector(".lb-close").onclick=close;box.onclick=e=>{if(e.target===box)close()};
 document.addEventListener("keydown",function key(e){if(!box.isConnected){document.removeEventListener("keydown",key);return}if(e.key==="Escape")close();if(e.key==="ArrowLeft")box.querySelector(".lb-prev").click();if(e.key==="ArrowRight")box.querySelector(".lb-next").click()});
 document.body.appendChild(box);document.body.style.overflow="hidden";box.querySelector(".lb-close").focus();paint();
}

document.getElementById("booking-form")?.addEventListener("submit",async e=>{e.preventDefault();const f=new FormData(e.currentTarget),a=f.get("arrival")||"",d=f.get("departure")||"",ad=Number(f.get("adults")||0),ch=Number(f.get("children")||0),g=ad+ch,r=document.getElementById("booking-result");if(!r)return;if(!a||!d||d<=a){r.innerHTML=`<p class="booking-message">Departure must be after arrival.</p>`;return}if(!db){r.innerHTML=`<p class="booking-message">Availability search is temporarily unavailable.</p>`;return}r.innerHTML=`<p class="booking-message">Checking available apartments…</p>`;const {data:free,error}=await window.VMSearchAvailability(db,a,d,g);if(error){r.innerHTML=`<p class="booking-message">Availability search is temporarily unavailable. Please try again.</p>`;return}if(!free?.length){r.innerHTML=`<p class="booking-message"><b>No apartments are available</b> for the selected dates and ${g} guests.</p>`;return}const cards=free.map(x=>{const u=englishUnits.find(v=>v.id===x.unit_type_id)||englishUnits.find(v=>v.name===x.name),photo=u?.photos?.[0]?photoUrl(u.photos[0].storage_path):"",name=VM_EN_NAMES[x.name]||x.name,q=new URLSearchParams({arrival:a,departure:d,adults:String(ad),children:String(ch)}),url=VM_EN_BASE+x.slug+"/?"+q.toString();return `<article class="availability-card">${photo?`<a href="${url}"><img src="${photo}" alt="${name}"></a>`:""}<div><h3><a href="${url}">${name}</a></h3><p>Up to ${x.max_guests} guests · ${x.available_units} available units</p><a class="gold-btn" href="${url}">View apartment</a></div></article>`}).join("");r.innerHTML=`<div class="availability-head"><h2>Available apartments</h2><p>${a} — ${d} · ${g} guests</p></div><div class="availability-results">${cards}</div>`;});

(function syncLanguageCounterpart(){
 const a=document.querySelector(".vm-language-switch a:not(.active)");if(!a)return;
 const path=location.pathname.replace(/\/+$/,"");
 const slug=(path.split("/en/")[1]||"").split("/")[0];
 const map={about:"o-nama",accommodation:"smestaj",gallery:"galerija",beaches:"plaze",buljarica:"buljarica",contact:"kontakt",booking:"placanje","standard-triple-studio":"standard-triple-studio","triple-studio-with-balcony":"triple-studio-with-balcony","triple-studio-with-sea-view":"triple-studio-with-sea-view","standard-one-bedroom-apartment":"standard-one-bedroom-apartment","one-bedroom-apartment-with-balcony":"one-bedroom-apartment-with-balcony","one-bedroom-apartment-with-sea-view":"one-bedroom-apartment-with-sea-view","apartment-with-sea-view-attic":"apartment-with-sea-view-attic"};
 const base=VM_EN_BASE.replace(/en\/$/,"");a.href=base+(map[slug]?map[slug]+"/":"")+(slug==="booking"?location.search:"");
})();
