const http = require('http');
const app = require('./app');
const WebSocket = require('ws');

const port = process.env.PORT || 3000;

app.set('port', port);
const server = http.createServer((app));
const wss = new WebSocket.Server({ server });

exports.broadcastMessage = function (message) {
    wss.clients.forEach((client) => {
        console.log(client);
        client.send(message);
    });
}

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.send('Welcome to the WebSocket server!');
    // broadcastMessage('broadcasted')

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Server received: ${message}`);
            }
        });
    });
});








