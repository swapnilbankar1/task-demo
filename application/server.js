const http = require('http');
const app = require('./app');
const WebSocket = require('ws');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const express = require("express");
const router = express.Router();
const eventEmitter = require('./utils/eventEmitter');

const port = process.env.PORT || 3000;

app.set('port', port);
const server = http.createServer((app));
const wss = new WebSocket.Server({ server });

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Simple API',
        version: '1.0.0',
        description: 'A simple API to demonstrate Swagger documentation',
    },
    servers: [
        {
            url: `http://localhost:${port}`,
            description: 'Local server',
        },
    ],
};

// Options for the swagger docs
const options = {
    swaggerDefinition,
    apis: ['./*.js'], // Path to the API docs
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// Use swagger-ui-express for your app documentation endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
router.get('/items', (req, res) => {
    res.json([{ id: 1, name: 'Item name' }]);
});

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







