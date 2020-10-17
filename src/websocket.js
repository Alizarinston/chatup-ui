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

  connect(chatUrl) {
    const path = `${SOCKET_URL}/api/ws/rooms/${chatUrl}/`;
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = () => {
      console.log("WebSocket open");
    };
    this.socketRef.onmessage = e => {
      this.socketNewMessage(e.data);
    };
    this.socketRef.onerror = e => {
      console.log(e.content);
    };
    this.socketRef.onclose = (event) => {
      if (!event.wasClean) {
        console.log("WebSocket closed let's reopen");
        this.connect(chatUrl);
      }
    };
  }

  disconnect() {
    this.socketRef.close(1000, "Closing Connection Normally");
  }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    const type = parsedData.type;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (type === "send_message") {
      this.callbacks["new_message"](parsedData.content);
    }
    if (type === "update_watchers_count") {
      this.callbacks["update_watchers_count"](parsedData.content);
    }
  }

  newChatMessage(message) {
    this.sendMessage({
      type: "create_message",
      content: {text: message.content}
    });
  }

  addCallbacks(newMessageCallback, updateWatchersCountCallback) {
    this.callbacks["new_message"] = newMessageCallback;
    this.callbacks["update_watchers_count"] = updateWatchersCountCallback;
  }

  sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    } catch (err) {
      console.log(err.message);
    }
  }

  state() {
    return this.socketRef.readyState;
  }
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;