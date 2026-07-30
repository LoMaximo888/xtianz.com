
const navToggle=document.querySelector('.nav-toggle');const nav=document.querySelector('#site-nav');if(navToggle&&nav){navToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');navToggle.setAttribute('aria-expanded',open?'true':'false')});}
const reveals=document.querySelectorAll('.reveal');if('IntersectionObserver'in window){const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}})},{threshold:.1});reveals.forEach(el=>obs.observe(el));}else{reveals.forEach(el=>el.classList.add('visible'));}
const progressBar=document.querySelector('.reading-progress span');if(progressBar){const update=()=>{const a=document.querySelector('.article-page');if(!a)return;const start=a.offsetTop;const distance=Math.max(1,a.offsetHeight-innerHeight);progressBar.style.width=`${Math.min(100,Math.max(0,((scrollY-start)/distance)*100))}%`;};update();addEventListener('scroll',update,{passive:true});addEventListener('resize',update);}
const SEARCH_INDEX=[{"url":"/architecture.html","title":"AI Architecture Patterns","category":"Architecture","summary":"RAG, tool calling, workflows, agents, routing, approval gates, sandboxing, memory, failover, and evaluations.","code":"ARC"},{"url":"/claude.html","title":"Claude Guides","category":"Claude","summary":"Claude models, Claude Code, agents, MCP, enterprise governance, safety, and work.","code":"CL"},{"url":"/articles/claude-models-opus-sonnet-guide.html","title":"Claude Models Guide: Choosing Opus 5 or Sonnet 5","category":"Claude Models","summary":"A practical guide to choosing between Claude Opus 5 and Claude Sonnet 5 for reasoning, coding, agents, throughput, and cost-sensitive production work.","code":"CL5"},{"url":"/articles/claude-code-engineering-guide.html","title":"Claude Code Engineering Guide: Workflows, Hooks, MCP and the Agent SDK","category":"Claude Code","summary":"How to use Claude Code as an engineering system: repository context, plans, tests, hooks, MCP connections, security controls, and the Agent SDK.","code":"CODE"},{"url":"/articles/claude-agents-tools-mcp.html","title":"Building Claude Agents with Tools, MCP, Web Search and Computer Use","category":"Claude Agents","summary":"A systems guide to building Claude agents with tool use, MCP, web search, computer use, prompt caching, evaluations, and operational controls.","code":"AGT"},{"url":"/articles/claude-enterprise-governance.html","title":"Claude Enterprise Governance: Identity, Compliance, Security and Rollout","category":"Claude Enterprise","summary":"A practical governance framework for deploying Claude and Claude Code across an enterprise with identity, compliance, logging, retention, and operating controls.","code":"ENT"},{"url":"/articles/claude-safety-constitution.html","title":"Claude\u2019s Constitution and What It Means for AI Safety Engineering","category":"Claude Safety","summary":"What Claude\u2019s constitution is, what it can and cannot guarantee, and how engineering teams should translate model-level safety into system-level controls.","code":"SAFE"},{"url":"/articles/claude-economic-index-work.html","title":"Claude and the Future of Work: Reading the Anthropic Economic Index Carefully","category":"Claude + Work","summary":"How to interpret the Anthropic Economic Index and its Claude connector without turning task-level data into unsupported predictions about entire jobs.","code":"WORK"},{"url":"/risk.html","title":"AI Risk Engineering","category":"Risk","summary":"Govern, map, measure, and manage AI risk across the system lifecycle.","code":"RSK"},{"url":"/articles/mcp-specification-status.html","title":"MCP Specification Status","category":"AI + MCP","summary":"Stable version, protocol discipline, roadmap tracking, and migration planning.","code":"MCP"},{"url":"/dmv.html","title":"DMV Pulse","category":"Local news navigator","summary":"LoCo, Loudoun County, Northern Virginia, Washington DC, Maryland, The Burn, and regional source links.","code":"DMV"},{"url":"/articles/dmv-ai-infrastructure-corridor.html","title":"Why the DMV Matters to the AI Infrastructure Story","category":"DMV + Infrastructure","summary":"Loudoun data centers, power, fiber, land use, economics, and community impact.","code":"LC"},{"url":"/articles/what-is-mcp-ai-agents.html","title":"What Is MCP and Why It Matters for AI Agents","category":"AI + MCP","summary":"A practical explanation of MCP as the connector layer between AI systems, approved tools, and enterprise data.","code":"AI"},{"url":"/articles/top-ai-search-questions.html","title":"Five AI Questions People Keep Searching","category":"AI Search Pulse","summary":"What recurring AI searches reveal about curiosity, tool selection, work anxiety, and technical understanding.","code":"Q5"},{"url":"/articles/mangos-explained-ai-companies.html","title":"MANGOS Explained","category":"MANGOS","summary":"Why Meta, Anthropic, Nvidia, Google, OpenAI, and SpaceX form a useful innovation watchlist.","code":"MX"},{"url":"/articles/nvidia-ai-infrastructure-boom.html","title":"How Nvidia Became the Center of the AI Infrastructure Boom","category":"Markets","summary":"A system-level view of GPUs, networking, software, data centers, and AI factory economics.","code":"NV"},{"url":"/articles/ai-agents-enterprise-operations.html","title":"AI Agents in Enterprise Operations","category":"AI + MCP","summary":"Where agents can create value, where controls matter, and how to move beyond impressive demos.","code":"AG"},{"url":"/articles/mcp-security-governance-checklist.html","title":"MCP Security and Governance Checklist","category":"AI + MCP","summary":"A practical checklist for identity, permissions, logging, tool risk, and human approval.","code":"SC"},{"url":"/articles/ai-stock-movers-watchlist.html","title":"Top AI Stock Movers: What Actually Moves the Market","category":"Markets","summary":"A framework for separating headlines from demand, earnings, margins, rates, and execution.","code":"\u2197"},{"url":"/articles/ai-data-centers-power-water.html","title":"AI Data Centers: Why Power, Cooling, and Location Matter","category":"Infrastructure","summary":"Why AI growth is increasingly constrained by power, cooling, networks, and geography.","code":"DC"},{"url":"/articles/private-ai-companies-openai-anthropic-spacex.html","title":"How to Track OpenAI, Anthropic, and SpaceX","category":"MANGOS","summary":"A careful guide to public status, partnerships, proxies, and primary-source verification.","code":"AI"},{"url":"/articles/xtianz-weekly-signal-method.html","title":"The XTIANZ Signal Method","category":"Editorial","summary":"A repeatable way to evaluate AI capability, adoption, economics, infrastructure, and risk.","code":"XS"},{"url":"/","title":"XTIANZ AI Systems Intelligence","category":"Home","summary":"AI, MCP, MANGOS, infrastructure and market signals.","code":"X"},{"url":"/ai-mcp.html","title":"AI + MCP","category":"Category","summary":"Agents, MCP, security, governance and enterprise operations.","code":"AI"},{"url":"/mangos.html","title":"MANGOS","category":"Category","summary":"Meta, Anthropic, Nvidia, Google, OpenAI and SpaceX.","code":"MX"},{"url":"/markets.html","title":"AI Markets","category":"Category","summary":"Demand, compute, economics, macro conditions and risk.","code":"\u2197"},{"url":"/lab.html","title":"AI Lab","category":"Interactive","summary":"Readiness checklist, maturity map, tool comparison and glossary.","code":"LAB"},{"url":"/editorial-policy.html","title":"Editorial Policy","category":"Trust","summary":"Sources, AI assistance, freshness and corrections.","code":"ED"}];
function renderSearch(query,target){const q=(query||'').trim().toLowerCase();const rows=SEARCH_INDEX.filter(x=>!q||`${x.title} ${x.category} ${x.summary}`.toLowerCase().includes(q)).slice(0,10);target.innerHTML=rows.length?rows.map(x=>`<a class="command-result" href="${x.url}"><span class="command-result-code">${x.code}</span><span><strong>${x.title}</strong><small>${x.summary}</small></span><em>${x.category}</em></a>`).join(''):'<p class="command-hint">No matching signal found.</p>';}
const backdrop=document.querySelector('[data-command-backdrop]'),cmdInput=document.querySelector('[data-command-input]'),cmdResults=document.querySelector('[data-command-results]');function openCommand(){if(!backdrop)return;backdrop.hidden=false;document.body.style.overflow='hidden';renderSearch('',cmdResults);setTimeout(()=>cmdInput?.focus(),10)}function closeCommand(){if(!backdrop)return;backdrop.hidden=true;document.body.style.overflow='';}
document.querySelectorAll('[data-command-open]').forEach(b=>b.addEventListener('click',openCommand));document.querySelectorAll('[data-command-close]').forEach(b=>b.addEventListener('click',closeCommand));backdrop?.addEventListener('click',e=>{if(e.target===backdrop)closeCommand()});cmdInput?.addEventListener('input',e=>renderSearch(e.target.value,cmdResults));addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openCommand()}if(e.key==='Escape')closeCommand();});
const pageSearch=document.querySelector('[data-page-search]'),pageResults=document.querySelector('[data-page-search-results]');if(pageSearch&&pageResults){const go=()=>{const q=pageSearch.value.trim().toLowerCase();const rows=SEARCH_INDEX.filter(x=>!q||`${x.title} ${x.category} ${x.summary}`.toLowerCase().includes(q));pageResults.innerHTML=rows.map(x=>`<a class="page-search-result" href="${x.url}"><span>${x.code}</span><div><strong>${x.title}</strong><p>${x.summary}</p></div></a>`).join('');};pageSearch.addEventListener('input',go);go();}
const layers=document.querySelectorAll('[data-stack-layer]');const stackTitle=document.querySelector('[data-stack-title]'),stackDescription=document.querySelector('[data-stack-description]'),stackWatch=document.querySelector('[data-stack-watch]');if(layers.length&&stackTitle&&stackDescription&&stackWatch){layers.forEach((b,i)=>{if(i===0){b.classList.add('active');b.setAttribute('aria-pressed','true')}else b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>{layers.forEach(x=>{x.classList.remove('active');x.setAttribute('aria-pressed','false')});b.classList.add('active');b.setAttribute('aria-pressed','true');stackTitle.textContent=b.dataset.title;stackDescription.textContent=b.dataset.description;stackWatch.textContent=b.dataset.watch;});});}
const companyData={"Meta": {"role": "Distribution", "status": "Public \u00b7 META", "focus": "AI assistants, Llama, ads, smart glasses, and consumer distribution.", "risk": "Scale across existing products is the opportunity; capital intensity and engagement quality are the risk.", "news": "https://about.fb.com/news/", "ig": "https://www.instagram.com/meta/"}, "Anthropic": {"role": "Enterprise AI", "status": "Private", "focus": "Claude, enterprise adoption, safety, and cloud partnerships.", "risk": "Enterprise trust is the opportunity; dependence on partners and fast-moving competition are the risk.", "news": "https://www.anthropic.com/news", "ig": "https://www.instagram.com/anthropicai/"}, "Nvidia": {"role": "Compute infrastructure", "status": "Public \u00b7 NVDA", "focus": "GPUs, networking, software, robotics, and AI factories.", "risk": "Full-stack leadership is the opportunity; valuation, competition, and customer concentration are the risk.", "news": "https://nvidianews.nvidia.com/", "ig": "https://www.instagram.com/nvidia/"}, "Google": {"role": "Platforms + models", "status": "Public \u00b7 GOOGL / GOOG", "focus": "Gemini, DeepMind, TPUs, Search, YouTube, and Cloud.", "risk": "Distribution and infrastructure depth are the opportunity; product transition and regulatory pressure are the risk.", "news": "https://blog.google/technology/ai/", "ig": "https://www.instagram.com/google/"}, "OpenAI": {"role": "Agents + applications", "status": "Private", "focus": "ChatGPT, APIs, enterprise products, and agent platforms.", "risk": "Product momentum is the opportunity; economics, governance, and intense competition are the risk.", "news": "https://openai.com/news/", "ig": "https://www.instagram.com/openai/"}, "SpaceX": {"role": "Connectivity + space infrastructure", "status": "Public \u00b7 SPCX", "focus": "Starlink, launch systems, Starship, and space infrastructure.", "risk": "Vertical integration is the opportunity; execution, capital intensity, and early public-market volatility are the risk.", "news": "https://ir.spacex.com/", "ig": "https://www.instagram.com/spacex/"}};const nodes=document.querySelectorAll('[data-company]');nodes.forEach((b,i)=>{if(i===0)b.classList.add('active');b.addEventListener('click',()=>{nodes.forEach(x=>x.classList.remove('active'));b.classList.add('active');const d=companyData[b.dataset.company];document.querySelector('[data-company-name]').textContent=b.dataset.company;document.querySelector('[data-company-role]').textContent=d.role;document.querySelector('[data-company-status]').textContent=d.status;document.querySelector('[data-company-focus]').textContent=d.focus;document.querySelector('[data-company-risk]').textContent=d.risk;document.querySelector('[data-company-news]').href=d.news;document.querySelector('[data-company-ig]').href=d.ig;});});
const roleMap={models:['Anthropic','Google','OpenAI','Meta'],infrastructure:['Nvidia','Google','SpaceX'],distribution:['Meta','Google','OpenAI'],enterprise:['Anthropic','Google','OpenAI','Nvidia'],market:['Meta','Nvidia','Google','SpaceX']};document.querySelectorAll('[data-company-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-company-filter]').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.companyFilter;document.querySelectorAll('[data-company-card]').forEach(c=>c.classList.toggle('is-hidden',f!=='all'&&!roleMap[f].includes(c.dataset.companyCard)));}));
const marketData={demand:['DEMAND','Is spending becoming durable revenue?','Track cloud growth, enterprise deployments, product usage, backlog, customer concentration, and whether pilots convert into recurring workloads.','Earnings, guidance, usage metrics, orders, and customer expansion.','Treating a capability announcement as proof of monetization.'],compute:['COMPUTE','Is infrastructure demand broad, utilized, and sustainable?','Watch accelerator demand, networking, memory, utilization, lead times, and customer diversification.','Orders, utilization, supply, networking demand, and data-center buildouts.','Assuming every infrastructure purchase creates immediate end-user value.'],economics:['ECONOMICS','Can AI revenue outrun the cost of serving it?','Track gross margins, inference cost, pricing, capital intensity, and productivity gains.','Margins, unit economics, capex, free cash flow, and price-performance.','Ignoring cost because usage growth looks impressive.'],macro:['MACRO','Are financial conditions helping or hurting duration assets?','Rates, liquidity, currency, regulation, and capital-spending cycles can amplify or overwhelm company-specific news.','Rates, credit conditions, capex surveys, policy, and risk appetite.','Explaining every move with an AI headline.'],risk:['RISK','What assumption is the market pricing as certain?','Valuation, competition, concentration, execution, regulation, and technology transitions can reverse a crowded narrative.','Valuation, scenario ranges, competition, insiders, and customer concentration.','Confusing a great company with an automatically attractive price.']};document.querySelectorAll('[data-market-tab]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-market-tab]').forEach(x=>x.classList.remove('active'));b.classList.add('active');const d=marketData[b.dataset.marketTab];document.querySelector('[data-market-label]').textContent=d[0];document.querySelector('[data-market-title]').textContent=d[1];document.querySelector('[data-market-copy]').textContent=d[2];document.querySelector('[data-market-evidence]').textContent=d[3];document.querySelector('[data-market-mistake]').textContent=d[4];}));
const maturity={1:['STAGE 1','Chat','Use AI for answers, summaries, and drafting. The human remains responsible for every action and verification step.','Approved context, repeatable prompts, and basic evaluation.'],2:['STAGE 2','Copilot','AI assists inside a human-led workflow with clear review before output becomes action.','Workflow integration, quality metrics, and user training.'],3:['STAGE 3','Workflow','Structured automation combines models with approved data and deterministic steps.','Orchestration, exception handling, logging, and ownership.'],4:['STAGE 4','Agent','The system plans and calls tools within bounded goals and explicit action limits.','Identity, authorization, observability, human escalation, and cost controls.'],5:['STAGE 5','Governed agent system','Multiple agent workflows operate with policy, monitoring, incident response, and measurable business outcomes.','Continuous evaluation, portfolio governance, and operating-model maturity.']};document.querySelectorAll('[data-maturity]').forEach((b,i)=>{if(i===0)b.classList.add('active');b.addEventListener('click',()=>{document.querySelectorAll('[data-maturity]').forEach(x=>x.classList.remove('active'));b.classList.add('active');const d=maturity[b.dataset.maturity],box=document.querySelector('[data-maturity-detail]');box.querySelector('.eyebrow').textContent=d[0];box.querySelector('h3').textContent=d[1];box.querySelector('p').textContent=d[2];box.querySelector('.maturity-needs span').textContent=d[3];});});
const compareData={coding:{ChatGPT:[4,'Broad coding support, tools, and ecosystem.'],Claude:[5,'Strong code reasoning and long-context review.'],Gemini:[4,'Useful coding with Google ecosystem integration.'],DeepSeek:[4,'Strong value and technical capability; verify deployment requirements.']},writing:{ChatGPT:[4,'Flexible drafting and rewriting across formats.'],Claude:[5,'Strong long-form tone, editing, and document work.'],Gemini:[4,'Useful multimodal drafting and Workspace integration.'],DeepSeek:[3,'Capable general writing with product and policy considerations.']},research:{ChatGPT:[4,'Useful synthesis when sources and browsing are verified.'],Claude:[4,'Strong document analysis and structured synthesis.'],Gemini:[5,'Strong search-connected and multimodal research workflows.'],DeepSeek:[3,'Useful technical analysis; source verification remains essential.']},enterprise:{ChatGPT:[5,'Broad enterprise product, APIs, and ecosystem.'],Claude:[5,'Strong enterprise positioning, safety, and cloud partnerships.'],Gemini:[5,'Deep Workspace, Cloud, and data-platform integration.'],DeepSeek:[3,'Evaluate hosting, governance, support, and policy requirements.']},longdocs:{ChatGPT:[4,'Strong document workflows with product-dependent limits.'],Claude:[5,'Known for long-context reading and editing.'],Gemini:[5,'Strong long-context and multimodal document handling.'],DeepSeek:[3,'Capable, but verify current context limits and product options.']}};
function renderCompare(mode){const grid=document.querySelector('[data-compare-grid]');if(!grid)return;grid.innerHTML=Object.entries(compareData[mode]).map(([name,[score,note]])=>`<article class="compare-card"><p class="eyebrow">${mode.toUpperCase()}</p><h3>${name}</h3><div class="compare-score">${[1,2,3,4,5].map(i=>`<i class="${i<=score?'on':''}"></i>`).join('')}</div><p>${note}</p><small>Verify current features, pricing, privacy, and plan limits with the official provider.</small></article>`).join('')}document.querySelectorAll('[data-compare]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-compare]').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderCompare(b.dataset.compare)}));renderCompare('coding');
const glossary=[["Agent", "A system that can plan, use tools, maintain state, and pursue a bounded goal.", "OPERATIONS"], ["Context window", "The amount of information a model can process in one interaction.", "MODELS"], ["Embedding", "A numeric representation used to compare meaning or similarity.", "DATA"], ["Inference", "The process of using a trained model to generate an output.", "MODELS"], ["LLM", "A large language model trained to predict and generate language patterns.", "MODELS"], ["MCP", "Model Context Protocol: a standard way for AI clients to discover and use approved tools and data.", "ORCHESTRATION"], ["Multimodal", "Able to work with more than one data type, such as text, images, audio, or video.", "MODELS"], ["RAG", "Retrieval-augmented generation: retrieving relevant information before generating an answer.", "DATA"], ["Tool calling", "A model selecting and invoking an external function or service.", "OPERATIONS"], ["Token", "A unit of text or data processed by a model.", "MODELS"], ["Prompt injection", "Instructions hidden in content that attempt to manipulate an AI system or tool workflow.", "SECURITY"], ["Guardrail", "A technical or policy control designed to limit unsafe or unwanted behavior.", "GOVERNANCE"], ["Fine-tuning", "Additional training that adapts a model to a task, style, or domain.", "MODELS"], ["Evaluation", "A repeatable method for measuring quality, safety, reliability, or task performance.", "OPERATIONS"], ["Observability", "Logs, traces, metrics, and review tools used to understand system behavior.", "OPERATIONS"], ["Grounding", "Connecting an answer to relevant data, context, or sources.", "DATA"]];function renderGlossary(q=''){const g=document.querySelector('[data-glossary-grid]');if(!g)return;const x=q.toLowerCase();g.innerHTML=glossary.filter(([t,d,c])=>`${t} ${d} ${c}`.toLowerCase().includes(x)).map(([t,d,c])=>`<article class="glossary-card"><small>${c}</small><h3>${t}</h3><p>${d}</p></article>`).join('')}document.querySelector('[data-glossary-input]')?.addEventListener('input',e=>renderGlossary(e.target.value));renderGlossary();
const cf=document.querySelector('[data-correction-form]');if(cf){const params=new URLSearchParams(location.search);if(params.get('page'))cf.elements.page.value='https://xtianz.com'+params.get('page');cf.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(cf),title=encodeURIComponent(`[${fd.get('topic')}] XTIANZ site feedback`),body=encodeURIComponent(`Page: ${fd.get('page')||'Not provided'}

Details:
${fd.get('details')}`);location.href=`https://github.com/lomaximo888/xtianz.com/issues/new?title=${title}&body=${body}`;});}

const dmvFilters=document.querySelectorAll('[data-dmv-filter]');if(dmvFilters.length){dmvFilters.forEach(btn=>btn.addEventListener('click',()=>{dmvFilters.forEach(x=>x.classList.remove('active'));btn.classList.add('active');const filter=btn.dataset.dmvFilter;document.querySelectorAll('[data-dmv-source]').forEach(card=>{const regions=(card.dataset.dmvSource||'').split(/\s+/);card.classList.toggle('is-hidden',filter!=='all'&&!regions.includes(filter));});}));}


(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Lightweight neural-constellation background. It is decorative, pointer-safe,
  // pauses when the tab is hidden, and disables itself for reduced motion.
  if (!reduced && !document.querySelector('.ai-network-bg')) {
    const canvas = document.createElement('canvas');
    canvas.className = 'ai-network-bg';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d', { alpha: true });
    let width = 0, height = 0, dpr = 1, frame = 0, running = true;
    let pointer = { x: -9999, y: -9999 };
    let nodes = [];

    const makeNode = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - .5) * .17,
      vy: (Math.random() - .5) * .17,
      r: Math.random() * 1.15 + .45,
      hue: Math.random() > .74 ? '180,140,255' : '101,240,255',
      phase: Math.random() * Math.PI * 2
    });

    const resize = () => {
      width = innerWidth;
      height = innerHeight;
      dpr = Math.min(devicePixelRatio || 1, 1.6);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(24, Math.min(64, Math.round(width * height / 26000)));
      nodes = Array.from({ length: count }, makeNode);
    };

    const draw = () => {
      if (!running) return;
      frame = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, width, height);
      const maxLink = width < 720 ? 112 : 150;
      const maxLink2 = maxLink * maxLink;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const dxp = n.x - pointer.x, dyp = n.y - pointer.y;
        const pd2 = dxp * dxp + dyp * dyp;
        if (pd2 < 16000 && pd2 > 1) {
          const force = (1 - pd2 / 16000) * .035;
          n.vx += dxp * force / Math.sqrt(pd2);
          n.vy += dyp * force / Math.sqrt(pd2);
        }
        n.vx *= .995; n.vy *= .995;
        n.x += n.vx; n.y += n.vy;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j], dx = n.x - m.x, dy = n.y - m.y, d2 = dx * dx + dy * dy;
          if (d2 < maxLink2) {
            const alpha = (1 - d2 / maxLink2) * .115;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(117,178,255,${alpha})`;
            ctx.lineWidth = .55;
            ctx.stroke();
          }
        }
        const pulse = .72 + Math.sin(performance.now() * .0012 + n.phase) * .25;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.hue},${.22 + pulse * .14})`;
        ctx.fill();
      }
    };

    resize();
    addEventListener('resize', resize, { passive: true });
    addEventListener('pointermove', e => { pointer.x = e.clientX; pointer.y = e.clientY; }, { passive: true });
    addEventListener('pointerleave', () => { pointer.x = pointer.y = -9999; });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { running = false; cancelAnimationFrame(frame); }
      else if (!running) { running = true; draw(); }
    });
    draw();
  }

  // Subtle parallax for the hero system core on precise-pointer devices.
  const core = document.querySelector('[data-system-core]');
  if (core && !reduced && matchMedia('(pointer:fine)').matches) {
    core.addEventListener('pointermove', e => {
      const r = core.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      core.style.setProperty('--ry', `${x * 5.5}deg`);
      core.style.setProperty('--rx', `${y * -5.5}deg`);
    });
    core.addEventListener('pointerleave', () => {
      core.style.setProperty('--ry', '0deg');
      core.style.setProperty('--rx', '0deg');
    });
  }

  // Add a faint pointer spotlight to interactive editorial cards.
  if (!reduced && matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.signal-quad article,.bento-card,.dmv-source-card,.lab-preview-grid article,.three-way article,.source-card,.magazine-card').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--spot-x', `${e.clientX - r.left}px`);
        card.style.setProperty('--spot-y', `${e.clientY - r.top}px`);
      });
      card.classList.add('v33-spotlight');
    });
  }
})();



(()=>{
const arch={
experience:{code:'01 / EXPERIENCE',title:'User experience and human control',copy:'The interface defines intent, context, approvals, explanations, and the user’s ability to interrupt or correct the system.',metrics:'Task success, adoption, correction rate, time saved, escalation rate.',risks:'Ambiguous intent, automation bias, hidden actions, weak recovery.',patterns:'Copilot, approval gate, confidence display, reversible action.',owner:'Product, design, operations, risk, and workflow owners.'},
applications:{code:'02 / APPLICATIONS',title:'Workflow and domain application',copy:'The application turns business intent into a bounded workflow with explicit inputs, outputs, rules, and ownership.',metrics:'Workflow completion, exception rate, business outcome, user retention.',risks:'Unclear ownership, process mismatch, silent exceptions, low adoption.',patterns:'Structured workflow, domain service, queue, event-driven orchestration.',owner:'Business process owner, product engineering, operations.'},
runtime:{code:'03 / AGENT RUNTIME',title:'Planning, state, and orchestration',copy:'The runtime coordinates model calls, tool use, state, retries, handoffs, and stopping conditions.',metrics:'Plan success, retries, tool-call accuracy, latency, cost, escalations.',risks:'Loops, state corruption, runaway cost, unclear termination, hidden handoffs.',patterns:'Bounded agent, state machine, supervisor, specialist routing.',owner:'AI platform, application engineering, SRE, security.'},
tools:{code:'04 / MCP + TOOLS',title:'Actions, data access, and context',copy:'MCP and other tool interfaces expose approved capabilities through schemas, identity, authorization, and policy.',metrics:'Call success, argument validity, denied actions, audit coverage, revocations.',risks:'Prompt injection, token misuse, excessive permission, data exfiltration.',patterns:'Tool gateway, least privilege, allowlist, approval gate, sandbox.',owner:'Platform engineering, IAM, security, data owners.'},
models:{code:'05 / MODELS + ROUTING',title:'Reasoning engines and model policy',copy:'Models interpret context and generate decisions or content. Routing selects the right quality, cost, latency, and risk profile.',metrics:'Task score, groundedness, latency, cost, safety, routing accuracy.',risks:'Hallucination, drift, inconsistent policy, outage, vendor dependence.',patterns:'Router + specialists, fallback, ensemble, constrained generation.',owner:'AI engineering, model governance, procurement, product.'},
data:{code:'06 / DATA + RETRIEVAL',title:'Grounding, memory, and information lifecycle',copy:'Data systems provide trusted context while controlling freshness, provenance, retention, access, and deletion.',metrics:'Retrieval precision, freshness, citation fidelity, leakage, deletion compliance.',risks:'Stale data, contamination, unauthorized access, retention violations.',patterns:'RAG, knowledge graph, scoped memory, data contracts, provenance.',owner:'Data platform, information governance, domain owners.'},
compute:{code:'07 / COMPUTE PLATFORM',title:'Serving, reliability, and observability',copy:'The platform supplies inference, networking, storage, tracing, evaluations, quotas, and operational resilience.',metrics:'Availability, utilization, tail latency, cost per task, trace coverage.',risks:'Capacity bottlenecks, noisy neighbors, opaque failures, cost spikes.',patterns:'Model gateway, autoscaling, failover, tracing, evaluation pipeline.',owner:'Cloud platform, SRE, FinOps, AI platform engineering.'},
physical:{code:'08 / PHYSICAL LAYER',title:'Power, cooling, facilities, and networks',copy:'AI workloads ultimately depend on land, grid capacity, construction, cooling, fiber, and supply chains.',metrics:'Power availability, PUE, utilization, construction timeline, network capacity.',risks:'Grid delay, water constraints, equipment lead time, community impact.',patterns:'Capacity planning, site diversity, demand response, resilient networking.',owner:'Infrastructure, facilities, utilities, finance, public stakeholders.'}}
document.querySelectorAll('[data-arch-layer]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-arch-layer]').forEach(x=>{x.classList.remove('active');x.setAttribute('aria-pressed','false')});btn.classList.add('active');btn.setAttribute('aria-pressed','true');const d=arch[btn.dataset.archLayer];if(!d)return;for(const [key,val] of Object.entries(d)){const el=document.querySelector(`[data-arch-${key}]`);if(el)el.textContent=val;}}));
const pdata=document.querySelector('#pattern-data');let patterns={};try{patterns=JSON.parse(pdata?.textContent||'{}')}catch(e){}
const detail=document.querySelector('[data-pattern-detail]');document.querySelectorAll('[data-pattern]').forEach((btn,i)=>{if(i===0)btn.classList.add('active');btn.addEventListener('click',()=>{document.querySelectorAll('[data-pattern]').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const d=patterns[btn.dataset.pattern];if(!d||!detail)return;detail.querySelector('.eyebrow').textContent=`PATTERN ${String([...document.querySelectorAll('[data-pattern]')].indexOf(btn)+1).padStart(2,'0')}`;detail.querySelector('h2').textContent=d.name;detail.querySelector(':scope > p').textContent=d.purpose;const dd=detail.querySelectorAll('dd');[d.use,d.avoid,d.measure].forEach((v,j)=>dd[j].textContent=v);});});
document.querySelectorAll('[data-pattern-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-pattern-filter]').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelectorAll('[data-pattern]').forEach(card=>card.classList.toggle('is-hidden',b.dataset.patternFilter!=='all'&&card.dataset.category!==b.dataset.patternFilter));}));
const agentForm=document.querySelector('[data-agent-decision]');if(agentForm){const run=()=>{const f=new FormData(agentForm),det=f.get('deterministic'),ver=f.get('verifiable'),rev=f.get('reversible'),sens=f.get('sensitive'),approval=f.get('approval'),failure=f.get('failure');let title='Use a constrained workflow',copy='Keep the path explicit and use the model for bounded interpretation or generation.',controls=['Deterministic orchestration','Input/output validation','Exception queue'];if(det==='yes'&&ver==='yes'){title='Use traditional automation with an AI step';copy='Most of the process is deterministic and verifiable. Add AI only where language or unstructured data requires it.'}if((det==='partial'||det==='no')&&ver!=='no'&&rev!=='no'&&failure!=='high'){title='Use a supervised agent';copy='The path can vary, but outcomes are testable and failures can be contained.';controls=['Bounded tool allowlist','Execution traces and evals','Human escalation','Budget and step limits']}if(ver==='no'||rev==='no'||failure==='high'||sens==='yes'&&approval==='no'){title='Do not deploy an autonomous agent yet';copy='The current workflow lacks enough verification, reversibility, or oversight for safe autonomy.';controls=['Redesign for verifiable checkpoints','Add human approval','Reduce permissions and action scope','Pilot in read-only mode']}const out=document.querySelector('[data-agent-decision-output]');out.querySelector('h3').textContent=title;out.querySelector('p').textContent=copy;out.querySelector('ul').innerHTML=controls.map(x=>`<li>${x}</li>`).join('')};agentForm.addEventListener('change',run);run();}
const ef=document.querySelector('[data-eval-form]');if(ef)ef.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(ef),task=f.get('task'),outcome=f.get('outcome'),failures=f.get('failures')||'Collect failure examples during pilot.',truth=f.get('truth'),lat=f.get('latency')||'Define before launch',cost=f.get('cost')||'Define before launch';const o=document.querySelector('[data-eval-output]');o.hidden=false;o.innerHTML=`<span>EVALUATION OUTLINE</span><h3>${task}</h3><ul><li><strong>Success definition:</strong> ${outcome}</li><li><strong>Dataset:</strong> Build representative normal, edge, adversarial, and regression cases using ${truth.toLowerCase()}.</li><li><strong>Failure tests:</strong> ${failures}</li><li><strong>Core metrics:</strong> task success, tool-call accuracy, groundedness, safety violations, escalation rate.</li><li><strong>Operational targets:</strong> latency ${lat}; cost ${cost}.</li><li><strong>Human calibration:</strong> Have reviewers score a sample independently and reconcile disagreements.</li><li><strong>Release gate:</strong> No critical safety failures; documented thresholds met; rollback plan tested.</li></ul>`});
const tf=document.querySelector('[data-threat-form]');if(tf){const base=['Authenticate clients, users, and servers','Use least privilege and explicit scopes','Log tool discovery, arguments, results, and errors','Support revocation, rollback, and incident response'];const map={
'sensitive-data':['Classify data and enforce field-level access','Minimize context and redact secrets','Test retention and deletion'],
'write-actions':['Require approval for high-impact actions','Use idempotency keys and dry-run mode','Define rollback and compensating actions'],
'external-content':['Treat retrieved content as untrusted','Separate instructions from data','Test prompt injection and tool poisoning'],
'multiple-servers':['Create a server trust registry','Prevent confused-deputy behavior','Apply per-server policies and isolation'],
'delegated-auth':['Validate token audience and scopes','Never pass through unrelated tokens','Record consent and delegated authority'],
'code-execution':['Run in a hardened sandbox','Restrict network and filesystem access','Scan outputs and enforce resource limits'],
'long-running':['Persist task state safely','Define cancellation, timeout, and resume','Prevent stale authorization'],
'multi-tenant':['Isolate tenant data, identity, logs, and quotas','Test cross-tenant leakage','Use tenant-aware encryption and access controls']};const run=()=>{let items=[...base];tf.querySelectorAll('input:checked').forEach(x=>items.push(...map[x.value]));items=[...new Set(items)];const out=document.querySelector('[data-threat-output]');out.querySelector('h3').textContent=`${items.length} controls to review`;out.querySelector('ul').innerHTML=items.map(x=>`<li>${x}</li>`).join('')};tf.addEventListener('change',run);run();}
const econ=document.querySelector('[data-economics-form]');if(econ){const run=()=>{const f=new FormData(econ),tasks=+f.get('tasks')||0,calls=+f.get('calls')||0,tokens=+f.get('tokens')||0,cost=+f.get('tokenCost')||0,retry=(+f.get('retry')||0)/100,review=(+f.get('review')||0)/100,mins=+f.get('minutes')||0,hourly=+f.get('hourly')||0;const modelCalls=tasks*calls*(1+retry),tokenVolume=modelCalls*tokens,modelCost=tokenVolume/1e6*cost,humanHours=tasks*review*mins/60,humanCost=humanHours*hourly,total=modelCost+humanCost;const fmt=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);document.querySelector('[data-economics-output]').innerHTML=`<article><span>MODEL CALLS</span><strong>${Math.round(modelCalls).toLocaleString()}</strong></article><article><span>MODEL COST</span><strong>${fmt(modelCost)}</strong></article><article><span>HUMAN REVIEW</span><strong>${fmt(humanCost)}</strong></article><article><span>EST. TOTAL</span><strong>${fmt(total)}</strong></article>`};econ.addEventListener('input',run);run();}
document.querySelectorAll('[data-company-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-company-filter]').forEach(x=>x.classList.remove('active'));b.classList.add('active');const f=b.dataset.companyFilter;document.querySelectorAll('[data-company-row]').forEach(r=>r.classList.toggle('is-hidden',f!=='all'&&!r.dataset.companyRow.split(/\s+/).includes(f)));}));
})();



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
 {title:'AI Systems Intelligence home',meta:'XTIANZ v37',url:'/'}
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


(()=>{
  'use strict';
  const RELEASE='v37-2026-07-29';
  window.XTIANZ_RELEASE=RELEASE;

  // Verify that the HTML and release manifest came from the same deployment.
  const marker=document.querySelector('meta[name="xtianz-build"]')?.content;
  (location.protocol.startsWith('http')?fetch('/release.json',{cache:'no-store'}):Promise.reject(new Error('non-http preview')))
    .then(r=>r.ok?r.json():Promise.reject(new Error(`HTTP ${r.status}`)))
    .then(data=>{
      if(marker!==data.build){console.warn(`XTIANZ deployment mismatch: HTML=${marker||'missing'}, manifest=${data.build||'missing'}`);}
      else{console.info(`XTIANZ ${data.build} verified`);}
    })
    .catch(err=>console.warn('XTIANZ release verification unavailable',err));

  // Ensure the current route is reflected even on utility and article pages.
  const path=location.pathname.replace(/\/$/,'')||'/';
  const links=[...document.querySelectorAll('.site-nav a')];
  if(!links.some(a=>a.hasAttribute('aria-current'))){
    const sectionMap={
      '/articles/what-is-mcp-ai-agents.html':'/ai-mcp.html',
      '/articles/ai-agents-enterprise-operations.html':'/ai-mcp.html',
      '/articles/mcp-security-governance-checklist.html':'/ai-mcp.html',
      '/articles/mcp-specification-status.html':'/ai-mcp.html',
      '/articles/top-ai-search-questions.html':'/ai-mcp.html',
      '/articles/mangos-explained-ai-companies.html':'/mangos.html',
      '/articles/private-ai-companies-openai-anthropic-spacex.html':'/mangos.html',
      '/articles/nvidia-ai-infrastructure-boom.html':'/markets.html',
      '/articles/ai-stock-movers-watchlist.html':'/markets.html',
      '/articles/ai-data-centers-power-water.html':'/markets.html',
      '/articles/dmv-ai-infrastructure-corridor.html':'/dmv.html',
      '/articles/xtianz-weekly-signal-method.html':'/signals.html'
    };
    const target=sectionMap[path]||path;
    links.find(a=>new URL(a.href,location.origin).pathname===target)?.setAttribute('aria-current','page');
  }

  // Mobile-navigation quality: close on Escape, link selection, or outside click.
  const nav=document.querySelector('#site-nav');
  const toggle=document.querySelector('.nav-toggle');
  if(nav&&toggle){
    const close=()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');};
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){close();toggle.focus();}});
    nav.addEventListener('click',e=>{if(e.target.closest('a'))close();});
    document.addEventListener('pointerdown',e=>{if(nav.classList.contains('open')&&!nav.contains(e.target)&&!toggle.contains(e.target))close();});
  }
})();


(()=>{
'use strict';
const drawer=document.querySelector('.mobile-drawer');
const backdrop=document.querySelector('[data-drawer-backdrop]');
let drawerOpener=null;
const openDrawer=(button)=>{if(!drawer||!backdrop)return;drawerOpener=button||document.activeElement;drawer.classList.add('is-open');drawer.setAttribute('aria-hidden','false');backdrop.hidden=false;document.body.classList.add('drawer-open');document.querySelectorAll('[data-drawer-open]').forEach(x=>x.setAttribute('aria-expanded','true'));setTimeout(()=>drawer.querySelector('a,button')?.focus(),20)};
const closeDrawer=()=>{if(!drawer||!backdrop)return;drawer.classList.remove('is-open');drawer.setAttribute('aria-hidden','true');backdrop.hidden=true;document.body.classList.remove('drawer-open');document.querySelectorAll('[data-drawer-open]').forEach(x=>x.setAttribute('aria-expanded','false'));drawerOpener?.focus?.()};
document.querySelectorAll('[data-drawer-open]').forEach(b=>b.addEventListener('click',()=>openDrawer(b)));
document.querySelectorAll('[data-drawer-close]').forEach(b=>b.addEventListener('click',closeDrawer));
backdrop?.addEventListener('click',closeDrawer);drawer?.addEventListener('click',e=>{if(e.target.closest('a'))closeDrawer()});
addEventListener('keydown',e=>{if(e.key==='Escape'&&drawer?.classList.contains('is-open'))closeDrawer()});
// Close desktop popovers when clicking elsewhere or selecting a link.
document.addEventListener('click',e=>document.querySelectorAll('.nav-cluster[open]').forEach(d=>{if(!d.contains(e.target))d.removeAttribute('open')}));
document.querySelectorAll('.nav-popover a').forEach(a=>a.addEventListener('click',()=>a.closest('details')?.removeAttribute('open')));
// On narrow screens, ensure wide tools and signal rails start at the first item.
if(matchMedia('(max-width:820px)').matches){document.querySelectorAll('.signal-scroll,.architecture-rail').forEach(el=>{el.scrollLeft=0});}
})();
