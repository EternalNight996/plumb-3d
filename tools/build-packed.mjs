import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { gzipSync, brotliCompressSync } from 'node:zlib';

const B = 'F:/MyApp/eternal/plumb3d/';
const shell = readFileSync(B + '_build/shell.html', 'utf8');
const engine = readFileSync(B + '_build/three.trim.js', 'utf8');
const game = readFileSync(B + '_build/game.min.js', 'utf8');

const boot = `
<script>
(function () {
  function bad(msg) {
    var d = document.createElement('div');
    d.style.cssText = 'position:fixed;inset:0;z-index:99;display:grid;place-items:center;background:#070b10;color:#dfe9f2;font:14px/1.7 ui-monospace,monospace;padding:24px;text-align:center';
    d.innerHTML = '当前浏览器不支持运行时解压（' + msg + '）<br>请打开 <b>index-plain.html</b>，那是未压缩版本。';
    document.body.appendChild(d);
  }
  if (!('DecompressionStream' in window)) { bad('DecompressionStream 缺失'); return; }
  function b64ToBytes(b64) {
    var bin = atob(b64), n = bin.length, u = new Uint8Array(n);
    for (var i = 0; i < n; i++) u[i] = bin.charCodeAt(i);
    return u;
  }
  async function inflate(id) {
    var el = document.getElementById(id);
    var bytes = b64ToBytes(el.textContent.replace(/\\s+/g, ''));
    var ds = new DecompressionStream('gzip');
    var stream = new Blob([bytes]).stream().pipeThrough(ds);
    return await new Response(stream).text();
  }
  (async function () {
    try {
        var code = await inflate('p0');
      var s = document.createElement('script');
      s.textContent = code;
      document.body.appendChild(s);
    } catch (e) {
      document.title = 'BOOT-ERR ' + (e && e.message);
      bad(e && e.message);
    }
  })();
})();
</script>`;

const joined = engine + '\n;' + game;
const gz = gzipSync(Buffer.from(joined, 'utf8'), { level: 9 });
const payload = gz.toString('base64');

const packed = shell
  .replace('__ENGINE__', '')
  .replace('__GAME__', '')
  .replace('</body>', '<script type="text/plain" id="p0">' + payload + '</script>\n' + boot + '\n</body>');

writeFileSync(B + 'index.html', packed);

const plain = shell.replace('__ENGINE__', () => engine).replace('__GAME__', () => game);
writeFileSync(B + 'index-plain.html', plain);

const kb = (n) => (n / 1024).toFixed(1) + ' KB';
console.log('packed  index.html      ' + kb(statSync(B + 'index.html').size));
console.log('        brotli          ' + kb(brotliCompressSync(readFileSync(B + 'index.html')).length));
console.log('plain   index-plain.html ' + kb(statSync(B + 'index-plain.html').size));
console.log('        brotli          ' + kb(brotliCompressSync(readFileSync(B + 'index-plain.html')).length));
console.log('scripts ' + kb(joined.length) + ' → gzip ' + kb(gz.length) + ' → base64 ' + kb(payload.length));
