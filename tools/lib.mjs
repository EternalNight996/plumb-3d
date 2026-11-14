import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { gzipSync, brotliCompressSync } from 'node:zlib';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const BUILD = join(ROOT, 'build');
export const kb = (n) => (n / 1024).toFixed(1) + ' KB';

function run(args) {
  const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  execFileSync(npx, args, { cwd: ROOT, stdio: 'inherit', shell: process.platform === 'win32' });
}

// engine bundle: only the three.js classes the game actually uses (tree-shaken)
export function engine() {
  mkdirSync(BUILD, { recursive: true });
  const out = join(BUILD, 'three.js');
  run(['--yes', 'esbuild', 'tools/entry-trim.js', '--bundle', '--minify', '--format=iife', '--outfile=' + out]);
  return readFileSync(out, 'utf8');
}

// game source, minified
export function game() {
  mkdirSync(BUILD, { recursive: true });
  const out = join(BUILD, 'game.min.js');
  run(['--yes', 'esbuild', 'src/game.js', '--minify', '--target=es2020', '--outfile=' + out]);
  return readFileSync(out, 'utf8');
}

export const shell = () => readFileSync(join(ROOT, 'src/shell.html'), 'utf8');
export const shellPlain = () => readFileSync(join(ROOT, 'src/shell.html'), 'utf8');
