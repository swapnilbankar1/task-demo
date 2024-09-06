// wsUtil.js

const WebSocket = require('ws');

class WebSocketUtil {
    constructor(port) {
        this.port = port;
        this.wss = null;
    }

    // Initialize WebSocket server
    initializeServer() {
        this.wss = new WebSocket.Server({ port: this.port });
        console.log(`WebSocket server started on port ${this.port}`);

        this.wss.on('connection', (ws) => {
            console.log('New client connected');

            // Send welcome message
            ws.send('Welcome to the WebSocket server');

            // Handle incoming messages
            ws.on('message', (message) => {
                console.log(`Received: ${message}`);
                this.broadcast(message, ws);
            });

            // Handle disconnection
            ws.on('close', () => {
                console.log('Client disconnected');
            });
        });
    }

    // Broadcast a message to all connected clients
    broadcast(message, sender) {
        this.wss.clients.forEach((client) => {
            if (client !== sender && client.readyState === WebSocket.OPEN) {
                client.send(`Broadcast: ${message}`);
            }
        });
    }

    // Send message to a specific client
    sendMessageToClient(client, message) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    }

    // Ping clients (optional: health check)
    pingClients() {
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.ping();
            }
        });
    }
}

module.exports = WebSocketUtil;
