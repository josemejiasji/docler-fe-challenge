class Socket {
    static instance;

    constructor(URL) {
        this.socket = window.io(URL);
    }

    emit(event, payload) {
        return this.socket.emit(event, payload);
    }

    on(event, callback) {
        return this.socket.on(event, callback);
    }
}

export default Socket;