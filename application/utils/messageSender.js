// messageSender.js
const wss = require('./websocket');

function broadcastMessage(message) {
    console.log(message);
    wss.clients.forEach((client) => {
        console.log(client);
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

module.exports = { broadcastMessage };
