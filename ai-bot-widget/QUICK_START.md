# 快速部署指南

## 一键部署到 GitHub

### 步骤 1: 初始化 Git 仓库

```bash
# 在项目目录下执行
git init
git add .
git commit -m "Initial commit: AI bot widget v1.0.0"
```

### 步骤 2: 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 仓库名称：`ai-bot-widget`
3. 选择 Public（公开）
4. 不要勾选任何初始化选项
5. 点击 "Create repository"

### 步骤 3: 推送代码

```bash
# 替换 your-username 为您的 GitHub 用户名
git remote add origin https://github.com/your-username/ai-bot-widget.git
git branch -M main
git push -u origin main
```

### 步骤 4: 创建 Release

1. 在 GitHub 仓库页面，点击右侧 "Releases"
2. 点击 "Create a new release"
3. 填写：
   - **Tag version**: `v1.0.0` (必须包含 `v` 前缀)
   - **Release title**: `v1.0.0`
   - **Description**: 
     ```
     Initial release of AI Bot Widget
     
     Features:
     - Chat widget with streaming responses
     - Modern UI design
     - Responsive layout
     ```
4. 点击 "Publish release"

### 步骤 5: 使用 CDN

部署完成后，其他项目可以通过以下方式使用：

```html
<!DOCTYPE html>
<html>
<head>
    <title>我的网站</title>
    <!-- 引入样式 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/your-username/ai-bot-widget@v1.0.0/ai-bot-widget.css">
</head>
<body>
    <h1>欢迎访问我的网站</h1>
    
    <!-- 引入脚本 -->
    <script src="https://cdn.jsdelivr.net/gh/your-username/ai-bot-widget@v1.0.0/ai-bot-widget.js"></script>
</body>
</html>
```

**重要**：记得将 `your-username` 替换为您的实际 GitHub 用户名！

## 更新版本

当需要发布新版本时：

```bash
# 1. 修改代码后提交
git add .
git commit -m "Fix: 修复某个bug"

# 2. 创建新的 tag
git tag v1.0.1

# 3. 推送代码和 tag
git push origin main
git push origin v1.0.1

# 4. 在 GitHub 创建对应的 Release
```

然后在 CDN URL 中使用新版本号：
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/your-username/ai-bot-widget@v1.0.1/ai-bot-widget.css">
<script src="https://cdn.jsdelivr.net/gh/your-username/ai-bot-widget@v1.0.1/ai-bot-widget.js"></script>
```

## 验证部署

部署完成后，可以通过以下方式验证：

1. **直接访问文件**：
   ```
   https://cdn.jsdelivr.net/gh/your-username/ai-bot-widget@v1.0.0/ai-bot-widget.js
   ```
   应该能看到 JavaScript 代码

2. **创建测试页面**：
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <title>测试 CDN</title>
       <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/your-username/ai-bot-widget@v1.0.0/ai-bot-widget.css">
   </head>
   <body>
       <h1>CDN 测试</h1>
       <script src="https://cdn.jsdelivr.net/gh/your-username/ai-bot-widget@v1.0.0/ai-bot-widget.js"></script>
   </body>
   </html>
   ```
   打开页面后，应该能看到右下角的机器人挂件。

## 常见问题

### Q: CDN 链接返回 404？
A: 检查以下几点：
- GitHub 用户名是否正确
- 仓库名称是否正确
- 是否创建了 Release（不是 tag）
- Release 的 tag 名称是否包含 `v` 前缀

### Q: CSS 样式未加载？
A: 代码已自动检测 CSS 路径，如果仍有问题，可以手动指定：
```html
<script>
    window.AIBotWidgetConfig = {
        cssUrl: 'https://cdn.jsdelivr.net/gh/your-username/ai-bot-widget@v1.0.0/ai-bot-widget.css'
    };
</script>
<script src="https://cdn.jsdelivr.net/gh/your-username/ai-bot-widget@v1.0.0/ai-bot-widget.js"></script>
```

### Q: 如何更新已部署的版本？
A: 创建新的 Release 版本，用户需要更新 CDN URL 中的版本号。

## 下一步

- 查看 [DEPLOY.md](./DEPLOY.md) 了解详细部署说明
- 查看 [README.md](./README.md) 了解使用方法和配置选项

