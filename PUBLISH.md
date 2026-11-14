# 发布到 GitHub / Gitee

仓库已经 `git init` 并完成首次提交，本地没有配置远端。下面两条命令推上去即可。

## GitHub

```bash
cd plumb3d-open
git remote add origin git@github.com:<你的账号>/plumb-3d.git
git branch -M main
git push -u origin main
```

仓库设置建议：

- Description：`A 4.2 km skyline parkour game in a single index.html — zero assets, three.js inlined.`
- Topics：`game` `threejs` `html5` `single-file` `webgl` `parkour` `grappling-hook`
- About → Website：填你的 Pages 地址（见下）
- Social preview：上传 `assets/screenshot-desktop.png`

## Gitee

```bash
git remote add gitee git@gitee.com:<你的账号>/plumb-3d.git
git push gitee main
```

Gitee 的「仓库 → 服务 → Gitee Pages」可以直接把 `dist/` 发布成在线可玩页面。

## 在线试玩（GitHub Pages）

Settings → Pages → Source 选 `main` 分支 `/（root）`，然后在 README 顶部把截图换成 Pages 链接，或者直接把 `dist/index.html` 作为首页：

```bash
# 让仓库根目录也能直接玩（可选）
cp dist/index.html index.html && git add index.html && git commit -m "serve playable build at repo root" && git push
```

## 检查清单（发布前）

- [x] 至少一张游戏截图（仓库内 4 张：桌面 / 手机 / 控件 / 自检）
- [x] LICENSE（MIT）
- [x] README 中英双语（`README.md` / `README.en.md`）
- [x] 可复现构建（`npm i` + `node tools/build.mjs`）
- [x] 体积与运行环境说明（两个构建的取舍）
- [x] 无密钥、无本地绝对路径、无第三方素材
