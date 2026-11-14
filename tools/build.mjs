#!/usr/bin/env node
/* builds dist/index-plain.html — uncompressed, readable, works everywhere */
import { mkdirSync, writeFileSync, readFileSync, statSync } from 'node:fs';
import { brotliCompressSync } from 'node:zlib';
import { join } from 'node:path';
import { ROOT, engine, game, shell, kb } from './lib.mjs';

const eng = engine();
const gam = game();
const html = shell().replace('__ENGINE__', () => eng).replace('__GAME__', () => gam);
const out = join(ROOT, 'dist/index-plain.html');
mkdirSync(join(ROOT, 'dist'), { recursive: true });
writeFileSync(out, html);
console.log('dist/index-plain.html ' + kb(statSync(out).size) + '  brotli ' + kb(brotliCompressSync(readFileSync(out)).length));
