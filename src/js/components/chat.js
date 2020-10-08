import { MESSAGE_EVENT } from '../constants.js';
import { generateRandonUserName } from '../utils/chat.js';
import { createElement, scrollToBottom } from '../utils/dom.js';

class Chat {
    constructor(socket) {
        this.socket = socket;

        this.renderMessage = this.renderMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    init() {
        this.setupSelectors();
        this.bindSocketEvents();
        this.bindDOMEvents();
        this.setupUsername();
    }

    setupSelectors() {
        this.chatboxActions = document.getElementById('chatbox-actions');
        this.chatboxMessages = document.getElementById('chatbox-messages');
        this.usernameInput = document.getElementById('username-input');
        this.messageInput = document.getElementById('message-input');
    }

    bindSocketEvents() {
        this.socket.on(MESSAGE_EVENT, this.renderMessage);
    }

    bindDOMEvents() {
        this.chatboxActions.addEventListener('submit', this.sendMessage);
    }

    setupUsername() {
        this.usernameInput.value = generateRandonUserName();
    }

    sendMessage(event) {
        event.preventDefault();

        if (this.messageInput.value && this.usernameInput.value) {
            this.socket.emit('message', { message: this.messageInput.value, user: this.usernameInput.value });
            this.messageInput.value = '';
        }
    }

    renderMessage(message) {
        const newMessage = createElement({
            tag: 'li',
            className: `chatbox-messages-item ${this.getMessageClassName(message.user)}`,
            content: `${this.renderUsername(message.user)} ${message.message}`,
        });

        this.chatboxMessages.appendChild(newMessage)
        scrollToBottom(this.chatboxMessages);
    }

    renderUsername(username) {
        return !this.isSentFromCurrentUser(username) ? `<span>${username}:</span>` : '';
    }

    isSentFromCurrentUser(username) {
        return this.usernameInput.value === username;
    }

    getMessageClassName(username) {
        return this.isSentFromCurrentUser(username) ? 'is-sender' : '';
    }
}

export default Chat;