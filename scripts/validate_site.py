#!/usr/bin/env python3
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote
import json, re, sys

ROOT=Path(__file__).resolve().parents[1]
EXPECTED='v36-2026-07-22'
REQUIRED=['index.html','signals.html','architecture.html','ai-mcp.html','mangos.html','lab.html','risk.html','markets.html','dmv.html','about.html','editorial-policy.html','privacy.html','disclaimer.html','contact.html','release.json','sitemap.xml','robots.txt','CNAME','assets/v36.css','assets/v36.js']
NAV=['/','/signals.html','/architecture.html','/ai-mcp.html','/mangos.html','/lab.html','/risk.html','/markets.html','/dmv.html','/about.html']
RETIRED=[r'World Cup',r'performance cars',r'Alinea Investing',r'Alinea referral']
errors=[]

for item in REQUIRED:
    if not (ROOT/item).is_file(): errors.append(f'Missing required file: {item}')

class Parser(HTMLParser):
    def __init__(self):
        super().__init__(); self.refs=[]; self.ids=[]; self.nav=[]; self.in_primary=False
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if a.get('id'): self.ids.append(a['id'])
        if tag=='nav' and a.get('id')=='site-nav': self.in_primary=True
        if tag=='a' and self.in_primary and a.get('href'): self.nav.append(a['href'])
        for key in ('href','src'):
            if a.get(key): self.refs.append(a[key])
    def handle_endtag(self,tag):
        if tag=='nav' and self.in_primary: self.in_primary=False

for page in ROOT.rglob('*.html'):
    rel=page.relative_to(ROOT)
    text=page.read_text(encoding='utf-8')
    if text.lower().count('<!doctype html>')!=1: errors.append(f'{rel}: expected exactly one doctype')
    if f'name="xtianz-build"' not in text or EXPECTED not in text: errors.append(f'{rel}: missing expected build marker')
    for retired in RETIRED:
        if re.search(retired,text,re.I): errors.append(f'{rel}: retired content matched {retired!r}')
    p=Parser(); p.feed(text)
    if p.nav!=NAV: errors.append(f'{rel}: primary navigation mismatch: {p.nav}')
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

try:
    release=json.loads((ROOT/'release.json').read_text())
    if release.get('build')!=EXPECTED: errors.append('release.json build does not match expected release')
except Exception as exc: errors.append(f'Invalid release.json: {exc}')

sitemap=(ROOT/'sitemap.xml').read_text(encoding='utf-8') if (ROOT/'sitemap.xml').exists() else ''
for href in NAV[1:]+['/editorial-policy.html','/privacy.html','/disclaimer.html']:
    url='https://xtianz.com'+href
    if url not in sitemap: errors.append(f'sitemap.xml missing {url}')

if errors:
    print('\n'.join(f'ERROR: {e}' for e in errors)); sys.exit(1)
print(f'XTIANZ {EXPECTED}: validation passed across {len(list(ROOT.rglob("*.html")))} HTML pages.')
