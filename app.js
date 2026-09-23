const SUPABASE_URL='https://arcjsoupsfdoosspfgvb.supabase.co';
const SUPABASE_KEY='sb_publishable_EfnLnRBdRqQ6JQHQdnxWIg_WUifgMhr';
const db=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
const photoUrl=p=>SUPABASE_URL+'/storage/v1/object/public/accommodation-photos/'+p.split('/').map(encodeURIComponent).join('/');
let units=[];
function esc(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
async function loadUnits(){
 const el=document.getElementById('unit-grid');
 const {data,error}=await db.from('unit_types').select('id,name,description,max_guests,slug,photos(storage_path,alt_text,sort_order)').eq('active',true).order('name');
 if(error){el.innerHTML='<div class="loading">Smeštaj trenutno nije moguće učitati.</div>';return}
 units=(data||[]).map(u=>({...u,photos:(u.photos||[]).sort((a,b)=>(a.sort_order||0)-(b.sort_order||0))}));
 el.innerHTML=units.map((u,i)=>{const p=u.photos[0];const pic=p?'<img class="unit-photo" src="'+photoUrl(p.storage_path)+'" alt="'+esc(p.alt_text||u.name)+'" loading="lazy">':'Fotografija';return '<article class="card"><button class="photo-open" data-gallery="'+i+'" type="button"><div class="card-image">'+pic+'<span class="photo-count">'+u.photos.length+' fotografija</span></div></button><div class="card-body"><h3>'+esc(u.name)+'</h3><p>'+esc(u.description)+'</p><small>Do '+u.max_guests+' gostiju</small><button class="gallery-link" data-gallery="'+i+'" type="button">Pogledajte galeriju</button></div></article>'}).join('');
 document.querySelectorAll('[data-gallery]').forEach(b=>b.onclick=()=>openGallery(Number(b.dataset.gallery)));
 renderMainGallery();
}
function renderMainGallery(){const g=document.getElementById('main-gallery');if(!g)return;g.innerHTML=units.map((u,i)=>{const p=u.photos[0];if(!p)return '';return '<button type="button" class="main-gallery-item" data-main-gallery="'+i+'"><img src="'+photoUrl(p.storage_path)+'" alt="'+esc(u.name)+'" loading="lazy"><span>'+esc(u.name)+'</span></button>'}).join('');g.querySelectorAll('[data-main-gallery]').forEach(b=>b.onclick=()=>openGallery(Number(b.dataset.mainGallery)));}
function openGallery(i){
 const u=units[i];if(!u||!u.photos.length)return;let n=0;
 const box=document.createElement('div');box.className='lightbox';
 box.innerHTML='<button class="lb-close" type="button">×</button><button class="lb-prev" type="button">‹</button><div class="lb-frame"><img class="lb-img"><div class="lb-caption"></div></div><button class="lb-next" type="button">›</button>';
 document.body.appendChild(box);document.body.classList.add('no-scroll');
 const img=box.querySelector('.lb-img'),cap=box.querySelector('.lb-caption');
 function show(){const p=u.photos[n];img.src=photoUrl(p.storage_path);img.alt=p.alt_text||u.name;cap.textContent=u.name+' · '+(n+1)+' / '+u.photos.length}
 function close(){box.remove();document.body.classList.remove('no-scroll')}
 box.querySelector('.lb-close').onclick=close;box.querySelector('.lb-prev').onclick=()=>{n=(n+u.photos.length-1)%u.photos.length;show()};box.querySelector('.lb-next').onclick=()=>{n=(n+1)%u.photos.length;show()};box.onclick=e=>{if(e.target===box)close()};show();
}
document.getElementById('availability-form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target),a=f.get('arrival'),d=f.get('departure'),g=Number(f.get('guests')),r=document.getElementById('availability-result');if(!a||!d||d<=a){r.innerHTML='<div class="availability-note">Datum odlaska mora biti posle datuma dolaska.</div>';return}r.innerHTML='<div class="availability-note"><strong>Upit je spreman.</strong><br>Dolazak: '+a+' · Odlazak: '+d+' · '+g+' gostiju.<br><br>Raspoloživost i cena još nisu prikazane jer Via Mare channel manager još nije povezan. Time izbegavamo netačne podatke i duple rezervacije.</div>'});
document.getElementById('inquiry-form').addEventListener('submit',async e=>{e.preventDefault();const f=new FormData(e.target),s=document.getElementById('form-status');s.textContent='Slanje…';const {error}=await db.from('contact_inquiries').insert({name:f.get('name'),email:f.get('email')||null,message:f.get('message'),desired_check_in:f.get('checkin')||null,desired_check_out:f.get('checkout')||null,guests:Number(f.get('guests'))||null});if(error){s.textContent='Upit trenutno nije poslat. Pokušajte ponovo.';return}s.textContent='Hvala. Vaš upit je poslat.';e.target.reset()});
loadUnits();