window.XTIANZ_DATA={
  "signals": [
    {
      "id": "enterprise-agents",
      "num": "01",
      "date": "SEP 01",
      "category": "ENTERPRISE AGENTS",
      "confidence": "HIGH",
      "title": "The enterprise gap is shifting from access to operating capability.",
      "copy": "OpenAI reports that leading firms connect agents to company context and tools, delegate more substantive work, and make successful workflows repeatable.",
      "why": "Why it matters: architecture, permissions, evaluation and workflow design increasingly determine adoption depth.",
      "source": "OpenAI",
      "url": "https://openai.com/index/ai-native-company-workflows/"
    },
    {
      "id": "frontier-safeguards",
      "num": "02",
      "date": "SEP 01",
      "category": "GOVERNANCE",
      "confidence": "HIGH",
      "title": "Enterprise AI controls are moving closer to customer-controlled infrastructure.",
      "copy": "Anthropic announced Enterprise Frontier Safeguards, combining zero-data-retention goals with misuse safeguards and customer-controlled cloud storage.",
      "why": "Why it matters: privacy architecture and safety monitoring are becoming deployable system boundaries, not only policy statements.",
      "source": "Anthropic",
      "url": "https://www.anthropic.com/news/enterprise-frontier-safeguards"
    },
    {
      "id": "nvidia-datacenter",
      "num": "03",
      "date": "AUG 26",
      "category": "INFRASTRUCTURE",
      "confidence": "HIGH",
      "title": "AI infrastructure demand remains visible in data-center operating results.",
      "copy": "NVIDIA reported fiscal Q2 2027 Data Center revenue of $89.0B, up 117% year over year.",
      "why": "Why it matters: accelerator demand is still translating into large-scale infrastructure spending, while the full bottleneck chain extends beyond GPUs.",
      "source": "NVIDIA",
      "url": "https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-second-quarter-fiscal-2027"
    },
    {
      "id": "physical-agents",
      "num": "04",
      "date": "AUG 27",
      "category": "PHYSICAL AI",
      "confidence": "MEDIUM",
      "title": "Agent interoperability is beginning to move from software tools into physical equipment.",
      "copy": "Anthropic opened a research preview of the Model Hardware Standard for agents operating programmable scientific and manufacturing devices.",
      "why": "Why it matters: identity, authorization, verification and recovery become even more consequential when agent actions have physical side effects.",
      "source": "Anthropic",
      "url": "https://www.anthropic.com/news/model-hardware-standard-research-preview"
    },
    {
      "id": "mcp-2026",
      "num": "05",
      "date": "JUL 28",
      "category": "MCP",
      "confidence": "HIGH",
      "title": "MCP 2026-07-28 changes the production assumptions around remote servers.",
      "copy": "The specification introduced a stateless core, routing headers, cacheable list results, authorization hardening, extensions and formal deprecation handling.",
      "why": "Why it matters: teams should test compatibility and authorization behavior rather than treating MCP as a static integration layer.",
      "source": "Model Context Protocol",
      "url": "https://blog.modelcontextprotocol.io/posts/2026-07-28/"
    }
  ],
  "layers": {
    "intent": {
      "kicker": "01 / INTENT",
      "title": "Define the outcome before the architecture.",
      "copy": "Start with the user, decision, approval boundary and measurable result. The model comes later.",
      "href": "architecture.html"
    },
    "application": {
      "kicker": "02 / APPLICATION",
      "title": "Make the workflow legible to people.",
      "copy": "The application layer owns UX, task framing, checkpoints, errors and the handoff between people and automation.",
      "href": "architecture.html"
    },
    "agent": {
      "kicker": "03 / AGENT",
      "title": "Bound planning before expanding autonomy.",
      "copy": "Agents choose paths. Production systems also need budgets, state boundaries, evaluation, escalation and recovery.",
      "href": "ai-mcp.html"
    },
    "model": {
      "kicker": "04 / MODEL",
      "title": "Treat the model as one replaceable layer.",
      "copy": "Quality matters, but so do latency, context, tool use, governance, serving cost and fallback behavior.",
      "href": "claude.html"
    },
    "mcp": {
      "kicker": "05 / MCP + TOOLS",
      "title": "Separate reasoning from authority.",
      "copy": "Tool discovery is not authorization. Scope capabilities, authenticate actors, verify side effects and preserve an audit trail.",
      "href": "ai-mcp.html"
    },
    "data": {
      "kicker": "06 / DATA",
      "title": "Ground the system in controlled evidence.",
      "copy": "Retrieval, memory, freshness, access control and data lineage determine what the system can safely know.",
      "href": "architecture.html"
    },
    "compute": {
      "kicker": "07 / COMPUTE",
      "title": "Serving is an operating system problem.",
      "copy": "Capacity, accelerators, networking, reliability, observability and cost shape what AI can deliver at production scale.",
      "href": "markets.html"
    },
    "power": {
      "kicker": "08 / POWER",
      "title": "The final constraint can be physical.",
      "copy": "Grid capacity, cooling, fiber, land, permitting and construction connect AI demand to real places such as Northern Virginia.",
      "href": "dmv.html"
    }
  }
};
