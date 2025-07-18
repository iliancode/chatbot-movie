class MovieChatApp {
    constructor() {
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.chatMessages = document.getElementById('chatMessages');
        this.sendIcon = document.getElementById('sendIcon');
        this.loadingIcon = document.getElementById('loadingIcon');
        
        this.initializeEventListeners();
        this.updateTime();
    }

    initializeEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());

        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        document.querySelectorAll('.suggestion-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const message = chip.getAttribute('data-message');
                this.messageInput.value = message;
                this.sendMessage();
            });
        });

        this.messageInput.addEventListener('input', () => {
            this.messageInput.style.height = 'auto';
            this.messageInput.style.height = this.messageInput.scrollHeight + 'px';
        });
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        
        if (!message) return;

        this.setLoading(true);
        
        this.addMessage(message, 'user');
        
        this.messageInput.value = '';
        
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            this.addMessage(data.response, 'bot');
            
        } catch (error) {
            console.error('Error sending message:', error);
            
            const errorMessage = "Désolé, j'ai des difficultés de connexion en ce moment. Veuillez réessayer dans un moment. En attendant, voici quelques recommandations populaires :\n\n• **Le Parrain** - Drame criminel classique\n• **Pulp Fiction** - Film iconique de Tarantino\n• **The Dark Knight** - Chef-d'œuvre de super-héros\n• **Forrest Gump** - Drame touchant\n• **Interstellar** - Science-fiction époustouflante";
            
            this.addMessage(errorMessage, 'bot');
        } finally {
            this.setLoading(false);
        }
    }

    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        // Format the content with basic markdown-like styling
        const formattedContent = this.formatMessage(content, sender);
        messageContent.innerHTML = formattedContent;
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = this.getCurrentTime();
        
        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(messageTime);
        
        this.chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        this.scrollToBottom();
    }

    formatMessage(content, sender) {
        if (sender === 'user') {
            return content;
        }

        // Format bot messages with basic styling
        let formatted = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/^[•·]\s*(.+)$/gm, '<div style="margin-left: 20px;">• $1</div>')
            .replace(/^(\d+)\.\s*(.+)$/gm, '<div style="margin-left: 20px;"><strong>$1.</strong> $2</div>')
            .replace(/\n/g, '<br>');

        // Add bot emoji if not present
        if (!formatted.includes('🤖')) {
            formatted = '<strong>🤖 Bot Ciné:</strong> ' + formatted;
        }

        return formatted;
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    updateTime() {
        // Update the initial bot message time
        const firstMessageTime = document.querySelector('.bot-message .message-time');
        if (firstMessageTime && !firstMessageTime.textContent) {
            firstMessageTime.textContent = this.getCurrentTime();
        }
    }

    setLoading(isLoading) {
        this.sendButton.disabled = isLoading;
        this.messageInput.disabled = isLoading;
        
        if (isLoading) {
            this.sendIcon.classList.add('hidden');
            this.loadingIcon.classList.remove('hidden');
        } else {
            this.sendIcon.classList.remove('hidden');
            this.loadingIcon.classList.add('hidden');
        }
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MovieChatApp();
});

