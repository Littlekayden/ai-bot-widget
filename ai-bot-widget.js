/**
 * AI 小百科助手 问答机器人挂件
 * 可以在任何网站中引入使用的聊天机器人挂件
 */

(function() {
    'use strict';

    // 配置
    const config = {
        apiUrl: 'http://localhost:8081/chatWithFlux',
        widgetPosition: 'right', // 挂件位置
        widgetColor: '#4A90E2', // 挂件颜色
        cssUrl: null, // CSS文件URL，如果为null则自动检测
    };

    // 获取当前脚本的URL，用于自动检测CSS路径
    function getCurrentScriptUrl() {
        const scripts = document.getElementsByTagName('script');
        for (let i = scripts.length - 1; i >= 0; i--) {
            const src = scripts[i].src;
            if (src && src.includes('ai-bot-widget')) {
                return src;
            }
        }
        return null;
    }

    // 创建样式
    function injectStyles() {
        const styleId = 'ai-bot-widget-styles';
        if (document.getElementById(styleId)) return;

        const link = document.createElement('link');
        link.id = styleId;
        link.rel = 'stylesheet';
        
        // 确定CSS文件路径
        let cssUrl = config.cssUrl;
        if (!cssUrl) {
            // 自动检测：从当前JS文件路径推导CSS路径
            const scriptUrl = getCurrentScriptUrl();
            if (scriptUrl) {
                // 将 .js 替换为 .css
                cssUrl = scriptUrl.replace(/\.js$/, '.css');
            } else {
                // 回退到相对路径
                cssUrl = 'ai-bot-widget.css';
            }
        }
        
        link.href = cssUrl;
        document.head.appendChild(link);
    }

    // 格式化时间
    function formatTime(date = new Date()) {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // 创建挂件按钮
    function createWidget() {
        const widget = document.createElement('div');
        widget.id = 'ai-bot-widget';
        widget.className = 'ai-bot-widget';
        widget.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11C11 9.75 14 10 14 8C14 6.9 13.1 6 12 6C10.9 6 10 6.9 10 8H8C8 5.79 9.79 4 12 4C14.21 4 16 5.79 16 8C16 10.5 13 10.75 13 13Z" fill="white"/>
            </svg>
        `;
        widget.addEventListener('click', toggleChatWindow);
        return widget;
    }

    // 创建聊天窗口
    function createChatWindow() {
        const chatWindow = document.createElement('div');
        chatWindow.id = 'ai-bot-chat-window';
        chatWindow.className = 'ai-bot-chat-window';
        chatWindow.innerHTML = `
            <div class="ai-bot-chat-header">
                <div class="ai-bot-chat-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11C11 9.75 14 10 14 8C14 6.9 13.1 6 12 6C10.9 6 10 6.9 10 8H8C8 5.79 9.79 4 12 4C14.21 4 16 5.79 16 8C16 10.5 13 10.75 13 13Z" fill="currentColor"/>
                    </svg>
                    <span>AI 小百科助手</span>
                </div>
                <button class="ai-bot-close-btn" id="ai-bot-close-btn">×</button>
            </div>
            <div class="ai-bot-chat-messages" id="ai-bot-chat-messages">
                <div class="ai-bot-message ai-bot-message-ai">
                    <div class="ai-bot-message-content">
                        <div class="ai-bot-message-text">您好！我是AI小百科助手，有什么问题可以问我哦~</div>
                        <div class="ai-bot-message-time">${formatTime()}</div>
                    </div>
                </div>
            </div>
            <div class="ai-bot-chat-input-container">
                <div class="ai-bot-chat-input-wrapper">
                    <input 
                        type="text" 
                        id="ai-bot-chat-input" 
                        class="ai-bot-chat-input" 
                        placeholder="输入您的问题..."
                        autocomplete="off"
                    />
                    <button id="ai-bot-send-btn" class="ai-bot-send-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        return chatWindow;
    }

    // 切换聊天窗口显示/隐藏
    function toggleChatWindow() {
        const chatWindow = document.getElementById('ai-bot-chat-window');
        if (chatWindow) {
            chatWindow.classList.toggle('ai-bot-chat-window-show');
        }
    }

    // 添加消息到聊天窗口
    function addMessage(text, isUser = false) {
        const messagesContainer = document.getElementById('ai-bot-chat-messages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-bot-message ${isUser ? 'ai-bot-message-user' : 'ai-bot-message-ai'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'ai-bot-message-content';
        
        const messageText = document.createElement('div');
        messageText.className = 'ai-bot-message-text';
        messageText.textContent = text;
        
        const messageTime = document.createElement('div');
        messageTime.className = 'ai-bot-message-time';
        messageTime.textContent = formatTime();
        
        messageContent.appendChild(messageText);
        messageContent.appendChild(messageTime);
        messageDiv.appendChild(messageContent);
        
        messagesContainer.appendChild(messageDiv);
        
        // 滚动到底部
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        return messageDiv;
    }

    // 更新AI消息（用于流式响应）
    function updateAIMessage(messageDiv, text) {
        const messageText = messageDiv.querySelector('.ai-bot-message-text');
        if (messageText) {
            messageText.textContent = text;
            const messagesContainer = document.getElementById('ai-bot-chat-messages');
            if (messagesContainer) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }
    }

    // 发送消息
    function sendMessage() {
        const input = document.getElementById('ai-bot-chat-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        // 清空输入框
        input.value = '';
        
        // 添加用户消息
        addMessage(message, true);
        
        // 添加AI消息占位符
        const aiMessageDiv = addMessage('正在思考...', false);
        
        // 发送请求
        fetchAIResponse(message, aiMessageDiv);
    }

    // 使用Fetch API处理SSE流
    function fetchAIResponse(message, messageDiv) {
        const url = `${config.apiUrl}?message=${encodeURIComponent(message)}`;
        
        console.log('发送请求到:', url);
        
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'text/event-stream',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            console.log('收到响应，Content-Type:', response.headers.get('content-type'));
            
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            let fullResponse = '';
            let hasReceivedData = false;
            
            function readStream() {
                reader.read().then(({ done, value }) => {
                    if (done) {
                        console.log('流结束，完整响应:', fullResponse);
                        // 流结束，更新最终消息
                        if (fullResponse.trim()) {
                            updateAIMessage(messageDiv, fullResponse);
                        } else if (!hasReceivedData) {
                            updateAIMessage(messageDiv, '抱歉，我没有收到回复。');
                        }
                        return;
                    }
                    
                    // 解码数据
                    const chunk = decoder.decode(value, { stream: true });
                    buffer += chunk;
                    
                    console.log('收到数据块 (原始):', JSON.stringify(chunk));
                    console.log('当前buffer:', JSON.stringify(buffer));
                    
                    // 处理SSE格式的数据
                    // SSE格式标准是: data: {...}\n\n (两个换行符分隔消息)
                    // 但也可能是: data: {...}\n (单个换行符)
                    const lines = buffer.split('\n');
                    
                    // 保留最后一个可能不完整的行
                    buffer = lines.pop() || '';
                    
                    // 处理每一行
                    for (const line of lines) {
                        const trimmedLine = line.trim();
                        if (!trimmedLine) continue;
                        
                        let dataStr = '';
                        
                        // 检查是否是 data: 开头的行
                        if (trimmedLine.startsWith('data: ')) {
                            dataStr = trimmedLine.substring(6).trim();
                        } else if (trimmedLine.startsWith('data:')) {
                            // 处理 data: 后面没有空格的情况
                            dataStr = trimmedLine.substring(5).trim();
                        } else if (!trimmedLine.startsWith('event:') && !trimmedLine.startsWith('id:') && !trimmedLine.startsWith(':')) {
                            // 如果没有前缀，可能是直接的数据（非标准格式）
                            dataStr = trimmedLine;
                        }
                        
                        if (!dataStr) continue;
                        
                        console.log('提取的数据字符串:', dataStr);
                        
                        // 检查是否是结束标记
                        if (dataStr === '[DONE]') {
                            console.log('收到结束标记');
                            if (fullResponse.trim()) {
                                updateAIMessage(messageDiv, fullResponse);
                            }
                            return;
                        }
                        
                        // 尝试解析JSON数据
                        try {
                            const data = JSON.parse(dataStr);
                            console.log('解析的JSON数据:', data);
                            
                            // 提取content内容（OpenAI格式）
                            if (data.choices && data.choices.length > 0) {
                                const choice = data.choices[0];
                                if (choice.delta) {
                                    // 检查content字段（可能是空字符串，需要处理）
                                    if (choice.delta.content !== undefined && choice.delta.content !== null) {
                                        const content = choice.delta.content;
                                        if (content) {
                                            hasReceivedData = true;
                                            fullResponse += content;
                                            console.log('提取到内容:', content, '当前完整响应:', fullResponse);
                                            updateAIMessage(messageDiv, fullResponse);
                                        }
                                    }
                                }
                            }
                        } catch (e) {
                            console.log('JSON解析失败，尝试作为纯文本:', dataStr, '错误:', e.message);
                            // 如果不是JSON格式，直接使用原始数据（兼容其他格式）
                            if (dataStr && dataStr !== '[DONE]') {
                                hasReceivedData = true;
                                fullResponse += dataStr;
                                updateAIMessage(messageDiv, fullResponse);
                            }
                        }
                    }
                    
                    // 继续读取
                    readStream();
                }).catch(error => {
                    console.error('Stream reading error:', error);
                    updateAIMessage(messageDiv, '抱歉，发生了错误：' + error.message);
                });
            }
            
            readStream();
        })
        .catch(error => {
            console.error('Fetch error:', error);
            updateAIMessage(messageDiv, '抱歉，无法连接到服务器。请检查网络连接或后端服务是否正常运行。');
        });
    }

    // 初始化
    function init() {
        // 注入样式
        injectStyles();
        
        // 创建挂件
        const widget = createWidget();
        document.body.appendChild(widget);
        
        // 创建聊天窗口
        const chatWindow = createChatWindow();
        document.body.appendChild(chatWindow);
        
        // 绑定事件
        const sendBtn = document.getElementById('ai-bot-send-btn');
        const input = document.getElementById('ai-bot-chat-input');
        const closeBtn = document.getElementById('ai-bot-close-btn');
        
        if (sendBtn) {
            sendBtn.addEventListener('click', sendMessage);
        }
        
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', toggleChatWindow);
        }
    }

    // 当DOM加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

