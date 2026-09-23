const SUPABASE_URL='https://arcjsoupsfdoosspfgvb.supabase.co';
const SUPABASE_KEY='sb_publishable_EfnLnRBdRqQ6JQHQdnxWIg_WUifgMhr';
const db=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
const photoUrl=p=>SUPABASE_URL+'/storage/v1/object/public/accommodation-photos/'+p.split('/').map(encodeURIComponent).join('/');
async function loadUnits(){
 const el=document.getElementById('unit-grid');
 const {data,error}=await db.from('unit_types').select('id,name,description,max_guests,slug,photos(storage_path,alt_text,sort_order)').eq('active',true).order('name');
 if(error){el.innerHTML='<div class="loading">Smeštaj će biti prikazan čim unesemo podatke.</div>';return}
 if(!data.length){el.innerHTML='<div class="loading">Pripremamo ponudu smeštaja i fotografije.</div>';return}
 el.innerHTML=data.map(u=>{
   const photos=(u.photos||[]).sort((a,b)=>(a.sort_order||0)-(b.sort_order||0));
   const first=photos[0];
   const image=first?'<img class="unit-photo" src="'+photoUrl(first.storage_path)+'" alt="'+(first.alt_text||u.name)+'" loading="lazy">':'<div class="card-image">Fotografija</div>';
   return '<article class="card"><div class="card-image">'+image+'</div><div class="card-body"><h3>'+u.name+'</h3><p>'+(u.description||'')+'</p><small>Do '+u.max_guests+' gostiju · '+photos.length+' fotografija</small></div></article>'
 }).join('')
}
document.getElementById('inquiry-form').addEventListener('submit',async e=>{e.preventDefault();const f=new FormData(e.target),s=document.getElementById('form-status');s.textContent='Slanje…';const {error}=await db.from('contact_inquiries').insert({name:f.get('name'),email:f.get('email')||null,message:f.get('message'),desired_check_in:f.get('checkin')||null,desired_check_out:f.get('checkout')||null,guests:Number(f.get('guests'))||null});if(error){s.textContent='Upit trenutno nije poslat. Pokušajte ponovo.';return}s.textContent='Hvala. Vaš upit je poslat.';e.target.reset()});
loadUnits();