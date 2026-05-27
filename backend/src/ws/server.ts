import WebSocket, { WebSocketServer } from 'ws';
import { IncomingMessage } from 'http';

let wss: WebSocketServer | null = null;

export function initWebSocket(server: import('http').Server) {
  wss = new WebSocketServer({ server });

  wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
    console.log('WebSocket client connected');

    ws.on('message', (data) => {
      try {
        const msg = JSON.parse(data.toString());
        if (msg.type === 'ping') ws.send(JSON.stringify({ type: 'pong' }));
      } catch {}
    });

    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });

    ws.send(JSON.stringify({ type: 'connected' }));
  });

  console.log('WebSocket server initialized');
}

export function broadcast(payload: object) {
  if (!wss) return;
  const message = JSON.stringify(payload);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}
