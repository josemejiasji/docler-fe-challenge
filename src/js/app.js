import Chat from './components/chat.js';
import Socket from './services/socket.js';
import { SOCKET_SERVER } from './constants.js';

document.addEventListener('DOMContentLoaded', () => {
    const socket = new Socket(SOCKET_SERVER);
    const chat = new Chat(socket);

    chat.init();
});