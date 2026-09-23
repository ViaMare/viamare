const SUPABASE_URL='https://arcjsoupsfdoosspfgvb.supabase.co';
const SUPABASE_KEY='sb_publishable_EfnLnRBdRqQ6JQHQdnxWIg_WUifgMhr';
const db=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
const ADMIN='viamarebuljarice@gmail.com';
const login=document.getElementById('login'),dash=document.getElementById('dashboard'),statusEl=document.getElementById('login-status');
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
async function showSession(session){
 const email=session?.user?.email||'';
 if(email.toLowerCase()!==ADMIN){if(session)await db.auth.signOut();login.classList.remove('hidden');dash.classList.add('hidden');return}
 login.classList.add('hidden');dash.classList.remove('hidden');document.getElementById('who').textContent=email;await loadDashboard();
}
async function loadDashboard(){
 const [u,r,c,q]=await Promise.all([
  db.from('units').select('id,name,internal_code,active,external_ids').order('internal_code'),
  db.from('reservations').select('id',{count:'exact',head:true}),
  db.from('channel_connections').select('id,provider,status'),
  db.from('contact_inquiries').select('id,name,email,desired_check_in,desired_check_out,guests,status,created_at').order('created_at',{ascending:false}).limit(50)
 ]);
 document.getElementById('s-units').textContent=u.data?.length??'—';
 document.getElementById('s-res').textContent=r.count??'—';
 document.getElementById('s-channel').textContent=c.data?.length?c.data.length:'0';
 document.getElementById('s-inq').textContent=q.data?.length??'—';
 document.getElementById('inquiries-body').innerHTML=(q.data||[]).map(x=>'<tr><td>'+esc(x.created_at?new Date(x.created_at).toLocaleDateString('sr-RS'):'')+'</td><td>'+esc(x.name)+'</td><td>'+esc(x.email)+'</td><td>'+esc(x.desired_check_in||'')+' – '+esc(x.desired_check_out||'')+'</td><td>'+esc(x.guests||'')+'</td><td>'+esc(x.status||'novo')+'</td></tr>').join('')||'<tr><td colspan="6">Još nema upita.</td></tr>';
 document.getElementById('units-body').innerHTML=(u.data||[]).map(x=>'<tr><td>'+esc(x.name)+'</td><td>'+esc(x.internal_code)+'</td><td>'+esc(x.external_ids?.floor||'')+'</td><td>'+(x.active?'Aktivan':'Neaktivan')+'</td></tr>').join('');
 document.getElementById('reservations-note').textContent=(r.count||0)?'U bazi postoji '+r.count+' rezervacija.':'Još nema rezervacija u bazi.';
 document.getElementById('channel-note').textContent=c.data?.length?c.data.map(x=>x.provider+' — '+x.status).join(', '):'Channel manager još nije povezan.';
}
document.getElementById('login-form').addEventListener('submit',async e=>{e.preventDefault();statusEl.textContent='Prijavljivanje…';const f=new FormData(e.target);const email=String(f.get('email')).trim().toLowerCase();if(email!==ADMIN){statusEl.textContent='Ovaj nalog nema administratorski pristup.';return}const {data,error}=await db.auth.signInWithPassword({email,password:String(f.get('password'))});if(error){statusEl.textContent='Prijava nije uspela. Proverite e-mail/lozinku i da li je nalog kreiran u Supabase Auth.';return}statusEl.textContent='';await showSession(data.session)});
const signupBtn=document.getElementById('create-admin');
if(signupBtn) signupBtn.onclick=async()=>{const form=document.getElementById('login-form');const f=new FormData(form);const email=String(f.get('email')).trim().toLowerCase(),password=String(f.get('password'));if(email!==ADMIN){statusEl.textContent='Administratorski nalog mora biti '+ADMIN;return}if(password.length<8){statusEl.textContent='Lozinka mora imati najmanje 8 znakova.';return}statusEl.textContent='Kreiranje naloga…';const {data,error}=await db.auth.signUp({email,password});if(error){statusEl.textContent=error.message;return}statusEl.textContent=data.session?'Admin nalog je kreiran i prijavljen.':'Nalog je kreiran. Otvorite potvrdu koja je poslata na '+ADMIN+', zatim se prijavite.';if(data.session)await showSession(data.session)};
document.getElementById('logout').onclick=async()=>{await db.auth.signOut();location.reload()};
db.auth.getSession().then(({data})=>showSession(data.session));
