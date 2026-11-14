import { readFileSync, writeFileSync } from 'node:fs';
const base = 'F:/MyApp/eternal/plumb3d/';
const shell = readFileSync(base + '_build/shell.html', 'utf8');
const engine = readFileSync(base + '_build/three.trim.js', 'utf8');
const game = readFileSync(base + '_build/game.js', 'utf8');
const out = shell.replace('__ENGINE__', () => engine).replace('__GAME__', () => game);
writeFileSync(base + 'index.html', out);
console.log('index.html', (Buffer.byteLength(out) / 1024).toFixed(1) + ' KB');