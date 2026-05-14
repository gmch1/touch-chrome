# Touch Chrome

轻量 Chrome 扩展：**在网页空白处用鼠标中键关闭当前标签**；点在带 `href` 的链接上时，中键仍按浏览器默认行为在新标签打开链接。支持可选键盘快捷键关闭当前标签。

> **English:** A minimal Manifest V3 extension: middle-click on non-link page areas closes the active tab; middle-click on `<a href>` / `<area href>` keeps the default “open link in new tab” behavior. Includes an optional command shortcut to close the current tab. On macOS, trackpads have no physical middle button—see **macOS & middle-click** below.

## 功能

- **中键关标签**：在页面非链接区域按下鼠标滚轮（中键），关闭当前标签页。
- **保留链接中键**：事件路径上存在带 `href` 的 `<a>` 或 `<area>` 时不拦截，便于中键打开后台标签。
- **快捷键**：默认建议 **Alt+Shift+C**（可在 `chrome://extensions/shortcuts` 中修改）。
- **子框架**：内容脚本在 `all_frames` 下注入，iframe 内空白处中键同样会关闭**整个**标签页（与顶层页面一致）。

## macOS 与中键

MacBook 触控板、Magic Mouse 等通常**没有独立的鼠标中键**，而本扩展依赖浏览器收到的「中键」事件（`auxclick` / `mousedown`，`button === 1`）。若仍希望用「点按网页」的方式关标签，可在系统侧用软件把触控板手势映射成中键。

推荐使用开源工具 **[MiddleClick](https://github.com/artginzburg/MiddleClick)**（在 [Homebrew](https://brew.sh/) 中常以 Cask 名 **`middleclick`** 安装：`brew install --cask middleclick`）：通过多指轻点/点按等方式模拟中键，安装后按该项目的说明授予「辅助功能」等权限即可。

若不需要模拟中键，也可只用本扩展自带的**键盘快捷键**（见下节）关闭当前标签。

## 从源码安装

1. 克隆本仓库。
2. 打开 Chrome → **扩展程序** → 开启右上角 **开发者模式**。
3. 点击 **加载已解压的扩展程序**，选择本仓库根目录（包含 `manifest.json` 的文件夹）。

## 快捷键

1. 在地址栏打开 `chrome://extensions/shortcuts`（或通过「扩展程序」页面进入「键盘快捷键」）。
2. 找到本扩展，为 **「关闭当前标签页」** 设置或修改组合键。

## 权限说明

| 权限 | 用途 |
|------|------|
| `tabs` | 调用 `chrome.tabs.remove` 关闭当前标签页（含快捷键触发时对活动标签的关闭）。 |

内容脚本匹配 `<all_urls>`，用于在普通网页中监听中键；**不上传数据、不连接远程服务器、不读写用户站点内容**（仅本地事件与关标签 API）。

## 已知限制

- **受限页面**（如 `chrome://`、`https://chrome.google.com/webstore` 等）无法注入内容脚本，这些页面上中键**不会**触发关标签。
- **「链接」判定**仅基于带 `href` 的 `<a>` / `<area>`。由 `button`、`div` + JS 实现的「伪链接」仍视为空白区域，中键会关标签。
- 若系统或桌面环境把中键用于其他全局行为（例如部分 Linux 下的粘贴），可能与个人习惯冲突，请自行权衡是否启用本扩展。

## 项目结构

```
touch-chrome/
├── manifest.json   # Manifest V3 配置
├── background.js   # Service worker：关标签、快捷键
├── content.js      # 页面内中键逻辑
└── README.md
```

