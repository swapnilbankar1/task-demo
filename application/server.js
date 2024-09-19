const http = require('http');
const app = require('./app');
const WebSocket = require('ws');
const eventEmitter = require('./utils/eventEmitter');

const port = process.env.PORT || 3000;

app.set('port', port);
const server = http.createServer((app));
const wss = new WebSocket.Server({ server });

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

wss.on('connection', (wss) => {
    console.log('New client connected');
    wss.on('message', (message) => {
        console.log(`Received message: ${message}`);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`Server received: ${message}`);
            }
        });
    });
});

eventEmitter.on('broadcast', (message) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
});

module.exports = wss;







