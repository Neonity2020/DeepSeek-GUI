<p align="center">
  <img src="src/asset/img/kun.png" width="96" alt="Kun 图标">
</p>

# Kun

[English](./README.en.md) | 简体中文

> 新时代的 AI 桌面应用：**Code** 处理项目，**写作**打磨文档，**连接手机**接入 IM 与定时任务，并把高性价比模型能力变成真正可用、可控、可持续的工作流。

[下载](https://github.com/KunAgent/Kun/releases) | [文档](#文档)

[![GitHub release](https://img.shields.io/github/v/release/KunAgent/Kun?label=github)](https://github.com/KunAgent/Kun/releases)
[![License: PolyForm Noncommercial 1.0.0](https://img.shields.io/badge/license-PolyForm%20Noncommercial%201.0.0-blue)](./LICENSE)

Kun 是一个面向开发者、创作者和高频 AI 工作者的新一代桌面应用。它把本地 Agent 运行时、项目工作区、写作工作台、IM 自动化、计划/目标/审查和多模态能力整合到一个产品里：选择工作目录，发起任务，实时查看推理、工具调用和文件改动，并在需要时审批或回退。

Kun 默认接入 DeepSeek、Xiaomi MiMo、MiniMax 三家高性价比模型服务，并保留可编辑的兼容 provider 配置。目标不是再造一个聊天壳，而是做出最酷的 AI 应用产品：让模型可以稳定参与真实项目、长文写作、团队消息和自动化任务，把每一次调用都尽量变成可见的进展。

---

<p align="center">
  <a href="src/asset/img/code.mp4">
    <img src="src/asset/img/code.gif" width="410" alt="Kun Code 模式演示">
  </a>
  <a href="src/asset/img/write.mp4">
    <img src="src/asset/img/write.gif" width="410" alt="Kun 写作模式演示">
  </a>
</p>

## 更多演示

<p align="center">
  <a href="src/asset/img/feishu.mp4">
    <img src="src/asset/img/feishu.gif" width="680" alt="飞书 / Lark / 微信连接演示">
  </a>
</p>
<p align="center"><em>飞书 / Lark / 微信连接演示。</em></p>

<p align="center">
  <a href="src/asset/img/sdd.mp4">
    <img src="src/asset/img/sdd.gif" width="680" alt="新建需求与计划演示">
  </a>
</p>
<p align="center"><em>新建需求与计划演示。</em></p>

<p align="center">
  <a href="src/asset/img/web.mp4">
    <img src="src/asset/img/web.gif" width="680" alt="Web 工具演示">
  </a>
</p>
<p align="center"><em>Web 工具演示。</em></p>

## 为什么 Kun 快、稳、省

Kun 把“省 token”和“上下文稳定”做成 agent loop 的默认行为，而不是事后补救。它不只是压缩文本，更是在每一轮调用前判断哪些信息值得进入上下文。

| Kun 优势 | Token ROI 来源 |
| --- | --- |
| **稳定前缀** | 稳定 system prompt、工具 schema 和不可变前缀，让支持缓存的上游模型更容易复用长会话背景。 |
| **按需工具上下文** | MCP 工具很多时，先用 `mcp_search` 找相关工具，再描述和调用目标工具，避免每轮把完整工具目录塞进 prompt。 |
| **上下文卫生** | 对超长工具结果、长参数、base64 payload、重复工具循环和低价值历史做边界压缩，保留代码、路径、错误、决策和未解决事项。 |
| **可见的用量收益** | 运行时跟踪 cache hit/miss、token 用量和节省估算，GUI 会把 Token economy 的收益显示出来，方便长期观察成本回报。 |

结果是：Kun 更适合真实项目里的长任务、长会话和多工具协作。它把模型注意力留给高价值上下文，让用户用同样的 API 预算换到更多有效推进。

## 我们做了什么

- 把 Kun 本地运行时封装进桌面应用，默认可以自动启动和管理。
- 做了一套完整的聊天工作台，支持多会话、实时流式输出、历史回看、中断和重新发送。
- 打通本地工作目录，让智能体可以围绕真实项目读取、编辑和创建文件。
- 做了文件变更审查视图，让每一次修改都能被看见、理解和确认。
- 做了首次引导、设置页、语言/主题/字体大小、系统通知、错误日志和更新入口。
- 接入 DeepSeek、Xiaomi MiMo、MiniMax provider 预设，支持 API Key 与 Token Plan 两种入口，并可继续添加自定义兼容服务。
- 做了 Skill 与 MCP 的图形化管理，让用户不用手写很多配置也能扩展智能体能力。
- 做了连接手机能力，支持飞书 / Lark / 微信接入、独立 IM Agent、本地 webhook / relay 和定时任务。
- 做了 Write 写作工作台，提供独立写作空间、Markdown 文件树、live 编辑/预览、文本补全、选中文本 inline agent 和图片生成入口。
- 做了新建需求、计划面板、线程 Todo、目标追踪和代码审查，让任务可以从想法走到执行再走到复盘。
- 提供 macOS、Windows、Linux 预构建安装包；也可以从源码自行构建。

## 功能亮点

- **桌面聊天工作台**：多会话、流式回复、推理过程、工具调用、审批请求和文件改动都在同一个界面中展示。
- **项目级工作区**：为每个任务选择本地目录，按工作区管理会话，并支持文件预览、编辑器打开和 Git 分支选择。
- **新建需求**：先写需求草稿（背景、目标、验收标准），让需求 AI 帮忙澄清问题和补齐调研，再一键生成实施计划。
- **计划与 Todo**：`/plan` 或新建需求都会生成可编辑的计划文件，右侧计划面板会同步线程 Todo，方便把长任务拆成可跟踪步骤。
- **目标模式**：`/goal` 可以给当前会话设置长期目标，支持暂停、继续、清除和完成状态，让 agent 持续围绕同一个结果推进。
- **代码审查**：`/review` 可审查当前未提交改动，也可以指定 base branch、commit 或自定义审查范围，结果以 findings 卡片呈现。
- **旁支对话与会话管理**：`/btw` 可开启继承当前上下文的旁支对话；会话还支持压缩、分叉、归档和恢复。
- **变更审查**：内联 diff 和侧边审查面板会记录智能体产生的文件改动，便于在应用内完成 review。
- **权限可控**：支持只读、工作区可写、完全访问等模式，并可配置工具调用前是否需要审批。
- **运行时托管**：默认使用内置 Kun；也可以在设置中指定自己的 `kun` 可执行文件。
- **三家模型预设**：内置 DeepSeek、Xiaomi MiMo、MiniMax；支持普通 API Key、Token Plan、模型列表编辑、Base URL 覆盖和自定义 provider。
- **多模态能力**：支持图片附件、视觉模型输入、Xiaomi MiMo 语音识别，以及 MiniMax 图片生成能力，聊天、写作和 IM Agent 可按配置复用。
- **Skill 与 MCP**：在图形界面中创建 Skill、保存 MCP 配置、添加常用工具，并打开对应目录继续管理。
- **可开关的 agent 扩展能力**：Kun 通过配置开关逐步启用 MCP、Web fetch/search、Skills、独立 CLI、图片附件、跨会话 Memory 和子 agent 委派；设置页会显示运行时实际上报的能力与诊断状态。
- **连接手机**：可开启独立于普通聊天的后台 Agent，当前支持飞书 / Lark / 微信接入、IM webhook / relay，以及按计划自动执行任务。
- **定时任务**：创建一次性、每日、间隔或手动任务，指定工作区、模型和推理强度，让 Kun 在电脑唤醒时自动执行。
- **Write 写作模式**：独立管理 `~/.kun/write_workspace` 和自定义写作空间，读取 Markdown 文件树，支持 live Markdown 编辑、相对图片预览、短补全 / 灵感长补全（可用跨文本 BM25 + 关键词检索增强）、当前文档导出为 `HTML / PDF / DOC / DOCX`，以及选中文本后直接唤起 inline 写作助手。
- **高 Token ROI**：Kun 会稳定 prompt 前缀、跟踪 provider 缓存命中、按需压缩上下文和工具输出，并用 MCP search 渐进发现工具，把 token 留给需求、代码、决策和结果。
- **首次配置友好**：首次启动会引导你选择语言和模型服务，填写 DeepSeek / Xiaomi MiMo / MiniMax 的 API Key 或 Token Plan Key，并按需配置兼容服务地址。
- **本地优先**：设置、会话状态、日志和运行时配置保存在本机；模型调用使用你自己的 provider 凭据。
- **中英文界面**：应用和 README 均提供中文、英文版本，界面语言可随时切换。
- **跨平台使用**：提供 macOS `.dmg/.zip`、Windows `.exe`、Linux `.AppImage`；也可以从源码构建。

## 运行时：Kun

Kun 桌面应用的本地 Agent 运行时是仓库自带的同名 TypeScript 包
**Kun**（位于 `kun/` 目录）。它启动本地 HTTP/SSE 服务，作为 GUI 与
agent loop 之间的唯一边界：GUI 负责可视化工作台、审批和交互，运行时负责
模型调用、工具执行、会话持久化、上下文压缩和用量统计。

Kun 的核心理念是提高每一个 token 的 ROI。对用户来说，同样的上下文预算
应该尽量花在需求、代码、决策和结果上，而不是重复的工具 schema、失控的
工具输出、无效历史或已经可以被缓存复用的前缀上。它适合的不是一次性问答，
而是反复读写项目、持续调用工具、需要长期上下文的真实工作流。

运行时内置的关键能力包括：

- **稳定前缀与用量统计**：immutable prompt prefix（带 sha256 指纹）、append-only session log、bounded TTL/LRU cache、inflight tracking、mid-turn steering queue、context compaction 和 cache / usage telemetry。
- **Provider-aware 模型层**：通过 provider profile 管理 DeepSeek、Xiaomi MiMo、MiniMax 以及自定义兼容服务，支持不同 endpoint format、模型画像、推理强度、视觉输入、语音识别和图片生成能力。
- **Token economy 与工具上下文优化**：稳定系统前缀与工具 schema，读取 provider 返回的缓存/用量字段；对超长工具结果、长参数、base64 payload 和重复工具循环做边界压缩或抑制；当 MCP 工具很多时，可用 `mcp_search` / `mcp_describe` / `mcp_call` 渐进发现和调用工具。

如果你想专门了解 Kun 如何做缓存优化，包括稳定前缀、工具 schema
规范化、cache hit/miss 统计、tool pair healing 和验证方法，可以阅读
[`docs/kun-cache-optimization.md`](docs/kun-cache-optimization.md)。

Kun 的大块 agent 能力采用 feature flag 管理：`capabilities.mcp`
接入第三方 MCP server，`capabilities.web` 暴露 `web_fetch` /
`web_search`，`capabilities.skills` 发现 `skill.json` 与 legacy
`SKILL.md`，`capabilities.attachments` 支持图片附件和文本模型 fallback，`capabilities.memory`
启用跨会话记忆，`capabilities.subagents` 允许有预算上限的子 agent
委派。`kun run` / `kun chat` / `kun exec` 可脱离 GUI 运行；GUI 的设置页
会读取 `/v1/runtime/info` 与 `/v1/runtime/tools` 展示实际可用状态。
这些能力默认按配置关闭或受模型能力限制，完整配置示例和排障说明见
[`kun/README.md`](kun/README.md)。

技术架构（简化版）：

```text
Renderer (React)
  → KunRuntimeProvider
  → preload: kunGui.runtimeRequest / startSse
  → main: LocalHttpRuntimeAdapter
  → kun serve (HTTP + SSE)
  → cache-first AgentLoop
```

设置项在 **设置 → Agent 运行时** 和 **设置 → 模型服务** 里维护：binary path、port、
auto-start、provider、API key / Token Plan Key、base URL、runtime token、data dir、model、
approval policy、sandbox mode、insecure 开关，以及语音识别 / 图片生成等能力。

完整的端点、CLI flag、环境变量、data dir 布局、SSE 事件 schema
见 [`kun/README.md`](kun/README.md)。

## 适合谁

- 想用 AI 处理真实代码库，但不想一直留在终端里的开发者。
- 希望清楚看到智能体做了什么、改了哪些文件、哪些操作需要批准的团队。
- 需要长期维护多个项目、多个会话，并希望把 Skill/MCP 配置沉淀下来的用户。
- 想在一个桌面应用里同时使用 DeepSeek、Xiaomi MiMo、MiniMax 和自定义兼容服务的人。

---

## 工作台与入口

Kun 现在以 **Code** 和 **写作** 两个主工作台为核心，并提供
**连接手机**、**定时任务**、**插件 / Skill / MCP** 等入口。它们共享同一套
Kun 运行时与设置，但会话、工作区和界面布局彼此独立，可按任务随时切换。

### Code 模式

面向真实代码库的开发工作台：绑定本地项目目录，围绕仓库读写文件、执行命令、审查改动。

<p align="center">
  <img src="src/asset/img/codemode.png" alt="Kun Code 模式" width="860">
</p>

- 按工作区管理多个 Agent 会话，实时查看推理、工具调用与文件变更。
- 支持内联 diff、变更审查面板，以及只读 / 工作区可写 / 完全访问等权限策略。
- 支持新建需求、`/plan` 计划、右侧计划面板、线程 Todo 和 `/goal` 长期目标，让复杂任务可以先澄清、再计划、再执行。
- 支持 `/review` 代码审查、`/btw` 旁支对话、会话压缩、会话分叉和归档恢复，适合长时间维护同一个项目上下文。
- 提供快捷任务卡片，可一键发起结构梳理、排错、实现方案或 UI 优化等对话。

### Write 模式

独立的 Markdown 写作工作台，把写作文件、保存状态与 AI 助手从 Code 会话里拆出来单独管理。

<p align="center">
  <img src="src/asset/img/writemode.png" alt="Kun Write 模式" width="860">
</p>

- 管理 `~/.kun/write_workspace` 与多个自定义写作空间，左侧文件树支持新建、重命名与删除。
- 编辑器支持 **Live / Source / Split / Preview**，Live 模式在当前行保留 Markdown 源码，其余行实时渲染。
- 工具栏支持把当前 Markdown 文档导出为 `HTML / PDF / DOC / DOCX`，导出时会尽量保留标题、列表、代码块、表格和本地图片。
- 内置短补全与灵感长补全；选中文本可唤起 inline agent，右侧写作助手支持摘要、大纲与润色等快捷操作。

### 连接手机

把 Kun 连接到手机和 IM 的后台自动化入口，让 Agent 在普通桌面聊天之外持续处理消息与定时任务。

<p align="center">
  <img src="src/asset/img/clawmode.png" alt="Kun 连接手机" width="860">
</p>

- 为飞书 / Lark / 微信等渠道配置独立 Agent，分别设定人设、默认模型与工作目录。
- 每个 IM Agent 拥有独立会话线程，可在 GUI 内直接调试回复与工具调用。
- 支持本地 webhook / relay，适合把 Kun 接到团队协作或个人自动化流程中。
- 定时任务可设置一次性、每日、间隔或手动运行，任务会创建独立 Kun thread，并按配置发送 prompt。

---

## 下载安装

### 下载预构建安装包

前往 [GitHub Releases](https://github.com/KunAgent/Kun/releases) 下载最新版本：

| 平台 | 安装包 |
| --- | --- |
| macOS | `.dmg` 或 `.zip`，支持 Intel 与 Apple Silicon |
| Windows | `.exe`，NSIS 安装器，x64 |
| Linux | `.AppImage`，x64 |

首次启动时可以选择 DeepSeek、Xiaomi MiMo 或 MiniMax，填写对应 API Key / Token Plan Key；如果你使用兼容服务，也可以在设置里修改 Base URL 和模型列表。

### 从源码运行

适合贡献者或需要本地开发的人：

```bash
git clone https://github.com/KunAgent/Kun.git
cd Kun
npm install
npm run dev
```

环境要求：

- Node.js 20+
- 至少一个可用的模型服务 API Key 或 Token Plan Key
- 首次安装依赖时需要联网

中国大陆访问较慢时，可以使用 npm 镜像：

```bash
npm install --registry=https://registry.npmmirror.com
```

---

## 首次使用

1. 打开 Kun。
2. 在首次引导中选择界面语言。
3. 选择 DeepSeek、Xiaomi MiMo 或 MiniMax，并填入 API Key / Token Plan Key；如果需要，设置自定义 Base URL。
4. 选择默认工作目录，或使用应用自动创建的默认目录。
5. 新建会话，输入任务，让智能体开始工作。

常用流程（**Code 模式**）：

- 在左侧选择或切换工作区。
- 在聊天框描述你要完成的任务。
- 观察回复中的推理、工具调用、命令执行和文件改动。
- 对需要审批的操作选择允许或拒绝。
- 在变更审查面板里检查改动，再决定下一步。

**连接手机** 与 **写作** 的详细说明见上文 [工作台与入口](#工作台与入口)。简要步骤：

- **连接手机**：在设置页启用后台自动化 → 添加飞书 / Lark / 微信连接 → 配置 Agent 人设、模型与工作目录 → 按需开启 webhook / relay 或定时任务。
- **Write**：切换到 Write 模式 → 使用默认写作空间或添加新空间 → 在 Live 编辑器中写作，配合补全、选区 inline agent 与右侧写作助手。

## 设置与使用

设置页集中管理这些内容：

- DeepSeek / Xiaomi MiMo / MiniMax provider、API Key / Token Plan Key、Base URL、模型列表、运行时端口和运行时 Token。
- 是否自动启动本地运行时，以及是否使用自定义 `kun` 路径。
- 工具审批策略和文件系统权限范围。
- 默认工作目录、语言、主题、字体大小和完成通知。
- GUI 更新和本地错误日志。
- Skill 创建与目录管理、MCP 配置编辑。
- 语音识别、图片生成、图片附件、视觉模型输入等多模态能力。
- 连接手机后台自动化、飞书 / Lark / 微信连接、Webhook / Relay 和定时任务。

快捷键：

| 按键 | 功能 |
| --- | --- |
| `Enter` | 发送消息 |
| `Shift+Enter` | 在输入框中换行 |
| `Ctrl+Enter` | 发送消息 |
| `Esc` | 关闭面板或退出当前浮层 |

## Write 模式设计参考

Write 模式的目标是把 Kun 从“代码/聊天工作台”扩展成真正可长期写作的桌面工作区。实现时参考了本地 `openhanako` 项目中的几个方案：

- Markdown live 编辑：借鉴 openhanako 的 CodeMirror decorations 思路，当前行保留 Markdown 源码，非当前行用装饰层渲染标题、任务项、图片、分割线和表格。
- 选区 inline agent：借鉴 openhanako 的选区捕获与浮动输入框交互，用户选中文本后可以直接输入“润色/续写/分析”等指令，并把文件路径、行号和原文作为结构化引用交给写作助手。
- AI 会话隔离：Write 使用 Kun thread，但在 GUI 本地按写作空间维护 write thread registry，避免写作会话污染 Code / 连接手机侧栏。
- 文本补全：写作补全为了低延迟使用独立 completion 通道，不阻塞本地 Kun serve 的 agent loop。短补全使用较短 debounce、较小 token 预算和严格本地过滤；灵感长补全使用更长停顿触发、更大 token 预算，并只在行尾 / 段落边界工作。补全前会对写作空间内的 Markdown / 文本文件建立短 TTL 轻量索引，使用 BM25 + 关键词匹配召回跨文本片段，并以隐藏 Markdown comment 的形式注入 prompt，帮助模型保持术语、事实和风格连续性。

---

## 卸载

> 新版安装包应用名为 `Kun`；如果本机存在旧版数据，应用会在首次启动时自动迁移。

### Windows

- 打开“设置 -> 应用 -> 已安装的应用”，找到 `Kun` 并卸载。
- 或在“控制面板 -> 程序和功能”中卸载。
- 也可以运行安装目录中的卸载程序。

Windows 安装器默认会创建开始菜单和桌面快捷方式。安装包不会强制固定到任务栏；如需固定，可在开始菜单中右键 `Kun` 并选择固定。

### macOS

- 将 `Kun.app` 从“应用程序”移到废纸篓。
- 如果首次打开被系统拦截，可在 Finder 中右键应用并选择“打开”。
- 本地未公证构建可先运行：

```bash
npm run mac:unquarantine -- '/Applications/Kun.app'
```

### Linux

- 如果你是从源码构建的 Linux 包，删除对应的 `.AppImage` 或安装文件即可。
- 如果你手动创建了桌面入口或快捷方式，也一并删除。

### 清理本地数据

默认卸载只移除应用文件，会保留本地设置、会话和运行时配置，便于后续重装恢复。若要彻底清理，可按需删除：

| 平台 | 应用数据位置 |
| --- | --- |
| macOS | `~/Library/Application Support/Kun` |
| Windows | `%APPDATA%\Kun` |
| Linux | `~/.config/Kun` |

Kun 数据默认位于 `~/.kun/data` 或应用数据目录下的 Kun data dir。删除前请确认其中没有你还需要的会话、MCP 或 Skill 配置。

---

## 更新

- 普通用户：可在设置页检查 GUI 更新，或前往 [GitHub Releases](https://github.com/KunAgent/Kun/releases) 下载最新安装包。

## 贡献指南

欢迎提交 bug 修复、UI/UX 优化、文档改进、本地化内容、构建发布流程和运行时集成相关改动。

协作约定：

- 日常协作与集成分支为 `develop`，稳定发布分支为 `master`。
- 新功能和修复建议从最新 `develop` 拉出短期功能分支开始。
- PR 默认提交到 `develop`，由维护者审核后再由维护者合入 `master` 发布。
- 对高风险改动请先沟通范围，再进入实现。
- 发起 PR 前运行 `npm run typecheck`、`npm run build`，以及 `npm run test`。
- 如果改动影响界面，请附上视频或 GIF。
- 如果改动影响项目逻辑，请附上对应单元测试。
- 如果改动影响使用方式，请同步更新 `README.md` 和 `README.en.md`。
- 外部贡献需接受 [Contributor License Agreement](./CLA.md)，以便项目所有者统一处理后续授权。

详见 [CONTRIBUTING.zh-CN.md](./docs/CONTRIBUTING.zh-CN.md) 和 [DEVELOPMENT.zh-CN.md](./docs/DEVELOPMENT.zh-CN.md)。

## 本地构建

```bash
npm run build           # 生产构建
npm run dist:mac        # macOS 安装包
npm run dist:win        # Windows 安装包（在 Windows 上运行）
npm run dist:linux      # Linux AppImage
npm run release:mac     # 手动兜底：构建并上传 macOS release 资源
npm run release:win     # 手动兜底：构建并上传 Windows release 资源
```

更多开发流程请看 [DEVELOPMENT.zh-CN.md](./docs/DEVELOPMENT.zh-CN.md)。

## 文档

| 文档 | 内容 |
| --- | --- |
| [docs/kun-architecture.md](docs/kun-architecture.md) | Kun 运行时架构、GUI 边界、HTTP/SSE 合约与集成方式 |
| [docs/kun-cache-optimization.md](docs/kun-cache-optimization.md) | Kun 缓存优化、token economy、MCP search、工具输出压缩与用量收益统计 |
| [docs/model-provider-presets.md](docs/model-provider-presets.md) | DeepSeek、Xiaomi MiMo、MiniMax provider 预设与模型能力说明 |
| [docs/kun-contributing.md](docs/kun-contributing.md) | Kun 贡献指南：六边形架构、设计模式（Ports & Adapters / Functional Core Imperative Shell / 事件溯源 / 显式 DI / Composition Root）、4 个典型 PR 场景 |
| [kun/README.md](kun/README.md) | Kun 包：CLI、env、data dir、HTTP API |
| [CONTRIBUTING.zh-CN.md](docs/CONTRIBUTING.zh-CN.md) | 贡献说明 |
| [DEVELOPMENT.zh-CN.md](docs/DEVELOPMENT.zh-CN.md) | 本地开发与协作流程 |
| [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) | 社区行为准则 |
| [SECURITY.md](SECURITY.md) | 安全漏洞披露方式 |

---

## 致谢

Kun 的设计站在很多优秀模型、工具和开源项目的肩膀上。感谢以下项目、团队和个人：

- **[LobsterAI](https://github.com/netease-youdao/LobsterAI)**：IM 管理、扫码绑定、Agent 绑定与自定义人设流程给了本项目连接手机能力很多启发。
- **[DeepSeek](https://github.com/deepseek-ai)**：提供高性价比模型与 API。
- **Xiaomi MiMo**：提供高性价比模型、Token Plan、视觉与语音能力。
- **MiniMax**：提供高性价比文本模型与图片生成能力。
- 所有为 Kun 提交 issue、建议、代码和文档的贡献者。

<a href="https://github.com/KunAgent/Kun/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=KunAgent/Kun" />
</a>

## 许可证

本项目仅供学习和参考，不可用于任何商业用途。商业使用、商业分发、SaaS/托管服务、二次销售或集成到商业产品中，均需要获得作者的单独书面授权。

教育机构与公益教育机构用于非商业教学、研究、课程实验和学习参考时，无需单独申请授权。但该豁免不得二次穿透：不得向下游客户、合作方、商业项目、托管服务、二次分发或再授权场景传递，也不得作为商业产品或商业服务的一部分对外提供。

详细条款见 [PolyForm Noncommercial License 1.0.0](./LICENSE)。

## Star 历史

[![Star History Chart](https://api.star-history.com/chart?repos=KunAgent/Kun&type=date&legend=top-left)](https://www.star-history.com/?repos=KunAgent%2FKun&type=date&logscale=&legend=top-left)
