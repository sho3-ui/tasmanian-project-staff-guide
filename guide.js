const dialog=document.querySelector('#image-dialog');
for(const b of document.querySelectorAll('[data-image]'))b.addEventListener('click',()=>{if(!dialog)return;dialog.querySelector('img').src=b.dataset.image;dialog.querySelector('img').alt=b.getAttribute('aria-label')||'画面例';dialog.showModal();});
document.querySelector('.close-dialog')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
function showPanel(id){const p=document.getElementById(id);if(!p)return;const section=p.closest('section');for(const sibling of section.querySelectorAll('.switch-panel'))sibling.hidden=sibling!==p;for(const b of section.querySelectorAll('[data-show]'))b.setAttribute('aria-selected',String(b.dataset.show===id));}
for(const b of document.querySelectorAll('[data-show]'))b.addEventListener('click',()=>showPanel(b.dataset.show));
for(const b of document.querySelectorAll('[data-next-panel]'))b.addEventListener('click',()=>{showPanel(b.dataset.nextPanel);document.querySelector('#key .switcher')?.scrollIntoView({block:'start',behavior:'smooth'});});
document.querySelector('#print')?.addEventListener('click',()=>window.print());
document.querySelector('.backtop')?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
const chapters=[...document.querySelectorAll('.chapter')],nav=[...document.querySelectorAll('.sidebar nav a')];
if(chapters.length){let queued=false;const update=()=>{queued=false;const mark=scrollY+(innerWidth<=900?160:135);const current=chapters.filter(c=>c.offsetTop<=mark).at(-1)||chapters[0];for(const a of nav)a.classList.toggle('active',a.hash==='#'+current.id);};addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(update);}},{passive:true});addEventListener('resize',update);update();}
document.addEventListener('keydown',e=>{if(dialog?.open||e.ctrlKey||e.metaKey||e.altKey||!['ArrowLeft','ArrowRight'].includes(e.key))return;if(['INPUT','TEXTAREA','BUTTON'].includes(document.activeElement?.tagName))return;const i=nav.findIndex(a=>a.classList.contains('active')),next=nav[i+(e.key==='ArrowRight'?1:-1)];if(next){e.preventDefault();next.click();}});
