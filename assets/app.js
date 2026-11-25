(()=>{
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
// reveal + counters
const count=el=>{const n=+el.dataset.count;if(RM){el.textContent=n;return}const t0=performance.now(),d=1100;
 const step=t=>{const k=Math.min((t-t0)/d,1);el.textContent=Math.round(n*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(step)};el.textContent='0';requestAnimationFrame(step)};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target;t.classList.add('in');t.querySelectorAll('[data-count]').forEach(count);io.unobserve(t)}),{rootMargin:'0px 0px -8% 0px',threshold:.08});
document.querySelectorAll('.reveal').forEach((el,i)=>{if(el.classList.contains('card'))el.style.transitionDelay=(i%4)*70+'ms';io.observe(el)});
// progress + active nav
const bar=document.querySelector('.progress i'),links=[...document.querySelectorAll('.links a')];
const onScroll=()=>{const h=document.documentElement;bar.style.setProperty('--p',h.scrollTop/((h.scrollHeight-h.clientHeight)||1))};
addEventListener('scroll',onScroll,{passive:true});onScroll();
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('active',a.hash==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('.game').forEach(s=>so.observe(s));
// tilt
if(fine&&!RM)document.querySelectorAll('.card-btn').forEach(c=>{
 c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.setProperty('--ry',x*10+'deg');c.style.setProperty('--rx',-y*10+'deg')});
 c.addEventListener('pointerleave',()=>{c.style.setProperty('--ry','0deg');c.style.setProperty('--rx','0deg')});
});
// filters
const fb=[...document.querySelectorAll('.filters button')];
fb.forEach(b=>b.addEventListener('click',()=>{const f=b.dataset.f;fb.forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b)});
 document.querySelectorAll('.card').forEach(c=>{const show=f==='all'||c.dataset.type===f;c.classList.toggle('hide',!show);if(show)c.classList.add('in')})}));
// lightbox
const lb=document.getElementById('lb'),li=lb.querySelector('img'),lc=lb.querySelector('figcaption');let cur=0,last=null;
const items=()=>[...document.querySelectorAll('.card:not(.hide) .card-btn')];
const show=i=>{const a=items();cur=(i+a.length)%a.length;const b=a[cur];li.src=b.dataset.full;li.alt=b.querySelector('img').alt;lc.textContent=b.dataset.cap};
const open=b=>{last=b;show(items().indexOf(b));lb.hidden=false;document.body.style.overflow='hidden';lb.querySelector('.lb-x').focus()};
const close=()=>{lb.hidden=true;document.body.style.overflow='';last&&last.focus()};
document.querySelectorAll('.card-btn').forEach(b=>b.addEventListener('click',()=>open(b)));
lb.querySelector('.lb-x').onclick=close;lb.querySelector('.prev').onclick=()=>show(cur-1);lb.querySelector('.next').onclick=()=>show(cur+1);
lb.addEventListener('click',e=>{if(e.target===lb)close()});
addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1);
 if(e.key==='Tab'){const f=[...lb.querySelectorAll('button')],i=f.indexOf(document.activeElement);e.preventDefault();f[(i+(e.shiftKey?-1:1)+f.length)%f.length].focus()}});
// particles
const cv=document.querySelector('.particles');
if(cv&&!RM){const x=cv.getContext('2d'),hero=cv.parentElement;let W,H,P=[],run=true,dpr=Math.min(devicePixelRatio||1,2);
 const cols=['#a78bfa','#ff4d8d','#22d3ee','#b6f24a'];
 const size=()=>{W=hero.clientWidth;H=hero.clientHeight;cv.width=W*dpr;cv.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0);
  const n=Math.min(70,Math.round(W*H/16000));P=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,r:Math.random()*1.6+.4,c:cols[Math.random()*4|0]}))};
 const tick=()=>{if(!run)return;x.clearRect(0,0,W,H);
  for(const p of P){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;x.globalAlpha=.8;x.fillStyle=p.c;x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill()}
  x.globalAlpha=1;x.lineWidth=.6;
  for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const a=P[i],b=P[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<110){x.strokeStyle=`rgba(167,139,250,${(1-d/110)*.18})`;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}}
  requestAnimationFrame(tick)};
 size();addEventListener('resize',size);
 new IntersectionObserver(([e])=>{const was=run;run=e.isIntersecting&&!document.hidden;if(run&&!was)tick()}).observe(hero);
 document.addEventListener('visibilitychange',()=>{const was=run;run=!document.hidden;if(run&&!was)tick()});
 tick();}
})();
