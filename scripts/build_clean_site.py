#!/usr/bin/env python3
from pathlib import Path
import shutil
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'_site'
ROOT_FILES={
 'index.html','signals.html','architecture.html','ai-mcp.html','claude.html','mangos.html','lab.html','risk.html','markets.html','dmv.html','about.html','author.html','editorial-policy.html','privacy.html','disclaimer.html','contact.html','search.html','404.html',
 'release.json','sitemap.xml','robots.txt','CNAME','ads.txt','site.webmanifest','.nojekyll'
}
ARTICLES={
 'enterprise-ai-architecture-decision-framework.html','ai-agent-failure-modes-controls.html','ai-agents-enterprise-operations.html','what-is-mcp-ai-agents.html','mcp-security-governance-checklist.html','mcp-specification-status.html','claude-code-engineering-guide.html','claude-agents-tools-mcp.html','claude-enterprise-governance.html','ai-data-centers-power-water.html','dmv-ai-infrastructure-corridor.html','mangos-explained-ai-companies.html','nvidia-ai-infrastructure-boom.html','xtianz-weekly-signal-method.html'
}
if OUT.exists(): shutil.rmtree(OUT)
OUT.mkdir()
for name in ROOT_FILES:
    src=ROOT/name
    if src.exists(): shutil.copy2(src,OUT/name)
shutil.copytree(ROOT/'assets',OUT/'assets')
(OUT/'articles').mkdir()
for name in ARTICLES:
    shutil.copy2(ROOT/'articles'/name,OUT/'articles'/name)
print(f'Built clean deploy artifact: {OUT}')
print(f'Published articles: {len(ARTICLES)}')
