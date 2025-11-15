# AI 小百科助手 - 问答机器人挂件

一个可以在任何网站中引入使用的 AI 问答机器人挂件，支持流式响应，提供优雅的用户体验。

## 功能特点

- 🎨 现代化的 UI 设计，美观大方
- 💬 实时流式响应，AI 回答逐步显示
- 📱 响应式设计，支持移动端和桌面端
- ⏰ 显示消息时间戳
- 🎯 用户消息在右侧，AI 消息在左侧（符合常见聊天习惯）
- ✨ 平滑的动画效果和交互体验
- 🔧 易于集成，只需引入两个文件

## 快速开始

### 方式一：通过 CDN 引入（推荐）

如果项目已部署到 GitHub，可以通过 jsDelivr CDN 引入：

```html
<!-- 引入样式文件 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/your-username/ai-bot-widget@v1.0.0/ai-bot-widget.css">

<!-- 引入脚本文件 -->
<script src="https://cdn.jsdelivr.net/gh/your-username/ai-bot-widget@v1.0.0/ai-bot-widget.js"></script>
```

**注意**：将 `your-username` 替换为您的 GitHub 用户名，`v1.0.0` 替换为实际的版本号。

### 方式二：本地文件引入

下载文件到本地项目后引入：

```html
<!-- 引入样式文件 -->
<link rel="stylesheet" href="ai-bot-widget.css">

<!-- 引入脚本文件 -->
<script src="ai-bot-widget.js"></script>
```

### 文件说明

- `ai-bot-widget.js` - 主脚本文件，包含所有功能逻辑
- `ai-bot-widget.css` - 样式文件
- `example.html` - 示例页面，用于测试

### 3. 后端配置

确保后端服务运行在 `http://localhost:8081`，并且接口路径为 `/chatWithFlux`。

如果需要修改 API 地址，请编辑 `ai-bot-widget.js` 文件中的 `config.apiUrl` 配置。

## 后端接口要求

### 接口地址
```
GET http://localhost:8081/chatWithFlux?message={用户消息}
```

### 响应格式
接口需要返回 **Server-Sent Events (SSE)** 格式的流式数据：

```
Content-Type: text/event-stream;charset=utf-8
```

数据格式：
```
data: 这是
data: 一段
data: 流式
data: 响应
```

## 自定义配置

在 `ai-bot-widget.js` 文件中可以修改以下配置：

```javascript
const config = {
    apiUrl: 'http://localhost:8081/chatWithFlux',  // API 地址
    widgetPosition: 'right',                        // 挂件位置
    widgetColor: '#4A90E2',                        // 挂件颜色
};
```

## 样式自定义

所有样式都在 `ai-bot-widget.css` 文件中，您可以根据需要修改：

- 挂件颜色和位置
- 聊天窗口大小和样式
- 消息气泡样式
- 输入框样式

## 浏览器兼容性

- Chrome/Edge (推荐)
- Firefox
- Safari
- 移动端浏览器

## 部署到 GitHub 和 CDN

详细的部署指南请参考 [DEPLOY.md](./DEPLOY.md) 文件。

### 快速部署步骤

1. 创建 GitHub 仓库并推送代码
2. 创建 Release 版本（如 `v1.0.0`）
3. 通过 jsDelivr CDN 引用：
   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/your-username/ai-bot-widget@v1.0.0/ai-bot-widget.css">
   <script src="https://cdn.jsdelivr.net/gh/your-username/ai-bot-widget@v1.0.0/ai-bot-widget.js"></script>
   ```

## 注意事项

1. **跨域问题**：确保后端已配置 CORS，允许前端域名访问
2. **HTTPS**：如果网站使用 HTTPS，后端接口也需要使用 HTTPS
3. **文件路径**：使用 CDN 时，CSS 路径会自动检测（基于 JS 文件路径），无需手动指定
4. **版本管理**：建议在 CDN URL 中指定具体版本号，避免自动更新导致的问题

## 开发说明

### 项目结构
```
ai-bot-widget/
├── ai-bot-widget.js      # 主脚本文件
├── ai-bot-widget.css     # 样式文件
├── example.html          # 示例页面
└── README.md             # 说明文档
```

### 核心功能

1. **挂件显示**：在页面右下角显示机器人图标
2. **窗口切换**：点击挂件打开/关闭聊天窗口
3. **消息发送**：用户输入消息并发送
4. **流式响应**：使用 Fetch API 处理 SSE 流式数据
5. **消息显示**：实时更新 AI 回答内容

## 测试

1. 启动后端服务（确保运行在 `http://localhost:8081`）
2. 在浏览器中打开 `example.html`
3. 点击右下角的机器人图标
4. 输入问题并测试聊天功能

## 许可证

MIT License

## 更新日志

### v1.0.0
- 初始版本
- 实现基本的聊天功能
- 支持流式响应
- 响应式设计

