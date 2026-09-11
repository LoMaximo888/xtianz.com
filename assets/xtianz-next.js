(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const $ = (s, r=document) => r.querySelector(s);

  // Reveal motion.
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { setTimeout(() => entry.target.classList.add('visible'), Number(entry.target.dataset.delay || 0)); io.unobserve(entry.target); }
    }), {threshold:.12});
    reveals.forEach(el => io.observe(el));
  } else reveals.forEach(el => el.classList.add('visible'));

  // Navigation overlay.
  const overlay = $('[data-overlay]');
  const setOverlay = open => { if(!overlay) return; overlay.classList.toggle('open',open); overlay.setAttribute('aria-hidden',String(!open)); document.body.style.overflow=open?'hidden':''; };
  $$('[data-search-open],[data-menu-open]').forEach(b=>b.addEventListener('click',()=>setOverlay(true)));
  $('[data-overlay-close]')?.addEventListener('click',()=>setOverlay(false));
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') setOverlay(false); });

  // Homepage ambient network.
  const canvas=$('#networkCanvas');
  if(canvas && !reduceMotion){
    const ctx=canvas.getContext('2d'); let w=0,h=0,dpr=1,points=[];
    const resize=()=>{ dpr=Math.min(devicePixelRatio||1,2);w=canvas.clientWidth;h=canvas.clientHeight;canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);const count=Math.max(28,Math.min(72,Math.floor(w/22)));points=Array.from({length:count},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.16,vy:(Math.random()-.5)*.16,r:Math.random()*1.3+.4})); };
    const draw=()=>{ctx.clearRect(0,0,w,h);for(const p of points){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1}for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++){const a=points[i],b=points[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<135){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(94,230,255,${(1-d/135)*.13})`;ctx.stroke()}}points.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(185,255,74,.45)';ctx.fill()});requestAnimationFrame(draw)};
    resize();draw();addEventListener('resize',resize);
  }

  // Interactive system map.
  const sys=$('[data-system-map]');
  if(sys && window.XTIANZ_DATA){
    const layers=window.XTIANZ_DATA.layers;
    $$('[data-layer]',sys).forEach(btn=>btn.addEventListener('click',()=>{
      $$('[data-layer]',sys).forEach(x=>x.classList.remove('active'));btn.classList.add('active');const d=layers[btn.dataset.layer];if(!d)return;
      $('[data-layer-kicker]',sys).textContent=d.kicker;$('[data-layer-title]',sys).textContent=d.title;$('[data-layer-copy]',sys).textContent=d.copy;$('[data-layer-link]',sys).href=d.href;
    }));
  }

  // Compact homepage decision engine.
  const de=$('[data-decision-engine]');
  const decision=()=>{
    if(!de)return;const purpose=$('[data-decision-purpose].selected',de)?.dataset.decisionPurpose||'knowledge';const val=n=>$(`[data-decision-field="${n}"]`,de)?.value;
    const data=val('data'), actions=val('actions'), verify=val('verify'), sensitive=val('sensitive');let result,reason,aut='Low',risk='Low',human='Optional';
    if(purpose==='agent'){result='Bounded agent + approval gates';reason='The path is variable; constrain tools, budget, state and recovery.';aut='Medium';risk=sensitive==='yes'?'High':'Medium';human=sensitive==='yes'||verify==='no'?'Required':'Recommended';}
    else if(actions==='yes'){result=purpose==='transaction'?'Deterministic tool workflow':'RAG + deterministic tool workflow';reason='Keep orchestration explicit and use the model only where language or knowledge adds value.';aut='Low';risk=sensitive==='yes'?'Medium':'Low';human=sensitive==='yes'||verify==='no'?'Required':'Recommended';}
    else if(data==='yes'){result='RAG assistant';reason='Ground responses in current or private knowledge without broad action privileges.';aut='Low';risk=sensitive==='yes'?'Medium':'Low';human=sensitive==='yes'?'Recommended':'Optional';}
    else {result='Deterministic automation or direct model call';reason='Avoid agent complexity unless the task requires changing knowledge, tools or adaptive planning.';aut='Minimal';risk='Low';human='Optional';}
    $('[data-decision-result]',de).textContent=result;$('[data-decision-reason]',de).textContent=reason;$('[data-decision-autonomy]',de).textContent=aut;$('[data-decision-risk]',de).textContent=risk;$('[data-decision-human]',de).textContent=human;
  };
  if(de){$$('[data-decision-purpose]',de).forEach(b=>b.addEventListener('click',()=>{$$('[data-decision-purpose]',de).forEach(x=>x.classList.remove('selected'));b.classList.add('selected');decision()}));$$('[data-decision-field]',de).forEach(x=>x.addEventListener('change',decision));decision();}

  // Render current signal brief.
  const sigList=$('[data-signal-list]');
  if(sigList && window.XTIANZ_DATA){const limit=Number(sigList.dataset.limit||99);window.XTIANZ_DATA.signals.slice(0,limit).forEach(s=>{const a=document.createElement('a');a.className='signal-row reveal visible';a.href=`signals.html#${s.id}`;a.innerHTML=`<span class="signal-num">${s.num}</span><div><small class="signal-date">${s.date} · ${s.category}</small><h3>${s.title}</h3><p>${s.why}</p><span class="signal-source">${s.source} · PRIMARY SOURCE</span></div><span class="arrow" aria-hidden="true">↗</span>`;sigList.appendChild(a)});}

  // Architecture pattern stage.
  const pt=$('[data-pattern-tabs]');
  if(pt){const patterns={rag:['01 / KNOWLEDGE','RAG','Ground responses in retrieved information when answers depend on changing or proprietary knowledge.','Knowledge freshness matters','Retrieval + citation fidelity','Stale or inaccessible sources'],tool:['02 / ACTION','Tool calling','Let a model invoke narrow deterministic functions while the application owns orchestration.','Language decides which function','Tool selection + arguments','Overbroad tool catalogs'],workflow:['03 / CONTROL','Workflow','Combine models with explicit deterministic steps when the process is known.','Known sequence with language steps','Step success + rollback','Hidden partial failure'],agent:['04 / ADAPTIVE','Bounded agent','Allow planning within a constrained goal, tool set, budget and approval model.','Path varies materially','Task success + safe failure','Runaway loops + privilege'],router:['05 / SPECIALIZE','Router + specialists','Send requests to specialized models or systems based on task characteristics.','Distinct task classes','Routing precision + fallback','Misclassification + complexity'],approval:['06 / CONSEQUENCE','Human approval gate','Require explicit review before consequential or hard-to-reverse actions.','Failure cost is material','Approval quality + audit trail','Ceremonial review']};const update=k=>{const d=patterns[k];$('[data-pattern-kicker]').textContent=d[0];$('[data-pattern-title]').textContent=d[1];$('[data-pattern-copy]').textContent=d[2];$('[data-pattern-use]').textContent=d[3];$('[data-pattern-measure]').textContent=d[4];$('[data-pattern-watch]').textContent=d[5];};$$('[data-pattern]',pt).forEach(b=>b.addEventListener('click',()=>{$$('[data-pattern]',pt).forEach(x=>x.classList.remove('active'));b.classList.add('active');update(b.dataset.pattern)}));}

  // Full lab pattern recommender.
  const fp=$('[data-full-pattern]');
  const updateFp=()=>{if(!fp)return;const v=n=>$(`[data-fp="${n}"]`,fp).value;let result='Deterministic workflow',copy='Use rules and explicit orchestration first.',aut='AUTONOMY · MINIMAL',gate='HUMAN GATE · OPTIONAL';if(v('actions')==='no'&&v('fresh')==='current'){result='RAG assistant';copy='Ground answers in controlled, current or private knowledge.';aut='AUTONOMY · LOW'}else if(v('actions')==='yes'&&v('variation')==='low'){result=v('fresh')==='current'?'RAG + deterministic tool workflow':'Deterministic tool workflow';copy='Keep the sequence explicit and bound each tool call.';aut='AUTONOMY · LOW';gate=v('sensitive')==='high'||v('verify')==='no'?'HUMAN GATE · REQUIRED':'HUMAN GATE · RECOMMENDED'}else if(v('variation')==='high'){result='Bounded agent';copy='Constrain tools, budgets, state, time and recovery.';aut='AUTONOMY · MEDIUM';gate=v('sensitive')==='high'||v('approval')==='yes'?'HUMAN GATE · REQUIRED':'HUMAN GATE · RECOMMENDED'}if(v('sensitive')==='high'&&v('approval')==='no'){result+=' · PILOT ONLY';copy+=' High-impact use without approval should remain tightly scoped.';gate='HUMAN GATE · MISSING'}$('[data-fp-result]',fp).textContent=result;$('[data-fp-copy]',fp).textContent=copy;$('[data-fp-autonomy]',fp).textContent=aut;$('[data-fp-gate]',fp).textContent=gate;};if(fp){$$('[data-fp]',fp).forEach(x=>x.addEventListener('change',updateFp));updateFp();}

  // Agent decision tree.
  const at=$('[data-agent-tree]');const updateAt=()=>{if(!at)return;const v=n=>$(`[data-at="${n}"]`,at).value;let r='Start with a deterministic workflow',c='Use explicit rules and add AI only where language interpretation is necessary.';if(v('det')==='no'&&v('verify')==='yes'&&v('reverse')==='yes'){r='Use a bounded agent';c='Variable path + strong verification + reversibility can justify supervised autonomy.'}if(v('sensitive')==='yes'||v('cost')==='high'||v('reverse')==='no'){r=v('approval')==='yes'?'Use a supervised agent with approval gates':'Keep it pilot-only or deterministic';c='High consequence lowers acceptable autonomy until human control and recovery are strong.'}$('[data-at-result]',at).textContent=r;$('[data-at-copy]',at).textContent=c;};if(at){$$('[data-at]',at).forEach(x=>x.addEventListener('change',updateAt));updateAt();}

  // Evaluation generator.
  const eg=$('[data-eval-generator]');$('[data-eval-generate]',eg||document)?.addEventListener('click',()=>{const v=n=>$(`[data-eval="${n}"]`,eg)?.value.trim()||'Not specified';$('[data-eval-output]',eg).textContent=`TASK\n${v('task')}\n\nSUCCESS CRITERIA\n${v('outcome')}\n\nGROUND TRUTH\n${v('truth')}\n\nFAILURE SCENARIOS\n${v('failures')}\n\nRELEASE METRICS\n• task success\n• groundedness / evidence fidelity\n• tool selection + argument correctness\n• safe escalation\n• regression rate\n• latency target: ${v('latency')}\n• cost target: ${v('cost')}\n\nRELEASE GATE\nNo critical failure class may regress without an explicit exception and owner.`;});

  // Threat model.
  const tm=$('[data-threat-model]');const updateTm=()=>{if(!tm)return;const selected=$$('input:checked',tm).map(x=>x.value);let controls=['Authenticated actor and server identity','Least privilege per tool','Structured logging and revocation path'];if(selected.includes('data'))controls.push('Data classification, field minimization and retention boundaries');if(selected.includes('write'))controls.push('Dry-run, approval gate, idempotency and rollback for side effects');if(selected.includes('untrusted'))controls.push('Separate untrusted content from control instructions; injection tests');if(selected.includes('multi'))controls.push('Per-server trust policy, namespace isolation and allowlists');if(selected.includes('delegated'))controls.push('Audience-bound delegated tokens and consent context');if(selected.includes('code'))controls.push('Sandbox execution, network restrictions and resource budgets');if(selected.includes('long'))controls.push('Task state, cancellation, timeout and resumability controls');if(selected.includes('tenant'))controls.push('Tenant isolation, scoped credentials and audit partitioning');$('[data-threat-output]',tm).innerHTML=controls.map(x=>`<li>${x}</li>`).join('');};if(tm){$$('input',tm).forEach(x=>x.addEventListener('change',updateTm));updateTm();}

  // Economics calculator.
  const econ=$('[data-econ]');const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);const updateEcon=()=>{if(!econ)return;const n=k=>Number($(`[data-econ="${k}"]`,econ).value||0);const baseCalls=n('tasks')*n('calls');const calls=baseCalls*(1+n('retry')/100);const model=calls*n('tokens')/1e6*n('rate');const human=n('tasks')*n('review')/100*n('minutes')/60*n('hourly');$('[data-econ-model]',econ).textContent=money(model)+'/ mo';$('[data-econ-human]',econ).textContent=money(human)+'/ mo';$('[data-econ-total]',econ).textContent=money(model+human)+'/ mo';};if(econ){$$('[data-econ]',econ).forEach(x=>x.addEventListener('input',updateEcon));updateEcon();}

  // Risk readiness scoring.
  const rd=$('[data-readiness]');const updateRd=()=>{if(!rd)return;const score=$$('[data-readiness-item]',rd).reduce((a,x)=>a+Number(x.value),0);let label=score<12?'PILOT ONLY':score<19?'CONDITIONAL PRODUCTION':'STRONG OPERATING EVIDENCE';$('[data-readiness-score]',rd).textContent=score;$('[data-readiness-label]',rd).textContent=label;};if(rd){$$('[data-readiness-item]',rd).forEach(x=>x.addEventListener('change',updateRd));updateRd();}

  // XTIANZ v3 domain console.
  const domainConsole=$('[data-domain-console]');
  if(domainConsole){
    const domains={
      ai:{core:'AI',kicker:'AI / SYSTEM',title:'Models are only one layer.',copy:'Production AI depends on applications, agents, data, tools, evaluations, accelerators, networks and power.',href:'architecture.html'},
      quantum:{core:'Q',kicker:'QUANTUM / HYBRID',title:'The QPU sits inside a classical system.',copy:'Useful quantum workflows combine algorithms, compilation, control electronics, cryogenics, measurement, classical optimization and verification.',href:'quantum.html'},
      dc:{core:'DC',kicker:'DATA CENTER / PHYSICAL',title:'The facility is part of the compute architecture.',copy:'Power, cooling, network fabric, rack density, telemetry and 24×7 operations determine how much useful compute a site can sustain.',href:'datacenters.html'}
    };
    $$('[data-domain]',domainConsole).forEach(btn=>btn.addEventListener('click',()=>{const d=domains[btn.dataset.domain];$$('[data-domain]',domainConsole).forEach(x=>x.classList.remove('active'));btn.classList.add('active');$('[data-domain-core]',domainConsole).textContent=d.core;$('[data-domain-kicker]',domainConsole).textContent=d.kicker;$('[data-domain-title]',domainConsole).textContent=d.title;$('[data-domain-copy]',domainConsole).textContent=d.copy;$('[data-domain-link]',domainConsole).href=d.href;}));
  }

  // Quantum workload-fit planning lens.
  const qfit=$('[data-quantum-fit]');
  const updateQfit=()=>{if(!qfit)return;const v=n=>$(`[data-qfit="${n}"]`,qfit).value;let r='Classical-first',c='Use classical systems unless a specific quantum algorithm and measurable advantage hypothesis are identified.';if(v('problem')==='chemistry'&&v('now')==='no'){r='Quantum research candidate';c='Chemistry and materials are plausible research targets. Define a classical baseline, hardware constraints and verification plan before claiming advantage.';}else if(v('problem')==='optimization'&&v('now')==='no'&&v('verify')==='yes'){r='Hybrid research candidate';c='Prototype quantum or quantum-inspired methods against a strong classical optimizer and measure quality, time and total cost.';}else if(v('problem')==='crypto'){r='Prioritize post-quantum cryptography';c='For enterprise security, the immediate action is cryptographic inventory, crypto agility and migration to standardized PQC—not moving ordinary workloads to a QPU.';}else if(v('problem')==='ml'){r='Classical AI first';c='Quantum machine learning remains a research area. Require a strong classical baseline and a measurable advantage hypothesis.';}if(v('now')==='yes'&&r.includes('candidate')){r='Classical production + quantum research';c+=' Keep the production path classical while research runs independently.';}if(v('baseline')==='no'&&v('problem')!=='crypto'){c+=' Build a strong classical baseline first; without it, advantage cannot be demonstrated.';}$('[data-qfit-result]',qfit).textContent=r;$('[data-qfit-copy]',qfit).textContent=c;};
  if(qfit){$$('[data-qfit]',qfit).forEach(x=>x.addEventListener('change',updateQfit));updateQfit();}

  // Data-center stack explorer.
  const dcStack=$('[data-dc-stack]');
  if(dcStack){const layers={power:['01 / POWER','Utility capacity becomes compute capacity.','Grid interconnect, substations, switchgear, UPS systems, generators, batteries and rack distribution define the electrical envelope.',['UTILITY','UPS','PDU','RESILIENCE']],cooling:['02 / COOLING','Every watt of compute becomes heat.','Airflow, chillers, cooling towers, heat exchangers, CDUs and direct-to-chip liquid loops must remove that heat continuously.',['THERMAL','CDU','LIQUID','WUE']],network:['03 / NETWORK','The fabric is part of the accelerator.','High-bandwidth east-west traffic, optics, leaf-spine design, lossless behavior and out-of-band management shape cluster performance.',['FABRIC','OPTICS','OOB','LATENCY']],compute:['04 / COMPUTE','A rack is now a coupled compute system.','Accelerators, CPUs, memory, local storage, firmware, rack power and serviceability must be designed together.',['GPU','CPU','MEMORY','RACK']],controls:['05 / CONTROLS','You cannot operate what you cannot see.','BMS, EPMS, DCIM, telemetry, alarms, trending and capacity models turn facility state into actionable operating evidence.',['BMS','EPMS','DCIM','TELEMETRY']],ops:['06 / OPERATIONS','Reliability is a people-and-process system.','24×7 monitoring, incident response, change control, maintenance, spares, vendor coordination, safety and recovery keep compute available.',['24×7','ITSM','MAINTENANCE','RECOVERY']]};$$('[data-dc-layer]',dcStack).forEach(btn=>btn.addEventListener('click',()=>{const d=layers[btn.dataset.dcLayer];$$('[data-dc-layer]',dcStack).forEach(x=>x.classList.remove('active'));btn.classList.add('active');$('[data-dc-kicker]',dcStack).textContent=d[0];$('[data-dc-title]',dcStack).textContent=d[1];$('[data-dc-copy]',dcStack).textContent=d[2];$('[data-dc-tags]',dcStack).innerHTML=d[3].map(x=>`<span>${x}</span>`).join('');}));}

  // Data-center capacity planning calculator.
  const dcc=$('[data-dc-calc]');
  const updateDcc=()=>{if(!dcc)return;const n=k=>Math.max(0,Number($(`[data-dcc="${k}"]`,dcc).value||0));const it=n('it'),rack=Math.max(1,n('rack')),pue=Math.max(1,n('pue')),head=Math.min(.5,n('headroom')/100);const racks=Math.ceil(it*1000/rack);const planned=head<1?it/(1-head):it;const facility=planned*pue;$('[data-dcc-racks]',dcc).textContent=racks.toLocaleString();$('[data-dcc-planned]',dcc).textContent=planned.toFixed(1)+' MW';$('[data-dcc-facility]',dcc).textContent=facility.toFixed(1)+' MW';};
  if(dcc){$$('[data-dcc]',dcc).forEach(x=>x.addEventListener('input',updateDcc));updateDcc();}
})();
