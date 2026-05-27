let socket: WebSocket | null = null;
const listeners = new Set<(msg: WsMessage) => void>();

export interface WsMessage {
  type: 'connected' | 'pong' | 'job:queued' | 'job:processing' | 'job:done' | 'job:failed';
  assignmentId?: string;
  output?: unknown;
  error?: string;
}

export function getSocket(): WebSocket {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    const url = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:4000';
    socket = new WebSocket(url);

    socket.onmessage = (event) => {
      try {
        const msg: WsMessage = JSON.parse(event.data);
        listeners.forEach((fn) => fn(msg));
      } catch {}
    };

    socket.onclose = () => {
      setTimeout(getSocket, 3000);
    };
  }
  return socket;
}

export function subscribe(fn: (msg: WsMessage) => void) {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}

export function initSocket() {
  if (typeof window !== 'undefined') getSocket();
}
