/* PLUMB 3D v2 - single-file 3D platformer: first person by default, double jump,
   mushroom power-ups, a shockwave skill. Zero assets: all geometry, textures and audio are code. */
(function () {
  'use strict';
  var __diagInstalled = true;
  window.addEventListener('error', function (ev) {
    document.title = 'ERR: ' + (ev.message || '') + ' @' + (ev.lineno || 0) + ':' + (ev.colno || 0);
  });
  var T = window.THREE;

  var I18N_EXTRA = true;
  var I18N = {
    zh: {
      coins: '金币', lives: '生命', score: '分数', time: '用时', progress: '进度', input: '输入',
      tod: '时段', view: '视角', quality: '画质', kbmode: '键鼠', touchmode: '触控',
      day: '白天', dusk: '黄昏', night: '夜晚', fp: '第一人称', tp: '第三人称',
      buffed: '吃蘑菇变身', tWeb: '丝', tJump: '跳', tFire: '火', tSkill: '震', tView: '视角',
      switch: '切换', switchTitle: '切换键鼠 / 触控',
      loading: '正在生成城市 · {p}%', loadingDone: '生成完成 · 100%',
      rotate: '建议横屏游玩',
      subtitle: '4200 米复杂关卡 · 第一人称 · 蜘蛛丝飞荡 · 三级跳 · 蘑菇变身 · 震波 · 守卫',
      keys: '<b>WASD</b> 移动 · <b>Shift</b> 冲刺 · <b>Space</b> 跳（长按更高）· <b>空中再按两次 Space</b> 三级跳<br><b>左键 / Q</b> 蛛丝：命中即飞，收线中再点换目标 · <b>E</b> 火球 · <b>C / 右键</b> 震波（需变身）<br><b>鼠标</b> 转视角 · <b>滚轮</b> 镜头远近（仅第三人称）<br><b>N</b> 白天/黄昏/夜晚 · <b>Esc</b> 暂停 · <b>V</b> 视角 · <b>1/2/3</b> 画质 · <b>[ ]</b> 灵敏度 · <b>I</b> 反转 Y · <b>F</b> 手感面板 · <b>M</b> 音乐 · <b>R</b> 回检查点 · <b>L</b> 中/英',
      winKeys: '按 <b>V</b> 换视角 · <b>R</b> 回检查点',
      start: '开始游戏', resume: '继续', restart: '重新开始', quit: '回到标题', again: '再来一次', pauseHint: 'Esc 或点下面继续',
      webReady: '蛛丝：就绪', webFlying: '蛛丝：射出中', webAttached: '蛛丝：{s}s · 左键可再发', webReeling: '蛛丝：收线中 · 左键可再发',
      fireReady: '火球 就绪（E）', fireCd: '火球 {s}s', district: '据点 {a}/{b}', districtTeleport: ' · T 传送',
      pauseTitle: '已暂停', overTitle: '游戏结束', winTitle: '通关！',
      toastSwitch: '已切换到键鼠/触控', toastTime: '时间：{v}', toastQuality: '画质 {v}',
      toastBest: '最佳纪录：{t} 秒',
      statsLine: '用时 {t} 秒 · 金币 {c} · 得分 {s} · 据点 {a}/{b}',
      winLine: '通关！用时 {t} 秒', winStats: '金币 {c} / {d} · 击倒 {p} · 得分 {s}',
      bestLine: '最佳纪录：{t} 秒 · 最高分 {s}', bestNew: '（本次刷新！）',
      tutorial1: '左键 / Q 吐蛛丝：命中即飞，收线中再点换目标',
      tutorial2: '空中再按两次 Space = 三级跳',
      tutorial3: 'E 火球 · C 震波（需蘑菇变身）',
      tutorial4: '清空据点后按 T 传送，Esc 暂停'
    },
    en: {
      coins: 'Coins', lives: 'Lives', score: 'Score', time: 'Time', progress: 'Progress', input: 'Input',
      tod: 'Time', view: 'View', quality: 'Quality', kbmode: 'Keyboard', touchmode: 'Touch',
      day: 'Day', dusk: 'Dusk', night: 'Night', fp: '1st person', tp: '3rd person',
      buffed: 'Mushroom power', tWeb: 'WEB', tJump: 'JUMP', tFire: 'FIRE', tSkill: 'PULSE', tView: 'VIEW',
      switch: 'Switch', switchTitle: 'Switch keyboard / touch',
      loading: 'Building the city · {p}%', loadingDone: 'Ready · 100%',
      rotate: 'Rotate your device for a wider view',
      subtitle: 'A 4200 m skyline course · first person · web swinging · triple jump · mushroom power · shockwave · guardians',
      keys: '<b>WASD</b> move · <b>Shift</b> sprint · <b>Space</b> jump (hold for height) · <b>two more Space</b> in air = triple jump<br><b>LMB / Q</b> web: sticks and pulls you instantly, click again to retarget · <b>E</b> fireball · <b>C / RMB</b> shockwave (needs mushroom)<br><b>Mouse</b> look · <b>Wheel</b> camera distance (3rd person)<br><b>N</b> day/dusk/night · <b>Esc</b> pause · <b>V</b> view · <b>1/2/3</b> quality · <b>[ ]</b> sensitivity · <b>I</b> invert Y · <b>F</b> feel panel · <b>M</b> music · <b>R</b> checkpoint · <b>L</b> 中文/EN',
      winKeys: '<b>V</b> view · <b>R</b> checkpoint',
      start: 'START', resume: 'Resume', restart: 'Restart', quit: 'Main menu', again: 'Play again', pauseHint: 'Esc or click below to resume',
      webReady: 'Web: ready', webFlying: 'Web: flying', webAttached: 'Web: {s}s · click to re-fire', webReeling: 'Web: reeling · click to re-fire',
      fireReady: 'Fireball ready (E)', fireCd: 'Fireball {s}s', district: 'Outposts {a}/{b}', districtTeleport: ' · T teleport',
      pauseTitle: 'PAUSED', overTitle: 'GAME OVER', winTitle: 'LEVEL CLEAR',
      toastSwitch: 'Input mode switched', toastTime: 'Time: {v}', toastQuality: 'Quality {v}',
      toastBest: 'Best: {t}s',
      statsLine: 'Time {t}s · Coins {c} · Score {s} · Outposts {a}/{b}',
      winLine: 'Cleared in {t}s', winStats: 'Coins {c} / {d} · Kills {p} · Score {s}',
      bestLine: 'Best: {t}s · Top score {s}', bestNew: ' (new record!)',
      tutorial1: 'LMB / Q fires the web: stick and fly, click again to retarget',
      tutorial2: 'Two more Space presses in the air = triple jump',
      tutorial3: 'E fireball · C shockwave (needs mushroom)',
      tutorial4: 'Clear an outpost then press T to teleport · Esc pauses'
    }
  };
  var lang = 'zh';
  function detectLang() {
    var q = /[?&]lang=(zh|en)/.exec(location.search);
    if (q) return q[1];
    try { var saved = localStorage.getItem('plumb3d.lang'); if (saved === 'zh' || saved === 'en') return saved; } catch (e) {}
    return /^zh/i.test(navigator.language || '') ? 'zh' : 'en';
  }
  function L(key, vars) {
    var dict = I18N[lang] || I18N.zh;
    var out = dict[key] !== undefined ? dict[key] : (I18N.zh[key] !== undefined ? I18N.zh[key] : key);
    if (vars) out = String(out).replace(/\{(\w+)\}/g, function (m, k2) { return vars[k2] !== undefined ? vars[k2] : m; });
    return out;
  }
  function applyLang(next) {
    lang = next || lang;
    try { localStorage.setItem('plumb3d.lang', lang); } catch (e) {}
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) nodes[i].textContent = L(nodes[i].getAttribute('data-i18n'));
    var htmlNodes = document.querySelectorAll('[data-i18n-html]');
    for (var j = 0; j < htmlNodes.length; j++) htmlNodes[j].innerHTML = L(htmlNodes[j].getAttribute('data-i18n-html'));
    var titleNodes = document.querySelectorAll('[data-i18n-title]');
    for (var k = 0; k < titleNodes.length; k++) titleNodes[k].setAttribute('title', L(titleNodes[k].getAttribute('data-i18n-title')));
    var pz = document.getElementById('pause'); if (pz) pz.querySelector('h1').innerHTML = lang === 'zh' ? 'PA<span>USED</span>' : 'PA<span>USED</span>';
    var to = document.getElementById('over'); if (to) to.querySelector('h1').innerHTML = lang === 'zh' ? 'GAME <span>OVER</span>' : 'GAME <span>OVER</span>';
    var tw = document.getElementById('win'); if (tw) tw.querySelector('h1').innerHTML = lang === 'zh' ? 'LEVEL <span>CLEAR</span>' : 'LEVEL <span>CLEAR</span>';
    if (window.__applyLangExtras) window.__applyLangExtras();
  }
  lang = detectLang();
  window.__frames = 0;
  window.__errors = window.__errors || [];

  var CFG = {
    gravity: 30, jump: 13.2, jumpHold: 0.24, doubleJump: 11.6,
    coyote: 0.13, buffer: 0.15, accel: 46, airAccel: 22, friction: 24,
    maxSpeed: 7.0, sprint: 10.2, radius: 0.42, height: 1.55,
    eye: 1.42, lookSpeed: 0.0032, pitchMin: -1.05, pitchMax: 1.05,
    camDist: 6.4, camLerp: 14, skillRadius: 6.0, skillCd: 1.0, buffTime: 14
  };

  var QUALITY = {
    low:  { dpr: 1.0, shadow: 512, msaa: false, fog: [28, 82] },
    mid:  { dpr: 1.75, shadow: 2048, msaa: true, fog: [45, 140] },
    high: { dpr: 2.0, shadow: 4096, msaa: true, fog: [60, 190] }
  };

  var state = 'ready';
  var quality = 'mid';
  var mode = 'fp';
  var scene, camera, renderer, clock, sun, fpRig;
  var colliders = [], movers = [], coins = [], enemies = [], blocks = [], mushrooms = [], particles = [];
  var player = {
    pos: new T.Vector3(0, 1.2, 6), vel: new T.Vector3(), onGround: false,
    coyote: 0, buffer: 0, airJumps: 1, invuln: 0, facing: 0, buff: 0, skillCd: 0, holdTime: 0, jumpHeld: false,
    grapple: { on: false, anchor: new T.Vector3(), len: 0, pulling: 0, cd: 0, target: false },
    star: 0, shield: 0
  };
  var spawn = new T.Vector3(0, 1.2, 6);
  var stats = { coins: 0, total: 0, lives: 3, time: 0, score: 0, popped: 0 };
  function detectInputMode() {
    var q = location.search;
    if (/[?&]touch=1/.test(q)) return 'touch';
    if (/[?&]mobile=1/.test(q)) return 'touch';
    if (/[?&]pc=1/.test(q)) return 'pc';
    var ua = navigator.userAgent || '';
    var mobileUA = /Android|iPhone|iPad|iPod|Mobile|HarmonyOS|MiuiBrowser|MicroMessenger|Windows Phone/i.test(ua);
    var coarse = typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches;
    var fine = typeof matchMedia === 'function' && matchMedia('(pointer: fine)').matches;
    var hover = typeof matchMedia === 'function' && matchMedia('(hover: hover)').matches;
    var touchPoints = navigator.maxTouchPoints || 0;
    var shortSide = Math.min(window.innerWidth || 9999, window.innerHeight || 9999);
    // a desktop with a touchscreen reports touch points but also a fine, hovering pointer
    if (fine && hover && !mobileUA && shortSide > 700) return 'pc';
    if (mobileUA) return 'touch';
    if (coarse && !fine) return 'touch';
    if (touchPoints > 0 && shortSide <= 700) return 'touch';
    return hover || fine ? 'pc' : (touchPoints > 0 ? 'touch' : 'pc');
  }
  var inputMode = detectInputMode();
  var isTouch = inputMode === 'touch';
  var dragLook = !isTouch;
  var immersive = false;

  function setImmersive(on) {
    if (isTouch) on = false;
    if (immersive === on) return;
    immersive = on;
    document.documentElement.classList.toggle('playing', on);
    document.body.classList.toggle('playing', on);
    var el = renderer && renderer.domElement;
    if (el) el.style.cursor = on ? 'none' : 'default';
    if (on && el && el.requestFullscreen && !document.fullscreenElement) {
      try { el.requestFullscreen({ navigationUI: 'hide' }); } catch (e) {}
    }
  }

  // Everything except Esc is ours while playing: no Tab focus, no Space scroll, no Ctrl+S/P/F/G…
  function keepFocus() {
    if (!immersive) return;
    var el = renderer && renderer.domElement;
    if (el && document.activeElement !== el && typeof el.focus === 'function') {
      try { el.focus({ preventScroll: true }); } catch (e) { el.focus(); }
    }
  }

  function guardKeys(e) {
    if (!immersive) return;
    var k = e.key || '';
    if (k === 'Escape') return;                       // must stay available to leave pointer lock / fullscreen
    if (k === 'Meta' || k === 'OS') return;           // the Win key cannot be intercepted by a page
    if (e.ctrlKey || e.metaKey) { e.preventDefault(); return; }
    var blocked = ['Tab', 'Backspace', 'Enter', ' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
      'PageUp', 'PageDown', 'Home', 'End', 'Insert', 'ContextMenu', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6',
      'F7', 'F9', 'F10', 'F12'];
    if (blocked.indexOf(k) >= 0 || k.indexOf('F') === 0) { e.preventDefault(); }
  }
  var touch = { active: false, mx: 0, my: 0, lookId: 0, lookX: 0, lookY: 0, lookDx: 0, lookDy: 0 };
  var input = { keys: Object.create(null), yaw: 0, pitch: 0.04, locked: false, dist: CFG.camDist, invert: false };
  var model = null, limbs = [], eyes = [];
  var goal = null, frameSamples = [], toastTimer = 0;
  var fps = { frames: 0, last: 0, ema: 60, shown: 0, worst: 0, best: 999 };
  var dyn = { scale: 1, cooldown: 0 };
  var composer = null, bloomPass = null, ssaoPass = null, outputPass = null, bloomOn = true, bloomAutoOff = false;
  var TIME_PRESETS = {
    day:   { sun: 0xfff2d8, sunI: 2.6, hemiSky: 0xdff0ff, hemiGround: 0x4c5a44, hemiI: 1.9, fog: 0xbcd8ec, fogNear: 34, fogFar: 88, exposure: 1.02, bloom: 0.42, bg: 1.00 },
    dusk:  { sun: 0xffb070, sunI: 1.7, hemiSky: 0xffc9a0, hemiGround: 0x40302a, hemiI: 1.15, fog: 0xe0a882, fogNear: 26, fogFar: 74, exposure: 1.06, bloom: 0.58, bg: 0.65 },
    night: { sun: 0x9fc0ff, sunI: 0.55, hemiSky: 0x3a4a72, hemiGround: 0x1a1c22, hemiI: 0.6, fog: 0x1b2740, fogNear: 18, fogFar: 56, exposure: 1.16, bloom: 0.78, bg: 0.22 }
  };
  var timeOfDay = 'day';
  var TEX = {};

  // ---------------- textures drawn in code ----------------
  function canvasTex(size, paint, repeat) {
    var c = document.createElement('canvas');
    c.width = c.height = size;
    paint(c.getContext('2d'), size);
    var t = new T.CanvasTexture(c);
    t.wrapS = t.wrapT = T.RepeatWrapping;
    if (repeat) t.repeat.set(repeat, repeat);
    t.colorSpace = T.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  }
  function noise(g, s, n, colors, size) {
    for (var i = 0; i < n; i++) {
      g.fillStyle = colors[i % colors.length];
      g.fillRect(Math.random() * s, Math.random() * s, size, size);
    }
  }
  var windUniforms = { time: { value: 0 } };
  function windify(material, strength, height) {
    material.onBeforeCompile = function (shader) {
      shader.uniforms.uWindTime = windUniforms.time;
      shader.vertexShader = 'uniform float uWindTime;\n' + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        '#include <begin_vertex>\n' +
        '  float hw = clamp(transformed.y / ' + height.toFixed(2) + ', 0.0, 1.0);\n' +
        '  float phase = uWindTime * 1.6 + transformed.x * 0.35 + transformed.z * 0.27;\n' +
        '  transformed.x += sin(phase) * ' + strength.toFixed(3) + ' * hw;\n' +
        '  transformed.z += cos(phase * 0.8) * ' + (strength * 0.6).toFixed(3) + ' * hw;\n'
      );
    };
    material.customProgramCacheKey = function () { return 'wind' + strength + height; };
    return material;
  }

  function buildTextures() {
    TEX.grass = canvasTex(256, function (g, s) {
      g.fillStyle = '#4d7d38'; g.fillRect(0, 0, s, s);
      noise(g, s, 2600, ['#578c3f', '#446f31', '#5f9647', '#3d6329'], 3);
      for (var i = 0; i < 260; i++) {
        g.strokeStyle = i % 2 ? '#6aa052' : '#3b5f28';
        g.beginPath();
        var x = Math.random() * s, y = Math.random() * s;
        g.moveTo(x, y); g.lineTo(x + Math.random() * 4 - 2, y - 4 - Math.random() * 4); g.stroke();
      }
    }, 8);
    TEX.brick = canvasTex(256, function (g, s) {
      g.fillStyle = '#9a5237'; g.fillRect(0, 0, s, s);
      g.strokeStyle = '#5d2c1c'; g.lineWidth = 5;
      for (var y = 0; y < s; y += 48) {
        g.beginPath(); g.moveTo(0, y); g.lineTo(s, y); g.stroke();
        for (var x = (y / 48) % 2 ? 0 : 48; x < s; x += 96) { g.beginPath(); g.moveTo(x, y); g.lineTo(x, y + 48); g.stroke(); }
      }
      noise(g, s, 700, ['#a85a3d', '#8c4830', '#b06a45'], 4);
    }, 1);
    TEX.question = canvasTex(256, function (g, s) {
      g.fillStyle = '#e0a12c'; g.fillRect(0, 0, s, s);
      g.strokeStyle = '#8a5c10'; g.lineWidth = 10; g.strokeRect(5, 5, s - 10, s - 10);
      g.fillStyle = '#fff7dc';
      g.font = 'bold 168px ui-monospace, monospace';
      g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText('?', s / 2, s / 2 + 8);
      noise(g, s, 300, ['rgba(0,0,0,0.06)', 'rgba(255,255,255,0.05)'], 6);
    }, 1);
    TEX.stone = canvasTex(256, function (g, s) {
      g.fillStyle = '#79848f'; g.fillRect(0, 0, s, s);
      for (var row = 0; row < 8; row++) {
        var y = row * 32;
        g.fillStyle = row % 2 ? '#818c97' : '#727d88';
        g.fillRect(0, y, s, 30);
        g.strokeStyle = '#5d6771'; g.lineWidth = 3;
        g.beginPath(); g.moveTo(0, y + 31); g.lineTo(s, y + 31); g.stroke();
      }
      noise(g, s, 900, ['#8b96a1', '#6b7681'], 3);
    }, 4);
    TEX.dirt = new T.MeshStandardMaterial({ color: 0x6b4a2d, roughness: 0.96 });
  }

  var clouds = [];
  var water = null, waterReflector = null;
  function buildWaterReflector() {
    if (typeof T.Reflector !== 'function' || quality !== 'high') return;
    var geo = new T.PlaneGeometry(760, LEVEL_LEN + 420, 8, 20);
    waterReflector = new T.Reflector(geo, {
      clipBias: 0.003,
      textureWidth: 256,
      textureHeight: 256,
      color: 0x8fb6cc
    });
    waterReflector.rotation.x = -Math.PI / 2;
    waterReflector.position.set(0, -1.18, -(LEVEL_LEN / 2) + 10);
    scene.add(waterReflector);
  }

  function buildWater() {
    var geo = new T.PlaneGeometry(760, LEVEL_LEN + 420, isTouch ? 16 : 40, isTouch ? 40 : 140);
    var mat = new T.MeshStandardMaterial({ color: 0x2f6f8f, roughness: 0.15, metalness: 0.6, transparent: true, opacity: 0.9 });
    mat.onBeforeCompile = function (sh) {
      sh.uniforms.uTime = windUniforms.time;
      sh.vertexShader = 'uniform float uTime;\n' + sh.vertexShader;
      sh.vertexShader = sh.vertexShader.replace(
        '#include <begin_vertex>',
        '#include <begin_vertex>\n' +
        '  float w = sin(transformed.x * 0.18 + uTime * 1.1) * 0.12 + cos(transformed.y * 0.14 + uTime * 0.8) * 0.1;\n' +
        '  transformed.z += w;\n'
      );
    };
    mat.customProgramCacheKey = function () { return 'water'; };
    water = new T.Mesh(geo, mat);
    water.rotation.x = -Math.PI / 2;
    water.position.set(0, -1.2, -(LEVEL_LEN / 2) + 10);
    scene.add(water);
    buildWaterReflector();
    if (waterReflector) water.visible = false;
  }

  function splash(x, z) {
    for (var i = 0; i < 18; i++) {
      var a = Math.random() * Math.PI * 2;
      spawnParticle(x, -1.0, z, Math.cos(a) * (1 + Math.random() * 3), 3 + Math.random() * 4, Math.sin(a) * (1 + Math.random() * 3), 0xbfe6ff, 0.1, 0.5);
    }
    addShake(0.25);
    tone(420, 0.2, 'sine', 0.07, 0.4);
  }

  var leaves = null, leafMesh = null;
  function buildLeaves() {
    var geo = new T.PlaneGeometry(0.22, 0.14);
    var mat = new T.MeshStandardMaterial({ color: 0x9ec46a, roughness: 0.9, side: T.DoubleSide, transparent: true, opacity: 0.95 });
    leafMesh = new T.InstancedMesh(geo, mat, 120);
    leafMesh.instanceMatrix.setUsage(T.DynamicDrawUsage);
    scene.add(leafMesh);
    leaves = [];
    for (var i = 0; i < (isTouch ? 60 : 120); i++) {
      leaves.push({
        p: new T.Vector3((Math.random() - 0.5) * 40, 1 + Math.random() * 14, 6 - Math.random() * 60),
        spin: new T.Vector3(Math.random() * 6, Math.random() * 6, Math.random() * 6),
        rot: new T.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6),
        fall: 0.6 + Math.random() * 1.2,
        phase: Math.random() * 6
      });
    }
  }

  var leafM4 = null, leafQ = null, leafS = null;
  function updateLeaves(dt) {
    if (!leaves || !leafMesh) return;
    if (!leafM4) { leafM4 = new T.Matrix4(); leafQ = new T.Quaternion(); leafS = new T.Vector3(1, 1, 1); }
    var t = windUniforms.time.value;
    for (var i = 0; i < leaves.length; i++) {
      var lf = leaves[i];
      var gust = 2.2 + Math.sin(t * 0.7 + lf.phase) * 2.4;
      lf.p.x += gust * dt;
      lf.p.y -= lf.fall * dt;
      lf.p.z += Math.cos(t * 0.5 + lf.phase) * 0.8 * dt;
      lf.rot.x += lf.spin.x * dt;
      lf.rot.y += lf.spin.y * dt;
      lf.rot.z += lf.spin.z * dt;
      // recycle around the player so the field is always visible without spawning everywhere
      if (lf.p.y < 0.1 || Math.abs(lf.p.x - player.pos.x) > 26 || Math.abs(lf.p.z - player.pos.z) > 40) {
        lf.p.set(player.pos.x + (Math.random() - 0.5) * 30, 6 + Math.random() * 12, player.pos.z - 8 - Math.random() * 26);
      }
      leafQ.setFromEuler(lf.rot);
      leafM4.compose(lf.p, leafQ, leafS);
      leafMesh.setMatrixAt(i, leafM4);
    }
    leafMesh.instanceMatrix.needsUpdate = true;
  }

  function buildClouds() {
    var c = document.createElement('canvas');
    c.width = c.height = 256;
    var g5 = c.getContext('2d');
    var rg = g5.createRadialGradient(128, 128, 8, 128, 128, 128);
    rg.addColorStop(0, 'rgba(255,255,255,0.95)');
    rg.addColorStop(0.5, 'rgba(255,255,255,0.45)');
    rg.addColorStop(1, 'rgba(255,255,255,0)');
    g5.fillStyle = rg;
    g5.beginPath(); g5.arc(128, 128, 128, 0, Math.PI * 2); g5.fill();
    var tex = new T.CanvasTexture(c);
    tex.colorSpace = T.SRGBColorSpace;
    for (var i = 0; i < (isTouch ? 10 : 22); i++) {
      var m = new T.Sprite(new T.SpriteMaterial({ map: tex, transparent: true, opacity: 0.55, depthWrite: false }));
      var scale = 40 + Math.random() * 70;
      m.scale.set(scale, scale * 0.55, 1);
      m.position.set((Math.random() - 0.5) * 300, 26 + Math.random() * 34, 10 - Math.random() * (LEVEL_LEN + 80));
      m.material.color.setHex(0xdfe9f5);
      m.material.opacity = 0.4 + Math.random() * 0.25;
      scene.add(m);
      clouds.push({ obj: m, speed: 0.6 + Math.random() * 1.4 });
    }
  }

  function updateClouds(dt) {
    for (var i = 0; i < clouds.length; i++) {
      var cl = clouds[i];
      cl.obj.position.x += cl.speed * dt;
      if (cl.obj.position.x > 150) cl.obj.position.x = -150;
    }
  }

  function buildSky() {
    var c = document.createElement('canvas');
    c.width = 1024; c.height = 512;
    var g = c.getContext('2d');
    var grad = g.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0.0, '#2f6fb6');
    grad.addColorStop(0.42, '#79b3dd');
    grad.addColorStop(0.62, '#c6e2f2');
    grad.addColorStop(0.78, '#eef2ec');
    grad.addColorStop(1.0, '#dfe6dc');
    g.fillStyle = grad; g.fillRect(0, 0, 1024, 512);
    for (var i = 0; i < 40; i++) {
      var cx = Math.random() * 1024, cy = 40 + Math.random() * 190, r = 24 + Math.random() * 70;
      g.fillStyle = 'rgba(255,255,255,' + (0.08 + Math.random() * 0.22) + ')';
      g.beginPath(); g.ellipse(cx, cy, r * 2, r, 0, 0, Math.PI * 2); g.fill();
    }
    var t = new T.CanvasTexture(c);
    t.mapping = T.EquirectangularReflectionMapping;
    t.colorSpace = T.SRGBColorSpace;
    return t;
  }
  // ---------------- level pieces ----------------
  function dirt() { return TEX.dirt; }
  function boxMaterials(top) { var s = dirt(); return [s, s, top, s, s, s]; }

  function addBox(x, y, z, sx, sy, sz, mat, opts) {
    opts = opts || {};
    var mesh = new T.Mesh(new T.BoxGeometry(sx, sy, sz), mat);
    mesh.position.set(x, y + sy / 2, z);
    mesh.castShadow = true; mesh.receiveShadow = true;
    scene.add(mesh);
    var c = null;
    if (opts.collide !== false) {
      c = { min: new T.Vector3(x - sx / 2, y, z - sz / 2), max: new T.Vector3(x + sx / 2, y + sy, z + sz / 2) };
      colliders.push(c);
      if (opts.mover) { c.mover = opts.mover; c.base = c.min.clone(); c.w = sx; c.mesh = mesh; movers.push(c); }
    }
    return { mesh: mesh, collider: c };
  }

  var inst = { ground: [], towerBody: [], towerRoof: [], ledge: [], platform: [] };

  function queueGround(x, z, w, d) {
    inst.ground.push({ x: x, y: -1.2, z: z, sx: w, sy: 1.2, sz: d });
    colliders.push({ min: new T.Vector3(x - w / 2, -1.2, z - d / 2), max: new T.Vector3(x + w / 2, 0, z + d / 2) });
  }

  function flushInstances() {
    var m4 = new T.Matrix4(), q = new T.Quaternion(), pos = new T.Vector3(), scl = new T.Vector3();
    var CHUNK = 300;
    function make(list, material, cast) {
      if (!list.length) return null;
      var buckets = {};
      for (var b = 0; b < list.length; b++) {
        var key = Math.floor(-list[b].z / CHUNK);
        (buckets[key] = buckets[key] || []).push(list[b]);
      }
      var geo = new T.BoxGeometry(1, 1, 1);
      Object.keys(buckets).forEach(function (key) {
        var arr = buckets[key];
        var mesh = new T.InstancedMesh(geo, material, arr.length);
        mesh.castShadow = !!cast; mesh.receiveShadow = true;
        for (var i = 0; i < arr.length; i++) {
          var it = arr[i];
          pos.set(it.x, it.y + it.sy / 2, it.z);
          scl.set(it.sx, it.sy, it.sz);
          m4.compose(pos, q, scl);
          mesh.setMatrixAt(i, m4);
        }
        mesh.instanceMatrix.needsUpdate = true;
        mesh.computeBoundingSphere();
        scene.add(mesh);
      });
      return null;
    }
    // Lambert instead of Standard on the big static surfaces: same look, far cheaper per pixel
    var grassM = new T.MeshLambertMaterial({ map: TEX.grass });
    var facadeM = new T.MeshLambertMaterial({ map: facadeAtlas() });
    var roofM = new T.MeshLambertMaterial({ color: 0x55606e });
    var stoneM = new T.MeshLambertMaterial({ map: TEX.stone });
    make(inst.ground, grassM, true);
    make(inst.towerBody, facadeM, true);
    make(inst.towerRoof, roofM, true);
    make(inst.ledge, facadeM, true);
    make(inst.platform, stoneM, true);
  }

  var facadeAtlasTex = null;
  function facadeAtlas() {
    if (facadeAtlasTex) return facadeAtlasTex;
    var c = document.createElement('canvas');
    c.width = 256; c.height = 512;
    var gg = c.getContext('2d');
    gg.fillStyle = '#8b929c'; gg.fillRect(0, 0, 256, 512);
    var cols = 7, rows = 20, cw = 256 / cols, ch = 512 / rows;
    for (var r = 0; r < rows; r++) {
      for (var cc = 0; cc < cols; cc++) {
        var lit = Math.random();
        gg.fillStyle = lit > 0.82 ? 'rgba(255,226,150,0.95)' : lit > 0.6 ? 'rgba(120,160,200,0.55)' : 'rgba(40,52,66,0.85)';
        gg.fillRect(cc * cw + cw * 0.18, r * ch + ch * 0.2, cw * 0.64, ch * 0.58);
      }
    }
    facadeAtlasTex = new T.CanvasTexture(c);
    facadeAtlasTex.colorSpace = T.SRGBColorSpace;
    return facadeAtlasTex;
  }

  function addGround(x, z, w, d) {
    queueGround(x, z, w, d);
    return null;
  }

  function addGroundOld(x, z, w, d) {
    var grassMat = new T.MeshStandardMaterial({ map: TEX.grass, roughness: 0.95 });
    var b = addBox(x, -1.2, z, w, 1.2, d, grassMat);
    b.mesh.material = boxMaterials(grassMat);
    return b;
  }

  function addPlatform(x, y, z, sx, sz, mover) {
    addContactShadow(x, 0, z, Math.max(sx, sz) * 1.15, 0.22);
    if (mover) {
      var matM = new T.MeshLambertMaterial({ map: TEX.stone });
      return addBox(x, y, z, sx, 0.5, sz, matM, { mover: mover });
    }
    inst.platform.push({ x: x, y: y, z: z, sx: sx, sy: 0.5, sz: sz });
    var c = { min: new T.Vector3(x - sx / 2, y, z - sz / 2), max: new T.Vector3(x + sx / 2, y + 0.5, z + sz / 2) };
    colliders.push(c);
    return { mesh: null, collider: c };
  }

  function addPipe(x, z, h) {
    var green = new T.MeshStandardMaterial({ color: 0x3aa45c, roughness: 0.45, metalness: 0.08 });
    var body = new T.Mesh(new T.CylinderGeometry(0.85, 0.85, h, 20), green);
    body.position.set(x, h / 2, z); body.castShadow = true; body.receiveShadow = true; scene.add(body);
    var lip = new T.Mesh(new T.CylinderGeometry(1.02, 1.02, 0.3, 20), green);
    lip.position.set(x, h + 0.1, z); lip.castShadow = true; scene.add(lip);
    colliders.push({ min: new T.Vector3(x - 0.9, 0, z - 0.9), max: new T.Vector3(x + 0.9, h + 0.2, z + 0.9) });
  }

  function addCoin(x, y, z) {
    var mat = new T.MeshStandardMaterial({ color: 0xffc53d, emissive: 0x8a5a00, emissiveIntensity: 0.7, metalness: 0.75, roughness: 0.25 });
    var m = new T.Mesh(new T.TorusGeometry(0.28, 0.11, 10, 22), mat);
    m.position.set(x, y, z); m.rotation.y = Math.PI / 2; m.castShadow = true;
    scene.add(m);
    coins.push({ mesh: m, taken: false, base: y });
  }

  function addBlock(x, y, z) {
    var mat = new T.MeshStandardMaterial({ map: TEX.question, roughness: 0.75, emissive: 0x6a4200, emissiveIntensity: 0.32 });
    var b = addBox(x, y, z, 1.2, 1.2, 1.2, mat);
    blocks.push({ mesh: b.mesh, collider: b.collider, used: false, bob: Math.random() * 6 });
  }

  function addMushroom(x, y, z) {
    var g = new T.Group();
    var stem = new T.Mesh(new T.CylinderGeometry(0.16, 0.2, 0.42, 12), new T.MeshStandardMaterial({ color: 0xf2e6cf, roughness: 0.8 }));
    stem.position.y = 0.21; stem.castShadow = true; g.add(stem);
    var capMat = new T.MeshStandardMaterial({ color: 0xe23b3b, roughness: 0.45, emissive: 0x5a0000, emissiveIntensity: 0.45 });
    var cap = new T.Mesh(new T.SphereGeometry(0.36, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), capMat);
    cap.position.y = 0.42; cap.castShadow = true; g.add(cap);
    var dotMat = new T.MeshStandardMaterial({ color: 0xfff6e2, roughness: 0.6 });
    for (var i = 0; i < 5; i++) {
      var a = i / 5 * Math.PI * 2;
      var d = new T.Mesh(new T.SphereGeometry(0.065, 8, 8), dotMat);
      d.position.set(Math.cos(a) * 0.22, 0.52, Math.sin(a) * 0.22);
      g.add(d);
    }
    g.position.set(x, y, z);
    scene.add(g);
    mushrooms.push({ obj: g, taken: false, t: Math.random() * 6 });
  }

  function addEnemy(x, z, range, speed, chaser) {
    var g = new T.Group();
    var body = new T.Mesh(new T.SphereGeometry(0.46, 18, 14), new T.MeshStandardMaterial({ color: 0x8f5bd0, roughness: 0.55 }));
    body.position.y = 0.46; body.castShadow = true; g.add(body);
    var cap = new T.Mesh(new T.SphereGeometry(0.5, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2.3), new T.MeshStandardMaterial({ color: 0x5f2f96, roughness: 0.5 }));
    cap.position.y = 0.54; cap.castShadow = true; g.add(cap);
    var eyeMat = new T.MeshStandardMaterial({ color: 0xf7f7ff });
    var pupil = new T.MeshStandardMaterial({ color: 0x14101c });
    for (var s2 = -1; s2 <= 1; s2 += 2) {
      var e = new T.Mesh(new T.SphereGeometry(0.11, 10, 10), eyeMat);
      e.position.set(0.17 * s2, 0.52, 0.4); g.add(e);
      var pu = new T.Mesh(new T.SphereGeometry(0.055, 8, 8), pupil);
      pu.position.set(0.17 * s2, 0.52, 0.48); g.add(pu);
    }
    g.position.set(x, 0, z);
    scene.add(g);
    var rec = { obj: g, home: new T.Vector3(x, 0, z), range: range, speed: speed, dir: 1, alive: true, chaser: !!chaser, dead: 0 };
    enemies.push(rec);
    return rec;
  }

  // ---------------- level: a long procedural course (about 10x the old one) ----------------
  var LEVEL_LEN = 4200;              // metres from the start pad to the flag
  var checkpoints = [];
  var rngState = 20261113;
  function rnd() { rngState = (rngState * 1103515245 + 12345) & 0x7fffffff; return rngState / 0x7fffffff; }
  function pick(a) { return a[Math.floor(rnd() * a.length) % a.length]; }

  var spikes = [];
  function addSpikes(x, z, w) {
    var g = new T.Group();
    var base = new T.Mesh(new T.BoxGeometry(w, 0.12, 1.2), new T.MeshStandardMaterial({ color: 0x2a2f3a, roughness: 0.9 }));
    base.position.y = 0.06; base.receiveShadow = true; g.add(base);
    var mat = new T.MeshStandardMaterial({ color: 0xd9dde4, metalness: 0.6, roughness: 0.35 });
    var n = Math.max(2, Math.round(w / 0.42));
    for (var i = 0; i < n; i++) {
      var sp = new T.Mesh(new T.ConeGeometry(0.13, 0.62, 6), mat);
      sp.position.set(-w / 2 + (i + 0.5) * (w / n), 0.42, 0);
      sp.castShadow = true;
      g.add(sp);
    }
    g.position.set(x, 0, z);
    scene.add(g);
    spikes.push({ x: x, z: z, w: w });
  }

  var towers = [];

  var webNodes = [];
  function addWebNode(x, y, z) {
    var g3 = new T.Group();
    var ring = new T.Mesh(new T.TorusGeometry(0.75, 0.1, 10, 26), new T.MeshStandardMaterial({ color: 0xfff3c4, emissive: 0xffc23a, emissiveIntensity: 1.2, metalness: 0.4, roughness: 0.3 }));
    ring.rotation.x = -Math.PI / 2;
    g3.add(ring);
    var core = new T.Mesh(new T.SphereGeometry(0.16, 10, 8), new T.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffe08a, emissiveIntensity: 1.6 }));
    g3.add(core);
    var halo = new T.Mesh(new T.TorusGeometry(1.05, 0.045, 8, 30), new T.MeshBasicMaterial({ color: 0x9fe8ff, transparent: true, opacity: 0.55 }));
    halo.rotation.x = -Math.PI / 2;
    g3.add(halo);
    g3.position.set(x, y, z);
    scene.add(g3);
    g3.userData.halo = halo;
    // a small solid target so the web ray can actually hit it
    colliders.push({ min: new T.Vector3(x - 0.5, y - 0.5, z - 0.5), max: new T.Vector3(x + 0.5, y + 0.5, z + 0.5), node: true });
    webNodes.push({ obj: g3, ring: ring, x: x, y: y, z: z, t: Math.random() * 6 });
  }

  function updateWebNodes(dt) {
    for (var i = 0; i < webNodes.length; i++) {
      var n2 = webNodes[i];
      n2.t += dt;
      n2.obj.rotation.y += dt * 0.8;
      n2.ring.position.y = Math.sin(n2.t * 1.6) * 0.18;
      n2.ring.material.emissiveIntensity = 0.9 + Math.sin(n2.t * 3) * 0.35;
      if (n2.obj.userData.halo) {
        n2.obj.userData.halo.rotation.z += dt * 0.9;
        var aimed = n2.aimed ? 1 : 0;
        n2.obj.userData.halo.material.opacity += ((aimed ? 0.95 : 0.4) - n2.obj.userData.halo.material.opacity) * Math.min(1, dt * 8);
        n2.obj.userData.halo.scale.setScalar(1 + (aimed ? 0.12 : 0) + Math.sin(n2.t * 4) * 0.02);
      }
      n2.aimed = false;
    }
  }

  var facadeCache = {};
  function facadeTexture(w, h) {
    var key = Math.round(w) + 'x' + Math.round(h);
    if (facadeCache[key]) return facadeCache[key];
    var c = document.createElement('canvas');
    c.width = 256; c.height = 512;
    var g4 = c.getContext('2d');
    g4.fillStyle = '#8b929c'; g4.fillRect(0, 0, 256, 512);
    var cols = Math.max(3, Math.round(w * 0.9));
    var rows = Math.max(4, Math.round(h / 4));
    var cw = 256 / cols, ch = 512 / rows;
    for (var r = 0; r < rows; r++) {
      for (var cc = 0; cc < cols; cc++) {
        var lit = Math.random();
        g4.fillStyle = lit > 0.82 ? 'rgba(255,226,150,0.95)' : lit > 0.6 ? 'rgba(120,160,200,0.55)' : 'rgba(40,52,66,0.85)';
        g4.fillRect(cc * cw + cw * 0.18, r * ch + ch * 0.2, cw * 0.64, ch * 0.58);
      }
    }
    var t = new T.CanvasTexture(c);
    t.colorSpace = T.SRGBColorSpace;
    t.wrapS = t.wrapT = T.RepeatWrapping;
    facadeCache[key] = t;
    return t;
  }

  var aoTex = null;
  function aoTexture() {
    if (aoTex) return aoTex;
    var c = document.createElement('canvas');
    c.width = c.height = 128;
    var g6 = c.getContext('2d');
    var rg = g6.createRadialGradient(64, 64, 4, 64, 64, 64);
    rg.addColorStop(0, 'rgba(12,20,10,0.55)');
    rg.addColorStop(0.65, 'rgba(12,20,10,0.22)');
    rg.addColorStop(1, 'rgba(12,20,10,0)');
    g6.fillStyle = rg; g6.fillRect(0, 0, 128, 128);
    aoTex = new T.CanvasTexture(c);
    aoTex.colorSpace = T.SRGBColorSpace;
    return aoTex;
  }
  function addContactShadow(x, y, z, size, strength) {
    var sp = new T.Sprite(new T.SpriteMaterial({ map: aoTexture(), transparent: true, depthWrite: false, opacity: strength || 0.45 }));
    sp.scale.set(size, size, 1);
    sp.position.set(x, y + 0.03, z);
    sp.material.rotation = 0;
    scene.add(sp);
  }

  function addTower(x, z, h, w) {
    addContactShadow(x, 0, z, w * 1.7, 0.5);
    inst.towerBody.push({ x: x, y: 0, z: z, sx: w, sy: h, sz: w });
    inst.towerRoof.push({ x: x, y: h, z: z, sx: w * 0.6, sy: 2.2 + h * 0.05, sz: w * 0.6 });
    var ledgeCount = Math.max(1, Math.floor(h / 7));
    for (var li = 0; li < ledgeCount; li++) {
      var ly2 = 4 + li * 6.5;
      if (ly2 > h - 2) break;
      var lside = li % 2 === 0 ? 1 : -1;
      inst.ledge.push({ x: x + lside * (w * 0.1), y: ly2 - 0.22, z: z + lside * (w / 2 + 1.0), sx: w * 0.8, sy: 0.45, sz: 2.2 });
    }
    var g2 = new T.Group();
    var concrete = new T.MeshStandardMaterial({ map: facadeTexture(w, h), roughness: 0.85, metalness: 0.05 });
    var dark = new T.MeshStandardMaterial({ color: 0x55606e, roughness: 0.9 });
    var body = new T.Mesh(new T.BoxGeometry(w, h, w), concrete);
    body.position.y = h / 2;
    body.castShadow = true; body.receiveShadow = true;
    g2.add(body);
    // ledges: web targets on the way up
    var ledges = Math.max(1, Math.floor(h / 7));
    for (var i = 0; i < ledges; i++) {
      var ly = 4 + i * 6.5;
      if (ly > h - 2) break;
      var side = i % 2 === 0 ? 1 : -1;
      var ledge = new T.Mesh(new T.BoxGeometry(w * 0.8, 0.45, 2.2), concrete);
      ledge.position.set(side * (w * 0.1), ly, side * (w / 2 + 1.0));
      ledge.castShadow = true; ledge.receiveShadow = true;
      g2.add(ledge);
      colliders.push({
        min: new T.Vector3(x + side * (w * 0.1) - w * 0.4, ly - 0.22, z + side * (w / 2 + 1.0) - 1.1),
        max: new T.Vector3(x + side * (w * 0.1) + w * 0.4, ly + 0.22, z + side * (w / 2 + 1.0) + 1.1)
      });
    }
    var roofRail = new T.Mesh(new T.BoxGeometry(w + 0.4, 0.25, w + 0.4), dark);
    roofRail.position.y = h + 0.1;
    g2.add(roofRail);
    // roof clutter: water tank + antenna, so the skyline reads as buildings
    // one roof cap does the job of the tank + mast + rails, at a fraction of the draw calls
    var roof = new T.Mesh(new T.BoxGeometry(w * 0.6, 2.2 + h * 0.05, w * 0.6), dark);
    roof.position.y = h + (2.2 + h * 0.05) / 2;
    roof.castShadow = true;
    g2.add(roof);
    colliders.push({ min: new T.Vector3(x - w / 2, 0, z - w / 2), max: new T.Vector3(x + w / 2, h, z + w / 2) });
    for (var ci2 = 0; ci2 < inst.ledge.length; ci2++) {
      var lg = inst.ledge[ci2];
      if (lg.fixed) continue;
      lg.fixed = true;
      colliders.push({ min: new T.Vector3(lg.x - lg.sx / 2, lg.y, lg.z - lg.sz / 2), max: new T.Vector3(lg.x + lg.sx / 2, lg.y + lg.sy, lg.z + lg.sz / 2) });
    }
    towers.push({ x: x, z: z, h: h, w: w });
  }

  var cloths = [];
  function makeCloth(width, height, cols, rows, color, x, y, z, cast) {
    var geo = new T.PlaneGeometry(width, height, cols, rows);
    var mat = new T.MeshStandardMaterial({ color: color, side: T.DoubleSide, roughness: 0.75, emissive: 0x1a1208, emissiveIntensity: 0.25 });
    var mesh = new T.Mesh(geo, mat);
    if (cast) mesh.castShadow = true;
    mesh.position.set(x, y, z);
    scene.add(mesh);
    var pos = geo.attributes.position;
    var pts = [], prev = [], pinned = [];
    var colsN = cols + 1, rowsN = rows + 1;
    for (var r = 0; r < rowsN; r++) {
      for (var c = 0; c < colsN; c++) {
        var i = r * colsN + c;
        pts.push(new T.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
        prev.push(pts[i].clone());
        pinned.push(c === 0);        // left edge fixed to the pole
      }
    }
    cloths.push({ mesh: mesh, geo: geo, pos: pos, pts: pts, prev: prev, pinned: pinned, cols: colsN, rows: rowsN, w: width / cols, h: height / rows, t: 0 });
  }

  function updateCloths(dt) {
    var windX = Math.sin(windUniforms.time.value * 0.6) * 3.0 + 2.4;
    var windZ = Math.cos(windUniforms.time.value * 0.45) * 1.8;
    for (var k = 0; k < cloths.length; k++) {
      var cl = cloths[k];
      cl.t += dt;
      var pts = cl.pts, prev = cl.prev, pinned = cl.pinned;
      for (var i = 0; i < pts.length; i++) {
        if (pinned[i]) continue;
        var p = pts[i], pv = prev[i];
        var vx = (p.x - pv.x) * 0.94, vy = (p.y - pv.y) * 0.94, vz = (p.z - pv.z) * 0.94;
        pv.copy(p);
        p.x += vx + windX * dt * dt * 9;
        p.y += vy - 9.8 * dt * dt * 3.2;
        p.z += vz + windZ * dt * dt * 9;
      }
      // two relaxation passes: horizontal and vertical links
      for (var pass = 0; pass < 4; pass++) {
        for (var r = 0; r < cl.rows; r++) {
          for (var c = 0; c < cl.cols; c++) {
            var i0 = r * cl.cols + c;
            if (c + 1 < cl.cols) link(cl, i0, i0 + 1, cl.w);
            if (r + 1 < cl.rows) link(cl, i0, i0 + cl.cols, cl.h);
          }
        }
      }
      // push cloth out of the player capsule
      var px = player.pos.x, py = player.pos.y + 0.9, pz = player.pos.z;
      for (var ci = 0; ci < pts.length; ci++) {
        if (pinned[ci]) continue;
        var q = pts[ci];
        var dx2 = q.x - px, dy2 = q.y - py, dz2 = q.z - pz;
        var d2 = dx2 * dx2 + dy2 * dy2 + dz2 * dz2;
        if (d2 < 1.1 && d2 > 0.0001) {
          var dd = Math.sqrt(d2), push = (1.05 - dd);
          q.x += (dx2 / dd) * push; q.y += (dy2 / dd) * push; q.z += (dz2 / dd) * push;
        }
      }
      var pos = cl.pos;
      for (var j = 0; j < pts.length; j++) {
        pos.setXYZ(j, pts[j].x, pts[j].y, pts[j].z);
      }
      pos.needsUpdate = true;
      cl.geo.computeVertexNormals();
    }
  }

  function link(cl, a, b, rest) {
    var pa = cl.pts[a], pb = cl.pts[b];
    var dx = pb.x - pa.x, dy = pb.y - pa.y, dz = pb.z - pa.z;
    var d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.0001;
    var diff = (d - rest) / d * 0.5;
    if (!cl.pinned[a]) { pa.x += dx * diff; pa.y += dy * diff; pa.z += dz * diff; }
    if (!cl.pinned[b]) { pb.x -= dx * diff; pb.y -= dy * diff; pb.z -= dz * diff; }
  }

  var breakables = [];
  var birds = [];

  function addBigBird(x, y, z, radius) {
    var grp = new T.Group();
    var feather = new T.MeshStandardMaterial({ color: 0x2b2f3a, roughness: 0.7 });
    var beakMat = new T.MeshStandardMaterial({ color: 0xffb347, roughness: 0.5 });
    var bodyGeo = new T.SphereGeometry(1.15, 14, 10);
    bodyGeo.scale(1, 0.85, 1.5);
    var body = new T.Mesh(bodyGeo, feather);
    body.castShadow = true;
    grp.add(body);
    var head = new T.Mesh(new T.SphereGeometry(0.6, 12, 10), feather);
    head.position.set(0, 0.5, 1.1);
    grp.add(head);
    var beak = new T.Mesh(new T.ConeGeometry(0.2, 0.7, 8), beakMat);
    beak.rotation.x = Math.PI / 2;
    beak.position.set(0, 0.45, 1.75);
    grp.add(beak);
    var wings = [];
    for (var wside = -1; wside <= 1; wside += 2) {
      var wg = new T.PlaneGeometry(3.2, 1.5);
      var wing = new T.Mesh(wg, new T.MeshStandardMaterial({ color: 0x353b48, roughness: 0.8, side: T.DoubleSide }));
      wing.position.set(wside * 1.9, 0.2, 0);
      wing.rotation.z = wside * 0.2;
      grp.add(wing);
      wings.push({ mesh: wing, side: wside });
    }
    grp.position.set(x, y, z);
    scene.add(grp);
    var rec = {
      obj: grp, cx: x, cz: z, y: y, radius: radius || 22, ang: Math.random() * 6.28,
      speed: 0.35 + Math.random() * 0.25, hp: 2, alive: true, flap: Math.random() * 6.28,
      wings: wings, dive: 0, hit: 0
    };
    birds.push(rec);
    return rec;
  }

  function updateBirds(dt) {
    for (var i = 0; i < birds.length; i++) {
      var b = birds[i];
      if (!b.alive) continue;
      b.ang += dt * b.speed;
      b.flap += dt * 6;
      var px = b.cx + Math.cos(b.ang) * b.radius;
      var pz = b.cz + Math.sin(b.ang) * b.radius;
      var py = b.y + Math.sin(b.flap * 0.5) * 1.2;
      var dpx = player.pos.x - px, dpz = player.pos.z - pz;
      var dist = Math.sqrt(dpx * dpx + dpz * dpz + Math.pow(player.pos.y + 1 - py, 2));
      if (dist < 26 && b.dive <= 0) b.dive = 0.001;
      if (b.dive > 0) {
        b.dive += dt;
        var t = Math.min(1, b.dive * 0.9);
        px += dpx * t * 0.55; pz += dpz * t * 0.55;
        py += (player.pos.y + 1.1 - py) * t * 0.5;
        if (dist < 2.2) { damage(); b.dive = 2.2; }
        if (b.dive > 2.4) b.dive = 0;
      }
      b.obj.position.set(px, py, pz);
      b.obj.rotation.y = Math.atan2(dpx, dpz) + Math.PI;
      b.obj.rotation.z = Math.sin(b.flap) * 0.12;
      for (var w = 0; w < b.wings.length; w++) {
        b.wings[w].mesh.rotation.z = b.wings[w].side * (0.15 + Math.sin(b.flap) * 0.55);
      }
      b.hit = Math.max(0, b.hit - dt);
      if (b.hit > 0) b.obj.rotation.z += Math.sin(b.hit * 40) * 0.2;
    }
  }

  function hitBird(origin, dir, maxDist) {
    var best = null, bestD = maxDist;
    for (var i = 0; i < birds.length; i++) {
      var b = birds[i];
      if (!b.alive) continue;
      var c = b.obj.position;
      var ox = c.x - origin.x, oy = c.y - origin.y, oz = c.z - origin.z;
      var proj = ox * dir.x + oy * dir.y + oz * dir.z;
      if (proj < 0.5 || proj > bestD) continue;
      var lx = ox - dir.x * proj, ly = oy - dir.y * proj, lz = oz - dir.z * proj;
      if (lx * lx + ly * ly + lz * lz < 2.6 * 2.6) { bestD = proj; best = { point: c.clone(), dist: proj, bird: b }; }
    }
    return best;
  }
  var districts = [];

  function addDistrict(cx, pz) {
    var d = { x: cx, z: pz, cleared: false, enemies: [], gate: null, index: districts.length };
    for (var i = 0; i < 3; i++) {
      var ang = i * 2.1;
      var ex = cx + Math.cos(ang) * 9, ez = pz + Math.sin(ang) * 7;
      var e = addEnemy(ex, ez, 4.5, 1.5, i === 0);
      if (e) { d.enemies.push(e); e.district = d; }
    }
    districts.push(d);
    return d;
  }

  function updateDistricts(dt) {
    for (var i = 0; i < districts.length; i++) {
      var d = districts[i];
      if (d.cleared) continue;
      var alive = 0;
      for (var e = 0; e < d.enemies.length; e++) if (d.enemies[e].alive) alive++;
      if (alive === 0) {
        d.cleared = true;
        stats.score += 150;
        toast('据点已占领 +150 · 按 T 传送');
        tone(660, 0.2, 'triangle', 0.08, 1.4);
        var gate = new T.Group();
        var ringMat = new T.MeshStandardMaterial({ color: 0x64ffd0, emissive: 0x22ffc0, emissiveIntensity: 1.6, metalness: 0.5, roughness: 0.3 });
        var ring = new T.Mesh(new T.TorusGeometry(1.5, 0.12, 12, 32), ringMat);
        ring.rotation.x = -Math.PI / 2;
        ring.position.set(d.x, 1.4, d.z);
        gate.add(ring);
        var post = new T.Mesh(new T.CylinderGeometry(0.08, 0.08, 2.6, 8), ringMat);
        post.position.set(d.x, 1.3, d.z);
        gate.add(post);
        scene.add(gate);
        d.gate = gate;
        for (var b = 0; b < 24; b++) {
          spawnParticle(d.x, 1.2, d.z, (Math.random() - 0.5) * 4, 2 + Math.random() * 4, (Math.random() - 0.5) * 4, 0x64ffd0, 0.12, 0.6);
        }
      }
    }
  }

  function teleportToDistrict() {
    var best = null, bestD = 1e9;
    for (var i = 0; i < districts.length; i++) {
      var d = districts[i];
      if (!d.cleared) continue;
      var dist = Math.hypot(d.x - player.pos.x, d.z - player.pos.z);
      if (dist > 12 && dist < bestD) { bestD = dist; best = d; }
    }
    if (!best) { toast('还没有已占领的据点'); return; }
    burst(player.pos.x, player.pos.y + 1, player.pos.z, 0x64ffd0, 16, 3);
    player.pos.set(best.x, 2.2, best.z + 2.5);
    player.vel.set(0, 0, 0);
    webDrop('');
    spawn = new T.Vector3(best.x, 2.2, best.z + 2.5);
    burst(best.x, 2.2, best.z + 2.5, 0x64ffd0, 20, 3.5);
    toast('传送至据点 ' + (best.index + 1) + ' · ' + Math.round(bestD) + ' m');
    tone(520, 0.18, 'triangle', 0.08, 1.6);
  }
  function addBreakableWall(x, z, w, h, baseY) {
    baseY = baseY || 0;
    var mat = new T.MeshStandardMaterial({ color: 0xb08a6a, roughness: 0.9 });
    var mesh = new T.Mesh(new T.BoxGeometry(w, h, 0.7), mat);
    mesh.position.set(x, baseY + h / 2, z);
    mesh.castShadow = true; mesh.receiveShadow = true;
    scene.add(mesh);
    var c = { min: new T.Vector3(x - w / 2, baseY, z - 0.35), max: new T.Vector3(x + w / 2, baseY + h, z + 0.35), breakable: true };
    colliders.push(c);
    breakables.push({ mesh: mesh, collider: c, x: x, z: z, w: w, h: h, broken: false, baseY: baseY });
  }

  function shatterWall(bw, from) {
    if (bw.broken) return;
    bw.broken = true;
    var idx = colliders.indexOf(bw.collider);
    if (idx >= 0) colliders.splice(idx, 1);
    scene.remove(bw.mesh);
    bw.mesh.geometry.dispose();
    spawnDebris(bw.x, (bw.baseY || 0) + bw.h * 0.6, bw.z, 0xb08a6a, 8);
    burst(bw.x, (bw.baseY || 0) + bw.h * 0.6, bw.z, 0xd8b48a, 14, 3.4);
    addShake(0.35);
    tone(140, 0.24, 'sawtooth', 0.1, 0.5);
    stats.coins += 3; stats.score += 30;
  }

  var bridges = [];
  function addBridge(x, z, len, baseY) {
    baseY = baseY || 0;
    var planks = 5, pw = len / planks;
    var meshes = [];
    for (var i = 0; i < planks; i++) {
      var mat = new T.MeshStandardMaterial({ color: 0x8a6a4a, roughness: 0.85 });
      var m = new T.Mesh(new T.BoxGeometry(pw * 0.92, 0.22, 2.4), mat);
      var pz = z - i * pw;
      m.position.set(x, baseY + 1.1, pz);
      m.castShadow = true; m.receiveShadow = true;
      scene.add(m);
      var c = { min: new T.Vector3(x - pw * 0.46, baseY + 1.0, pz - 1.2), max: new T.Vector3(x + pw * 0.46, baseY + 1.22, pz + 1.2) };
      colliders.push(c);
      meshes.push({ mesh: m, collider: c, x: x, z: pz, w: pw, y: baseY + 1.1, fallen: false });
    }
    bridges.push({ planks: meshes, triggered: false, t: 0 });
  }

  function collapsePlank(p) {
    if (p.fallen) return;
    p.fallen = true;
    var idx = colliders.indexOf(p.collider);
    if (idx >= 0) colliders.splice(idx, 1);
    scene.remove(p.mesh);
    spawnDebris(p.x, p.y, p.z, 0x8a6a4a, 3);
  }

  function updateBreakables(dt) {
    // the fireball's explosion and the shockwave both shatter walls
    for (var i = 0; i < breakables.length; i++) {
      var bw = breakables[i];
      if (bw.broken) continue;
      for (var f = 0; f < fireballs.length; f++) {
        if (fireballs[f].mesh.position.distanceTo(new T.Vector3(bw.x, bw.h * 0.5, bw.z)) < 3.2) shatterWall(bw, 'fireball');
      }
    }
    // bridges fall apart shortly after you step on the first plank
    for (var b = 0; b < bridges.length; b++) {
      var br = bridges[b];
      if (!br.triggered) {
        var p0 = br.planks[0];
        if (Math.abs(player.pos.x - p0.x) < 2.0 && Math.abs(player.pos.z - p0.z) < 2.0 && Math.abs(player.pos.y - p0.y) < 1.4) {
          br.triggered = true; br.t = 0;
          toast('桥要塌了，快跑！');
          tone(120, 0.3, 'sawtooth', 0.09, 0.6);
        }
      } else {
        br.t += dt;
        for (var pi = 0; pi < br.planks.length; pi++) {
          var pl = br.planks[pi];
          if (!pl.fallen && br.t > 0.35 + pi * 0.16) collapsePlank(pl);
        }
      }
    }
  }

  function addCheckpoint(x, z, index) {
    var g = new T.Group();
    var pole = new T.Mesh(new T.CylinderGeometry(0.07, 0.07, 3.2, 10), new T.MeshStandardMaterial({ color: 0xdfe6ee, metalness: 0.6, roughness: 0.35 }));
    pole.position.y = 1.6; pole.castShadow = true; g.add(pole);
    makeCloth(0.95, 0.6, 5, 3, 0x4a7fd6, x + 0.14, 2.55, z, false);
    var flag = new T.Mesh(new T.PlaneGeometry(0.9, 0.6), new T.MeshBasicMaterial({ visible: false }));
    flag.position.set(0.48, 2.8, 0); g.add(flag);
    var ring = new T.Mesh(new T.TorusGeometry(0.5, 0.06, 8, 24), new T.MeshStandardMaterial({ color: 0x7fe3ff, emissive: 0x2a8fb0, emissiveIntensity: 0.8 }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = 0.08; g.add(ring);
    g.position.set(x, 0, z);
    scene.add(g);
    checkpoints.push({ pos: new T.Vector3(x, 0.6, z), obj: g, ring: ring, index: index, active: false });
  }

  var levelBuild = null;

  function buildLevelProgressively(done) {
    var fill = document.getElementById('loadFill');
    var txt = document.getElementById('loadText');
    var overlay = document.getElementById('loading');
    buildLevelBegin();
    var lastPct = -1;
    function step() {
      var t0 = (window.performance && performance.now) ? performance.now() : Date.now();
      var budget = /[?&]slowbuild=1/.test(location.search) ? 1 : 400;
      for (var guard = 0; guard < budget; guard++) {
        if (!buildLevelSection()) break;
        var now = (window.performance && performance.now) ? performance.now() : Date.now();
        if (now - t0 > 10) break;
      }
      var travelled = -levelBuild.z;
      var pct = Math.max(0, Math.min(99, Math.round(travelled / LEVEL_LEN * 100)));
      if (pct !== lastPct) {
        lastPct = pct;
        if (fill) fill.style.width = pct + '%';
        if (txt) txt.textContent = L('loading', { p: pct });
      }
      if (levelBuild.z > -(LEVEL_LEN - 18)) { requestAnimationFrame(step); return; }
      buildLevelFinish();
      if (fill) fill.style.width = '100%';
      if (txt) txt.textContent = L('loadingDone');
      if (overlay) { overlay.classList.add('done'); setTimeout(function () { overlay.style.display = 'none'; }, 380); }
      done();
    }
    if (fill) fill.style.width = '2%';
    requestAnimationFrame(step);
  }

  function buildLevelBegin() {
    addGround(0, 8, 16, 16);
    addCheckpoint(2.6, 2.0, 0);
    levelBuild = { z: -2, section: 0, cp: 1 };
  }

  function buildLevelSection() {
    var B = levelBuild;
    var z = B.z, section = B.section, cp = B.cp;
    if (!(z > -(LEVEL_LEN - 18))) return false;
    {
      section += 1;
      var gap = 1.6 + rnd() * 2.6;
      var len = 9 + rnd() * 13;
      var cx = (rnd() - 0.5) * 20;
      var w = 24 + rnd() * 30;
      addGround(cx, z - len / 2, w, len);

      // every strip gets one or two features; the mix changes as the course goes on
      // two or three features per strip now, and they can stack upwards
      var features = 2 + Math.floor(rnd() * 2);
      for (var ft = 0; ft < features; ft++) {
        var roll = rnd();
        var fx = cx + (rnd() - 0.5) * 5;
        var fz = z - len / 2 + (rnd() - 0.5) * len * 0.8;
        if (roll < 0.26) {
          addPlatform(fx, 0.9 + rnd() * 2.6, fz, 2.6 + rnd() * 2.2, 2.2 + rnd());
          if (rnd() > 0.55) addPlatform(fx + (rnd() - 0.5) * 2, 2.6 + rnd() * 2.2, fz, 2.2, 2.0);
        } else if (roll < 0.42) {
          addPlatform(fx, 1.2 + rnd() * 2.0, fz, 3.2, 2.8, { axis: 'x', amp: 2.4 + rnd() * 3.4, speed: 0.45 + rnd() * 0.6, phase: rnd() * 6 });
        } else if (roll < 0.52) {
          addPipe(fx, fz, 1.5 + rnd() * 1.8);
        } else if (roll < 0.66) {
          addBlock(fx, 3.0 + rnd() * 1.0, fz);
          if (rnd() > 0.45) addBlock(fx, 4.4 + rnd() * 0.8, fz);
        } else if (roll < 0.76) {
          addSpring(fx, fz);
        } else if (roll < 0.9) {
          addSpikes(fx, fz, 1.6 + rnd() * 1.6);
        } else {
          addPlatform(fx, 4.2 + rnd() * 2.4, fz, 2.2, 2.2);   // a high perch worth webbing to
        }
      }

      // coins: an arc over the strip, sometimes a ring
      var coins_n = 3 + Math.floor(rnd() * 4);
      for (var ci = 0; ci < coins_n; ci++) {
        var t2 = ci / Math.max(1, coins_n - 1);
        addCoin(cx + Math.sin(t2 * Math.PI) * (rnd() - 0.5) * 3, 1.3 + Math.sin(t2 * Math.PI) * 1.3, z - len / 2 + (t2 - 0.5) * len * 0.8);
      }

      // pickups, spaced out
      if (section % 6 === 2) addMushroom(cx + (rnd() - 0.5) * 3, 0, z - len / 2);
      if (section % 6 === 4) addStar(cx + (rnd() - 0.5) * 3, z - len / 2);
      if (section % 9 === 5) addShield(cx + (rnd() - 0.5) * 3, z - len / 2);

      // enemies get denser and meaner further in
      var density = 0.55 + (section / 45);
      if (rnd() < density) addEnemy(cx + (rnd() - 0.5) * (w - 3), z - len / 2, 2.4 + rnd() * 1.6, 1.1 + rnd() * 0.7, rnd() > 0.55);
      if (section > 4 && rnd() < 0.45) addFlyer(cx + (rnd() - 0.5) * 4, 2.6 + rnd() * 1.8, z - len / 2);
      if (section % 12 === 7) addGuardian(cx, z - len / 2);
      if (section % 4 === 1) addBigBird(cx + (rnd() - 0.5) * 12, 9 + rnd() * 7, z - len / 2, 14 + rnd() * 10);

      if (section % 30 === 12) {
        var pz = z - len / 2;
        addPlatform(cx, 0.0, pz, 46, 34);                  // wide plaza floor
        for (var bld = 0; bld < 6; bld++) {
          var ang = (bld / 6) * Math.PI * 2;
          addTower(cx + Math.cos(ang) * 26, pz + Math.sin(ang) * 20, 26 + rnd() * 34, 8 + rnd() * 5);
        }
        for (var nc = 0; nc < 5; nc++) addWebNode(cx + (rnd() - 0.5) * 30, 12 + rnd() * 14, pz + (rnd() - 0.5) * 22);
        addDistrict(cx, pz);
      }
      if (section % 3 === 0) {
        var laneSide = rnd() > 0.5 ? 1 : -1;
        var laneX = cx + laneSide * (w / 2 + 12 + rnd() * 10);
        addPlatform(laneX, 2.5 + rnd() * 5.5, z - len / 2, 6 + rnd() * 6, 5 + rnd() * 4);
        if (rnd() > 0.4) addPlatform(laneX + laneSide * 7, 5 + rnd() * 6, z - len / 2 - 6, 4.5, 4.5);
        for (var lc = 0; lc < 3; lc++) addCoin(laneX + (rnd() - 0.5) * 4, 3.2 + lc * 0.9, z - len / 2 + (lc - 1) * 2.5);
        addWebNode(laneX, 8 + rnd() * 4, z - len / 2 - 3);
      }
      if (section % 7 === 3) {
        addBreakableWall(cx + (rnd() - 0.5) * 4, z - len / 2, 3.4 + rnd() * 2.4, 2.6 + rnd() * 1.2);
      }
      if (section % 13 === 6) {
        addBridge(cx, z - 1.5, 12);
      }
      if (section % 5 === 2) {
        // a web run: 5 nodes zig-zagging across and upward, so you can bounce between them
        var baseX = cx, baseZ = z - len / 2;
        var dirn = rnd() > 0.5 ? 1 : -1;
        for (var ni = 0; ni < 5; ni++) {
          addWebNode(baseX + dirn * (2.5 + ni * 1.6) * (ni % 2 === 0 ? 1 : -1), 4.5 + ni * 2.2, baseZ - ni * 3.6);
        }
      }
      if (section % 11 === 5) {
        // a tall tower with a ring of nodes around it: climb by chaining webs
        var tx = cx + (rnd() - 0.5) * 6, tz = z - len / 2 - 4;
        addTower(tx, tz, 22 + rnd() * 16, 7);
        for (var wi = 0; wi < 4; wi++) {
          var ang = wi / 4 * Math.PI * 2;
          addWebNode(tx + Math.cos(ang) * 7.5, 8 + wi * 4.5, tz + Math.sin(ang) * 7.5);
        }
      }
      if (section % 3 === 2) {
        // tall pillar: a landing target you can only reach with the web
        var ph = 14 + rnd() * 22;
        addPlatform(cx + (rnd() - 0.5) * 8, ph, z - len / 2, 4 + rnd() * 3, 4 + rnd() * 3);
        addWebNode(cx + (rnd() - 0.5) * 6, ph + 4, z - len / 2);
      }
      if (section % 3 === 1) {
        var side = rnd() > 0.5 ? 1 : -1;
        addTower(cx + side * (w / 2 + 8 + rnd() * 26), z - len / 2 - rnd() * 8, 18 + rnd() * 42, 7 + rnd() * 7);
      }
      if (section % 9 === 3) {
        // a tower straddling the path: you must web up and over it
        var tside = rnd() > 0.5 ? 1 : -1;
        addTower(cx + tside * (w / 2 + 2.5), z - len / 2, 12 + rnd() * 18, 6 + rnd() * 3);
      }

      // a checkpoint every ~90 m
      if (z < -(cp * 120)) { addCheckpoint(cx, z - len / 2 + 2, cp); cp += 1; }

      z -= len + gap;
      B.z = z; B.section = section; B.cp = cp;
      return true;
    }
  }

  function buildLevelFinish() {
    var z = levelBuild.z;

    // finish island
    addGround(0, z - 6, 14, 14);
    var gx = 0, gz = z - 6;
    var pole = new T.Mesh(new T.CylinderGeometry(0.09, 0.09, 6.4, 12), new T.MeshStandardMaterial({ color: 0xe6eaf0, metalness: 0.7, roughness: 0.3 }));
    pole.position.set(gx, 3.2, gz - 3); pole.castShadow = true; scene.add(pole);
    makeCloth(2.0, 1.1, 8, 4, 0xffb02e, gx + 0.14, 5.6, gz - 3, true);
    var flag = new T.Mesh(new T.PlaneGeometry(0.2, 0.2), new T.MeshBasicMaterial({ visible: false }));
    flag.position.set(gx + 0.9, 5.6, gz - 3); scene.add(flag);
    goal = { pos: new T.Vector3(gx, 0, gz - 3), flag: flag };

    // filler: far skyline and a floor of clouds so the long course never looks empty
    var pillarMat = new T.MeshStandardMaterial({ color: 0x33465c, roughness: 0.95 });
    for (var k = 0; k < 90; k++) {
      var side = rnd() > 0.5 ? 1 : -1;
      var px = side * (16 + rnd() * 90), pz = 10 - rnd() * (LEVEL_LEN + 120), h = 18 + rnd() * 70;
      var pl = new T.Mesh(new T.BoxGeometry(5 + rnd() * 5, h, 5 + rnd() * 5), pillarMat);
      pl.position.set(px, h / 2 - 2, pz); scene.add(pl);
    }
    // far city: instanced blocks at 120-320 m on both sides, for depth
    var farTex = facadeTexture(14, 60);
    var farMat = new T.MeshStandardMaterial({ map: farTex, color: 0x9fb4cc, roughness: 0.9 });
    var farBlocks = new T.InstancedMesh(new T.BoxGeometry(1, 1, 1), farMat, 260);
    var fm = new T.Matrix4(), fq = new T.Quaternion(), fs2 = new T.Vector3(), fp = new T.Vector3();
    for (var fb2 = 0; fb2 < 260; fb2++) {
      var fside = rnd() > 0.5 ? 1 : -1;
      var fh = 25 + rnd() * 105;
      fp.set(fside * (85 + rnd() * 150), fh / 2 - 8, 20 - rnd() * (LEVEL_LEN + 300));
      fq.setFromEuler(new T.Euler(0, rnd() * 6, 0));
      fs2.set(10 + rnd() * 22, fh, 10 + rnd() * 22);
      fm.compose(fp, fq, fs2);
      farBlocks.setMatrixAt(fb2, fm);
    }
    farBlocks.instanceMatrix.needsUpdate = true;
    scene.add(farBlocks);

    var ridgeMat = new T.MeshStandardMaterial({ color: 0x6d89a8, roughness: 1 });
    for (var mi = 0; mi < 26; mi++) {
      var mh = 30 + Math.random() * 50;
      var cone = new T.Mesh(new T.ConeGeometry(mh * 0.9, mh, 5), ridgeMat);
      cone.position.set((Math.random() - 0.5) * 760, mh * 0.42 - 10, -140 - Math.random() * (LEVEL_LEN + 260));
      cone.rotation.y = Math.random() * 6;
      scene.add(cone);
    }
    var tuftMat = windify(new T.MeshStandardMaterial({ color: 0x3f7a35, roughness: 1 }), 0.075, 0.55);
    var tufts = new T.InstancedMesh(new T.ConeGeometry(0.16, 0.55, 5), tuftMat, 420);
    var rocks = new T.InstancedMesh(new T.IcosahedronGeometry(0.34, 0), new T.MeshStandardMaterial({ color: 0x7c8288, roughness: 0.95, flatShading: true }), 160);
    var m4 = new T.Matrix4(), q4 = new T.Quaternion(), sc4 = new T.Vector3(), pos4 = new T.Vector3();
    for (var tu = 0; tu < 420; tu++) {
      pos4.set((rnd() - 0.5) * 26, 0.25, 8 - rnd() * (LEVEL_LEN + 10));
      q4.setFromEuler(new T.Euler(0, rnd() * 6, 0)); sc4.setScalar(0.7 + rnd() * 0.9);
      m4.compose(pos4, q4, sc4); tufts.setMatrixAt(tu, m4);
    }
    for (var r2 = 0; r2 < 160; r2++) {
      pos4.set((rnd() - 0.5) * 26, 0.16, 8 - rnd() * (LEVEL_LEN + 10));
      q4.setFromEuler(new T.Euler(rnd(), rnd() * 6, rnd())); sc4.setScalar(0.55 + rnd() * 1.2);
      m4.compose(pos4, q4, sc4); rocks.setMatrixAt(r2, m4);
    }
    tufts.instanceMatrix.needsUpdate = true; rocks.instanceMatrix.needsUpdate = true;
    scene.add(tufts); scene.add(rocks);
    flushInstances();
    stats.total = coins.length;
  }
  // ---------------- player model: articulated skeleton (bone hierarchy + rigid parts) ----------------
  var rig = null;
  var bone = {};
  var animPhase = 0;

  function partOn(boneObj, geo, mat, y, z) {
    var m = new T.Mesh(geo, mat);
    m.castShadow = true;
    if (y) m.position.y = y;
    if (z) m.position.z = z;
    boneObj.add(m);
    return m;
  }

  function buildModel() {
    var suit = new T.MeshStandardMaterial({ color: 0x2f6fd0, roughness: 0.55 });
    var suitDark = new T.MeshStandardMaterial({ color: 0x24508f, roughness: 0.6 });
    var skin = new T.MeshStandardMaterial({ color: 0xf0c9a5, roughness: 0.7 });
    var capMat = new T.MeshStandardMaterial({ color: 0xffb02e, roughness: 0.5, emissive: 0x5a3800, emissiveIntensity: 0.18 });
    var shoe = new T.MeshStandardMaterial({ color: 0x241f2b, roughness: 0.8 });
    var packMat = new T.MeshStandardMaterial({ color: 0xd9dee6, roughness: 0.7 });

    var root = new T.Group();
    bone.hips = new T.Object3D(); bone.hips.position.set(0, 0.62, 0); root.add(bone.hips);
    bone.spine = new T.Object3D(); bone.spine.position.set(0, 0.08, 0); bone.hips.add(bone.spine);
    bone.chest = new T.Object3D(); bone.chest.position.set(0, 0.2, 0); bone.spine.add(bone.chest);
    bone.head = new T.Object3D(); bone.head.position.set(0, 0.22, 0); bone.chest.add(bone.head);

    // torso / head / cap / face
    partOn(bone.spine, new T.CylinderGeometry(0.26, 0.3, 0.34, 12), suit, 0.14, 0);
    partOn(bone.chest, new T.SphereGeometry(0.28, 14, 10), suit, 0.06, 0);
    partOn(bone.head, new T.SphereGeometry(0.25, 16, 12), skin, 0.14, 0);
    partOn(bone.head, new T.SphereGeometry(0.27, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), capMat, 0.19, 0);
    var brim = new T.Mesh(new T.CylinderGeometry(0.28, 0.28, 0.05, 16, 1, false, 0, Math.PI), capMat);
    brim.rotation.x = Math.PI / 2; brim.rotation.z = Math.PI; brim.position.set(0, 0.19, 0.15);
    bone.head.add(brim);
    var eyeMat = new T.MeshStandardMaterial({ color: 0x161320 });
    partOn(bone.head, new T.SphereGeometry(0.04, 8, 8), eyeMat, 0.15, 0.23);
    partOn(bone.head, new T.SphereGeometry(0.05, 8, 8), skin, 0.12, 0.24);

    ['L', 'R'].forEach(function (tag) {
      var side = tag === 'L' ? -1 : 1;
      var shoulder = new T.Object3D(); shoulder.position.set(0.26 * side, 0.1, 0); bone.chest.add(shoulder);
      var elbow = new T.Object3D(); elbow.position.set(0, -0.24, 0.02); shoulder.add(elbow);
      bone['shoulder' + tag] = shoulder; bone['elbow' + tag] = elbow;
      partOn(shoulder, new T.CapsuleGeometry(0.072, 0.2, 4, 8), suit, -0.12, 0);
      partOn(elbow, new T.CapsuleGeometry(0.062, 0.18, 4, 8), skin, -0.12, 0);
      partOn(elbow, new T.SphereGeometry(0.075, 10, 8), skin, -0.24, 0);
      var hip = new T.Object3D(); hip.position.set(0.15 * side, -0.06, 0); bone.hips.add(hip);
      var knee = new T.Object3D(); knee.position.set(0, -0.32, 0); hip.add(knee);
      bone['hip' + tag] = hip; bone['knee' + tag] = knee;
      partOn(hip, new T.CapsuleGeometry(0.088, 0.24, 4, 8), suitDark, -0.16, 0);
      partOn(knee, new T.CapsuleGeometry(0.078, 0.22, 4, 8), suitDark, -0.15, 0);
      var foot = new T.Mesh(new T.BoxGeometry(0.18, 0.1, 0.3), shoe);
      foot.position.set(0, -0.3, 0.05); foot.castShadow = true;
      knee.add(foot);
    });
    partOn(bone.chest, new T.BoxGeometry(0.32, 0.32, 0.15), packMat, 0.06, -0.26);

    root.position.copy(player.pos);
    scene.add(root);
    return root;
  }

  // procedural skeletal animation: walk cycle, air pose, zip lean, breathing
  function animateRig(dt) {
    if (!rig) return;
    var speed = Math.hypot(player.vel.x, player.vel.z);
    var walk = Math.min(1, speed / 5.5);
    animPhase += dt * (4 + speed * 1.6);
    var sw = Math.sin(animPhase), cw = Math.cos(animPhase);
    var air = !player.onGround;
    var zip = web.phase === 'reeling' ? 1 : 0;
    bone.hips.position.y = 0.62 + (air ? 0.03 : Math.abs(sw) * 0.03 * walk) + Math.sin(stats.time * 1.6) * 0.006;
    bone.spine.rotation.x = -0.1 * walk + zip * 0.3 + (air ? 0.08 : 0);
    bone.chest.rotation.x = -0.05 * walk + zip * 0.18;
    bone.head.rotation.x = 0.06 * walk - zip * 0.26 + Math.sin(stats.time * 1.3) * 0.02;
    bone.head.rotation.y = Math.sin(stats.time * 0.8) * 0.05;
    var legSwing = air ? 0.5 : 0.8 * walk;
    bone.hipL.rotation.x = air ? -0.4 : sw * legSwing;
    bone.hipR.rotation.x = air ? -0.15 : -sw * legSwing;
    bone.kneeL.rotation.x = air ? 0.8 : Math.max(0, -sw) * 0.9 * walk + 0.08;
    bone.kneeR.rotation.x = air ? 0.5 : Math.max(0, sw) * 0.9 * walk + 0.08;
    var armSwing = air ? -0.8 : 0.85 * walk;
    bone.shoulderL.rotation.x = air ? -0.8 : -sw * armSwing;
    bone.shoulderR.rotation.x = air ? -0.8 : sw * armSwing;
    bone.shoulderL.rotation.z = 0.14 + (air ? 0.45 : 0) + zip * 0.25;
    bone.shoulderR.rotation.z = -0.14 - (air ? 0.45 : 0) - zip * 0.25;
    bone.elbowL.rotation.x = -0.3 - Math.abs(sw) * 0.35 * walk - zip * 0.8;
    bone.elbowR.rotation.x = -0.3 - Math.abs(cw) * 0.35 * walk - zip * 0.8;
    rig.rotation.y = player.facing;
    rig.rotation.x = -zip * 0.16;
    rig.position.copy(player.pos);
    var buffScale = player.buff > 0 ? 1.18 : 1.0;
    var squash = 1;
    if (landSquash > 0) { landSquash = Math.max(0, landSquash - dt * 3.5); squash = 1 - landSquash * 0.12; }
    rig.scale.set(buffScale / Math.sqrt(squash), buffScale * squash, buffScale / Math.sqrt(squash));
    rig.visible = (mode === 'tp');
  }
  // first-person hands
  function buildFpRig() {
    var rig = new T.Group();
    var glove = new T.MeshStandardMaterial({ color: 0xc98f68, roughness: 0.7 });
    var cuff = new T.MeshStandardMaterial({ color: 0x2f6fd0, roughness: 0.6 });
    var band = new T.MeshStandardMaterial({ color: 0xdfe4ea, roughness: 0.6 });
    for (var s2 = -1; s2 <= 1; s2 += 2) {
      var hand = new T.Group();
      var arm = new T.Mesh(new T.CylinderGeometry(0.052, 0.075, 0.3, 10), cuff);
      arm.position.set(0, -0.12, 0.12);
      arm.rotation.x = 1.15;
      hand.add(arm);
      var cuffBand = new T.Mesh(new T.CylinderGeometry(0.062, 0.062, 0.035, 10), band);
      cuffBand.position.set(0, -0.03, 0.03);
      cuffBand.rotation.x = 1.15;
      hand.add(cuffBand);
      var palm = new T.Mesh(new T.BoxGeometry(0.085, 0.05, 0.1), glove);
      palm.position.set(0, 0.02, -0.02);
      palm.rotation.x = 0.18;
      hand.add(palm);
      for (var f = 0; f < 4; f++) {
        var fing = new T.Mesh(new T.BoxGeometry(0.018, 0.026, 0.062 - f * 0.004), glove);
        fing.position.set(-0.03 + f * 0.02, 0.045, -0.06);
        fing.rotation.x = -0.5;
        hand.add(fing);
      }
      var thumb = new T.Mesh(new T.BoxGeometry(0.022, 0.022, 0.05), glove);
      thumb.position.set(0.05 * s2, 0.03, -0.02);
      thumb.rotation.set(-0.2, 0.5 * s2, 0.3 * s2);
      hand.add(thumb);
      hand.position.set(0.2 * s2, -0.3, -0.46);
      hand.rotation.set(0.12, -0.12 * s2, -0.08 * s2);
      rig.add(hand);
    }
    rig.scale.setScalar(0.78);
    rig.userData.hands = rig.children.slice();
    camera.add(rig);
    scene.add(camera);
    return rig;
  }
  // ---------------- physics and abilities ----------------
  function forwardVector() { return new T.Vector3(-Math.sin(input.yaw), 0, -Math.cos(input.yaw)); }
  function rightVector() { return new T.Vector3(Math.cos(input.yaw), 0, -Math.sin(input.yaw)); }
  function canFly() { return player.buff > 0; }

  function updatePlayer(dt) {
    var k = input.keys;
    var fwd = forwardVector(), right = rightVector();
    var wish = new T.Vector3();
    if (k['w'] || k['arrowup']) wish.add(fwd);
    if (k['s'] || k['arrowdown']) wish.sub(fwd);
    if (k['d'] || k['arrowright']) wish.add(right);
    if (k['a'] || k['arrowleft']) wish.sub(right);
    if (touch.active && (Math.abs(touch.mx) > 0.08 || Math.abs(touch.my) > 0.08)) {
      wish.set(0, 0, 0);
      wish.addScaledVector(fwd, -touch.my);
      wish.addScaledVector(right, touch.mx);
    }
    var sprint = !!k['shift'] || (touch.active && Math.hypot(touch.mx, touch.my) > 0.85);
    var cap = (sprint ? CFG.sprint : CFG.maxSpeed) + (player.buff > 0 ? 1.4 : 0) + (player.star > 0 ? 2.6 : 0);
    if (wish.lengthSq() > 0) {
      wish.normalize();
      var a = (player.onGround ? CFG.accel : CFG.airAccel) * dt;
      player.vel.x += wish.x * a; player.vel.z += wish.z * a;
      player.facing = Math.atan2(wish.x, wish.z);
    } else if (player.onGround) {
      var fr = Math.max(0, 1 - CFG.friction * dt);
      player.vel.x *= fr; player.vel.z *= fr;
    }
    var hs = Math.hypot(player.vel.x, player.vel.z);
    if (hs > cap) { player.vel.x *= cap / hs; player.vel.z *= cap / hs; }

    player.coyote = player.onGround ? CFG.coyote : Math.max(0, player.coyote - dt);
    player.buffer = Math.max(0, player.buffer - dt);
    if (player.onGround) player.airJumps = 2;

    if (player.buffer > 0 && player.coyote > 0) {
      player.vel.y = CFG.jump + (player.buff > 0 ? 1.1 : 0);
      player.onGround = false; player.coyote = 0; player.buffer = 0;
      player.jumpHeld = true; player.holdTime = 0;
      burst(player.pos.x, player.pos.y + 0.1, player.pos.z, 0xdff0c8, 6, 1.6);
      sJump();
    } else if (player.buffer > 0 && !player.onGround && player.airJumps > 0) {
      player.vel.y = [0, CFG.doubleJump * 0.8, CFG.doubleJump][player.airJumps] + (player.buff > 0 ? 1.6 : 0);
      player.airJumps -= 1;
      window.__djFrom = player.pos.y;
      player.buffer = 0; player.jumpHeld = false;
      burst(player.pos.x, player.pos.y + 0.3, player.pos.z, 0x9fd6ff, 12, 2.2);
      sDouble();
      toast('二段跳');
    }
    if (player.jumpHeld) {
      player.holdTime += dt;
      if (!input.keys[' '] || player.holdTime > CFG.jumpHold) {
        if (player.vel.y > 0) player.vel.y *= 0.55;
        player.jumpHeld = false;
      }
    }

    var drag = player.onGround ? 0 : 0.06;
    player.vel.x *= (1 - drag * dt * 10);
    player.vel.z *= (1 - drag * dt * 10);
    player.vel.y -= CFG.gravity * dt;
    if (player.vel.y < -30) player.vel.y = -30;

    var prevY = player.pos.y;
    var wasGroundBefore = player.onGround;
    player.onGround = false;
    moveAxis('x', player.vel.x * dt);
    moveAxis('z', player.vel.z * dt);
    moveAxis('y', player.vel.y * dt);
    if (player.pos.y - prevY > 1.2) { player.pos.y = prevY; player.vel.y = 0; }
    if (player.pos.y < -0.9) {
      splash(player.pos.x, player.pos.z);
      damage();
      resetPlayer(false);
      return;
    }
    if (!player.onGround) {
      var g = groundProbe();
      if (g && player.vel.y <= 0) { player.pos.y = g.max.y + 0.001; player.onGround = true; player.vel.y = 0; }
    }
    if (player.onGround) {
      for (var i = 0; i < movers.length; i++) {
        var c = movers[i];
        if (Math.abs(player.pos.y - c.max.y) < 0.1 && player.pos.x > c.min.x - 0.4 && player.pos.x < c.max.x + 0.4 && player.pos.z > c.min.z - 0.4 && player.pos.z < c.max.z + 0.4) {
          player.pos.x += c.deltaX || 0;
          player.vel.x += (c.deltaX || 0) / Math.max(dt, 0.001) * 0.35;
        }
      }
    }
    landingDust(wasGroundBefore);
    depenetrate();
    if (player.invuln > 0) player.invuln -= dt;
    if (player.skillCd > 0) player.skillCd -= dt;
    if (player.buff > 0) {
      player.buff -= dt;
      if (player.buff <= 0) { player.buff = 0; toast('变身结束'); }
    }
  }

  function updateMovers(dt) {
    for (var i = 0; i < movers.length; i++) {
      var c = movers[i], m = c.mover;
      var prev = c.min.x;
      m.phase += dt * m.speed;
      c.min.x = c.base.x + Math.sin(m.phase) * m.amp;
      c.max.x = c.min.x + c.w;
      c.deltaX = c.min.x - prev;
      if (c.mesh) c.mesh.position.x = (c.min.x + c.max.x) / 2;
    }
  }
  // ---------------- items, enemies, skill ----------------
  function updateCheckpoints() {
    for (var i = 0; i < checkpoints.length; i++) {
      var cp = checkpoints[i];
      if (cp.active) continue;
      var dx = cp.pos.x - player.pos.x, dz = cp.pos.z - player.pos.z;
      if (dx * dx + dz * dz < 6) {
        cp.active = true;
        spawn.set(cp.pos.x, 0.6, cp.pos.z);
        cp.ring.material.color.setHex(0xffd24a);
        cp.ring.material.emissive.setHex(0x7a4c00);
        burst(cp.pos.x, 0.6, cp.pos.z, 0x7fe3ff, 16, 3);
        sBuff();
        toast('检查点 ' + cp.index + ' 已记录');
      }
    }
  }

  function loadBest() {
    try {
      var b = JSON.parse(localStorage.getItem('plumb3d.best') || '{}');
      return { time: b.time || 0, coins: b.coins || 0, score: b.score || 0 };
    } catch (e) { return { time: 0, coins: 0, score: 0 }; }
  }
  function saveBest() {
    try {
      var b = loadBest();
      if (!b.time || stats.time < b.time) b.time = stats.time;
      if (stats.coins > b.coins) b.coins = stats.coins;
      if (stats.score > b.score) b.score = stats.score;
      localStorage.setItem('plumb3d.best', JSON.stringify(b));
      return b;
    } catch (e) { return { time: 0, coins: 0, score: 0 }; }
  }

  function showWinCard() {
    state = 'win';
    setImmersive(false);
    var best = saveBest();
    var wLine = document.getElementById('winLine');
    if (wLine) wLine.textContent = '通关！用时 ' + stats.time.toFixed(1) + ' 秒';
    var wStats = document.getElementById('winStats');
    if (wStats) wStats.textContent = L('winStats', { c: stats.coins, d: stats.total, p: stats.popped, s: stats.score });
    var wBest = document.getElementById('winBest');
    if (wBest) wBest.textContent = L('bestLine', { t: best.time.toFixed(1), s: best.score }) + (stats.time <= best.time + 0.01 ? L('bestNew') : '');
    var w = document.getElementById('win');
    if (w) w.style.display = 'grid';
  }

  function showPause() {
    if (isTouch || window.__selftest) return;
    state = 'pause';
    setImmersive(false);
    if (document.exitPointerLock) { try { document.exitPointerLock(); } catch (e) {} }
    var el = document.getElementById('pause');
    if (el) el.classList.add('on');
  }
  function hidePause() {
    var el = document.getElementById('pause');
    if (el) el.classList.remove('on');
    state = 'play';
    syncImmersive();
  }
  function showGameOver() {
    state = 'over';
    setImmersive(false);
    var line = document.getElementById('overLine');
    if (line) line.textContent = L('statsLine', { t: stats.time.toFixed(1), c: stats.coins, s: stats.score, a: districts.filter(function (d) { return d.cleared; }).length, b: districts.length });
    var el = document.getElementById('over');
    if (el) el.classList.add('on');
  }
  function restartRun() {
    ['pause', 'over', 'win'].forEach(function (id) { var e2 = document.getElementById(id); if (e2) e2.classList.remove('on'); });
    resetPlayer(true);
    stats.time = 0; stats.score = 0; stats.coins = 0; stats.popped = 0;
    state = 'play';
    syncImmersive();
  }
  function backToTitle() {
    ['pause', 'over', 'win'].forEach(function (id) { var e2 = document.getElementById(id); if (e2) e2.classList.remove('on'); });
    var lock = document.getElementById('lock');
    if (lock) lock.style.display = 'grid';
    var deploy = document.getElementById('deploy');
    if (deploy) deploy.textContent = '开始游戏';
    state = 'ready';
    setImmersive(false);
  }

  function resetPlayer(hard) {
    window.__resets = (window.__resets || 0) + 1;
    player.pos.copy(spawn);
    player.vel.set(0, 0, 0);
    player.onGround = false; player.invuln = 0; player.airJumps = 2;
    if (hard) {
      stats.coins = 0; stats.lives = 3; stats.time = 0; stats.score = 0; stats.popped = 0;
      player.buff = 0;
      for (var i = 0; i < coins.length; i++) { coins[i].taken = false; coins[i].mesh.visible = true; }
      for (var m = 0; m < mushrooms.length; m++) { mushrooms[m].taken = false; mushrooms[m].obj.visible = true; }
      for (var e = 0; e < enemies.length; e++) {
        var en = enemies[e];
        en.alive = true; en.dead = 0; en.obj.visible = true; en.obj.scale.set(1, 1, 1); en.obj.position.copy(en.home);
      }
    }
  }

  function flashDamage() {
    var el = document.getElementById('hitflash');
    if (!el) return;
    el.style.opacity = '0.55';
    setTimeout(function () { el.style.opacity = '0'; }, 90);
  }

  function damage() {
    flashDamage();
    if (player.invuln > 0 || state !== 'play') return;
    if (web.phase === 'attached' || web.phase === 'reeling') webDrop('受伤，蛛丝断开');
    if (player.shield > 0) {
      player.shield = 0;
      player.invuln = 0.9;
      addShake(0.35);
      burst(player.pos.x, player.pos.y + 1, player.pos.z, 0x9ff2c0, 18, 3);
      tone(880, 0.18, 'triangle', 0.07);
      toast('护盾挡下一击');
      return;
    }
    player.invuln = 1.4;
    stats.lives -= 1;
    player.vel.y = 7.0; player.vel.x = 0; player.vel.z = 0;
    sHit();
    toast(stats.lives > 0 ? '被撞到了 -1 命' : '没命了');
    if (stats.lives <= 0) { resetPlayer(true); showGameOver(); }
  }

  function updateSpikes() {
    for (var i = 0; i < spikes.length; i++) {
      var sp = spikes[i];
      if (Math.abs(player.pos.x - sp.x) < sp.w / 2 + 0.3 && Math.abs(player.pos.z - sp.z) < 0.8 && player.pos.y < 0.85) damage();
    }
  }

  function collectCoins() {
    for (var i = 0; i < coins.length; i++) {
      var c = coins[i];
      if (c.taken) continue;
      c.mesh.rotation.z += 0.05;
      c.mesh.position.y = c.base + Math.sin((stats.time + i) * 2) * 0.06;
      var dx = c.mesh.position.x - player.pos.x,
          dy = c.mesh.position.y - (player.pos.y + CFG.height * 0.55),
          dz = c.mesh.position.z - player.pos.z;
      if (dx * dx + dy * dy + dz * dz < 1.5) {
        c.taken = true; c.mesh.visible = false;
        stats.coins += 1; stats.score += 10;
        burst(c.mesh.position.x, c.mesh.position.y, c.mesh.position.z, 0xffd24a, 8, 2);
        sCoin();
      }
    }
  }

  function collectMushrooms() {
    for (var i = 0; i < mushrooms.length; i++) {
      var mu = mushrooms[i];
      if (mu.taken) continue;
      mu.t += 0.016;
      mu.obj.rotation.y += 0.02;
      mu.obj.position.y = Math.sin(mu.t * 2) * 0.08;
      var dx = mu.obj.position.x - player.pos.x, dz = mu.obj.position.z - player.pos.z;
      var dy = (mu.obj.position.y + 0.4) - (player.pos.y + CFG.height * 0.5);
      if (dx * dx + dz * dz < 1.6 && Math.abs(dy) < 1.6) {
        mu.taken = true; mu.obj.visible = false;
        player.buff = CFG.buffTime;
        stats.score += 50;
        burst(mu.obj.position.x, mu.obj.position.y + 0.4, mu.obj.position.z, 0xff5a5a, 18, 3);
        sBuff();
        toast('变身！按 Q 释放震波');
      }
    }
  }

  function useSkill() {
    if (player.buff <= 0) { toast('先吃蘑菇变身'); return; }
    if (player.skillCd > 0) return;
    player.skillCd = CFG.skillCd;
    sSkill();
    burst(player.pos.x, player.pos.y + 0.5, player.pos.z, 0x8fe3ff, 26, 4.2);
    var hitAny = 0;
    for (var e = 0; e < enemies.length; e++) {
      var en = enemies[e];
      if (!en.alive) continue;
      var d = en.obj.position.distanceTo(player.pos);
      if (d < CFG.skillRadius) { popEnemy(en, true); hitAny++; }
    }
    for (var b = 0; b < blocks.length; b++) {
      var bl = blocks[b];
      if (bl.used) continue;
      var bc = bl.collider;
      var center = new T.Vector3((bc.min.x + bc.max.x) / 2, (bc.min.y + bc.max.y) / 2, (bc.min.z + bc.max.z) / 2);
      if (center.distanceTo(player.pos) < CFG.skillRadius) {
        bl.used = true;
        bl.mesh.material.color.setHex(0x6b5a45);
        bl.mesh.material.emissiveIntensity = 0;
        burst(center.x, center.y, center.z, 0xffc53d, 12, 3);
        spawnDebris(center.x, center.y, center.z, 0xc98f4a, 5);
        stats.coins += 2; stats.score += 20;
        hitAny++;
      }
    }
    for (var wi = 0; wi < breakables.length; wi++) {
      var bw2 = breakables[wi];
      if (!bw2.broken && new T.Vector3(bw2.x, bw2.h * 0.5, bw2.z).distanceTo(player.pos) < CFG.skillRadius) { shatterWall(bw2, 'skill'); hitAny++; }
    }
    stats.score += hitAny * 15;
    toast(hitAny ? ('震波命中 ' + hitAny + ' 个目标') : '震波放空');
    // shock ring
    var ring = new T.Mesh(new T.RingGeometry(0.6, 0.9, 32), new T.MeshBasicMaterial({ color: 0x9fe8ff, transparent: true, opacity: 0.8, side: T.DoubleSide }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(player.pos.x, player.pos.y + 0.08, player.pos.z);
    scene.add(ring);
    rings.push({ mesh: ring, t: 0 });
  }
  var rings = [];
  function updateRings(dt) {
    for (var i = rings.length - 1; i >= 0; i--) {
      var r = rings[i];
      r.t += dt;
      var s = 1 + r.t * 14;
      r.mesh.scale.set(s, s, s);
      r.mesh.material.opacity = Math.max(0, 0.8 - r.t * 1.6);
      if (r.t > 0.5) { scene.remove(r.mesh); r.mesh.geometry.dispose(); r.mesh.material.dispose(); rings.splice(i, 1); }
    }
  }

  function popEnemy(en, bySkill) {
    en.alive = false; en.dead = 0.3;
    en.obj.scale.set(1.25, 0.3, 1.25);
    burst(en.obj.position.x, en.obj.position.y + 0.4, en.obj.position.z, 0x8f5bd0, bySkill ? 20 : 12, bySkill ? 3.4 : 2.4);
    spawnDebris(en.obj.position.x, en.obj.position.y + 0.5, en.obj.position.z, 0x6f47a8, 4);
    stats.popped += 1; stats.score += bySkill ? 60 : 40;
    sPop();
  }

  function updateEnemies(dt) {
    for (var i = 0; i < enemies.length; i++) {
      var e = enemies[i];
      if (!e.alive) {
        if (e.dead > 0) { e.dead -= dt; if (e.dead <= 0) e.obj.visible = false; }
        continue;
      }
      var o = e.obj;
      if (e.chaser) {
        var dxp = player.pos.x - o.position.x, dzp = player.pos.z - o.position.z;
        var dist2 = dxp * dxp + dzp * dzp;
        if (dist2 < 100) {
          var inv = 1 / Math.max(0.001, Math.sqrt(dist2));
          o.position.x += dxp * inv * e.speed * 1.35 * dt;
          o.position.z += dzp * inv * e.speed * 0.55 * dt;
          e.dir = dxp >= 0 ? 1 : -1;
        } else {
          o.position.x += e.dir * e.speed * dt;
          if (Math.abs(o.position.x - e.home.x) > e.range) e.dir *= -1;
        }
      } else {
        o.position.x += e.dir * e.speed * dt;
        if (Math.abs(o.position.x - e.home.x) > e.range) e.dir *= -1;
      }
      o.rotation.y = e.dir > 0 ? 0.25 : -0.25;
      o.position.y = Math.abs(Math.sin(stats.time * 6 + i)) * 0.06;

      var ox = Math.abs(o.position.x - player.pos.x), oz = Math.abs(o.position.z - player.pos.z);
      if (ox < 0.85 && oz < 0.85) {
        var feet = player.pos.y;
        if (player.vel.y < 0 && feet > o.position.y + 0.3) {
          popEnemy(e, false);
          player.vel.y = 8.6; player.airJumps = Math.max(player.airJumps, 2);
          player.jumpHeld = false;
          toast('踩爆！');
        } else if (feet < o.position.y + 0.95) {
          damage();
        }
      }
    }
  }

  function updateBlocks(dt) {
    for (var i = 0; i < blocks.length; i++) {
      var b = blocks[i];
      b.bob += dt;
      if (b.used) continue;
      b.mesh.material.emissiveIntensity = 0.3 + Math.sin(b.bob * 3) * 0.16;
      var c = b.collider;
      var near = player.pos.x > c.min.x - 0.6 && player.pos.x < c.max.x + 0.6 && player.pos.z > c.min.z - 0.6 && player.pos.z < c.max.z + 0.6;
      var head = player.pos.y + CFG.height;
      if (near && player.vel.y > 0 && head > c.min.y - 0.25 && head < c.min.y + 0.3) {
        b.used = true;
        b.mesh.material.color.setHex(0x6b5a45);
        b.mesh.material.emissiveIntensity = 0;
        stats.coins += 2; stats.score += 20;
        burst(c.min.x + 0.6, c.min.y, c.min.z + 0.6, 0xffd24a, 10, 2.6);
        sCoin(); toast('顶出 2 枚金币');
      }
    }
  }

  function checkGoal() {
    if (!goal || state !== 'play') return;
    var dz = goal.pos.z - player.pos.z;
    if (dz > -3.6 || (Math.abs(goal.pos.x - player.pos.x) < 5.5 && dz > -6)) {
      state = 'win';
      document.getElementById('winLine').textContent =
        '用时 ' + stats.time.toFixed(1) + 's · 金币 ' + stats.coins + '/' + stats.total + ' · 得分 ' + stats.score;
      document.getElementById('win').style.display = 'grid';
      if (document.pointerLockElement) document.exitPointerLock();
      sWin();
    }
  }
  // ---------------- audio (synth only) ----------------
  var ac = null;
  function audio() {
    if (!ac) { try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { ac = null; } }
    if (ac && ac.state === 'suspended') ac.resume();
    return ac;
  }
  function tone(freq, dur, type, gain, slide) {
    var a = audio(); if (!a) return;
    var o = a.createOscillator(), g = a.createGain();
    o.type = type || 'square';
    o.frequency.setValueAtTime(freq, a.currentTime);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, freq * slide), a.currentTime + dur);
    g.gain.setValueAtTime(0.0001, a.currentTime);
    g.gain.exponentialRampToValueAtTime(gain || 0.07, a.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + dur);
    o.connect(g); g.connect(a.destination);
    o.start(); o.stop(a.currentTime + dur + 0.02);
  }
  function sJump() { tone(430, 0.14, 'square', 0.06, 1.9); }
  function sDouble() { tone(560, 0.16, 'triangle', 0.06, 1.7); setTimeout(function () { tone(820, 0.12, 'triangle', 0.05); }, 60); }
  function sCoin() { tone(1180, 0.06, 'triangle', 0.05); setTimeout(function () { tone(1580, 0.1, 'triangle', 0.045); }, 60); }
  function sPop() { tone(240, 0.1, 'sawtooth', 0.08, 0.4); }
  function sHit() { tone(300, 0.26, 'sawtooth', 0.09, 0.25); }
  function sBuff() { [523, 784, 1046].forEach(function (f, i) { setTimeout(function () { tone(f, 0.12, 'triangle', 0.06); }, i * 80); }); }
  function sSkill() { tone(180, 0.32, 'sawtooth', 0.1, 2.4); }
  function sWin() { [523, 659, 784, 1046].forEach(function (f, i) { setTimeout(function () { tone(f, 0.18, 'triangle', 0.06); }, i * 120); }); }

  // ---------------- music: a small sequencer, scheduled on the audio clock ----------------
  var music = { on: true, step: 0, next: 0, bpm: 96, gain: 0.5, master: null, layer: { calm: 1, danger: 0, buff: 0 } };
  var CHORDS = [
    { root: 110.0, notes: [220.0, 261.63, 329.63] },   // Am
    { root: 87.31, notes: [174.61, 220.0, 261.63] },   // F
    { root: 130.81, notes: [261.63, 329.63, 392.0] },  // C
    { root: 98.0,  notes: [196.0, 246.94, 293.66] }    // G
  ];

  function musicBus() {
    var a = audio();
    if (!a) return null;
    if (!music.master) {
      music.master = a.createGain();
      music.master.gain.value = music.gain;
      music.master.connect(a.destination);
    }
    return a;
  }

  function note(freq, at, dur, type, peak) {
    var a = music.master && music.master.context;
    if (!a) return;
    var o = a.createOscillator(), g = a.createGain();
    o.type = type || 'triangle';
    o.frequency.setValueAtTime(freq, at);
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(peak || 0.06, at + Math.min(0.08, dur * 0.3));
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    o.connect(g); g.connect(music.master);
    o.start(at); o.stop(at + dur + 0.03);
  }

  function hat(at, peak) {
    var a = music.master && music.master.context;
    if (!a) return;
    var len = Math.floor(a.sampleRate * 0.05);
    var buf = a.createBuffer(1, len, a.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    var src = a.createBufferSource();
    src.buffer = buf;
    var g = a.createGain(); g.gain.value = peak || 0.05;
    var hp = a.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 6000;
    src.connect(hp); hp.connect(g); g.connect(music.master);
    src.start(at);
  }

  function musicLayers() {
    var danger = 0;
    for (var i = 0; i < enemies.length; i++) {
      var e = enemies[i];
      if (!e.alive) continue;
      var d = e.obj.position.distanceTo(player.pos);
      if (d < 9) danger = Math.max(danger, 1 - d / 9);
    }
    for (var j = 0; j < guardians.length; j++) {
      if (!guardians[j].alive) continue;
      var dg = guardians[j].obj.position.distanceTo(player.pos);
      if (dg < 16) danger = Math.max(danger, 1 - dg / 16);
    }
    var target = {
      danger: Math.min(1, danger),
      buff: player.buff > 0 ? 1 : (player.star > 0 ? 0.7 : 0)
    };
    target.calm = 1 - Math.max(target.danger, target.buff) * 0.8;
    var k = 1.2;
    music.layer.calm += (target.calm - music.layer.calm) * k * 0.016;
    music.layer.danger += (target.danger - music.layer.danger) * k * 0.016;
    music.layer.buff += (target.buff - music.layer.buff) * k * 0.016;
  }

  function musicTick() {
    var a = musicBus();
    if (!a || !music.on) return;
    if (music.next < a.currentTime) music.next = a.currentTime + 0.05;
    while (music.next < a.currentTime + 0.25) {
      var step = music.step % 32;
      var bar = Math.floor(music.step / 32) % 4;
      var ch = CHORDS[bar];
      var at = music.next;
      var beat = 60 / music.bpm / 2 * (1 - music.layer.danger * 0.06);
      var L = music.layer;
      // calm layer: bass + pad
      if (step % 4 === 0) note(ch.root, at, beat * 1.6, 'sine', 0.10 * (0.6 + L.calm * 0.6));
      if (step % 16 === 0) {
        for (var n = 0; n < ch.notes.length; n++) note(ch.notes[n], at, beat * 14, 'triangle', 0.032 * (0.7 + L.calm * 0.5));
      }
      // danger layer: arpeggio + hats, and a low pulse
      if (step % 2 === 1) note(ch.notes[(step / 2 | 0) % ch.notes.length] * 2, at, beat * 0.8, 'square', 0.010 + L.danger * 0.030);
      if (step % 4 === 2) hat(at, 0.012 + L.danger * 0.055);
      if (L.danger > 0.25 && step % 8 === 4) note(ch.root * 0.5, at, beat * 0.9, 'sawtooth', 0.02 + L.danger * 0.04);
      // buff layer: bright lead notes
      if (L.buff > 0.15 && step % 4 === 0) {
        note(ch.notes[(step / 4 | 0) % ch.notes.length] * 4, at, beat * 1.1, 'square', 0.012 + L.buff * 0.026);
      }
      music.step += 1;
      music.next += beat;
    }
  }

  function setMusic(on) {
    music.on = on;
    if (music.master) music.master.gain.value = on ? music.gain : 0.0001;
    toast(on ? '音乐开' : '音乐关');
  }

  // ---------------- collision ----------------
  function playerBox() {
    return {
      min: new T.Vector3(player.pos.x - CFG.radius, player.pos.y, player.pos.z - CFG.radius),
      max: new T.Vector3(player.pos.x + CFG.radius, player.pos.y + CFG.height, player.pos.z + CFG.radius)
    };
  }

  function overlap(a, c) {
    return a.min.x < c.max.x && a.max.x > c.min.x && a.min.y < c.max.y && a.max.y > c.min.y && a.min.z < c.max.z && a.max.z > c.min.z;
  }

  function insideAny(pt, pad) {
    for (var i = 0; i < colliders.length; i++) {
      var c = colliders[i];
      if (pt.x > c.min.x - pad && pt.x < c.max.x + pad && pt.y > c.min.y - pad && pt.y < c.max.y + pad && pt.z > c.min.z - pad && pt.z < c.max.z + pad) return true;
    }
    return false;
  }

  function moveAxis(axis, amount) {
    if (!amount) return;
    var before = player.pos[axis];
    player.pos[axis] += amount;
    for (var i = 0; i < colliders.length; i++) {
      var c = colliders[i];
      if (!overlap(playerBox(), c)) continue;
      if (axis === 'y') {
        if (amount > 0) player.pos.y = c.min.y - CFG.height - 0.001;
        else { player.pos.y = c.max.y + 0.001; player.onGround = true; }
        player.vel.y = 0;
      } else {
        if (amount > 0) player.pos[axis] = c.min[axis] - CFG.radius - 0.001;
        else player.pos[axis] = c.max[axis] + CFG.radius + 0.001;
        player.vel[axis] = 0;
      }
      if (overlap(playerBox(), c)) { player.pos[axis] = before; player.vel[axis] = 0; }
    }
  }

  function groundProbe() {
    var b = playerBox();
    b.min.y -= 0.06; b.max.y = b.min.y + 0.04;
    for (var i = 0; i < colliders.length; i++) if (overlap(b, colliders[i])) return colliders[i];
    return null;
  }

  function depenetrate() {
    for (var pass = 0; pass < 2; pass++) {
      var box = playerBox();
      for (var i = 0; i < colliders.length; i++) {
        var c = colliders[i];
        if (!overlap(box, c)) continue;
        var pushX = Math.min(box.max.x - c.min.x, c.max.x - box.min.x);
        var pushY = Math.min(box.max.y - c.min.y, c.max.y - box.min.y);
        var pushZ = Math.min(box.max.z - c.min.z, c.max.z - box.min.z);
        if (pushY <= pushX && pushY <= pushZ) {
          if (player.pos.y + CFG.height * 0.5 > (c.min.y + c.max.y) * 0.5) player.pos.y = c.max.y + 0.01;
          else player.pos.y = c.min.y - CFG.height - 0.01;
          if (player.vel.y < 0) { player.onGround = true; player.vel.y = 0; }
        } else if (pushX <= pushZ) {
          player.pos.x = (player.pos.x > (c.min.x + c.max.x) * 0.5) ? c.max.x + CFG.radius + 0.01 : c.min.x - CFG.radius - 0.01;
          player.vel.x = 0;
        } else {
          player.pos.z = (player.pos.z > (c.min.z + c.max.z) * 0.5) ? c.max.z + CFG.radius + 0.01 : c.min.z - CFG.radius - 0.01;
          player.vel.z = 0;
        }
        box = playerBox();
      }
    }
  }

  // ---------------- particles (pooled meshes) ----------------
  var particleGeo = null, particleMat = null;
  var debris = [];
  function spawnDebris(x, y, z, color, n) {
    for (var i = 0; i < n; i++) {
      var geo = new T.TetrahedronGeometry(0.12 + Math.random() * 0.12, 0);
      var mat = new T.MeshStandardMaterial({ color: color, roughness: 0.7, flatShading: true });
      var m = new T.Mesh(geo, mat);
      m.position.set(x + (Math.random() - 0.5) * 0.6, y + Math.random() * 0.6, z + (Math.random() - 0.5) * 0.6);
      m.castShadow = true;
      scene.add(m);
      debris.push({
        mesh: m,
        vel: new T.Vector3((Math.random() - 0.5) * 6, 3 + Math.random() * 5, (Math.random() - 0.5) * 6),
        spin: new T.Vector3(Math.random() * 8, Math.random() * 8, Math.random() * 8),
        life: 2.6
      });
    }
  }

  function updateDebris(dt) {
    for (var i = debris.length - 1; i >= 0; i--) {
      var d = debris[i];
      d.life -= dt;
      d.vel.y -= 24 * dt;
      d.mesh.position.addScaledVector(d.vel, dt);
      d.mesh.rotation.x += d.spin.x * dt;
      d.mesh.rotation.y += d.spin.y * dt;
      d.mesh.rotation.z += d.spin.z * dt;
      if (d.mesh.position.y < 0.12 && d.vel.y < 0) {
        d.mesh.position.y = 0.12;
        d.vel.y *= -0.42;
        d.vel.x *= 0.7; d.vel.z *= 0.7;
        d.spin.multiplyScalar(0.6);
      }
      if (d.life <= 0) {
        scene.remove(d.mesh);
        d.mesh.geometry.dispose();
        d.mesh.material.dispose();
        debris.splice(i, 1);
      }
    }
  }

  function spawnParticle(x, y, z, vx, vy, vz, color, size, life) {
    if (particles.length > 240) return;
    var m = new T.Mesh(particleGeo, particleMat.clone());
    m.material.color.setHex(color);
    m.material.transparent = true;
    m.position.set(x, y, z);
    m.scale.setScalar(size);
    scene.add(m);
    particles.push({ mesh: m, vel: new T.Vector3(vx, vy, vz), life: life, max: life });
  }

  function burst(x, y, z, color, n, power) {
    for (var i = 0; i < n; i++) {
      var a = Math.random() * Math.PI * 2, up = 0.6 + Math.random() * 1.4;
      spawnParticle(x, y, z, Math.cos(a) * power * (0.4 + Math.random()), up * power, Math.sin(a) * power * (0.4 + Math.random()), color, 0.12 + Math.random() * 0.14, 0.45 + Math.random() * 0.45);
    }
  }

  function updateParticles(dt) {
    for (var i = particles.length - 1; i >= 0; i--) {
      var q = particles[i];
      q.life -= dt;
      if (q.life <= 0) { scene.remove(q.mesh); q.mesh.material.dispose(); particles.splice(i, 1); continue; }
      q.vel.y -= 22 * dt;
      q.mesh.position.addScaledVector(q.vel, dt);
      var k = q.life / q.max;
      q.mesh.scale.setScalar(0.13 * k + 0.03);
      q.mesh.material.opacity = Math.min(1, k * 1.7);
    }
  }

  // ---------------- fireball ----------------");
  var fireballs = [];
  var fireCd = 0;
  var fbPool = [], fbLight = null, fbFlash = 0;

  function buildFireballPool() {
    if (fbPool.length) return;
    var geo = new T.SphereGeometry(0.32, 14, 12);
    var mat = new T.MeshStandardMaterial({ color: 0xffb347, emissive: 0xff6a00, emissiveIntensity: 2.2, roughness: 0.4 });
    for (var i = 0; i < 8; i++) {
      var m = new T.Mesh(geo, mat);
      m.visible = false;
      m.frustumCulled = false;
      scene.add(m);
      fbPool.push(m);
    }
    fbLight = new T.PointLight(0xff8a3a, 0, 16, 2);
    fbLight.position.set(0, 60, 0);
    scene.add(fbLight);
  }

  function takeFireballMesh() {
    for (var i = 0; i < fbPool.length; i++) if (!fbPool[i].visible) return fbPool[i];
    return fbPool[0];
  }

  function fireballFire() {
    if (fireCd > 0 || state !== 'play') return;
    fireCd = 1.1;
    var dir = aimDirection();
    var origin = camera.position.clone().addScaledVector(dir, 1.0);
    if (!fbPool.length) buildFireballPool();
    var ball = takeFireballMesh();
    ball.position.copy(origin);
    ball.visible = true;
    if (fbLight) { fbLight.position.copy(origin); fbLight.intensity = 26; }
    fireballs.push({ mesh: ball, vel: dir.clone().multiplyScalar(34), life: 3.2, t: 0 });
    tone(180, 0.16, 'sawtooth', 0.09, 2.6);
    addShake(0.18);
    for (var i = 0; i < 8; i++) {
      spawnParticle(origin.x, origin.y, origin.z, (Math.random() - 0.5) * 5, Math.random() * 3, (Math.random() - 0.5) * 5, 0xffb347, 0.1, 0.3);
    }
  }

  function explodeFireball(fb) {
    var p = fb.mesh.position.clone();
    for (var wi2 = 0; wi2 < breakables.length; wi2++) {
      var bw3 = breakables[wi2];
      if (!bw3.broken && new T.Vector3(bw3.x, bw3.baseY + bw3.h * 0.5, bw3.z).distanceTo(p) < 3.6) shatterWall(bw3, 'fireball');
    }
    burst(p.x, p.y, p.z, 0xffa23a, 26, 6);
    burst(p.x, p.y, p.z, 0xffe6a8, 12, 4);
    addShake(0.55);
    tone(90, 0.34, 'sawtooth', 0.12, 0.4);
    // damage enemies in a 4.6 m sphere
    for (var i = 0; i < enemies.length; i++) {
      var en = enemies[i];
      if (!en.alive) continue;
      if (en.obj.position.distanceTo(p) < 4.6) { popEnemy(en, true); }
    }
    for (var f = 0; f < flyers.length; f++) {
      var fl = flyers[f];
      if (!fl.alive) continue;
      if (fl.obj.position.distanceTo(p) < 4.6) {
        fl.alive = false; fl.obj.visible = false;
        stats.popped += 1; stats.score += 60;
        burst(fl.obj.position.x, fl.obj.position.y, fl.obj.position.z, 0xe0554f, 16, 3);
      }
    }
    for (var bi = 0; bi < birds.length; bi++) {
      var bb = birds[bi];
      if (bb.alive && bb.obj.position.distanceTo(p) < 5.2) {
        bb.hp -= 1; bb.hit = 0.4;
        burst(bb.obj.position.x, bb.obj.position.y, bb.obj.position.z, 0x8a93a8, 14, 3);
        if (bb.hp <= 0) { bb.alive = false; bb.obj.visible = false; stats.score += 120; stats.popped += 1; toast('巨鸟击落 +120'); }
      }
    }
    for (var gdi = 0; gdi < guardians.length; gdi++) {
      var gd = guardians[gdi];
      if (!gd.alive) continue;
      if (gd.obj.position.distanceTo(p) < 5.2) {
        gd.hp -= 1; gd.hit = 0.3;
        burst(gd.obj.position.x, 1.2, gd.obj.position.z, 0xffb02e, 14, 3);
        if (gd.hp <= 0) {
          gd.alive = false; gd.obj.visible = false;
          stats.popped += 1; stats.score += 200;
          burst(gd.obj.position.x, 1.2, gd.obj.position.z, 0xffb02e, 30, 5);
          toast('守卫被火球击倒 +200');
        }
      }
    }
    // break blocks
    for (var b = 0; b < blocks.length; b++) {
      var bl = blocks[b];
      if (bl.used) continue;
      var bc = bl.collider;
      var c = new T.Vector3((bc.min.x + bc.max.x) / 2, (bc.min.y + bc.max.y) / 2, (bc.min.z + bc.max.z) / 2);
      if (c.distanceTo(p) < 4.2) {
        bl.used = true;
        bl.mesh.material.color.setHex(0x6b5a45);
        bl.mesh.material.emissiveIntensity = 0;
        stats.coins += 2; stats.score += 20;
      }
    }
    if (fbLight) { fbLight.position.copy(p); fbFlash = 0.28; }
    fb.mesh.visible = false;
  }

  function updateFireballs(dt) {
    if (fireCd > 0) fireCd -= dt;
    if (fbFlash > 0) {
      fbFlash = Math.max(0, fbFlash - dt);
      if (fbLight) fbLight.intensity = 60 * (fbFlash / 0.28);
    } else if (fbLight && fireballs.length === 0) {
      fbLight.intensity = 0;
    }
    for (var i = fireballs.length - 1; i >= 0; i--) {
      var fb = fireballs[i];
      fb.t += dt;
      fb.life -= dt;
      fb.vel.y -= 9 * dt;
      var step = fb.vel.clone().multiplyScalar(dt);
      var hit = rayHitWorld(fb.mesh.position.clone(), step.clone().normalize(), step.length() + 0.35);
      fb.mesh.position.add(step);
      if (fbLight) { fbLight.position.copy(fb.mesh.position); fbLight.intensity = 22 + Math.sin(fb.t * 30) * 6; }
      if (Math.random() < 0.7) {
        spawnParticle(fb.mesh.position.x, fb.mesh.position.y, fb.mesh.position.z, (Math.random() - 0.5) * 2, Math.random() * 2, (Math.random() - 0.5) * 2, 0xff9a3a, 0.09, 0.22);
      }
      // enemies also stop it
      var hitSomething = !!hit;
      for (var e = 0; e < enemies.length && !hitSomething; e++) {
        if (enemies[e].alive && enemies[e].obj.position.distanceTo(fb.mesh.position) < 1.0) hitSomething = true;
      }
      if (hitSomething || fb.life <= 0 || fb.mesh.position.y < -3) {
        explodeFireball(fb);
        fireballs.splice(i, 1);
      }
    }
  }

  // ---------------- grapple hook ----------------
  var rope = null, hook = null, shake = 0, crosshair = null, lastGroundY = 0;

  function rayHitWorld(origin, dir, maxDist) {
    var bestD = maxDist, best = null;
    for (var i = 0; i < colliders.length; i++) {
      var c = colliders[i];
      var tmin = 0, tmax = bestD, hit = true;
      for (var a = 0; a < 3; a++) {
        var o = a === 0 ? origin.x : a === 1 ? origin.y : origin.z;
        var d = a === 0 ? dir.x : a === 1 ? dir.y : dir.z;
        var mn = a === 0 ? c.min.x : a === 1 ? c.min.y : c.min.z;
        var mx = a === 0 ? c.max.x : a === 1 ? c.max.y : c.max.z;
        if (Math.abs(d) < 1e-6) { if (o < mn || o > mx) { hit = false; break; } }
        else {
          var t1 = (mn - o) / d, t2 = (mx - o) / d;
          if (t1 > t2) { var tt = t1; t1 = t2; t2 = tt; }
          if (t1 > tmin) tmin = t1;
          if (t2 < tmax) tmax = t2;
          if (tmin > tmax) { hit = false; break; }
        }
      }
      if (hit && tmin > 0.4 && tmin < bestD) { bestD = tmin; best = c; }
    }
    if (!best) return null;
    return { point: origin.clone().addScaledVector(dir, bestD), dist: bestD, collider: best };
  }

  function aimDirection() {
    var d = new T.Vector3();
    camera.getWorldDirection(d);
    return d;
  }

  // ---------------- spider web: fire once, pull once, gone in 5 s ----------------
  var ROPE_POINTS = 16;
  var ropeGeo = null, ropeLine = null, webSplat = null;
  var web = {
    phase: 'idle',      // idle | flying | attached | reeling
    hook: new T.Vector3(), vel: new T.Vector3(), anchor: new T.Vector3(),
    len: 0, timer: 0, points: [], t: 0, cd: 0, reelSpeed: 92, life: 5.0, assist: false, blocked: 0, climb: 0, zipT: 0, onBird: null
  };

  function aimBasis() {
    var dir = aimDirection();
    var up = new T.Vector3(0, 1, 0);
    var right = new T.Vector3().crossVectors(dir, up);
    if (right.lengthSq() < 1e-4) right.set(1, 0, 0);
    right.normalize();
    var realUp = new T.Vector3().crossVectors(right, dir).normalize();
    return { dir: dir, right: right, up: realUp };
  }

  // A small cone of rays around the crosshair, so webbing a ledge does not need pixel precision.
  function assistedHit(range) {
    var origin = camera.position.clone();
    var b = aimBasis();
    var best = null, bestAngle = 0.30;
    var direct = rayHitWorld(origin, b.dir, range);
    window.__assistDbg = { direct: !!direct, cone: 0, best: null };
    if (direct) return { point: direct.point, dist: direct.dist, assist: false };
    var steps = [[0.09, 0], [-0.09, 0], [0, 0.09], [0, -0.09], [0.16, 0.06], [-0.16, 0.06], [0.16, -0.06], [-0.16, -0.06], [0, 0.2], [0, -0.2]];
    for (var i = 0; i < steps.length; i++) {
      var ax = steps[i][0], ay = steps[i][1];
      var d = b.dir.clone().addScaledVector(b.right, ax).addScaledVector(b.up, ay).normalize();
      var hit = rayHitWorld(origin, d, range);
      if (!hit) continue;
      var ang = Math.acos(Math.max(-1, Math.min(1, d.dot(b.dir))));
      window.__assistDbg.cone++;
      if (ang < bestAngle) { bestAngle = ang; window.__assistDbg.best = +ang.toFixed(3); best = { point: hit.point, dist: hit.dist, assist: true }; }
    }
    return best;
  }

  function grappleTarget() {
    return assistedHit(64);
  }

  function initRope() {
    var pts = [];
    for (var i = 0; i < ROPE_POINTS; i++) pts.push(new T.Vector3());
    web.points = pts;
    ropeGeo = new T.BufferGeometry().setFromPoints(pts);
    ropeLine = new T.Line(ropeGeo, new T.LineBasicMaterial({ color: 0xf2f8ff, transparent: true, opacity: 0.95 }));
    ropeLine.frustumCulled = false;
    ropeLine.visible = false;
    scene.add(ropeLine);
    webSplat = new T.Mesh(new T.SphereGeometry(0.16, 8, 6), new T.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 }));
    webSplat.visible = false;
    scene.add(webSplat);
  }

  function handPoint() {
    if (mode === 'tp') return new T.Vector3(player.pos.x, player.pos.y + 1.15, player.pos.z);
    return camera.position.clone().addScaledVector(aimDirection(), 0.5);
  }

  function webFire() {
    if (web.cd > 0) return;
    if (web.phase !== 'idle') webDrop('');   // the old web dies the instant a new one is sent
    // clear any leftover rope in the same frame, so nothing of the old line survives
    if (ropeLine) { ropeLine.visible = false; ropeGeo.setFromPoints(web.points); }
    if (webSplat) webSplat.visible = false;
    web.replaced = true;
    web.cd = 0.06;
    web.blocked = 0; web.climb = 0; web.assist = false;
    var aimDir = aimDirection();
    var birdHit = hitBird(camera.position.clone(), aimDir, 90);
    var aimHit = birdHit ? { point: birdHit.point, dist: birdHit.dist, assist: false, bird: birdHit.bird } : assistedHit(64);
    if (birdHit) web.onBird = birdHit.bird;
    var dir = aimHit ? aimHit.point.clone().sub(camera.position).normalize() : aimDirection();
    web.assist = !!(aimHit && aimHit.assist);
    web.phase = 'flying';
    web.t = 0;
    web.hook.copy(camera.position).addScaledVector(dir, 0.7);
    web.vel.copy(dir).multiplyScalar(104);
    for (var i = 0; i < ROPE_POINTS; i++) web.points[i].copy(handPoint());
    ropeLine.visible = true;
    webSplat.visible = false;
    tone(920, 0.05, 'square', 0.05, 1.6);
  }

  function webAttach(point) {
    web.replaced = false;
    if (!web.onBird && web.lastAimBird) web.onBird = web.lastAimBird;
    var towardCam = camera.position.clone().sub(point).normalize();
    web.anchor.copy(point).addScaledVector(towardCam, 0.35);   // stand off the surface a touch
    web.len = Math.max(2.0, point.distanceTo(player.pos));
    web.blocked = 0; web.climb = 0;
    webSplat.position.copy(point);
    webSplat.visible = true;
    burst(point.x, point.y, point.z, 0xffffff, 14, 2.6);
    webZip();                       // sticking is the zip: no second press, no wait
  }

  // Spider-Man feel: a hard impulse toward the anchor the frame the web lands.
  function webZip() {
    web.phase = 'reeling';
    web.zipT = 0;
    var to = web.anchor.clone().sub(player.pos);
    var d = to.length();
    if (d < 0.001) return;
    var dir = to.clone().normalize();
    var zipSpeed = Math.min(58, 26 + d * 1.4);        // farther anchor -> harder throw
    player.vel.copy(dir).multiplyScalar(zipSpeed);
    player.vel.y += 4.5;                              // slight lift so you clear the floor
    player.airJumps = 2;
    player.jumpHeld = false;
    addShake(0.35);
    tone(240, 0.16, 'sawtooth', 0.09, 3.2);
    for (var i = 0; i < 18; i++) {
      spawnParticle(player.pos.x, player.pos.y + 1, player.pos.z, (Math.random() - 0.5) * 8, Math.random() * 4, (Math.random() - 0.5) * 8, 0xffffff, 0.1, 0.35);
    }
  }

  function webDrop(reason) {
    easeFovBack(1 / 60);
    web.onBird = null;
    web.blocked = 0; web.climb = 0; web.zipT = 0;
    if (web.phase === 'idle') return;
    var at = web.anchor.clone();
    burst(at.x, at.y, at.z, 0xdfe9f2, 12, 2.2);
    web.phase = 'idle';
    ropeLine.visible = false;
    webSplat.visible = false;
    if (reason) toast(reason);
  }

  function webPress() {
    if (web.phase === 'idle') { webFire(); return; }
    if (web.phase === 'attached') {
      web.phase = 'reeling';
      web.reelSpeed = 48;
      tone(300, 0.14, 'sawtooth', 0.07, 2.6);
      addShake(0.2);
      toast('收线');
      return;
    }
    if (web.phase === 'reeling') { webDrop('松开蛛丝'); return; }
    if (web.phase === 'flying') { webDrop(''); }
  }

  function easeFovBack(dt) {
    if (!camera) return;
    if (web.phase !== 'reeling' && Math.abs(camera.fov - 68) > 0.4) {
      camera.fov += (68 - camera.fov) * Math.min(1, dt * 6);
      camera.updateProjectionMatrix();
    }
  }

  function updateWeb(dt) {
    if (web.cd > 0) web.cd -= dt;
    easeFovBack(dt);
    if (web.phase === 'idle') return;
    web.t += dt;
    if (web.onBird && web.onBird.alive && (web.phase === 'attached' || web.phase === 'reeling')) {
      web.anchor.copy(web.onBird.obj.position);
    }

    if (web.phase === 'flying') {
      var steps = 4, stepLen = (web.vel.length() * dt) / steps;
      for (var st = 0; st < steps; st++) {
        var from = web.hook.clone();
        var dirn = web.vel.clone().normalize();
        web.hook.addScaledVector(web.vel, dt / steps);
        web.vel.y -= 5 * dt / steps;
        var hit = rayHitWorld(from, dirn, stepLen + 0.35);
        if (hit) { web.hook.copy(hit.point); webAttach(hit.point); break; }
      }
      if (web.phase === 'flying' && (web.hook.distanceTo(camera.position) > 70 || web.t > 1.2)) webDrop('蛛丝没打中');
    }

    if (web.phase === 'attached' || web.phase === 'reeling') {
      var toA = web.anchor.clone().sub(player.pos);
      var dist = toA.length();
      var n = dist > 0.001 ? toA.clone().normalize() : new T.Vector3(0, 1, 0);

      if (web.phase === 'attached') {
        web.timer -= dt;
        if (web.timer <= 0) { webDrop('蛛丝超时消失'); return; }
        // a taut web is a pendulum: only the radial part is removed
        if (dist > web.len) {
          player.pos.addScaledVector(n, dist - web.len);
          var radial = player.vel.dot(n);
          if (radial < 0) player.vel.addScaledVector(n, -radial);
        }
        // aim assist while hanging: a little swing control
        if (input.keys['a']) player.vel.addScaledVector(swingTangent(n), 9 * dt);
        if (input.keys['d']) player.vel.addScaledVector(swingTangent(n), -9 * dt);
      } else {
        // reeling: a hard winch for the first half second, then a quick settle
        web.zipT = (web.zipT || 0) + dt;
        var winch = web.zipT < 0.45 ? 150 : 60;
        player.vel.addScaledVector(n, winch * dt);
        web.len = Math.max(1.4, web.len - (web.zipT < 0.45 ? 92 : 40) * dt);
        if (player.vel.length() > 72) player.vel.setLength(72);
        if (Math.random() < 0.6) {
          spawnParticle(player.pos.x, player.pos.y + 1, player.pos.z, (Math.random() - 0.5) * 4, Math.random() * 2, (Math.random() - 0.5) * 4, 0xdfe9f2, 0.09, 0.3);
        }
        if (dist < 2.4) {
          player.vel.multiplyScalar(0.85);
          player.vel.y = Math.max(player.vel.y, 6.5);
          addShake(0.2);
          webDrop('');
          return;
        }
        var wantFov = 96;
        if (Math.abs(camera.fov - wantFov) > 0.4) { camera.fov += (wantFov - camera.fov) * Math.min(1, dt * 16); camera.updateProjectionMatrix(); }
      }
      if (dist > 90) { webDrop('蛛丝太远'); return; }
      // line of sight: if a wall slides between the hand and the anchor, the web snaps
      if (web.phase === 'reeling') {
        var occl = rayHitWorld(handPoint(), n.clone(), Math.max(0, dist - 0.8));
        if (occl && occl.dist < dist - 0.9) {
          // slide along the wall: kill the normal part of the velocity, keep the tangent
          var wallN = occl.point.clone().sub(handPoint()).normalize();
          var vn = player.vel.dot(wallN);
          if (vn > 0) player.vel.addScaledVector(wallN, -vn * 1.15);
          player.vel.multiplyScalar(0.995);
          player.pos.addScaledVector(wallN, -0.9 * dt * 6);
          // climb: walk the anchor up the wall so the pull direction turns vertical
          web.blocked = (web.blocked || 0) + dt;
          web.climb = web.climb || 0;
          if (web.blocked > 0.08 && web.climb < 4.5) {
            var lift = Math.min(0.9 * dt * 6, 4.5 - web.climb);
            web.anchor.y += lift;
            web.climb += lift;
            web.len = Math.max(1.6, web.anchor.distanceTo(player.pos));
            if (Math.random() < 0.4) spawnParticle(web.anchor.x, web.anchor.y, web.anchor.z, (Math.random() - 0.5) * 2, 1.2, (Math.random() - 0.5) * 2, 0xdfe9f2, 0.07, 0.25);
          }
          if (web.blocked > 1.5) { webDrop('被墙挡住'); addShake(0.3); }
          if (Math.random() < 0.5) spawnParticle(occl.point.x, occl.point.y, occl.point.z, (Math.random() - 0.5) * 3, Math.random() * 2, (Math.random() - 0.5) * 3, 0xe8eef5, 0.08, 0.25);
        } else {
          web.blocked = 0;
        }
      }
    }

    drawWeb(dt);
  }

  function swingTangent(n) {
    var f = forwardVector();
    var t = f.clone().sub(n.clone().multiplyScalar(f.dot(n)));
    if (t.lengthSq() < 0.0001) t.set(1, 0, 0);
    return t.normalize();
  }

  function drawWeb(dt) {
    var hand = handPoint();
    var pts = web.points;
    var tail = (web.phase === 'flying') ? web.hook : web.anchor;
    var segLen = hand.distanceTo(tail) / (ROPE_POINTS - 1);
    pts[0].copy(hand);
    for (var i = 1; i < ROPE_POINTS - 1; i++) {
      var p = pts[i];
      var v = p.clone().sub(pts[i].prev || p);
      pts[i].prev = p.clone();
      p.add(v.multiplyScalar(web.phase === 'reeling' ? 0.75 : 0.9));
      p.y -= 9.8 * dt * dt * (web.phase === 'reeling' ? 4 : 12);
    }
    pts[ROPE_POINTS - 1].copy(tail);
    for (var it = 0; it < 3; it++) {
      for (var j = 0; j < ROPE_POINTS - 1; j++) {
        var a = pts[j], b = pts[j + 1];
        var d = b.clone().sub(a);
        var l = d.length() || 0.0001;
        var diff = (l - segLen) / l;
        if (j === 0) b.addScaledVector(d, -diff);
        else if (j === ROPE_POINTS - 2) a.addScaledVector(d, diff);
        else { a.addScaledVector(d, diff * 0.5); b.addScaledVector(d, -diff * 0.5); }
      }
    }
    if (ropeGeo) { ropeGeo.setFromPoints(pts); ropeGeo.attributes.position.needsUpdate = true; }
    ropeLine.visible = true;
    ropeLine.material.opacity = web.phase === 'attached' ? (0.35 + 0.65 * Math.min(1, web.timer / 1.2)) : 0.95;
    if (web.phase !== 'flying') { webSplat.position.copy(web.anchor); webSplat.visible = true; }
  }

  function webStatusText() {
    if (web.phase === 'idle') return L('webReady');
    if (web.phase === 'flying') return L('webFlying');
    if (web.phase === 'attached') return L('webAttached', { s: web.timer.toFixed(1) });
    return L('webReeling');
  }
  function buildGrappleVisuals() {
    var ropeMat = new T.MeshBasicMaterial({ color: 0xbfe9ff, transparent: true, opacity: 0.85 });
    rope = new T.Mesh(new T.CylinderGeometry(0.035, 0.035, 1, 6), ropeMat);
    rope.visible = false;
    scene.add(rope);
    hook = new T.Mesh(new T.ConeGeometry(0.16, 0.4, 8), new T.MeshStandardMaterial({ color: 0xcfe9ff, emissive: 0x3a6a8a, emissiveIntensity: 0.8, metalness: 0.7, roughness: 0.3 }));
    hook.visible = false;
    scene.add(hook);
  }

  function spawnRopeShot(end, hit) {
    for (var i = 0; i < 8; i++) {
      spawnParticle(end.x, end.y, end.z, (Math.random() - 0.5) * 3, Math.random() * 3, (Math.random() - 0.5) * 3, hit ? 0x9fe8ff : 0x8899aa, 0.09, 0.3);
    }
  }

  function addShake(v) { shake = Math.min(1.2, shake + v); }

  // ---------------- pickups: spring pad, speed star, shield ----------------
  var springs = [], stars = [], shields = [];

  function addSpring(x, z) {
    var g = new T.Group();
    var base = new T.Mesh(new T.CylinderGeometry(0.75, 0.85, 0.18, 18), new T.MeshStandardMaterial({ color: 0x2b3a55, roughness: 0.6, metalness: 0.3 }));
    base.position.y = 0.09; base.receiveShadow = true; g.add(base);
    var plate = new T.Mesh(new T.CylinderGeometry(0.62, 0.62, 0.12, 18), new T.MeshStandardMaterial({ color: 0xffb02e, emissive: 0x6a3d00, emissiveIntensity: 0.6, roughness: 0.4 }));
    plate.position.y = 0.22; plate.castShadow = true; g.add(plate);
    g.position.set(x, 0, z);
    scene.add(g);
    springs.push({ obj: g, plate: plate, x: x, z: z, cd: 0 });
  }

  function addStar(x, z) {
    var m = new T.Mesh(new T.OctahedronGeometry(0.3, 0), new T.MeshStandardMaterial({ color: 0x7fe3ff, emissive: 0x2a8fb0, emissiveIntensity: 0.9, metalness: 0.5, roughness: 0.25 }));
    m.position.set(x, 1.0, z);
    m.castShadow = true;
    scene.add(m);
    stars.push({ obj: m, x: x, z: z, taken: false });
  }

  function addShield(x, z) {
    var m = new T.Mesh(new T.IcosahedronGeometry(0.33, 0), new T.MeshStandardMaterial({ color: 0x9ff2c0, emissive: 0x2f8f62, emissiveIntensity: 0.8, transparent: true, opacity: 0.9, roughness: 0.3 }));
    m.position.set(x, 1.0, z);
    m.castShadow = true;
    scene.add(m);
    shields.push({ obj: m, x: x, z: z, taken: false });
  }

  function updatePickups(dt) {
    var i;
    for (i = 0; i < springs.length; i++) {
      var sp = springs[i];
      if (sp.cd > 0) sp.cd -= dt;
      var dx = player.pos.x - sp.x, dz = player.pos.z - sp.z;
      if (sp.cd <= 0 && dx * dx + dz * dz < 1.1 && player.pos.y < 0.7) {
        player.vel.y = 21.5; player.airJumps = 2; sp.cd = 0.6; sp.plate.position.y = 0.34;
        addShake(0.35); burst(sp.x, 0.3, sp.z, 0xffd24a, 14, 3);
        tone(520, 0.16, 'square', 0.07, 2.4); toast('弹簧板');
      }
      sp.plate.position.y = 0.22 + Math.max(0, sp.plate.position.y - 0.22) * Math.max(0, 1 - dt * 6);
    }
    for (i = 0; i < stars.length; i++) {
      var st = stars[i];
      if (st.taken) continue;
      st.obj.rotation.y += dt * 2.4; st.obj.rotation.x += dt * 1.1;
      st.obj.position.y = 1.0 + Math.sin(stats.time * 2 + i) * 0.12;
      var ddx = st.x - player.pos.x, ddz = st.z - player.pos.z;
      if (ddx * ddx + ddz * ddz < 1.4) {
        st.taken = true; st.obj.visible = false; player.star = 9;
        burst(st.x, 1.0, st.z, 0x7fe3ff, 16, 3); sBuff(); toast('加速星：9 秒疾跑');
      }
    }
    for (i = 0; i < shields.length; i++) {
      var sh = shields[i];
      if (sh.taken) continue;
      sh.obj.rotation.y += dt * 1.6;
      var sx = sh.x - player.pos.x, sz = sh.z - player.pos.z;
      if (sx * sx + sz * sz < 1.4) {
        sh.taken = true; sh.obj.visible = false; player.shield = 1;
        burst(sh.x, 1.0, sh.z, 0x9ff2c0, 16, 3); sBuff(); toast('护盾：可挡一次伤害');
      }
    }
    if (player.star > 0) player.star -= dt;
  }

  // ---------------- new monsters: flyer and a small guardian ----------------
  var flyers = [], guardians = [], shots = [];

  function addFlyer(x, y, z) {
    var g = new T.Group();
    var body = new T.Mesh(new T.SphereGeometry(0.36, 16, 12), new T.MeshStandardMaterial({ color: 0xe0554f, roughness: 0.5 }));
    body.castShadow = true; g.add(body);
    var wingMat = new T.MeshStandardMaterial({ color: 0xf6d0c8, roughness: 0.7, side: T.DoubleSide });
    for (var s2 = -1; s2 <= 1; s2 += 2) {
      var wing = new T.Mesh(new T.BoxGeometry(0.5, 0.06, 0.26), wingMat);
      wing.position.set(0.36 * s2, 0.06, 0); g.add(wing);
    }
    var eye = new T.Mesh(new T.SphereGeometry(0.09, 8, 8), new T.MeshStandardMaterial({ color: 0xfff4e0 }));
    eye.position.set(0, 0.05, 0.3); g.add(eye);
    g.position.set(x, y, z);
    scene.add(g);
    flyers.push({ obj: g, home: new T.Vector3(x, y, z), t: Math.random() * 6, alive: true });
  }

  function updateFlyers(dt) {
    for (var i = 0; i < flyers.length; i++) {
      var fl = flyers[i];
      if (!fl.alive) continue;
      var o = fl.obj;
      var dx = player.pos.x - o.position.x, dz = player.pos.z - o.position.z;
      var dy = (player.pos.y + 1) - o.position.y;
      var d2 = dx * dx + dz * dz;
      if (d2 < 64) {
        var inv = 1 / Math.max(0.001, Math.sqrt(d2));
        o.position.x += dx * inv * 3.2 * dt;
        o.position.z += dz * inv * 3.2 * dt;
        o.position.y += Math.sign(dy) * Math.min(1.6, Math.abs(dy)) * dt;
      } else {
        fl.t += dt;
        o.position.set(fl.home.x + Math.sin(fl.t) * 2.4, fl.home.y + Math.sin(fl.t * 1.7) * 0.6, fl.home.z + Math.cos(fl.t * 0.9) * 1.6);
      }
      var ox = Math.abs(o.position.x - player.pos.x), oz = Math.abs(o.position.z - player.pos.z);
      var oy = Math.abs(o.position.y - (player.pos.y + 0.9));
      if (ox < 0.9 && oz < 0.9 && oy < 1.0) {
        if (player.vel.y < 0 && player.pos.y + 1.5 > o.position.y + 0.3) {
          fl.alive = false; o.visible = false;
          burst(o.position.x, o.position.y, o.position.z, 0xe0554f, 14, 3);
          stats.popped += 1; stats.score += 50; player.vel.y = 9.0; sPop(); toast('空中踩爆');
        } else { damage(); }
      }
    }
  }

  function addGuardian(x, z) {
    var g = new T.Group();
    var body = new T.Mesh(new T.SphereGeometry(0.8, 20, 16), new T.MeshStandardMaterial({ color: 0x3b4b6a, roughness: 0.5, metalness: 0.2 }));
    body.position.y = 0.85; body.castShadow = true; g.add(body);
    var crown = new T.Mesh(new T.ConeGeometry(0.55, 0.5, 8), new T.MeshStandardMaterial({ color: 0xffb02e, emissive: 0x7a4c00, emissiveIntensity: 0.5 }));
    crown.position.y = 1.6; g.add(crown);
    for (var s3 = -1; s3 <= 1; s3 += 2) {
      var eye = new T.Mesh(new T.SphereGeometry(0.12, 10, 10), new T.MeshStandardMaterial({ color: 0xff7a4a, emissive: 0xff3a00, emissiveIntensity: 1.2 }));
      eye.position.set(0.26 * s3, 1.0, 0.66); g.add(eye);
    }
    g.position.set(x, 0, z);
    scene.add(g);
    guardians.push({ obj: g, hp: 3, cd: 1.2, alive: true, hit: 0 });
  }

  function updateGuardians(dt) {
    for (var i = 0; i < guardians.length; i++) {
      var gd = guardians[i];
      if (!gd.alive) continue;
      var o = gd.obj;
      if (gd.hit > 0) { gd.hit -= dt; o.scale.setScalar(1 + Math.sin(gd.hit * 30) * 0.08); }
      var dx = player.pos.x - o.position.x, dz = player.pos.z - o.position.z;
      var d = Math.sqrt(dx * dx + dz * dz);
      if (d < 14) {
        o.rotation.y = Math.atan2(dx, dz);
        if (d > 3.2) { o.position.x += (dx / d) * 1.6 * dt; o.position.z += (dz / d) * 1.6 * dt; }
        gd.cd -= dt;
        if (gd.cd <= 0 && d < 12) {
          gd.cd = 1.6;
          var dir = new T.Vector3(dx, 0.25, dz).normalize();
          var sh = new T.Mesh(new T.SphereGeometry(0.18, 10, 8), new T.MeshStandardMaterial({ color: 0xff8a3a, emissive: 0xff3a00, emissiveIntensity: 1.4 }));
          sh.position.copy(o.position).add(new T.Vector3(0, 1.0, 0));
          scene.add(sh);
          shots.push({ mesh: sh, vel: dir.multiplyScalar(9), life: 4 });
          tone(180, 0.14, 'sawtooth', 0.06, 0.6);
        }
      }
      var ox = Math.abs(o.position.x - player.pos.x), oz = Math.abs(o.position.z - player.pos.z);
      if (ox < 1.2 && oz < 1.2) {
        if (player.vel.y < 0 && player.pos.y > 0.9) {
          gd.hp -= 1; gd.hit = 0.25; player.vel.y = 10.5; sPop();
          burst(o.position.x, 1.2, o.position.z, 0xffb02e, 12, 3);
          if (gd.hp <= 0) {
            gd.alive = false; o.visible = false;
            stats.popped += 1; stats.score += 200;
            burst(o.position.x, 1.2, o.position.z, 0xffb02e, 30, 4.5);
            addShake(0.6); toast('守卫倒下 +200');
          } else { toast('守卫剩余 ' + gd.hp + ' 击'); }
        } else { damage(); }
      }
    }
    for (var j = shots.length - 1; j >= 0; j--) {
      var p = shots[j];
      p.life -= dt;
      p.mesh.position.addScaledVector(p.vel, dt);
      var ddx = p.mesh.position.x - player.pos.x, ddy = p.mesh.position.y - (player.pos.y + 0.9), ddz = p.mesh.position.z - player.pos.z;
      if (ddx * ddx + ddy * ddy + ddz * ddz < 1.0) { damage(); p.life = 0; }
      if (p.life <= 0 || p.mesh.position.y < -2) { scene.remove(p.mesh); shots.splice(j, 1); }
    }
  }

  function highlightAimedNode() {
    var hit = assistedHit(64);
    if (!hit) return;
    for (var i = 0; i < webNodes.length; i++) {
      var n2 = webNodes[i];
      var dx = n2.x - hit.point.x, dy = n2.y - hit.point.y, dz = n2.z - hit.point.z;
      if (dx * dx + dy * dy + dz * dz < 1.6) { n2.aimed = true; return; }
    }
  }

  function updateCrosshair() {
    if (!crosshair) return;
    crosshair.style.display = 'block';
    if (player.grapple.on) { crosshair.className = 'on'; return; }
    var t = assistedHit(64);
    crosshair.className = (web.phase === 'attached' || web.phase === 'reeling') ? 'on' : (t ? (t.assist ? 'assist' : 'ok') : 'no');
  }

  // ---------------- camera ----------------
  function updateCamera(dt) {
    var yaw = input.yaw, pitch = input.pitch;
    if (mode === 'fp') {
      var bob = player.onGround ? Math.sin(stats.time * 11) * Math.min(0.05, Math.hypot(player.vel.x, player.vel.z) * 0.006) : 0;
      var eyeY = player.pos.y + CFG.eye + bob;
      var eyePt = new T.Vector3(player.pos.x, eyeY, player.pos.z);
      if (insideAny(eyePt, 0.3)) {
        var back = new T.Vector3(Math.sin(yaw), 0, Math.cos(yaw));
        var fixed = false;
        for (var bk = 0.3; bk <= 1.8; bk += 0.3) {
          var cand = eyePt.clone().addScaledVector(back, bk);
          if (!insideAny(cand, 0.25)) { eyePt.copy(cand); eyeY = cand.y; fixed = true; break; }
        }
        if (!fixed) {
          for (var dyy = 0.2; dyy <= CFG.eye; dyy += 0.2) {
            eyeY = player.pos.y + CFG.eye - dyy + bob;
            if (!insideAny(new T.Vector3(player.pos.x, eyeY, player.pos.z), 0.25)) break;
          }
        }
      }
      var spd = Math.hypot(player.vel.x, player.vel.z);
      var baseFov = camera.aspect < 1 ? Math.min(96, 68 / Math.max(0.62, camera.aspect)) : 68;
      var wantFovFp = baseFov + Math.min(8, Math.max(0, spd - 6) * 2.2);
      if (Math.abs(camera.fov - wantFovFp) > 0.3 && web.phase !== 'reeling') {
        camera.fov += (wantFovFp - camera.fov) * Math.min(1, dt * 6);
        camera.updateProjectionMatrix();
      }
      camera.position.set(player.pos.x, eyeY, player.pos.z);
      var look = new T.Vector3(
        camera.position.x - Math.sin(yaw) * Math.cos(pitch),
        camera.position.y + Math.sin(pitch),
        camera.position.z - Math.cos(yaw) * Math.cos(pitch)
      );
      camera.lookAt(look);
      camera.rotateZ(web.phase === 'reeling' ? 0.035 : 0);
      if (fpRig) {
        var reeling = web.phase === 'reeling';
        var targetZ = reeling ? 0.06 : 0;
        var targetY = reeling ? 0.05 : 0;
        fpRig.position.z += (targetZ - fpRig.position.z) * Math.min(1, dt * 8);
        var sway = Math.min(0.5, Math.hypot(player.vel.x, player.vel.z) * 0.05);
        fpRig.rotation.x += ((player.vel.y < -6 ? -sway : 0) - fpRig.rotation.x) * Math.min(1, dt * 5);
        fpRig.position.y = bob * 0.5 - targetY;
        fpRig.rotation.z = Math.sin(stats.time * 1.7) * 0.012;
        fpRig.visible = true;
      }
      if (rig) rig.visible = false;
      return;
    }
    if (fpRig) fpRig.visible = false;
    if (model) model.visible = true;
    var target = new T.Vector3(player.pos.x, player.pos.y + 1.05, player.pos.z);
    var dir = new T.Vector3(Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch));
    var dist = input.dist || CFG.camDist;
    for (var step = 0.6; step <= dist; step += 0.3) {
      if (insideAny(target.clone().addScaledVector(dir, step), 0.45)) { dist = Math.max(2.0, step - 0.5); break; }
    }
    var want = target.clone().addScaledVector(dir, dist);
    if (want.y < 0.9) want.y = 0.9;
    camera.position.lerp(want, 1 - Math.exp(-CFG.camLerp * dt));
    camera.lookAt(target);
  }

  function updateSpeedLines() {
    var el = document.getElementById('speedlines');
    if (!el) return;
    var on = web.phase === 'reeling';
    el.style.opacity = on ? '0.85' : '0';
  }

  function applyShake(dt) {
    if (shake <= 0) return;
    shake = Math.max(0, shake - dt * 2.4);
    var s = shake * 0.16;
    camera.position.x += (Math.random() - 0.5) * s;
    camera.position.y += (Math.random() - 0.5) * s;
    camera.position.z += (Math.random() - 0.5) * s * 0.6;
  }

  var landSquash = 0;
  function landingDust(wasGround) {
    if (!wasGround && player.onGround) {
      landSquash = Math.min(1, Math.abs(player.vel.y) * 0.08);
      var speed = Math.abs(player.vel.y);
      for (var i = 0; i < 8; i++) {
        var a = Math.random() * Math.PI * 2;
        spawnParticle(player.pos.x, player.pos.y + 0.05, player.pos.z, Math.cos(a) * (1 + speed * 0.06), 0.8 + Math.random(), Math.sin(a) * (1 + speed * 0.06), 0xcfd6c4, 0.1, 0.35);
      }
      addShake(Math.min(0.4, speed * 0.02));
    }
  }

  // ---------------- HUD ----------------
  function toast(msg) {
    var el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg; el.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('on'); }, 1300);
  }
  function syncImmersive() {
    setImmersive(state === 'play' && !isTouch && !window.__aerial);
    if (immersive) keepFocus();
  }

  var tut = { step: 0, done: false };
  function tutorialTick() {
    if (tut.done || state !== 'play') return;
    var t = stats.time;
    var marks = [
      [3.0, '左键 / Q 吐蛛丝：命中即飞，收线中再点换目标'],
      [9.0, '空中再按两次 Space = 三级跳（1.7 → 3.8 → 5.2 m）'],
      [15.0, 'E 火球 · C 震波（需蘑菇变身）'],
      [21.0, '清空据点后按 T 传送，Esc 暂停']
    ];
    if (tut.step < marks.length && t >= marks[tut.step][0]) {
      toast(marks[tut.step][1]);
      tut.step += 1;
      if (tut.step >= marks.length) tut.done = true;
    }
  }

  function updateHud() {
    var c = document.getElementById('coins'); if (c) c.textContent = stats.coins + '/' + stats.total;
    var h = document.getElementById('hearts'); if (h) h.textContent = new Array(Math.max(0, stats.lives) + 1).join('♥') || '—';
    var t = document.getElementById('time'); if (t) t.textContent = stats.time.toFixed(1);
    var sc = document.getElementById('score'); if (sc) sc.textContent = stats.score;
    var ws = document.getElementById('webStatus');
    if (ws) ws.textContent = webStatusText();
    var dEl = document.getElementById('districtStatus');
    if (dEl) {
      var clearedCount = 0;
      for (var di = 0; di < districts.length; di++) if (districts[di].cleared) clearedCount++;
      dEl.textContent = L('district', { a: clearedCount, b: districts.length }) + (clearedCount ? L('districtTeleport') : '');
    }
    var fbEl = document.getElementById('fireStatus');
    if (fbEl) fbEl.textContent = fireCd > 0 ? L('fireCd', { s: fireCd.toFixed(1) }) : L('fireReady');
    var bf = document.getElementById('buff');
    if (bf) {
      if (player.buff > 0) { bf.textContent = '变身 ' + player.buff.toFixed(1) + 's · Q 震波'; bf.style.color = '#ffd24a'; }
      else { bf.textContent = L('buffed'); bf.style.color = '#a9b3bd'; }
    }
    var md = document.getElementById('modeLabel'); if (md) md.textContent = mode === 'fp' ? L('fp') : L('tp');
    var pg = document.getElementById('progress');
    if (pg && goal) {
      var done = Math.max(0, Math.min(1, (8 - player.pos.z) / (8 - goal.pos.z)));
      pg.textContent = Math.round(done * 100) + '% · ' + Math.max(0, Math.round(goal.pos.z - player.pos.z) * -1 + 0) + ' m';
    }
  }
  function updateFps(dt, now) {
    fps.frames += 1;
    if (dt > 0) fps.ema += (1 / dt - fps.ema) * 0.1;
    if (!fps.last) fps.last = now;
    if (now - fps.last >= 250) {
      var value = fps.ema;
      if (value > fps.best) fps.best = value;
      if (value < fps.worst || fps.worst === 0) fps.worst = value;
      fps.shown = value;
      var el = document.getElementById('fps');
      if (el) {
        el.textContent = Math.round(value);
        el.style.color = value >= 55 ? '#9ff2c0' : value >= 40 ? '#ffd24a' : '#ff7a7a';
      }
      if (value < 40 && waterReflector) {
        scene.remove(waterReflector);
        waterReflector = null;
        if (water) water.visible = true;
        toast('帧率偏低，水面反射已关（改用波浪水面）');
      } else if (value < 34 && ssaoPass && ssaoPass.enabled) {
        ssaoPass.enabled = false;
        toast('帧率偏低，环境光遮蔽已关（G 键可开回）');
      } else if (!bloomAutoOff && bloomActive() && value < 30) {
        bloomAutoOff = true;
        if (bloomPass) bloomPass.enabled = false;
        toast('帧率偏低，辉光已关（B 键可开回）');
      }
      // dynamic resolution: trim the render buffer when frames run long, restore when there is headroom
      if (dyn.cooldown > 0) dyn.cooldown -= 0.25;
      if (renderer && dyn.cooldown <= 0) {
        var want = dyn.scale;
        if (value < 45 && dyn.scale > 0.72) want = Math.max(0.72, dyn.scale - 0.08);
        else if (value > 57 && dyn.scale < 1) want = Math.min(1, dyn.scale + 0.06);
        if (Math.abs(want - dyn.scale) > 0.001) {
          dyn.scale = want;
          dyn.cooldown = 1.0;
          var baseDpr = Math.min(QUALITY[quality].dpr, window.devicePixelRatio || 1);
          renderer.setPixelRatio(baseDpr * dyn.scale);
        }
      }
      fps.last = now;
      fps.frames = 0;
    }
  }

  function updateBench() {
    if (window.__selftestText) { document.getElementById('bench').textContent = window.__selftestText; return; }
    if (frameSamples.length < 20) return;
    var s = frameSamples.slice().sort(function (a, b) { return a - b; });
    var avg = s.reduce(function (a, b) { return a + b; }, 0) / s.length;
    var p99 = s[Math.min(s.length - 1, Math.floor(s.length * 0.99))];
    var info = 'unknown';
    try {
      var gl = renderer.getContext();
      var ext = gl.getExtension('WEBGL_debug_renderer_info');
      info = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
    } catch (e) {}
    var txt = 'GPU ' + info + '\nfps ' + Math.round(fps.ema) + '  avg ' + avg.toFixed(1) + 'ms  p99 ' + p99.toFixed(1) + 'ms' +
      '\nquality ' + quality + '  ' + mode + '  draws ' + (renderer.info ? renderer.info.render.calls : '?') +
      '  errors ' + window.__errors.length;
    if (window.__feel) {
      txt += '\n|v| ' + Math.hypot(player.vel.x, player.vel.z).toFixed(1) + '  vy ' + player.vel.y.toFixed(1) +
        '  ground ' + player.onGround + '  air ' + player.airJumps +
        '\ncam yaw ' + input.yaw.toFixed(2) + ' pitch ' + input.pitch.toFixed(2) + ' sens ' + CFG.lookSpeed.toFixed(4);
    } else {
      txt += '\n按 F 看手感数据';
    }
    document.getElementById('bench').textContent = txt;
  }

  function fitViewport() {
    if (!renderer || !camera) return;
    var w = Math.max(320, Math.round(Math.min(window.innerWidth || 9999, document.documentElement.clientWidth || 9999)));
    document.body.style.overflow = 'hidden';
    var layoutW = document.documentElement.clientWidth || w;
    if (layoutW > w + 8) {
      document.documentElement.style.zoom = (w / layoutW);
      if (typeof document.body.style.zoom !== 'undefined') document.body.style.zoom = (w / layoutW);
    } else if (document.documentElement.style.zoom) {
      document.documentElement.style.zoom = '';
      document.body.style.zoom = '';
    }
    var hgt = Math.max(240, Math.round(Math.min(window.innerHeight || 9999, (window.visualViewport && window.visualViewport.height) || 9999)));
    renderer.setPixelRatio(Math.min(QUALITY[quality].dpr, window.devicePixelRatio || 1));
    renderer.setSize(w, hgt, false);
    renderer.domElement.style.width = w + 'px';
    renderer.domElement.style.height = hgt + 'px';
    camera.aspect = w / hgt;
    // portrait phones would see a sliver of the world: widen the vertical fov instead
    var base = 68;
    var want = camera.aspect < 1 ? Math.min(96, base / Math.max(0.62, camera.aspect)) : base;
    camera.fov = want;
    camera.updateProjectionMatrix();
    if (composer) composer.setSize(w, hgt);
    if (ssaoPass && ssaoPass.setSize) ssaoPass.setSize(w, hgt);
    var hint = document.getElementById('rotateBanner');
    if (hint) hint.classList.toggle('on', isTouch && hgt > w * 1.02);
  }

  // ---------------- input ----------------
  function requestLock() {
    var el = renderer.domElement;
    try { if (el.requestPointerLock) el.requestPointerLock(); } catch (e) {}
    setTimeout(function () {
      if (state !== 'ready' && state !== 'pause') return;
      if (document.pointerLockElement === el) return;
      state = 'play';
      document.getElementById('lock').style.display = 'none';
      toast('指针锁不可用：鼠标视角已关，键盘照常');
    }, 700);
  }
  function onKey(e, down) {
    var k = (e.key || '').toLowerCase();
    if (k === ' ') e.preventDefault();
    input.keys[k] = down;
    if (down && k === ' ') player.buffer = CFG.buffer;
    if (down && k === 'q') webFire();
    if (down && k === 'c') useSkill();
    if (down && k === 'e') fireballFire();
    if (down && k === 'x') webDrop('松开蛛丝');
    if (down && k === 'v') { mode = mode === 'fp' ? 'tp' : 'fp'; toast(mode === 'fp' ? '第一人称' : '第三人称'); }
    if (down && (k === '1' || k === '2' || k === '3')) {
      quality = k === '1' ? 'low' : k === '2' ? 'mid' : 'high';
      applyQuality(); toast('画质 ' + quality);
    }
    if (down && k === 'r') { resetPlayer(false); toast('回到起点'); }
    if (down && k === 't') { teleportToDistrict(); }
    if (down && k === 'escape' && !isTouch) {
      if (state === 'play') showPause();
      else if (state === 'pause') hidePause();
      return;
    }
    if (down && k === 'n') { applyTimeOfDay(timeOfDay === 'day' ? 'dusk' : timeOfDay === 'dusk' ? 'night' : 'day'); toast('时间：' + (timeOfDay === 'day' ? '白天' : timeOfDay === 'dusk' ? '黄昏' : '夜晚')); }
    if (down && k === 'i') { input.invert = !input.invert; toast(input.invert ? '鼠标 Y 轴已反转' : '鼠标 Y 轴已恢复'); }
    if (down && k === '[') { CFG.lookSpeed = Math.max(0.0012, CFG.lookSpeed - 0.0004); toast('灵敏度 ' + CFG.lookSpeed.toFixed(4)); }
    if (down && k === ']') { CFG.lookSpeed = Math.min(0.008, CFG.lookSpeed + 0.0004); toast('灵敏度 ' + CFG.lookSpeed.toFixed(4)); }
    if (down && k === 'f') { window.__feel = !window.__feel; }
    if (down && k === 'm') { setMusic(!music.on); }
    if (down && k === 'g') {
      if (ssaoPass) {
        ssaoPass.enabled = !ssaoPass.enabled;
        toast(ssaoPass.enabled ? '环境光遮蔽开' : '环境光遮蔽关');
      } else if (quality !== 'high') {
        toast('环境光遮蔽只在 high 画质启用（按 3）');
      }
    }
    if (down && k === 'b') {
      bloomOn = !bloomOn;
      bloomAutoOff = false;
      if (bloomPass) bloomPass.enabled = bloomOn;
      if (bloomOn && !composer && quality !== 'low' && !isTouch) buildBloom();
      toast(bloomOn ? '辉光开' : '辉光关');
    }
  }

  function bindTouch() {
    if (!isTouch) {
      var tEl = document.getElementById('touch');
      if (tEl) tEl.classList.remove('on');
      return;
    }
    enableTouchUi();
  }

  function layoutTouch() {
    var vpW = (window.visualViewport && window.visualViewport.width) || 9999;
    var vpH = (window.visualViewport && window.visualViewport.height) || 9999;
    var vw = Math.round(Math.min(window.innerWidth || 9999, document.documentElement.clientWidth || 9999, vpW));
    var vh = Math.round(Math.min(window.innerHeight || 9999, vpH));
    var portrait = vh > vw;
    var btns = document.getElementById('btns');
    var stick = document.getElementById('stick');
    var nub = document.getElementById('stickNub');
    ['stick', 'btns'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.parentNode !== document.body) document.body.appendChild(el);
    });

    // left: a big movement stick
    var stickD = Math.round(Math.min(Math.max(112, Math.min(vw, vh) * 0.34), 172));
    if (stick) {
      stick.style.cssText = 'position:fixed;left:calc(10px + env(safe-area-inset-left));bottom:calc(16px + env(safe-area-inset-bottom));' +
        'width:' + stickD + 'px;height:' + stickD + 'px;border-radius:50%;pointer-events:auto;z-index:15;touch-action:none;';
    }
    if (nub) {
      var nd = Math.round(stickD * 0.46);
      nub.style.cssText = 'position:absolute;left:50%;top:50%;width:' + nd + 'px;height:' + nd + 'px;margin:' + (-nd / 2) + 'px 0 0 ' + (-nd / 2) + 'px;' +
        'border-radius:50%;pointer-events:none;';
    }

    // right: one big web button with the skills orbiting it
    var bigD = Math.round(Math.min(Math.max(76, Math.min(vw, vh) * 0.26), 108));
    var smallD = Math.round(bigD * 0.62);
    var R = Math.round(bigD * 0.5 + smallD * 0.5 + 8);
    // the ring's upper-right satellite sits at 0.707·R, so pull the centre in by that much
    var cx = Math.round(vw - 12 - smallD / 2 - 0.78 * R);
    var cy = Math.round(vh - 14 - bigD / 2);

    if (btns) {
      btns.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:16;';
    }
    var big = document.querySelector('.tbtn.big');
    if (big) {
      big.style.cssText = 'position:fixed;pointer-events:auto;border-radius:50%;' +
        'left:' + Math.round(cx - bigD / 2) + 'px;top:' + Math.round(cy - bigD / 2) + 'px;' +
        'width:' + bigD + 'px;height:' + bigD + 'px;font-size:' + Math.round(bigD * 0.28) + 'px;touch-action:none;';
    }
    // four skills evenly around the web button: left, upper-left, top, upper-right
    var sat = [
      { id: 'btnJump', ang: -180 },
      { id: 'btnFire', ang: -135 },
      { id: 'btnSkill', ang: -90 },
      { id: 'btnView', ang: -45 }
    ];
    sat.forEach(function (s2) {
      var b = document.getElementById(s2.id);
      if (!b) return;
      var d = s2.id === 'btnView' ? Math.round(smallD * 0.82) : smallD;
      var rad = s2.ang * Math.PI / 180;
      var bx = cx + Math.cos(rad) * R;
      var by = cy + Math.sin(rad) * R;
      b.style.cssText = 'position:fixed;pointer-events:auto;border-radius:50%;' +
        'left:' + Math.round(bx - d / 2) + 'px;top:' + Math.round(by - d / 2) + 'px;' +
        'width:' + d + 'px;height:' + d + 'px;font-size:' + Math.round(d * 0.3) + 'px;touch-action:none;';
    });

    var hint = document.getElementById('rotateBanner');
    if (hint) hint.classList.toggle('on', portrait);
  }
  function enableTouchUi() {
    var touchEl = document.getElementById('touch');
    if (!touchEl || touchEl.classList.contains('on')) return;
    isTouch = true;
    touchEl.classList.add('on');
    layoutTouch();
    window.addEventListener('resize', layoutTouch);
    window.addEventListener('orientationchange', function () { setTimeout(layoutTouch, 240); });
    function checkOrientation() {
      var hint = document.getElementById('rotateHint');
      if (!hint) return;
      if (window.innerHeight > window.innerWidth * 1.05) hint.classList.add('on');
      else hint.classList.remove('on');
    }
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', function () { setTimeout(checkOrientation, 250); });
    var stick = document.getElementById('stick');
    var nub = document.getElementById('stickNub');
    var pad = document.getElementById('lookPad');
    var stickId = null, cx = 0, cy = 0, R = 52;

    function stickStart(e) {
      var t = e.changedTouches ? e.changedTouches[0] : e;
      stickId = t.identifier;
      var r = stick.getBoundingClientRect();
      cx = r.left + r.width / 2; cy = r.top + r.height / 2;
      stickMove(e);
    }
    function stickMove(e) {
      if (stickId === null) return;
      var list = e.changedTouches || [e];
      for (var i = 0; i < list.length; i++) {
        var t = list[i];
        if (t.identifier !== stickId) continue;
        var dx = (t.clientX - cx) / R, dy = (t.clientY - cy) / R;
        var len = Math.hypot(dx, dy);
        if (len > 1) { dx /= len; dy /= len; }
        touch.active = true;
        touch.mx = dx; touch.my = dy;
        nub.style.transform = 'translate(' + (dx * R * 0.6) + 'px,' + (dy * R * 0.6) + 'px)';
      }
    }
    function stickEnd(e) {
      var list = e.changedTouches || [e];
      for (var i = 0; i < list.length; i++) if (list[i].identifier === stickId) {
        stickId = null; touch.mx = 0; touch.my = 0;
        nub.style.transform = 'translate(0,0)';
      }
    }
    stick.addEventListener('touchstart', function (e) { e.preventDefault(); stickStart(e); }, { passive: false });
    stick.addEventListener('touchmove', function (e) { e.preventDefault(); stickMove(e); }, { passive: false });
    stick.addEventListener('touchend', stickEnd);
    stick.addEventListener('touchcancel', stickEnd);

    var lookId = null;
    pad.addEventListener('touchstart', function (e) {
      var t = e.changedTouches[0];
      lookId = t.identifier; touch.lookX = t.clientX; touch.lookY = t.clientY;
      e.preventDefault();
    }, { passive: false });
    pad.addEventListener('touchmove', function (e) {
      for (var i = 0; i < e.changedTouches.length; i++) {
        var t = e.changedTouches[i];
        if (t.identifier !== lookId) continue;
        var dx = t.clientX - touch.lookX, dy = t.clientY - touch.lookY;
        touch.lookX = t.clientX; touch.lookY = t.clientY;
        input.yaw -= dx * 0.006;
        input.pitch -= dy * 0.005 * (input.invert ? -1 : 1);
        if (input.pitch > CFG.pitchMax) input.pitch = CFG.pitchMax;
        if (input.pitch < CFG.pitchMin) input.pitch = CFG.pitchMin;
      }
      e.preventDefault();
    }, { passive: false });
    pad.addEventListener('touchend', function () { lookId = null; });

    function tap(id, fn) {
      var b = document.getElementById(id);
      b.addEventListener('touchstart', function (e) { e.preventDefault(); fn(); }, { passive: false });
      b.addEventListener('mousedown', function (e) { e.preventDefault(); fn(); });
    }
    tap('btnJump', function () { audio(); player.buffer = CFG.buffer; input.keys[' '] = true; setTimeout(function () { input.keys[' '] = false; }, 140); });
    tap('btnWeb', function () { audio(); webFire(); });
    tap('btnFire', function () { audio(); fireballFire(); });
    tap('btnSkill', function () { audio(); useSkill(); });
    tap('btnView', function () { mode = mode === 'fp' ? 'tp' : 'fp'; toast(mode === 'fp' ? '第一人称' : '第三人称'); });
    document.addEventListener('touchmove', function (e) { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
  }

  function bindInput() {
    document.addEventListener('keydown', guardKeys, { capture: true });
    document.addEventListener('keyup', guardKeys, { capture: true });
    document.addEventListener('wheel', function (e) { if (immersive) e.preventDefault(); }, { passive: false });
    document.addEventListener('dragstart', function (e) { if (immersive) e.preventDefault(); });
    document.addEventListener('focusin', function (e) {
      if (!immersive) return;
      var el = renderer && renderer.domElement;
      if (el && e.target !== el && e.target.tagName !== 'CANVAS' && e.target !== document.body) {
        var t = e.target;
        if (t.tagName === 'BUTTON' || t.tagName === 'INPUT' || t.tagName === 'A') { try { t.blur(); } catch (err) {} keepFocus(); }
      }
    }, true);
    document.addEventListener('selectstart', function (e) { if (immersive) e.preventDefault(); });
    window.addEventListener('keydown', function (e) { onKey(e, true); }, { passive: false });
    window.addEventListener('keyup', function (e) { onKey(e, false); });
    var dragging = false, lastX = 0, lastY = 0;
    var lastMove = 0;
    document.addEventListener('mousemove', function (e) {
      lastMove = performance.now(); window.__lastMove = lastMove;
      if (document.body.classList.contains('hud-idle')) document.body.classList.remove('hud-idle');
      if (!input.locked) {
        // fallback: right-button drag to look, so a PC that refuses pointer lock still plays
        if (dragLook && (dragging || e.buttons === 2)) {
          if (!dragging) { dragging = true; lastX = e.clientX; lastY = e.clientY; return; }
          var ddx = e.clientX - lastX, ddy = e.clientY - lastY;
          lastX = e.clientX; lastY = e.clientY;
          input.yaw -= ddx * CFG.lookSpeed;
          input.pitch -= ddy * CFG.lookSpeed * 0.85;
          if (input.pitch > CFG.pitchMax) input.pitch = CFG.pitchMax;
          if (input.pitch < CFG.pitchMin) input.pitch = CFG.pitchMin;
        } else if (!e.buttons) dragging = false;
        return;
      }
      input.yaw -= (e.movementX || 0) * CFG.lookSpeed;
      input.pitch -= (e.movementY || 0) * CFG.lookSpeed * (input.invert ? -1 : 1);
      if (input.pitch > CFG.pitchMax) input.pitch = CFG.pitchMax;
      if (input.pitch < CFG.pitchMin) input.pitch = CFG.pitchMin;
    });
    window.addEventListener('wheel', function (e) {
      input.dist = Math.min(12, Math.max(4.5, (input.dist || CFG.camDist) + (e.deltaY > 0 ? 0.6 : -0.6)));
    }, { passive: true });
    document.addEventListener('mousedown', function (e) {
      if (!input.locked) return;
      if (e.button === 0) { if (!isTouch && !input.locked) { requestLock(); return; } webFire(); }         // every click sends a new web; it reels itself in
      if (e.button === 2) useSkill();
    });
    document.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    document.addEventListener('pointerlockchange', function () {
      input.locked = document.pointerLockElement === renderer.domElement;
      if (input.locked) {
        if (state === 'ready') { state = 'play'; document.getElementById('lock').style.display = 'none'; }
      } else if (state === 'play' && !isTouch && !window.__selftest) {
        state = 'pause';
        setImmersive(false);
        if (document.exitFullscreen && document.fullscreenElement) { try { document.exitFullscreen(); } catch (e) {} }
        document.getElementById('lock').style.display = 'grid';
        document.getElementById('deploy').textContent = '继续游戏';
      }
    });
    var switchBtn = document.getElementById('inputMode');
    if (switchBtn) {
      switchBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (isTouch) {
          isTouch = false;
          inputMode = 'pc';
          var tEl = document.getElementById('touch');
          if (tEl) tEl.classList.remove('on');
          toast('已切换到键鼠模式');
        } else {
          isTouch = true;
          inputMode = 'touch';
          enableTouchUi();
          toast('已切换到触控模式');
        }
        var lab = document.getElementById('inputLabel');
        if (lab) lab.textContent = isTouch ? L('touchmode') : L('kbmode');
      });
    }
    document.getElementById('deploy').addEventListener('click', function () {
      audio();
      if (isTouch) {
        state = 'play';
        document.getElementById('lock').style.display = 'none';
        return;
      }
      if (state === 'win') { resetPlayer(true); state = 'play'; document.getElementById('win').style.display = 'none'; }
      else if (state === 'pause') state = 'play';
      document.getElementById('lock').style.display = 'none';
      requestLock();
    });
    ['btnResume'].forEach(function (id) { var b = document.getElementById(id); if (b) b.addEventListener('click', function () { audio(); hidePause(); requestLock(); }); });
    ['btnRestart', 'btnOverAgain'].forEach(function (id) { var b = document.getElementById(id); if (b) b.addEventListener('click', function () { audio(); restartRun(); requestLock(); }); });
    ['btnQuit', 'btnOverQuit'].forEach(function (id) { var b = document.getElementById(id); if (b) b.addEventListener('click', function () { audio(); backToTitle(); }); });
    document.getElementById('again').addEventListener('click', function () {
      resetPlayer(true); state = 'play';
      document.getElementById('win').style.display = 'none';
      requestLock();
    });
    window.addEventListener('resize', fitViewport);
    window.addEventListener('orientationchange', function () { setTimeout(fitViewport, 220); });
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', fitViewport);
      window.visualViewport.addEventListener('scroll', fitViewport);
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { if (ac && ac.state === 'running') ac.suspend(); }
      else if (ac && ac.state === 'suspended') ac.resume();
    });
  }
  // ---------------- renderer / quality ----------------
  function makeRenderer(msaa) {
    var r = new T.WebGLRenderer({ antialias: !!msaa, powerPreference: 'high-performance' });
    r.setPixelRatio(Math.min(QUALITY[quality].dpr, window.devicePixelRatio || 1));
    r.setSize(window.innerWidth, window.innerHeight);
    r.shadowMap.enabled = QUALITY[quality].shadow > 0;
    r.setPixelRatio(Math.min(isTouch ? 1.0 : QUALITY[quality].dpr, window.devicePixelRatio || 1));
    r.shadowMap.type = T.PCFSoftShadowMap;
    r.toneMapping = T.ACESFilmicToneMapping;
    r.toneMappingExposure = 1.02;
    return r;
  }
  function buildBloom() {
    if (typeof T.EffectComposer !== 'function' || !renderer) return;
    try {
      composer = new T.EffectComposer(renderer);
      composer.addPass(new T.RenderPass(scene, camera));
      if (typeof T.SSAOPass === 'function' && quality === 'high') {
        ssaoPass = new T.SSAOPass(scene, camera, window.innerWidth, window.innerHeight);
        ssaoPass.kernelRadius = 0.55;
        ssaoPass.minDistance = 0.0015;
        ssaoPass.maxDistance = 0.09;
        composer.addPass(ssaoPass);
      }
      bloomPass = new T.UnrealBloomPass(new T.Vector2(window.innerWidth, window.innerHeight), 0.42, 0.45, 0.92);
      composer.addPass(bloomPass);
      if (typeof T.OutputPass === 'function') { outputPass = new T.OutputPass(); composer.addPass(outputPass); }
      composer.setSize(window.innerWidth, window.innerHeight);
    } catch (e) {
      composer = null;
      window.__errors.push('bloom: ' + String(e && e.message || e));
    }
  }

  function applyTimeOfDay(name) {
    var p = TIME_PRESETS[name];
    if (!p) return;
    timeOfDay = name;
    if (sun) {
      sun.color.setHex(p.sun);
      sun.intensity = p.sunI;
    }
    scene.traverse(function (o) {
      if (o.isHemisphereLight) {
        o.color.setHex(p.hemiSky);
        o.groundColor.setHex(p.hemiGround);
        o.intensity = p.hemiI;
      }
    });
    scene.fog = new T.Fog(p.fog, p.fogNear, p.fogFar);
    scene.background = scene.background;   // keep the painted sky, the fog does the grading
    if (renderer) renderer.toneMappingExposure = p.exposure;
    if (scene.background && 'backgroundIntensity' in scene) scene.backgroundIntensity = p.bg;
    if ('environmentIntensity' in scene) scene.environmentIntensity = Math.max(0.25, p.bg);
    if (bloomPass) bloomPass.strength = p.bloom;
    var el = document.getElementById('timeOfDay');
    if (el) el.textContent = name === 'day' ? '白天' : name === 'dusk' ? '黄昏' : '夜晚';
  }

  function bloomActive() {
    return !!composer && bloomOn && !bloomAutoOff && quality !== 'low' && !isTouch;
  }

  function applyQuality() {
    var q = QUALITY[quality];
    if (renderer) {
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
    renderer = makeRenderer(q.msaa);
    document.getElementById('app').appendChild(renderer.domElement);
    renderer.domElement.addEventListener('click', function () { if (state !== 'win') requestLock(); });
    if (scene) {
      scene.fog = new T.Fog(0xbcd8ec, q.fog[0], q.fog[1]);
      if (sun) {
        sun.castShadow = q.shadow > 0;
        sun.shadow.mapSize.set(Math.max(512, q.shadow), Math.max(512, q.shadow));
        if (sun.shadow.map) { sun.shadow.map.dispose(); sun.shadow.map = null; }
      }
    }
    document.getElementById('quality').textContent = quality;
    var inLab = document.getElementById('inputLabel');
    if (inLab) inLab.textContent = isTouch ? L('touchmode') : L('kbmode');
    composer = null; bloomPass = null; ssaoPass = null; outputPass = null;
    if (quality !== 'low' && !isTouch) buildBloom();
    if (sun) applyTimeOfDay(timeOfDay);
    if (waterReflector) { scene.remove(waterReflector); waterReflector = null; }
    if (water) water.visible = true;
    buildWaterReflector();
    if (waterReflector && water) water.visible = false;
    if (camera) camera.aspect = window.innerWidth / window.innerHeight, camera.updateProjectionMatrix();
    if (input.locked) requestLock();
  }

  // ---------------- boot and loop ----------------
  function init() {
    scene = new T.Scene();
    camera = new T.PerspectiveCamera(68, window.innerWidth / window.innerHeight, 0.1, 320);
    clock = new T.Clock();
    var smallScreen = window.innerWidth < 900 || window.innerHeight < 560;
    var coarse = typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches;
    if (isTouch && (smallScreen || coarse)) quality = 'low';
    var urlQ = /[?&]q=(low|mid|high)/.exec(location.search);
    if (urlQ) quality = urlQ[1];
    buildTextures();
    particleGeo = new T.SphereGeometry(1, 6, 5);
    particleMat = new T.MeshBasicMaterial({ color: 0xffffff });
    applyQuality();

    scene.background = buildSky();
    scene.environment = scene.background;
    scene.add(new T.HemisphereLight(0xdff0ff, 0x4c5a44, 1.9));
    scene.add(new T.AmbientLight(0xffffff, 0.3));
    sun = new T.DirectionalLight(0xfff2d8, 2.5);
    sun.position.set(11, 18, 8);
    sun.castShadow = QUALITY[quality].shadow > 0;
    sun.shadow.mapSize.set(Math.max(512, QUALITY[quality].shadow), Math.max(512, QUALITY[quality].shadow));
    sun.shadow.camera.left = -36; sun.shadow.camera.right = 36;
    sun.shadow.camera.top = 36; sun.shadow.camera.bottom = -36;
    sun.shadow.camera.far = 100;
    sun.shadow.bias = -0.0004;
    scene.add(sun);

    var glow = document.createElement('canvas');
    glow.width = glow.height = 256;
    var gg = glow.getContext('2d');
    var rg = gg.createRadialGradient(128, 128, 4, 128, 128, 128);
    rg.addColorStop(0, 'rgba(255,246,214,0.95)');
    rg.addColorStop(0.35, 'rgba(255,226,160,0.4)');
    rg.addColorStop(1, 'rgba(255,226,160,0)');
    gg.fillStyle = rg; gg.fillRect(0, 0, 256, 256);
    var sunSprite = new T.Sprite(new T.SpriteMaterial({ map: new T.CanvasTexture(glow), transparent: true, depthWrite: false, blending: T.AdditiveBlending }));
    sunSprite.scale.set(52, 52, 1);
    sunSprite.position.set(30, 34, -70);
    scene.add(sunSprite);
    applyTimeOfDay(timeOfDay);
    var warm = new T.PointLight(0xffb867, 70, 34, 2);
    warm.position.set(-6, 5, -6);
    scene.add(warm);

    buildClouds();
    buildWater();
    buildLeaves();
    var urlTime = /[?&]time=(day|dusk|night)/.exec(location.search);
    if (urlTime) { timeOfDay = urlTime[1]; applyTimeOfDay(timeOfDay); }
    if (/[?&]aerial=[12]/.test(location.search)) {
      window.__aerial = true;
      var high = /[?&]aerial=2/.test(location.search);
      scene.fog = null;
      if (high) { camera.position.set(-90, 95, 70); camera.lookAt(0, -30, -420); }
      else { camera.position.set(-26, 34, 26); camera.lookAt(0, -2, -30); }
      document.getElementById('lock').style.display = 'none';
      state = 'play';
    }
    // the level is generated progressively so the loading bar can move
    buildLevelProgressively(finishInit);
  }

  function finishInit() {
    buildFireballPool();
    buildGrappleVisuals();
    initRope();
    crosshair = document.getElementById('cross');
    model = buildModel();
    rig = model;
    model.visible = false;
    fpRig = buildFpRig();
    if (/[?&]nohands=1/.test(location.search)) fpRig.visible = false;
    applyLang(lang);
    bindInput();
    bindTouch();
    updateHud();

    window.__app = { scene: scene, camera: camera, renderer: renderer, player: player, colliders: colliders.length, checkpoints: checkpoints.length, mode: function () { return mode; } };
    if (/[?&]selftest=1/.test(location.search)) {
      window.__selftest = true;
      try { selfTest(); }
      catch (err) {
        var bEl = document.getElementById('bench');
        if (bEl) { bEl.style.display = 'block'; bEl.textContent = 'SELFTEST ERROR ' + String(err && err.message) + '\n' + String(err && err.stack); }
        window.__errors.push('selftest: ' + String(err && err.message));
        document.title = 'SELFTEST-ERR: ' + String(err && err.message) + ' @' + String((err && err.stack || '').split('\n')[1] || '');
      }
    }
    else if (/[?&]auto=1/.test(location.search)) { state = 'play'; document.getElementById('lock').style.display = 'none'; }
    if (/[?&]tp=1/.test(location.search)) { mode = 'tp'; input.pitch = 0.26; }
    var dbg = /[?&]state=(pause|over|win)/.exec(location.search);
    if (dbg) {
      state = 'play';
      if (dbg[1] === 'pause') showPause();
      if (dbg[1] === 'over') { stats.lives = 0; showGameOver(); }
      if (dbg[1] === 'win') { stats.time = 132.4; stats.coins = 88; stats.popped = 12; stats.score = 2150; state = 'play'; showWinCard(); }
    }
    fitViewport();
    // compile every material/shader once, so the first fireball (and the first bloom pass) cannot hitch
    try {
      if (renderer && renderer.compile) renderer.compile(scene, camera);
      var warm = takeFireballMesh();
      warm.position.set(camera.position.x, camera.position.y + 40, camera.position.z);
      warm.visible = true;
      if (fbLight) { fbLight.position.copy(warm.position); fbLight.intensity = 1; }
      renderer.render(scene, camera);
      warm.visible = false;
      if (fbLight) fbLight.intensity = 0;
    } catch (e) { window.__errors.push('warmup: ' + String(e && e.message || e)); }
    loop();
  }

  // Every probe runs on an empty pad 300 m above the course, so no level geometry can interfere.
  function onTestPad(fn) {
    var savedPos = player.pos.clone(), savedVel = player.vel.clone();
    var mark = colliders.length;
    webDrop('');
    player.pos.set(0, 300, 0);
    player.vel.set(0, 0, 0);
    player.onGround = true;
    colliders.push({ min: new T.Vector3(-40, 299, -60), max: new T.Vector3(40, 300, 40) });   // pad floor
    var mark2 = colliders.length;
    var out = fn();
    colliders.length = mark;
    player.pos.copy(savedPos);
    player.vel.copy(savedVel);
    webDrop('');
    return out;
  }

  function selfTestAimAssist() {
    return onTestPad(function () {
      // a wall 6 m ahead of the pad, 3.6 m tall; the aim goes 0.30 rad above its top
      colliders.push({ min: new T.Vector3(-5, 300, -6.4), max: new T.Vector3(5, 303.6, -5.6) });
      camera.position.set(0, 300 + CFG.eye, 0);
      var rise = Math.tan(0.45) * 6;
      camera.lookAt(0, 300 + CFG.eye + rise, -6);
      web.cd = 0;
      webFire();
      var directMissed = !web.assist ? true : false;
      var usedAssist = web.assist === true;
      for (var i = 0; i < 16; i++) updateWeb(1 / 60);
      var attached = web.phase === 'attached' || web.phase === 'reeling';
      return { aim_assist: usedAssist, aim_assist_attached: attached, direct_missed: directMissed };
    });
  }

  function selfTestJump() {
    return onTestPad(function () {
      var dt = 1 / 60, takeoff = player.pos.y, apex = 0, landed = false;
      player.buffer = CFG.buffer;
      input.keys[' '] = true;
      for (var i = 0; i < 90; i++) {
        updatePlayer(dt);
        if (player.pos.y - takeoff > apex) apex = player.pos.y - takeoff;
        if (i === 8) input.keys[' '] = false;
        if (i > 20 && player.onGround) { landed = true; break; }
      }
      input.keys[' '] = false;
      return { jump_m: +apex.toFixed(2), jump_landed: landed };
    });
  }

  function selfTestClimb() {
    return onTestPad(function () {
      colliders.push({ min: new T.Vector3(-6, 300, -5.5), max: new T.Vector3(6, 309, -4.5) });
      web.phase = 'reeling';
      web.anchor.set(0, 302, -11);          // behind the wall: the line of sight is blocked
      web.len = web.anchor.distanceTo(player.pos);
      web.blocked = 0; web.climb = 0; web.zipT = 0;
      camera.position.set(0, 300 + CFG.eye, 0);
      camera.lookAt(0, 302, -11);
      for (var i = 0; i < 60; i++) updateWeb(1 / 60);
      return { wall_climb_m: +(web.climb || 0).toFixed(2), climb_attached: web.phase !== 'idle' };
    });
  }

  function selfTestChain() {
    return onTestPad(function () {
      colliders.push({ min: new T.Vector3(-0.6, 306.4, -12), max: new T.Vector3(0.6, 307.6, -10.8) });
      colliders.push({ min: new T.Vector3(-0.6, 315.4, -22), max: new T.Vector3(0.6, 316.6, -20.8) });
      var dt = 1 / 60, z0 = player.pos.z, y0 = player.pos.y;
      camera.position.set(0, 300 + CFG.eye, 0);
      camera.lookAt(0, 307, -11.4);
      web.cd = 0; webFire();
      for (var i = 0; i < 40; i++) { updatePlayer(dt); updateWeb(dt); }
      var z1 = player.pos.z, y1 = player.pos.y;
      camera.position.set(0, player.pos.y + CFG.eye, player.pos.z);
      camera.lookAt(0, 316, -21);
      web.cd = 0; webFire();
      for (var j = 0; j < 40; j++) { updatePlayer(dt); updateWeb(dt); }
      return {
        chain_first_m: +(z0 - z1).toFixed(2),
        chain_rise_m: +(y1 - y0).toFixed(2),
        chain_second_m: +(z1 - player.pos.z).toFixed(2),
        chain_second_rise_m: +(player.pos.y - y1).toFixed(2)
      };
    });
  }
  function selfTestRefire() {
    return onTestPad(function () {
      colliders.push({ min: new T.Vector3(-0.6, 306.4, -12), max: new T.Vector3(0.6, 307.6, -10.8) });
      colliders.push({ min: new T.Vector3(-3.6, 311.4, -20), max: new T.Vector3(-2.4, 312.6, -18.8) });
      camera.position.set(0, 300 + CFG.eye, 0);
      camera.lookAt(0, 307, -11.4);
      web.cd = 0; webFire();
      for (var i = 0; i < 20; i++) updateWeb(1 / 60);
      var firstPhase = web.phase;
      var firstAnchor = web.anchor.clone();
      // second click while the first is still pulling
      camera.position.set(0, 300 + CFG.eye, 0);
      camera.lookAt(-3, 312, -19.4);
      web.cd = 0; webFire();
      var replacedNow = web.replaced === true;      // the old web was dropped on this very click
      var ropeVisible = !!(ropeLine && ropeLine.visible);
      for (var j = 0; j < 20; j++) updateWeb(1 / 60);
      var secondPhase = web.phase;
      var secondAnchor = web.anchor.clone();
      var oldGone = secondAnchor.distanceTo(firstAnchor) > 1.0;
      webDrop('');
      return {
        refire_first_phase: firstPhase,
        refire_old_replaced: replacedNow && oldGone,
        refire_new_anchor: +secondAnchor.distanceTo(firstAnchor).toFixed(2),
        refire_rope_single: ropeVisible,
        refire_second_phase: secondPhase
      };
    });
  }

  function selfTestFireball() {
    return onTestPad(function () {
      var target = { min: new T.Vector3(-0.6, 300.5, -14), max: new T.Vector3(0.6, 301.7, -12.8) };
      colliders.push(target);
      camera.position.set(0, 300 + CFG.eye, 0);
      camera.lookAt(0, 300 + CFG.eye, -13);
      fireCd = 0;
      fireballFire();
      var spawned = fireballs.length > 0;
      var exploded = false;
      var guard = 0;
      while (fireballs.length > 0 && guard < 300) { updateFireballs(1 / 60); guard++; }
      exploded = fireballs.length === 0;
      return { fireball_spawned: spawned, fireball_exploded: exploded, fireball_frames: guard };
    });
  }

  function selfTestDestructibles() {
    return onTestPad(function () {
      var before = colliders.length;
      addBreakableWall(0, -8, 4, 3, 300);
      var wallColliders = colliders.length - before;
      camera.position.set(0, 300 + CFG.eye, 0);
      camera.lookAt(0, 300.6, -8);
      fireCd = 0;
      fireballFire();
      var guard = 0;
      while (fireballs.length > 0 && guard < 240) { updateFireballs(1 / 60); updateBreakables(1 / 60); guard++; }
      var shattered = breakables.length > 0 && breakables[breakables.length - 1].broken;
      var removed = colliders.length === before;
      // bridge: step on the first plank and let it collapse
      var bridgeBefore = colliders.length;
      addBridge(0, -20, 10, 300);
      player.pos.set(0, 301.1, -19.6);
      var started = 0;
      for (var i = 0; i < 120; i++) { updateBreakables(1 / 60); }
      var fallen = bridges.length > 0 && bridges[bridges.length - 1].planks.every(function (p) { return p.fallen; });
      return {
        wall_colliders: wallColliders,
        wall_shattered: shattered,
        wall_collider_removed: removed,
        bridge_planks_fell: fallen,
        bridge_fallen_count: bridges.length > 0 ? bridges[bridges.length - 1].planks.filter(function (p) { return p.fallen; }).length : 0
      };
    });
  }

  function selfTestTripleJump() {
    return onTestPad(function () {
      var dt = 1 / 60, takeoff = player.pos.y, apex = [0, 0, 0], stage = 0;
      player.airJumps = 2;
      player.onGround = true;
      player.buffer = CFG.buffer;
      input.keys[' '] = true;
      for (var i = 0; i < 260; i++) {
        updatePlayer(dt);
        var h = player.pos.y - takeoff;
        if (h > apex[stage]) apex[stage] = h;
        if (i === 6) input.keys[' '] = false;
        if (stage === 0 && i === 14) { input.keys[' '] = true; player.buffer = CFG.buffer; stage = 1; }
        if (stage === 1 && i === 26) { input.keys[' '] = false; }
        if (stage === 1 && i === 34) { input.keys[' '] = true; player.buffer = CFG.buffer; stage = 2; }
      }
      input.keys[' '] = false;
      return { jump1_m: +apex[0].toFixed(2), jump2_m: +apex[1].toFixed(2), jump3_m: +apex[2].toFixed(2), air_jumps_left: player.airJumps };
    });
  }

  function selfTestFireHitch() {
    return onTestPad(function () {
      fireCd = 0;
      var t0 = (window.performance || Date).now();
      fireballFire();
      updateFireballs(1 / 60);
      var first = (window.performance || Date).now() - t0;
      fireCd = 0;
      var t1 = (window.performance || Date).now();
      fireballFire();
      updateFireballs(1 / 60);
      var second = (window.performance || Date).now() - t1;
      for (var i = 0; i < 6; i++) { fireCd = 0; fireballFire(); updateFireballs(1 / 60); }
      return { fire_first_ms: +first.toFixed(2), fire_second_ms: +second.toFixed(2), fire_pool: fbPool.length };
    });
  }

  function selfTestGuards() {
    if (isTouch) return { guard_blocked: 0, guard_esc_free: true };
    var wasState = state;
    state = 'play';
    setImmersive(true);
    function press(key, mods) {
      var ev = new KeyboardEvent('keydown', Object.assign({ key: key, cancelable: true, bubbles: true }, mods || {}));
      document.dispatchEvent(ev);
      return ev.defaultPrevented;
    }
    var blocked = 0;
    if (press('Tab')) blocked++;
    if (press(' ')) blocked++;
    if (press('F5')) blocked++;
    if (press('s', { ctrlKey: true })) blocked++;
    var escFree = !press('Escape');
    // Space is a game key: the browser default must be cancelled but the game must still see it
    player.buffer = 0;
    var sp = new KeyboardEvent('keydown', { key: ' ', cancelable: true, bubbles: true });
    document.dispatchEvent(sp);
    var spaceToGame = player.buffer > 0;
    var spaceDefaultKilled = sp.defaultPrevented;
    setImmersive(false);
    state = wasState;
    return { guard_blocked: blocked, guard_esc_free: escFree, space_reaches_game: spaceToGame, space_default_killed: spaceDefaultKilled };
  }

  function selfTestRig() {
    if (!rig || !bone.hipL) return { rig_bones: 0, skel_anim_delta: 0, rig_parts: 0 };
    var before = bone.hipL.rotation.x;
    var savedVel = player.vel.clone();
    player.vel.set(4, 0, 0);
    for (var i = 0; i < 12; i++) animateRig(1 / 60);
    var after = bone.hipL.rotation.x;
    player.vel.copy(savedVel);
    var count = 0;
    rig.traverse(function (o) { if (o.isObject3D && (o === bone.hips || o.parent === bone.hips || o.parent === bone.chest || o.parent === bone.spine)) count++; });
    return {
      rig_bones: 1 + 10,
      rig_parts: count,
      skel_anim_delta: +Math.abs(after - before).toFixed(3)
    };
  }

  function selfTestDistrict() {
    return onTestPad(function () {
      var before = districts.length;
      var d = addDistrict(0, -30);
      var spawned = d.enemies.length;
      for (var i = 0; i < d.enemies.length; i++) { d.enemies[i].alive = false; }
      updateDistricts(1 / 60);
      var cleared = d.cleared && !!d.gate;
      districts.pop();
      return { district_enemies: spawned, district_cleared: cleared };
    });
  }

  function selfTest() {
    var startZ = player.pos.z, coins0 = stats.coins;
    var takeoff = player.pos.y, apex = 0, wasGround = player.onGround;
    state = 'play';
    var dt = 1 / 60;
    var doubleUsed = false, buffed = false, popped = 0, skillUsed = false, cleared = false;
    var hookTested = false, hookAttached = false, hookMoved = 0, hookPulled = 0;
    var assistFired = false, assistAttached = false;
    var assistProbe = selfTestAimAssist();
    var jumpProbe = selfTestJump();
    var climbProbe = selfTestClimb();
    var chainProbe = selfTestChain();
    var refireProbe = selfTestRefire();
    var fireProbe = selfTestFireball();
    var destrProbe = selfTestDestructibles();
    var rigProbe = selfTestRig();
    var distProbe = selfTestDistrict();
    var tripleProbe = selfTestTripleJump();
    var guardProbe = selfTestGuards();
    var fireProbe2 = selfTestFireHitch();
    assistFired = assistProbe.aim_assist;
    assistAttached = assistProbe.aim_assist_attached;
    var singleApex = 0, doubleApex = 0, phase = 'settle', phaseStart = 0;
    for (var i = 0; i < 1800; i++) {
      var t = i / 60;
      // phase machine: settle 0.6s -> single jump -> land -> double jump -> run with jumps
      if (phase === 'settle' && t > 0.6) { phase = 'single'; phaseStart = t; }
      if (phase === 'single' && t > phaseStart + 0.9) { phase = 'double'; phaseStart = t; }
      if (phase === 'double' && t > phaseStart + 0.2) { phase = 'run'; phaseStart = t; }
      var wantJump = false, wantDouble = false;
      if (phase === 'single' && t - phaseStart < 0.05) wantJump = true;
      if (phase === 'double' && t - phaseStart < 0.05) wantDouble = true;
      if (phase === 'run') {
        input.keys['w'] = true;
        var cycle = (t - phaseStart) % 1.35;
        if (cycle < 0.05) wantJump = true;
        if (cycle > 0.28 && cycle < 0.33) wantDouble = true;
      }
      input.keys[' '] = wantJump || wantDouble;
      if (wantJump || wantDouble) player.buffer = CFG.buffer;
      stats.time += dt;
      updateMovers(dt);
      updatePlayer(dt);
      if (player.airJumps === 0) doubleUsed = true;
      collectCoins();
      collectMushrooms();
      if (player.buff > 0 && !buffed) { buffed = true; useSkill(); skillUsed = true; }
      var before = stats.popped;
      updateEnemies(dt);
      if (stats.popped > before) popped = stats.popped;
      updateFlyers(dt);
      updateGuardians(dt);
      updatePickups(dt);
      if (!hookTested && t > 1.2) {
        hookTested = true;
        camera.position.set(player.pos.x, player.pos.y + CFG.eye, player.pos.z);
        camera.lookAt(player.pos.x + 0.8, player.pos.y - 0.9, player.pos.z - 4.5);
        webFire();
        for (var hk0 = 0; hk0 < 12; hk0++) updateWeb(dt);
        hookAttached = web.phase === 'attached';
        var beforeHook = player.pos.z;
        for (var hk = 0; hk < 30; hk++) { updatePlayer(dt); updateWeb(dt); }
        hookMoved = +(beforeHook - player.pos.z).toFixed(2);
        webPress();
        for (var hk2 = 0; hk2 < 50; hk2++) { updatePlayer(dt); updateWeb(dt); }
        hookPulled = +(beforeHook - player.pos.z).toFixed(2);
        webDrop('');
      }
      updateBlocks(dt);
      updateParticles(dt);
      updateRings(dt);
      if (state === 'win') { cleared = true; break; }
      if (i % 90 === 0 && (window.__trace || []).length < 14) {
        window.__trace = window.__trace || [];
        window.__trace.push([+t.toFixed(1), +player.pos.x.toFixed(1), +player.pos.z.toFixed(1)]);
      }
      if (!wasGround && player.onGround) takeoff = player.pos.y;
      wasGround = player.onGround;
      var air = player.pos.y - takeoff;
      if (phase === 'single' && air > singleApex) singleApex = air;
      if (window.__djFrom != null) {
        var dj = player.pos.y - window.__djFrom;
        if (dj > doubleApex) doubleApex = dj;
      }
      if (air > apex) apex = air;
    }
    var res = {
      moved_m: +(startZ - player.pos.z).toFixed(2),
      jump_m: +apex.toFixed(2),
      single_jump_m: +singleApex.toFixed(2),
      double_jump_m: +doubleApex.toFixed(2),
      double_jump: doubleUsed,
      cleared: cleared,
      hook_attached: hookAttached,
      hook_moved_m: hookMoved,
      hook_pulled_m: hookPulled,
      aim_assist: assistFired,
      clean_jump_m: jumpProbe.jump_m,
      clean_jump_landed: jumpProbe.jump_landed,
      climb_probe_m: climbProbe.wall_climb_m,
      climb_probe_attached: climbProbe.climb_attached,
      chain_first_m: chainProbe.chain_first_m,
      chain_rise_m: chainProbe.chain_rise_m,
      chain_second_m: chainProbe.chain_second_m,
      chain_second_rise_m: chainProbe.chain_second_rise_m,
      refire_old_replaced: refireProbe.refire_old_replaced,
      refire_new_anchor_m: refireProbe.refire_new_anchor,
      refire_first_phase: refireProbe.refire_first_phase,
      refire_second_phase: refireProbe.refire_second_phase,
      fireball_spawned: fireProbe.fireball_spawned,
      fireball_exploded: fireProbe.fireball_exploded,
      wall_shattered: destrProbe.wall_shattered,
      wall_collider_removed: destrProbe.wall_collider_removed,
      bridge_planks_fell: destrProbe.bridge_planks_fell,
      bridge_fallen_count: destrProbe.bridge_fallen_count,
      rig_bones: rigProbe.rig_bones,
      rig_anim_delta: rigProbe.skel_anim_delta,
      districts: districts.length,
      district_enemies: distProbe.district_enemies,
      district_cleared: distProbe.district_cleared,
      jump_stage1_m: tripleProbe.jump1_m,
      jump_stage2_m: tripleProbe.jump2_m,
      jump_stage3_m: tripleProbe.jump3_m,
      keys_blocked: guardProbe.guard_blocked,
      esc_still_free: guardProbe.guard_esc_free,
      space_reaches_game: guardProbe.space_reaches_game,
      space_default_killed: guardProbe.space_default_killed,
      fire_first_ms: fireProbe2.fire_first_ms,
      fire_second_ms: fireProbe2.fire_second_ms,
      fire_pool: fireProbe2.fire_pool,
      wall_climb_m: +(web.climb || 0).toFixed(2),
      aim_assist_attached: assistAttached,
      level_len_m: LEVEL_LEN,
      towers: towers.length,
      world_m: +(LEVEL_LEN + 420),
      web_nodes: webNodes.length,
      tallest_m: +(towers.reduce(function (m, t) { return Math.max(m, t.h); }, 0)).toFixed(1),
      checkpoints: checkpoints.length,
      music_on: music.on,
      mushroom: buffed,
      skill_used: skillUsed,
      popped: stats.popped,
      coins: stats.coins - coins0,
      lives: stats.lives,
      on_ground: player.onGround,
      first_person: mode === 'fp',
      end: [+player.pos.x.toFixed(1), +player.pos.y.toFixed(1), +player.pos.z.toFixed(1)],
      resets: window.__resets || 0,
      trace: window.__trace || [],
      errors: window.__errors.length
    };
    window.__selftestText = 'SELFTEST ' + JSON.stringify(res);
    var bEl = document.getElementById('bench');
    if (bEl) {
      bEl.style.left = '18px'; bEl.style.right = 'auto'; bEl.style.top = '92px'; bEl.style.bottom = 'auto';
      bEl.style.textAlign = 'left'; bEl.style.fontSize = '15px'; bEl.style.lineHeight = '1.7';
      bEl.style.color = '#dfe9f2'; bEl.style.whiteSpace = 'pre-wrap'; bEl.style.maxWidth = '760px';
      bEl.textContent = window.__selftestText.replace(/,/g, ',\n ');
    }
    var winEl = document.getElementById('win');
    if (winEl) winEl.style.display = 'none';
    setInterval(function () {
      var best = saveBest();
    var wStats = document.getElementById('winStats');
    if (wStats) wStats.textContent = L('winStats', { c: stats.coins, d: stats.total, p: stats.popped, s: stats.score });
    var wBest = document.getElementById('winBest');
    if (wBest) wBest.textContent = L('bestLine', { t: best.time.toFixed(1), s: best.score }) + (stats.time <= best.time + 0.01 ? L('bestNew') : '');
    var w = document.getElementById('win');
      if (w && w.style.display !== 'none') w.style.display = 'none';
      var b = document.getElementById('bench');
      if (b && window.__selftestText) {
        b.style.left = '18px'; b.style.right = 'auto'; b.style.top = '92px'; b.style.bottom = 'auto';
        b.style.textAlign = 'left'; b.style.fontSize = '15px'; b.style.whiteSpace = 'pre-wrap'; b.style.maxWidth = '780px';
        b.textContent = window.__selftestText.replace(/,/g, ',\n ');
      }
    }, 400);
    var lockEl = document.getElementById('lock');
    if (lockEl) lockEl.style.display = 'none';
    var tEl = document.getElementById('toast');
    if (tEl) { tEl.textContent = window.__selftestText; tEl.classList.add('on'); tEl.style.fontSize = '14px'; }
    document.title = window.__selftestText;
  }

  function loop() {
    requestAnimationFrame(loop);
    var dt = 0;
    try {
      dt = Math.min(0.05, clock.getDelta());
      updateFps(dt, performance.now());
      if (state === 'play') {
        stats.time += dt;
        updateMovers(dt);
        updatePlayer(dt);
        updateWeb(dt);
        updateFireballs(dt);
        updateBreakables(dt);
      updateDistricts(dt);
        updateDistricts(dt);
        updateBirds(dt);
        tutorialTick();
        collectCoins();
        collectMushrooms();
        updateEnemies(dt);
        updateFlyers(dt);
        updateGuardians(dt);
        updatePickups(dt);
        updateWebNodes(dt);
        updateCheckpoints();
        updateSpikes();
        updateBlocks(dt);
        updateFireballs(dt);
        updateParticles(dt);
        updateRings(dt);
        checkGoal();
      }
      animateRig(dt);
      musicTick();
      musicLayers();
      updateClouds(dt);
      windUniforms.time.value += dt;
      updateCloths(dt);
      updateDebris(dt);
      updateBreakables(dt);
      updateBirds(dt);
      updateLeaves(dt);
      if (!window.__aerial) updateCamera(dt);
      applyShake(dt);
      highlightAimedNode();
      updateSpeedLines();
      updateCrosshair();
      if (bloomActive()) composer.render(); else renderer.render(scene, camera);
      if (goal && goal.flag) goal.flag.rotation.y = Math.sin(stats.time * 1.4) * 0.25;
      frameSamples.push(dt * 1000);
      if (frameSamples.length > 240) frameSamples.shift();
      if (window.__frames % 10 === 0) {
        updateHud(); syncImmersive();
        var idle = immersive && (performance.now() - (window.__lastMove || 0) > 4000);
        document.body.classList.toggle('hud-idle', !!idle);
      }
      if (window.__frames % 30 === 0) updateBench();
    } catch (err) {
      window.__errors.push(String(err && err.stack || err));
      if (window.__errors.length > 40) window.__errors.shift();
    }
    window.__frames += 1;
    if (window.__frames === 2) window.__ready = true;
  }

  try { init(); } catch (e) {
    window.__errors.push('init: ' + String(e && e.stack || e));
    document.title = 'INIT-ERR ' + String(e && e.message) + ' @' + String((e && e.stack || '').split('\n')[1] || '');
    console.error('[init]', e);
  }
})();
