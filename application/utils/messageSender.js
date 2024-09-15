// messageSender.js
const wss = require('./websocket');

function broadcastMessage(message) {
    console.log('broadcasted message  down below');
    console.log(message);
    console.log(wss.clients);
    
    wss.clients.forEach((client) => {
        console.log(client);
        client.send(message);
    });
}

module.exports = { broadcastMessage };
