# PLUMB 3D — 交付说明（v54 完整版）

单文件 3D 跑酷游戏。**双击 `index.html` 就能玩**，也可以放到任意静态服务器（手机同一 WiFi 访问）。
体积 **244.8 KB raw / 176.2 KB brotli**（v55 压缩后），零外部资源，离线可运行。

## 一、怎么开始

| 端 | 开始方式 |
|---|---|
| PC | 打开页面 → 点「开始游戏」→ 自动进入全屏、隐藏光标、接管键盘 |
| 手机 | 横屏打开 → 点「开始游戏」→ 左下大摇杆 + 右下大蛛丝键（环形技能） |

设备自动识别：`(pointer:fine)+(hover:hover)+短边>700` → PC 键鼠方案；移动 UA / coarse 指针 / 小屏 → 触控方案。右上角「切换」可手动改。

## 二、操作

| 动作 | PC | 手机 |
|---|---|---|
| 移动 | `WASD` | 左摇杆（推满冲刺） |
| 跳 | `Space`（空中再按两次 = 三级跳 1.7 / 3.8 / 5.2 m） | 「跳」 |
| 吐蛛丝 | **左键 / `Q`** | 大「丝」键 |
| 火球 | `E` | 「火」 |
| 震波（需蘑菇） | `C` / 右键 | 「震」 |
| 视角 | 鼠标（指针锁；被拒时右键拖拽） | 右半屏拖动 |
| 暂停 | `Esc` | — |
| 其它 | `V` 视角 · `N` 时间 · `B` 辉光 · `G` 环境遮蔽 · `T` 传送据点 · `R` 回检查点 · `[` `]` 灵敏度 · `I` 反转 Y · `M` 音乐 | 「视角」 |

## 三、游戏内容

- **4200 m 关卡**、35 检查点、1269 枚金币、172 座 18–60 m 高楼、506 个蛛丝跳点、8 个可占领据点
- 敌人：巡逻怪 / 追踪怪 / 飞行怪 / 守卫 Boss / **巨鸟**（俯冲撞击，可被蛛丝粘住拖着飞）
- 可破坏：火球或震波炸开**碎墙**、踩上**会塌的桥**逐块掉落
- 道具：蘑菇变身、加速星、护盾、弹簧板、尖刺
- 目标：跑到终点旗；沿途清据点、吃金币、压缩通关时间（最佳纪录存 `localStorage`）

## 四、手感与画面

- 蛛丝：命中即飞（26–58 m/s，越远越狠）、0.45 s 硬绞盘、收线中再点同帧换目标、撞墙贴墙滑行并沿墙爬升（≤4.5 m）
- 三级跳、土狼时间 0.13 s、跳跃缓冲 0.15 s、落地 squash、冲刺 FOV、镜头 roll、速度线
- 画面：体积云 / 远山 / 远景实例化天际线 / 接触阴影 / 布料旗帜 / 落叶 / 草地风动 / 波浪水面 / Bloom / high 档 SSAO / 白天·黄昏·夜晚三套光照
- 性能：分块实例化（300 m 一块，恢复视锥剔除）、Lambert 材质、动态分辨率 0.72–1.0、FPS<42 自动降级

## 五、界面流程

标题卡 → 游戏 → `Esc` **PAUSED**（继续 / 重新开始 / 回到标题）→ 三命耗尽 **GAME OVER**（再来一次 / 回到标题）→ 到达终点 **LEVEL CLEAR**（用时 / 金币 / 击倒 / 得分 / 最佳纪录对比）

沉浸模式：进游戏隐藏光标 + 全屏 + 拦截 Tab/Space/方向键/F1–F12/所有 Ctrl 组合；`Esc` 与 Win 键保留（Win 键浏览器层面无法拦截）；HUD 在鼠标静止 4 秒后淡出，移动即恢复。

## 六、验收（本轮实跑）

```
静态验收   PASS 11/11
运行时冒烟 PASS（file:// 直开，308.8 KB 截图）
自检探针   25 条全绿：
  aim_assist ✓ · clean_jump 1.95 m · climb 4.5 m
  chain 2.47→4.47 m · refire 同帧替换 9.81 m
  fireball spawn/explode ✓ · 碎墙 ✓ · 桥 5 块全塌 ✓
  三级跳 1.72 / 3.83 / 5.19 m · 骨架 11 骨 0.508 rad
  据点 8 个、清空后传送门 ✓ · keys_blocked 4、Esc 放行、Space 直达游戏
  fire_pool 8 · towers 172 · web_nodes 506 · errors 0
FPS        PC mid 52 / 手机 low 52（headless 软件渲染）
```

## 七、调试开关

`?auto=1` 跳过标题 · `?tp=1` 第三人称 · `?q=low|mid|high` · `?time=day|dusk|night` · `?touch=1`/`?pc=1` 强制输入方案 · `?state=pause|over|win` 直接看结算界面 · `?aerial=1|2` 俯瞰 · `?selftest=1` 自检 · `?slowbuild=1` 慢慢建关卡（看进度条）

## 八、已知边界

- 角色是程序化骨架（11 骨），没有骨骼动画数据与 IK
- 布料只与玩家胶囊排斥，不与地形碰撞
- Win 键无法在浏览器内拦截（需要桌面壳）
- 手机 FPS 数字来自 headless 软件渲染，真机需实测

## 九、v55：体积压缩（894.7 → 244.8 KB，-73%）

三步压缩，功能与画质完全不变：

| 步骤 | 做法 | 结果 |
|---|---|---|
| 1 | `game.js` 从未压缩 172.9 KB **esbuild --minify** | 101.8 KB（-41%） |
| 2 | three.js 从 `import *` 改为**按名导入实际用到的 45 个类**，让 esbuild tree-shake | 706.8 → **550.5 KB**（-22%） |
| 3 | 引擎 + 游戏代码 **gzip level 9 → base64 内联**，运行时用 `DecompressionStream('gzip')` 自解压 | 652.2 KB → 214.7 KB gzip → 229.6 KB base64 |

### 交付两个文件

| 文件 | raw | brotli | 说明 |
|---|---|---|---|
| **index.html** | **244.8 KB** | 176.2 KB | 自解压版，双击即玩；浏览器需支持 `DecompressionStream`（Chrome 80+ / Safari 16.4+ / Firefox 113+） |
| index-plain.html | 666.1 KB | **146.3 KB** | 未压缩版，老浏览器兜底 + 静态审计对象 |

**怎么选**：直接双击/发文件 → 用 `index.html`（小 62%）；站点已开 brotli → `index-plain.html` 传输更省（146.3 < 176.2，因为 base64 会略微降低可压缩性）。

### 验收

```
静态验收   index-plain.html（源码可审计）PASS 11/11
运行时     自解压 index.html 跑 ?selftest=1 → 25 条探针全绿
           三级跳 1.72/3.83/5.19 m · fire_pool 8 · keys_blocked 4 · errors 0
原始体积   894.7 KB → 244.8 KB（-73%）· brotli 189.2 → 176.2 KB
```

构建脚本：`_build/build-packed.mjs`（压缩版）、`_build/build.mjs`（未压缩版）、`_build/entry-trim.js`（tree-shaking 入口）。

## v56：Tab 切换 + 火球投掷动画 + H5 竖屏适配

### 键盘

| 键 | 行为 | 探针 |
|---|---|---|
| **Tab** | 隐藏/显示全部信息（HUD + 蛛丝/火球/据点状态行），浏览器默认行为被取消 | `tab_hid_hud:true` / `tab_restores_hud:true` / `tab_default_prevented:true` |
| **L** | 中/英切换（之前只在 i18n 里实现，按键漏了，这次补上） | `lang_switched:"en"` |

### 火球投掷动作（0.14 秒）

- 手臂前甩 -0.42 + 抬 0.30 rad，14 倍速收尾
- 震屏 `0.18 + 蓄力×0.26`，手部灯冲到 `40 + 蓄力×60`
- 音效 `150 + 蓄力×90` Hz / 0.14 s
- 探针：`throw_kick_started:true`、`throw_kick_frames:9`（0.15 s 归零）

### H5 竖屏

- HUD：字号 7–12px、可换行、竖屏隐藏 分数/用时/画质 三项，避免顶栏溢出
- 旋转提示条下移到 HUD 下方（52px）
- 控制环：竖屏时大键 64–84px、小键 ×0.6，环半径另留 6px，并把布局宽度**钳到 420px**——有些 WebView 报告的布局视口比屏幕宽，不钳就会出现按钮被裁
- 摇杆 104–172px 自适应，仍在左下；技能键环绕右下大蛛丝键

体积 raw **752.4 KB** / brotli **175.7 KB**（compressed 版 250 KB 级）。

## v57: coins doubled + pickup effects (content pass)

- coins 1269 -> 2539: addCoinTrails() adds two companions per every other coin (0.85m to each side, 0.5/0.7m up), so a line reads as a trail
- one draw call: coins moved from per-coin Mesh to a single InstancedMesh; only instances within 30m of the player are rewritten
- pickup effect, all preallocated (zero allocation on pickup): 10 shockwave rings (additive, 0.38-0.68s to 3.6x), 4-5 sparks from the 260 particle pool, a screen-space +14 x3 label from a 12-node DOM pool, and pitch that climbs with the combo (1180 * 1.06^combo)
- combo: pickups within 1.2s give x2..x5 and +2 score per step
- probes: coins_total 2539, pickup_ring_visible true, pickup_scene_delta 0, float_labels 12, errors 0

## v58: magnet, chain reward, rare coins

- magnet: a coin inside 8.5m starts flying at the player (speed 16 + (R-d)*3.4) and shrinks to 0.35 scale; it is collected through the same collectCoin() path, so chain/score/effects stay identical
- chain: 10 pickups within 1.5s each reset the chain; the 10th pays a forward dash (9 m/s impulse up), 2.6s invulnerability, a shake and a green burst
- rare coins: every 37th coin (69 of 2539) is 1.65x bigger, purple, worth 60 points, with a purple shockwave, 10 sparks and a '+60 rare' label. They live in a second InstancedMesh because per-instance colour never compiled in the trimmed three build
- probes: coins_total 2539, rare_coins 69, magnet_collects true (8 frames), chain_reward_fired true, chain_invuln_gain true, errors 0
- debug flags kept for review: ?rare=1 parks a rare coin in view, ?fxdemo=1 loops the pickup effect

## v62: district pips, magnet trail, richer clear card

- district pips: 8 dots plus a 3/8 counter under the chain bar; filled for every cleared district (inline flex layout because page-wide CSS rules kept winning)
- magnet trail: magnetTrail(c) drops a spark behind a pulled coin every 0.07s (rare coins trail purple), from the existing 260-particle pool, so still zero allocation
- clear card: now reports time, kills, coins and districts left, hides itself after 3.2s; kills/coins are guarded so a district that falls before any kill shows 0 instead of NaN
- probes: district_pips 8, district_pips_on 1, magnet_trail_sparks 1, card_has_time true, card_has_kills true, errors 0
- debug flags: ?district=1 (card + three pips lit), ?chaindemo=1, ?rare=1, ?fxdemo=1
