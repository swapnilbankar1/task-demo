// messageSender.js
const wss = require('./websocket');

function broadcastMessage(message) {
    wss.clients.forEach((client) => {
        console.log(client);
        client.send(message);
    });
}

module.exports = { broadcastMessage };
