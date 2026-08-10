#!/usr/bin/env python3
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote
import json, re, sys

ROOT=Path(__file__).resolve().parents[1]
EXPECTED='v43-2026-08-09'
REQUIRED=['index.html','signals.html','architecture.html','ai-mcp.html','claude.html','mangos.html','lab.html','risk.html','markets.html','dmv.html','about.html','author.html','editorial-policy.html','privacy.html','disclaimer.html','contact.html','search.html','release.json','sitemap.xml','robots.txt','CNAME','ads.txt','assets/site-v43.css','assets/app-v43.js','scripts/build_clean_site.py']
REQUIRED_NAV={'/','/signals.html','/architecture.html','/ai-mcp.html','/claude.html','/mangos.html','/lab.html','/risk.html','/markets.html','/dmv.html','/about.html'}
SITEMAP_REQUIRED={'/','/signals.html','/architecture.html','/ai-mcp.html','/claude.html','/mangos.html','/lab.html','/risk.html','/markets.html','/dmv.html','/about.html','/author.html','/editorial-policy.html'}
RETIRED_FILES={'top-ai-search-questions.html','ai-stock-movers-watchlist.html','private-ai-companies-openai-anthropic-spacex.html','claude-models-opus-sonnet-guide.html','claude-safety-constitution.html','claude-economic-index-work.html'}
FLAGSHIPS={
'enterprise-ai-architecture-decision-framework.html','ai-agent-failure-modes-controls.html','ai-agents-enterprise-operations.html','what-is-mcp-ai-agents.html','mcp-security-governance-checklist.html','mcp-specification-status.html','claude-code-engineering-guide.html','claude-agents-tools-mcp.html','claude-enterprise-governance.html','ai-data-centers-power-water.html','dmv-ai-infrastructure-corridor.html','mangos-explained-ai-companies.html','nvidia-ai-infrastructure-boom.html','xtianz-weekly-signal-method.html'}
ADSENSE_PUB='ca-pub-9242762673194411'
ADSENSE_SCRIPT='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+ADSENSE_PUB
errors=[]
for item in REQUIRED:
    if not (ROOT/item).is_file(): errors.append(f'Missing required file: {item}')

class Parser(HTMLParser):
    def __init__(self):
        super().__init__(); self.refs=[]; self.ids=[]; self.desktop_nav=[]; self.in_desktop=False
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if a.get('id'): self.ids.append(a['id'])
        classes=set((a.get('class') or '').split())
        if tag=='nav' and 'desktop-nav' in classes: self.in_desktop=True
        if tag=='a' and self.in_desktop and a.get('href'): self.desktop_nav.append(a['href'])
        for key in ('href','src'):
            if a.get(key): self.refs.append(a[key])
    def handle_endtag(self,tag):
        if tag=='nav' and self.in_desktop: self.in_desktop=False

def visible_word_count(text):
    text=re.sub(r'<script\b[^>]*>.*?</script>',' ',text,flags=re.S|re.I)
    text=re.sub(r'<style\b[^>]*>.*?</style>',' ',text,flags=re.S|re.I)
    text=re.sub(r'<[^>]+>',' ',text)
    return len(re.findall(r"[A-Za-z0-9][A-Za-z0-9’'\-]+",text))

for page in ROOT.rglob('*.html'):
    if page.name in RETIRED_FILES or '_site' in page.parts:
        continue
    rel=page.relative_to(ROOT); text=page.read_text(encoding='utf-8')
    if text.lower().count('<!doctype html>')!=1: errors.append(f'{rel}: expected exactly one doctype')
    if EXPECTED not in text or 'name="xtianz-build"' not in text: errors.append(f'{rel}: missing expected build marker')
    if text.count(ADSENSE_SCRIPT)!=1: errors.append(f'{rel}: expected exactly one AdSense loader')
    if text.count('name="google-adsense-account"')!=1: errors.append(f'{rel}: expected exactly one AdSense account meta')
    head=text.split('</head>',1)[0] if '</head>' in text else ''
    if ADSENSE_SCRIPT not in head or 'name="google-adsense-account"' not in head: errors.append(f'{rel}: AdSense elements must be inside head')
    for retired in ('World Cup','performance cars','Alinea Investing','Alinea referral'):
        if re.search(re.escape(retired),text,re.I): errors.append(f'{rel}: retired topic remains: {retired}')
    p=Parser(); p.feed(text)
    if set(p.desktop_nav)!=REQUIRED_NAV: errors.append(f'{rel}: desktop navigation mismatch')
    dup=sorted({x for x in p.ids if p.ids.count(x)>1})
    if dup: errors.append(f'{rel}: duplicate IDs: {dup}')
    for ref in p.refs:
        if ref.startswith(('#','mailto:','tel:','data:','javascript:')): continue
        u=urlparse(ref)
        if u.scheme or u.netloc: continue
        clean=unquote(u.path)
        if not clean: continue
        target=(ROOT/clean.lstrip('/')) if clean.startswith('/') else (page.parent/clean)
        if clean.endswith('/'): target=target/'index.html'
        if not target.exists(): errors.append(f'{rel}: missing local reference {ref}')
    if page.name in FLAGSHIPS:
        if visible_word_count(text)<800: errors.append(f'{rel}: flagship article is under 800 visible words')
        if '"@type":"Person"' not in text or 'https://xtianz.com/author.html' not in text: errors.append(f'{rel}: missing named Person author schema/profile')
        if 'PRIMARY SOURCES' not in text.upper() and 'PRIMARY-SOURCE' not in text.upper(): errors.append(f'{rel}: missing visible primary-source section/status')

release=json.loads((ROOT/'release.json').read_text(encoding='utf-8'))
if release.get('build')!=EXPECTED: errors.append('release.json build does not match expected release')
if release.get('indexableFlagshipArticles')!=len(FLAGSHIPS): errors.append('release.json flagship count mismatch')

sitemap=(ROOT/'sitemap.xml').read_text(encoding='utf-8')
for href in SITEMAP_REQUIRED:
    url='https://xtianz.com/' if href=='/' else 'https://xtianz.com'+href
    if url not in sitemap: errors.append(f'sitemap.xml missing {url}')
for retired in RETIRED_FILES:
    if retired in sitemap: errors.append(f'sitemap.xml includes retired page {retired}')
for f in FLAGSHIPS:
    if f not in sitemap: errors.append(f'sitemap.xml missing flagship article {f}')


for retired in RETIRED_FILES:
    for page in list(ROOT.glob('*.html')) + list((ROOT/'articles').glob('*.html')):
        if page.name in RETIRED_FILES:
            continue
        if retired in page.read_text(encoding='utf-8'):
            errors.append(f'{page.relative_to(ROOT)}: references retired page {retired}')

ads=(ROOT/'ads.txt').read_text(encoding='utf-8').strip()
if ads!='google.com, pub-9242762673194411, DIRECT, f08c47fec0942fa0': errors.append('ads.txt is missing or incorrect')

app=(ROOT/'assets/app-v43.js').read_text(encoding='utf-8')
for retired_phrase in ('Five AI Questions People Keep Searching','Top AI Stock Movers','Claude Models Guide: Choosing','How to Track OpenAI, Anthropic, and SpaceX'):
    if retired_phrase in app: errors.append(f'search index still contains retired phrase: {retired_phrase}')

if errors:
    print('\n'.join(f'ERROR: {e}' for e in errors)); sys.exit(1)
maintained=[p for p in ROOT.rglob('*.html') if p.name not in RETIRED_FILES and '_site' not in p.parts]
print(f'XTIANZ {EXPECTED}: validation passed across {len(maintained)} maintained HTML pages and {len(FLAGSHIPS)} flagship articles.')
