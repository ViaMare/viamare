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
function vmEnCheckoutAvailabilityGate(){
 const checkout=document.getElementById("checkout-form"),select=document.getElementById("payment-unit");if(!checkout||!select)return;const grid=checkout.closest(".checkout-grid"),aside=grid?.querySelector(".order-card"),q=new URLSearchParams(location.search),requested=q.get("unit")||"";checkout.hidden=true;if(aside)aside.hidden=true;
 const flow=document.createElement("div");flow.className="booking-flow";flow.innerHTML='<form id="checkout-availability-form" class="checkout-card"><span class="kicker">STEP 1</span><h2>Check availability</h2><p>Enter your dates and guest numbers. We will show only accommodation that is available and suitable for your party.</p><div class="stay-dates"><label><span>Arrival</span><input name="arrival" type="date" required></label><label><span>Departure</span><input name="departure" type="date" required></label></div><label><span>Adults</span><select name="adults" required><option>1</option><option selected>2</option><option>3</option><option>4</option></select></label><label><span>Children</span><select name="children" required><option selected>0</option><option>1</option><option>2</option><option>3</option></select></label><button class="gold-btn" type="submit">Check availability</button><p class="availability-gate-status" aria-live="polite"></p></form><section class="availability-results" hidden><span class="kicker">STEP 2</span><h2>Available accommodation</h2><div class="availability-results-grid"></div><button type="button" class="gold-btn change-search">Change search</button></section>';grid.before(flow);grid.hidden=true;
 const gate=flow.querySelector("form"),results=flow.querySelector(".availability-results"),cards=flow.querySelector(".availability-results-grid"),status=flow.querySelector(".availability-gate-status"),ga=gate.querySelector('[name="arrival"]'),gd=gate.querySelector('[name="departure"]'),gad=gate.querySelector('[name="adults"]'),gch=gate.querySelector('[name="children"]');if(q.get("arrival"))ga.value=q.get("arrival");if(q.get("departure"))gd.value=q.get("departure");if(q.get("adults"))gad.value=q.get("adults");if(q.get("children"))gch.value=q.get("children");vmDateLogic(gate);
 const choose=(unit,a,d,ad,ch)=>{checkout.querySelectorAll('input[type="hidden"][name="unit"]').forEach(x=>x.remove());let h=document.createElement("input");h.type="hidden";h.name="unit";h.value=unit;h.dataset.verifiedUnit="1";checkout.append(h);select.removeAttribute("name");select.value=unit;select.disabled=true;const ca=checkout.querySelector('[name="arrival"]'),cd=checkout.querySelector('[name="departure"]');ca.value=a;cd.value=d;ca.readOnly=true;cd.readOnly=true;document.getElementById("summary-adults").textContent=ad;document.getElementById("summary-children").textContent=ch;flow.hidden=true;grid.hidden=false;checkout.hidden=false;if(aside)aside.hidden=false;const u=new URL(location.href);Object.entries({unit,arrival:a,departure:d,adults:ad,children:ch}).forEach(([k,v])=>u.searchParams.set(k,v));history.replaceState(null,"",u.pathname+"?"+u.searchParams.toString());select.dispatchEvent(new Event("change"));ca.dispatchEvent(new Event("change"));grid.scrollIntoView({behavior:"smooth",block:"start"})};
 gate.addEventListener("submit",async e=>{e.preventDefault();const a=ga.value,d=gd.value,ad=Number(gad.value),ch=Number(gch.value),g=ad+ch;if(!a||!d||d<=a||g<1){status.textContent="Please check the dates and guest numbers.";return}if(!db){status.textContent="Availability cannot be checked right now.";return}status.textContent="Checking availability…";const {data:free,error}=await db.rpc("search_availability",{p_check_in:a,p_check_out:d,p_guests:g});if(error){status.textContent="Availability cannot be checked right now.";return}if(!free?.length){status.textContent="No accommodation is available for the selected dates and guest numbers.";results.hidden=true;return}status.textContent="";let list=[...free];if(requested)list.sort((x,y)=>((x.name===requested||slugs[x.name]===requested)?-1:0)-((y.name===requested||slugs[y.name]===requested)?-1:0));cards.innerHTML=list.map(x=>{const u=units.find(v=>v.name===x.name),photo=u?.photos?.[0]?photoUrl(u.photos[0].storage_path):"",name=VM_EN_NAMES[x.name]||x.name;return '<article class="availability-card">'+(photo?'<img src="'+photo+'" alt="'+name+'">':'')+'<div><h3>'+name+'</h3><p>Up to '+x.max_guests+' guests · available units: '+x.available_units+'</p><button type="button" class="gold-btn choose-unit" data-unit="'+x.name.replace(/"/g,"&quot;")+'">Select</button></div></article>'}).join("");cards.querySelectorAll(".choose-unit").forEach(btn=>btn.onclick=()=>choose(btn.dataset.unit,a,d,String(ad),String(ch)));gate.hidden=true;results.hidden=false;results.scrollIntoView({behavior:"smooth",block:"start"})});
 flow.querySelector(".change-search").onclick=()=>{results.hidden=true;gate.hidden=false;gate.scrollIntoView({behavior:"smooth",block:"start"})};const back=document.getElementById("booking-change-selection");if(back)back.onclick=()=>{grid.hidden=true;checkout.hidden=true;if(aside)aside.hidden=true;flow.hidden=false;results.hidden=true;gate.hidden=false;gate.scrollIntoView({behavior:"smooth",block:"start"})};
}
async function loadEnglish(){
 if(!db){const g=document.getElementById("unit-grid"),pg=document.getElementById("full-gallery"),sel=document.getElementById("payment-unit");if(g)g.innerHTML='<p class="loading">Accommodation cannot be loaded at the moment. Please try again.</p>';if(pg)pg.innerHTML='<p class="loading">The gallery cannot be loaded at the moment. Please try again.</p>';if(sel)sel.disabled=true;return;}
 const {data,error}=await db.from("unit_types").select("id,name,description,max_guests,photos(storage_path,sort_order)").eq("active",true).order("name");
 if(error||!data){console.error("Via Mare unit_types:",error);const g=document.getElementById("unit-grid"),pg=document.getElementById("full-gallery"),sel=document.getElementById("payment-unit");if(g)g.innerHTML='<p class="loading">Accommodation cannot be loaded at the moment. Please try again.</p>';if(pg)pg.innerHTML='<p class="loading">The gallery cannot be loaded at the moment. Please try again.</p>';if(sel)sel.disabled=true;return;}
 const units=(data||[]).map(u=>({...u,photos:cleanEnglishPhotos(u)})); englishUnits=units;
 const hero=document.getElementById("hero-media");
 if(hero){const hp=units.flatMap(u=>(u.photos||[]).map(p=>({u,p})))[0];if(hp)hero.innerHTML='<img src="'+photoUrl(hp.p.storage_path)+'" alt="Apartments Via Mare">';}
 const slugs={"Standard Triple Studio":"standard-triple-studio","Triple Studio with Balcony":"triple-studio-with-balcony","Triple Studio with Sea View":"triple-studio-with-sea-view","Standard One Bedroom Apartment":"standard-one-bedroom-apartment","One-Bedroom Apartment with Balcony":"one-bedroom-apartment-with-balcony","One-Bedroom Apartment with Sea View":"one-bedroom-apartment-with-sea-view","Apartment with Sea View - (Attic)":"apartment-with-sea-view-attic"};
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
 if(sel){const requested=new URLSearchParams(location.search).get("unit");const isRequested=u=>!!requested&&(requested===slugs[u.name]||requested===u.name);const ordered=[...units].sort((a,b)=>{const am=isRequested(a),bm=isRequested(b);if(am&&!bm)return -1;if(bm&&!am)return 1;return (VM_EN_NAMES[a.name]||a.name).localeCompare(VM_EN_NAMES[b.name]||b.name,"en")});sel.innerHTML=ordered.map((u,i)=>'<option value="'+u.name+'"'+(i===0?' selected':'')+'>'+(VM_EN_NAMES[u.name]||u.name)+'</option>').join("");if(requested){sel.disabled=true;sel.setAttribute("aria-readonly","true");const hidden=document.createElement("input");hidden.type="hidden";hidden.name="unit";hidden.value=ordered[0]?.name||requested;sel.removeAttribute("name");sel.after(hidden);}const arrival=document.querySelector('#checkout-form [name="arrival"]'),departure=document.querySelector('#checkout-form [name="departure"]');const paintSelection=()=>{const u=units.find(x=>x.name===sel.value),title=document.getElementById("payment-unit-title"),photo=document.querySelector(".payment-unit-photo"),dates=document.getElementById("summary-dates"),nights=document.getElementById("summary-nights");if(title)title.textContent=u?(VM_EN_NAMES[u.name]||u.name):"";if(photo)photo.innerHTML=u&&u.photos&&u.photos[0]?'<img src="'+photoUrl(u.photos[0].storage_path)+'" alt="'+(VM_EN_NAMES[u.name]||u.name)+'">':"";if(dates){const a=arrival?.value,d=departure?.value;dates.textContent=a&&d?a.split("-").reverse().join(".")+" – "+d.split("-").reverse().join("."):"—"}if(nights){const a=arrival?.value,d=departure?.value,ms=a&&d?Date.parse(d+"T00:00:00Z")-Date.parse(a+"T00:00:00Z"):0,n=ms>0?Math.round(ms/86400000):0;nights.textContent=n?n+" "+(n===1?"night":"nights"):"—"}};sel.addEventListener("change",paintSelection);arrival?.addEventListener("change",paintSelection);departure?.addEventListener("change",paintSelection);paintSelection();vmEnCheckoutAvailabilityGate();}
}
{const menuButton=document.querySelector(".menu-toggle"),menu=document.querySelector(".main-nav");if(menuButton){menuButton.setAttribute("aria-expanded","false");menuButton.addEventListener("click",()=>{const open=document.body.classList.toggle("mobile-open");menuButton.setAttribute("aria-expanded",String(open));});menu?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{document.body.classList.remove("mobile-open");menuButton.setAttribute("aria-expanded","false");}));}}
function vmDateLogic(form){if(!form)return;const a=form.querySelector('[name="arrival"],[name="checkin"]'),d=form.querySelector('[name="departure"],[name="checkout"]');if(!a||!d)return;const now=new Date(),today=now.getFullYear()+"-"+String(now.getMonth()+1).padStart(2,"0")+"-"+String(now.getDate()).padStart(2,"0");a.min=today;const sync=()=>{if(!a.value){d.min=today;return}const x=new Date(a.value+"T00:00:00");x.setDate(x.getDate()+1);const min=x.getFullYear()+"-"+String(x.getMonth()+1).padStart(2,"0")+"-"+String(x.getDate()).padStart(2,"0");d.min=min;if(d.value&&d.value<min)d.value=""};a.addEventListener("change",sync);sync();}
document.querySelectorAll("#booking-form,#checkout-form,#inquiry-form").forEach(vmDateLogic);
function vmPreserveSearchInUnitBooking(){const q=new URLSearchParams(location.search);if(!q.get("arrival")||!q.get("departure"))return;document.querySelectorAll('a[href*="/en/booking/"]').forEach(a=>{const u=new URL(a.href,location.origin);["arrival","departure","adults","children"].forEach(k=>{if(q.has(k))u.searchParams.set(k,q.get(k))});a.href=u.pathname+"?"+u.searchParams.toString();if(a.classList.contains("gold-btn")&&(a.closest(".gallery-availability")||a.classList.contains("lb-availability")))a.textContent="Book"})}
function vmApplyQueryDates(form){if(!form)return;const q=new URLSearchParams(location.search),a=form.querySelector('[name="arrival"]'),d=form.querySelector('[name="departure"]'),today=a?.min||"";let av=q.get("arrival")||"",dv=q.get("departure")||"";if(av&&today&&av<today)av="";if(av)a.value=av;a?.dispatchEvent(new Event("change"));if(dv&&d?.min&&dv<d.min)dv="";if(dv)d.value=dv;}
vmApplyQueryDates(document.getElementById("checkout-form"));vmPreserveSearchInUnitBooking();
const checkout=document.getElementById("checkout-form");
checkout?.addEventListener("submit",async e=>{e.preventDefault();const f=new FormData(e.currentTarget),a=f.get("arrival"),d=f.get("departure"),unit=f.get("unit"),s=document.getElementById("payment-status"),q=new URLSearchParams(location.search),g=Math.max(1,Number(q.get("adults")||1)+Number(q.get("children")||0));if(!a||!d||!unit||!f.get("name")||!f.get("email")){s.textContent="Please complete all required fields.";return}if(d<=a){s.textContent="Departure must be after arrival.";return}if(!db){s.textContent="Availability cannot be verified right now. Payment has not started.";return}s.textContent="Checking availability again…";const {data:free,error}=await db.rpc("search_availability",{p_check_in:a,p_check_out:d,p_guests:g});const ok=!error&&(free||[]).some(x=>x.name===unit&&Number(x.available_units)>0);if(!ok){s.textContent=error?"Availability cannot be verified right now. Payment has not started.":"The selected accommodation is no longer available for these dates. Please return to the availability search.";return}s.textContent="Availability confirmed. Online card payment is not active yet. No reservation has been charged or submitted.";});
document.getElementById("inquiry-form")?.addEventListener("submit",async e=>{e.preventDefault();const f=e.currentTarget,d=new FormData(f),s=document.getElementById("form-status"),b=f.querySelector('button[type="submit"]'),ci=d.get("checkin"),co=d.get("checkout");if(ci&&co&&co<=ci){s.textContent="Departure must be after arrival.";return}if(!db){s.textContent="The enquiry service is temporarily unavailable.";return}b.disabled=true;s.textContent="Sending enquiry…";const {error}=await db.from("contact_inquiries").insert({name:(d.get("name")||"").trim(),email:(d.get("email")||"").trim()||null,phone:(d.get("phone")||"").trim()||null,message:(d.get("message")||"").trim(),desired_check_in:ci||null,desired_check_out:co||null,guests:d.get("guests")?Number(d.get("guests")):null});s.textContent=error?"Your enquiry could not be sent. Please try again.":"Thank you. Your enquiry has been sent.";if(!error)f.reset();b.disabled=false;});
loadEnglish();

function vmEnLightbox(images,start=0){
 if(!images.length)return;let i=start;
 const box=document.createElement("div");box.className="lightbox";box.setAttribute("role","dialog");box.setAttribute("aria-modal","true");box.setAttribute("aria-label","Photo gallery");box.innerHTML='<button type="button" class="lb-prev" aria-label="Previous photo">‹</button><figure><img alt=""><figcaption></figcaption></figure><button type="button" class="lb-next" aria-label="Next photo">›</button><button type="button" class="lb-close" aria-label="Close gallery">×</button>';
 const img=box.querySelector("img"),cap=box.querySelector("figcaption");
 const previousFocus=document.activeElement;const close=()=>{box.remove();document.body.style.overflow="";if(previousFocus&&previousFocus.focus)previousFocus.focus()};
 const paint=()=>{const x=images[i],label=x.alt||"Apartments Via Mare";img.src=x.src;img.alt=label+" — photo "+(i+1)+" of "+images.length;cap.innerHTML='<span>'+label+' · '+(i+1)+' / '+images.length+'</span>'+(x.unit?'<a class="gold-btn lb-availability" href="'+VM_EN_BASE+'booking/?unit='+encodeURIComponent(x.unit)+'">Check availability</a>':'')};
 box.querySelector(".lb-prev").onclick=()=>{i=(i-1+images.length)%images.length;paint()};
 box.querySelector(".lb-next").onclick=()=>{i=(i+1)%images.length;paint()};
 box.querySelector(".lb-close").onclick=close;box.onclick=e=>{if(e.target===box)close()};
 document.addEventListener("keydown",function key(e){if(!box.isConnected){document.removeEventListener("keydown",key);return}if(e.key==="Escape")close();if(e.key==="ArrowLeft")box.querySelector(".lb-prev").click();if(e.key==="ArrowRight")box.querySelector(".lb-next").click()});
 document.body.appendChild(box);document.body.style.overflow="hidden";box.querySelector(".lb-close").focus();paint();
}

document.getElementById("booking-form")?.addEventListener("submit",async e=>{e.preventDefault();const f=new FormData(e.currentTarget),a=f.get("arrival")||"",d=f.get("departure")||"",ad=Number(f.get("adults")||0),ch=Number(f.get("children")||0),g=ad+ch,r=document.getElementById("booking-result");if(!r)return;if(!a||!d||d<=a){r.innerHTML=`<p class="booking-message">Departure must be after arrival.</p>`;return}if(!db){r.innerHTML=`<p class="booking-message">Availability search is temporarily unavailable.</p>`;return}r.innerHTML=`<p class="booking-message">Checking available apartments…</p>`;const {data:free,error}=await db.rpc("search_availability",{p_check_in:a,p_check_out:d,p_guests:g});if(error){r.innerHTML=`<p class="booking-message">Availability search is temporarily unavailable. Please try again.</p>`;return}if(!free?.length){r.innerHTML=`<p class="booking-message"><b>No apartments are available</b> for the selected dates and ${g} guests.</p>`;return}const cards=free.map(x=>{const u=englishUnits.find(v=>v.id===x.unit_type_id)||englishUnits.find(v=>v.name===x.name),photo=u?.photos?.[0]?photoUrl(u.photos[0].storage_path):"",name=VM_EN_NAMES[x.name]||x.name,q=new URLSearchParams({arrival:a,departure:d,adults:String(ad),children:String(ch)}),url=VM_EN_BASE+x.slug+"/?"+q.toString();return `<article class="availability-card">${photo?`<a href="${url}"><img src="${photo}" alt="${name}"></a>`:""}<div><h3><a href="${url}">${name}</a></h3><p>Up to ${x.max_guests} guests · ${x.available_units} available units</p><a class="gold-btn" href="${url}">View apartment</a></div></article>`}).join("");r.innerHTML=`<div class="availability-head"><h2>Available apartments</h2><p>${a} — ${d} · ${g} guests</p></div><div class="availability-results">${cards}</div>`;});

(function syncLanguageCounterpart(){
 const a=document.querySelector(".vm-language-switch a:not(.active)");if(!a)return;
 const path=location.pathname.replace(/\/+$/,"");
 const slug=(path.split("/en/")[1]||"").split("/")[0];
 const map={about:"o-nama",accommodation:"smestaj",gallery:"galerija",beaches:"plaze",buljarica:"buljarica",contact:"kontakt",booking:"placanje","standard-triple-studio":"standard-triple-studio","triple-studio-with-balcony":"triple-studio-with-balcony","triple-studio-with-sea-view":"triple-studio-with-sea-view","standard-one-bedroom-apartment":"standard-one-bedroom-apartment","one-bedroom-apartment-with-balcony":"one-bedroom-apartment-with-balcony","one-bedroom-apartment-with-sea-view":"one-bedroom-apartment-with-sea-view","apartment-with-sea-view-attic":"apartment-with-sea-view-attic"};
 const base=VM_EN_BASE.replace(/en\/$/,"");a.href=base+(map[slug]?map[slug]+"/":"")+(slug==="booking"?location.search:"");
})();
