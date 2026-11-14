#!/usr/bin/env node
/* builds dist/index.html — gzip + base64 self-extracting single file */
import { mkdirSync, writeFileSync, readFileSync, statSync } from 'node:fs';
import { gzipSync, brotliCompressSync } from 'node:zlib';
import { join } from 'node:path';
import { ROOT, engine, game, shell, kb } from './lib.mjs';

const joined = engine() + '\n;' + game();
const payload = gzipSync(Buffer.from(joined, 'utf8'), { level: 9 }).toString('base64');

const boot = `
<script>
(function () {
  function bad(msg) {
    var d = document.createElement('div');
    d.style.cssText = 'position:fixed;inset:0;z-index:99;display:grid;place-items:center;background:#070b10;color:#dfe9f2;font:14px/1.7 ui-monospace,monospace;padding:24px;text-align:center';
    d.innerHTML = 'This browser cannot inflate the payload (' + msg + ')<br>Open <b>index-plain.html</b> instead.';
    document.body.appendChild(d);
  }
  if (!('DecompressionStream' in window)) { bad('no DecompressionStream'); return; }
  function bytes(b64) {
    var bin = atob(b64), n = bin.length, u = new Uint8Array(n);
    for (var i = 0; i < n; i++) u[i] = bin.charCodeAt(i);
    return u;
  }
  (async function () {
    try {
      var el = document.getElementById('p0');
      var src = new Blob([bytes(el.textContent.replace(/\\s+/g, ''))]).stream().pipeThrough(new DecompressionStream('gzip'));
      var code = await new Response(src).text();
      var s = document.createElement('script');
      s.textContent = code;
      document.body.appendChild(s);
    } catch (e) { document.title = 'BOOT-ERR ' + (e && e.message); bad(e && e.message); }
  })();
})();
</script>`;

const html = shell()
  .replace('__ENGINE__', '')
  .replace('__GAME__', '')
  .replace('</body>', '<script type="text/plain" id="p0">' + payload + '</script>\n' + boot + '\n</body>');

const out = join(ROOT, 'dist/index.html');
mkdirSync(join(ROOT, 'dist'), { recursive: true });
writeFileSync(out, html);
console.log('dist/index.html       ' + kb(statSync(out).size) + '  brotli ' + kb(brotliCompressSync(readFileSync(out)).length));
console.log('scripts ' + kb(joined.length) + ' → gzip ' + kb(gzipSync(Buffer.from(joined, 'utf8'), { level: 9 }).length) + ' → base64 ' + kb(payload.length));
