#!/usr/bin/env python3
import os
import re
import sys
from html.parser import HTMLParser
from urllib.parse import urljoin
from urllib.request import urlopen, Request
from urllib.error import URLError

TARGET = sys.argv[1] if len(sys.argv) > 1 else 'https://центр-будущего.рф'
OUT = 'frontend/public/images/original'
os.makedirs(OUT, exist_ok=True)


def to_ascii_url(url: str) -> str:
  if '://' not in url:
    return url
  scheme, rest = url.split('://', 1)
  host, *tail = rest.split('/', 1)
  host_ascii = host.encode('idna').decode('ascii')
  return f"{scheme}://{host_ascii}/" + (tail[0] if tail else '')

TARGET = to_ascii_url(TARGET)

class ImgParser(HTMLParser):
  def __init__(self):
    super().__init__()
    self.urls = []
  def handle_starttag(self, tag, attrs):
    if tag.lower() == 'img':
      d = dict(attrs)
      src = d.get('src') or d.get('data-src')
      if src:
        self.urls.append(src)

try:
  req = Request(TARGET, headers={'User-Agent': 'Mozilla/5.0'})
  html = urlopen(req, timeout=30).read().decode('utf-8', errors='ignore')
except URLError as e:
  print(f'Cannot load {TARGET}: {e}')
  sys.exit(1)

parser = ImgParser()
parser.feed(html)

urls = []
for u in parser.urls:
  full = urljoin(TARGET, u)
  if re.search(r'\.(jpg|jpeg|png|webp|avif|gif|svg)(\?|$)', full, re.IGNORECASE):
    urls.append(full)

saved = 0
for i, u in enumerate(dict.fromkeys(urls), start=1):
  try:
    ext = re.search(r'\.(jpg|jpeg|png|webp|avif|gif|svg)', u, re.IGNORECASE)
    ext = ext.group(1).lower() if ext else 'jpg'
    path = os.path.join(OUT, f'original-{i}.{ext}')
    data = urlopen(Request(u, headers={'User-Agent': 'Mozilla/5.0'}), timeout=30).read()
    with open(path, 'wb') as f:
      f.write(data)
    saved += 1
    if saved >= 20:
      break
  except Exception as e:
    print(f'skip {u}: {e}')

print(f'Saved {saved} image(s) to {OUT}')
