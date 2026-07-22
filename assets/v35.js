
(()=>{
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
// Architecture pattern recommender
const pf=$('[data-pattern-recommender]');
if(pf){
 const run=()=>{
  const f=new FormData(pf),fresh=f.get('freshness'),actions=f.get('actions'),verify=f.get('verification'),sens=f.get('sensitivity'),variation=f.get('variation'),approval=f.get('approval');
  let title='Deterministic workflow',copy='Use explicit orchestration and add AI only for bounded language interpretation.',controls=['Rules and schemas','Deterministic validation','Exception queue'];
  if(actions==='none'&&fresh==='retrieval'){title='Retrieval-augmented generation (RAG)';copy='Ground generation in approved current knowledge without granting action authority.';controls=['Retrieval evaluation','Citation fidelity','Freshness and access control'];}
  if(actions==='bounded'&&variation!=='high'){title='Tool-using workflow';copy='Use a deterministic workflow that calls a small approved toolset with validated inputs and outputs.';controls=['Tool allowlist','Typed arguments','Idempotency and approval gates','Execution traces'];}
  if(actions==='variable'&&verify!=='no'&&sens!=='high'&&approval!=='no'){title='Bounded supervised agent';copy='Allow dynamic planning inside explicit budgets, permissions, verification, and escalation boundaries.';controls=['Step and cost limits','Evaluator or deterministic verifier','Human escalation','Rollback and revocation'];}
  if(verify==='no'||(sens==='high'&&approval==='no')){title='Do not use autonomous execution yet';copy='The task lacks enough verification or oversight. Start with an assistant or read-only analysis pattern.';controls=['Add a verification checkpoint','Introduce human approval','Reduce data and action scope','Pilot in read-only mode'];}
  const o=$('[data-pattern-recommender-output]',pf); if(!o)return;
  $('h3',o).textContent=title; $('p',o).textContent=copy; $('ul',o).innerHTML=controls.map(x=>`<li>${x}</li>`).join('');
 };
 pf.addEventListener('change',run);run();
}
// Production readiness assessment
const rf=$('[data-readiness-form]');
if(rf){
 const run=()=>{
  let total=0; $$('label',rf).forEach(label=>{const input=$('input',label),out=$('output',label); if(!input)return; total+=+input.value; if(out)out.textContent=input.value;});
  const max=24,o=$('[data-readiness-output]',rf),score=$('.readiness-score strong',o),h=$('h3',o),p=$('p:not(.eyebrow)',o),ul=$('ul',o); if(score)score.textContent=total;
  let title='Pilot only',copy='Controls and evidence are not yet sufficient for consequential production use.',items=['Keep scope read-only or reversible','Name owners and define release gates','Build evaluation and incident evidence'];
  if(total>=13){title='Controlled limited production';copy='The system may be ready for bounded, monitored use with explicit limits and escalation.';items=['Document residual risks','Monitor task success and safety','Test rollback and revocation regularly'];}
  if(total>=20){title='Production candidate';copy='The major operating controls are documented and tested. Complete an independent design and risk review before broader scale.';items=['Validate evidence with independent reviewers','Track drift, cost, and incidents','Reassess after material model or workflow changes'];}
  if(h)h.textContent=title;if(p)p.textContent=copy;if(ul)ul.innerHTML=items.map(x=>`<li>${x}</li>`).join('');
 };
 rf.addEventListener('input',run);run();
}
// Add latest v35 pages to command palette without changing the legacy index implementation.
const extra=[
 {title:'Current AI intelligence brief',meta:'Signals · Protocol · Operations · Infrastructure · Risk',url:'/signals.html'},
 {title:'AI production readiness assessment',meta:'AI Risk · Operating controls',url:'/risk.html#readiness-assessment'},
 {title:'Architecture pattern recommender',meta:'AI Lab · Decision tool',url:'/lab.html#pattern-recommender'},
 {title:'AI Systems Intelligence home',meta:'XTIANZ v36',url:'/'}
];
const observer=new MutationObserver(()=>{
 const results=$('[data-command-results]'),input=$('[data-command-input]'); if(!results||!input||results.dataset.v35Enhanced)return;
 results.dataset.v35Enhanced='true';
 input.addEventListener('input',()=>{
  const q=input.value.trim().toLowerCase(); if(!q)return;
  const matches=extra.filter(x=>(x.title+' '+x.meta).toLowerCase().includes(q));
  matches.reverse().forEach(x=>{if(results.querySelector(`[href="${x.url}"]`))return;const a=document.createElement('a');a.href=x.url;a.className='command-result v35-command-result';a.innerHTML=`<span><strong>${x.title}</strong><small>${x.meta}</small></span><em>↗</em>`;results.prepend(a);});
 });
});
observer.observe(document.documentElement,{childList:true,subtree:true});
})();
