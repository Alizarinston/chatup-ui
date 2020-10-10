import { SOCKET_URL } from "./settings";

class WebSocketService {
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  connect(userID, token) {
    const path = `${SOCKET_URL}/ws/auth/${userID}/`;
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = () => {
      console.log('WebSocket open');
      this.sendMessage({
        // message: "Client send this message",
        token: token
      })
    };
    this.socketRef.onmessage = e => {
      this.socketNewMessage(e.data);
      console.log('Client receive: ', e.data);
    };
    this.socketRef.onerror = e => {
      console.log(e.message);
    };
    this.socketRef.onclose = (event) => {
      if (!event.wasClean) {
        this.connect(userID, token);
      }
    };
  }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    console.log('COMMAND: ', command);
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === 'auth') {
      this.callbacks[command](parsedData.username, parsedData.cash, parsedData.wallet)
    }
  }

  fetchMessages(username) {
    this.sendMessage({ command: 'fetch_messages', username: username });
  }

  addCallbacks(authCallback) {
    this.callbacks['auth'] = authCallback;
  }

  sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    }
    catch(err) {
      console.log(err.message);
    }
  }

  state() {
    return this.socketRef.readyState;
  }

}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;
