# 部署指南

本指南将帮助您将 AI 小百科助手挂件部署到 GitHub，并通过 CDN 方式供其他项目使用。

## 部署步骤

### 1. 创建 GitHub 仓库

1. 登录 GitHub，点击右上角的 "+" 按钮，选择 "New repository"
2. 填写仓库信息：
   - Repository name: `ai-bot-widget`
   - Description: `AI 小百科助手 - 问答机器人挂件`
   - 选择 Public（公开仓库才能使用 jsDelivr CDN）
   - 不要初始化 README（因为我们已经有了）
3. 点击 "Create repository"

### 2. 上传代码到 GitHub

在项目目录下执行以下命令：

```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: AI bot widget"

# 添加远程仓库（替换为您的仓库地址）
git remote add origin https://github.com/your-username/ai-bot-widget.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 3. 创建 Release 版本

为了使用 jsDelivr CDN，需要创建 Release：

1. 在 GitHub 仓库页面，点击 "Releases"
2. 点击 "Create a new release"
3. 填写版本信息：
   - Tag version: `v1.0.0`
   - Release title: `v1.0.0`
   - Description: `Initial release`
4. 点击 "Publish release"

### 4. 使用 CDN 引用

部署完成后，其他项目可以通过以下方式引用：

#### 方式一：使用 jsDelivr CDN（推荐）

```html
<!-- 引入样式文件 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/your-username/ai-bot-widget@v1.0.0/ai-bot-widget.css">

<!-- 引入脚本文件 -->
<script src="https://cdn.jsdelivr.net/gh/your-username/ai-bot-widget@v1.0.0/ai-bot-widget.js"></script>
```

#### 方式二：使用 GitHub Pages

1. 在仓库设置中启用 GitHub Pages
2. 选择 main 分支作为源
3. 访问地址：`https://your-username.github.io/ai-bot-widget/`

然后可以这样引用：

```html
<link rel="stylesheet" href="https://your-username.github.io/ai-bot-widget/ai-bot-widget.css">
<script src="https://your-username.github.io/ai-bot-widget/ai-bot-widget.js"></script>
```

#### 方式三：使用 unpkg CDN（如果发布到 npm）

如果将来发布到 npm，可以使用 unpkg：

```html
<link rel="stylesheet" href="https://unpkg.com/ai-bot-widget@1.0.0/ai-bot-widget.css">
<script src="https://unpkg.com/ai-bot-widget@1.0.0/ai-bot-widget.js"></script>
```

## 配置说明

### 自定义 API 地址

如果需要在引入后修改配置，可以在脚本加载后添加：

```html
<script src="https://cdn.jsdelivr.net/gh/your-username/ai-bot-widget@v1.0.0/ai-bot-widget.js"></script>
<script>
    // 注意：当前版本需要在脚本内部修改 config 对象
    // 或者等待脚本加载完成后通过全局变量访问
</script>
```

### 自定义 CSS 路径

如果 CSS 文件路径不同，可以在引入脚本前设置：

```html
<script>
    window.AIBotWidgetConfig = {
        cssUrl: 'https://your-custom-cdn.com/ai-bot-widget.css'
    };
</script>
<script src="https://cdn.jsdelivr.net/gh/your-username/ai-bot-widget@v1.0.0/ai-bot-widget.js"></script>
```

## 版本管理

建议使用语义化版本（Semantic Versioning）：
- `v1.0.0` - 初始版本
- `v1.0.1` - 补丁更新（bug修复）
- `v1.1.0` - 小版本更新（新功能）
- `v2.0.0` - 大版本更新（不兼容的更改）

每次更新后：
1. 更新 `package.json` 中的版本号
2. 创建新的 Git tag：`git tag v1.0.1`
3. 推送 tag：`git push origin v1.0.1`
4. 在 GitHub 创建对应的 Release

## 注意事项

1. **CORS 配置**：确保后端 API 已配置 CORS，允许 CDN 域名访问
2. **HTTPS**：如果网站使用 HTTPS，后端 API 也需要使用 HTTPS
3. **缓存**：CDN 会缓存文件，更新后可能需要等待一段时间才能生效
4. **版本锁定**：建议在 CDN URL 中指定具体版本号，避免自动更新导致的问题

## 快速测试

创建一个测试 HTML 文件：

```html
<!DOCTYPE html>
<html>
<head>
    <title>测试 AI Bot Widget</title>
</head>
<body>
    <h1>测试页面</h1>
    
    <!-- 引入样式 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/your-username/ai-bot-widget@v1.0.0/ai-bot-widget.css">
    
    <!-- 引入脚本 -->
    <script src="https://cdn.jsdelivr.net/gh/your-username/ai-bot-widget@v1.0.0/ai-bot-widget.js"></script>
</body>
</html>
```

## 故障排查

1. **样式未加载**：检查浏览器控制台的网络请求，确认 CSS 文件可以正常访问
2. **脚本未执行**：检查控制台是否有 JavaScript 错误
3. **API 请求失败**：检查后端 CORS 配置和 API 地址是否正确

