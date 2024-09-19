// sendMessage.js
const eventEmitter = require('./eventEmitter');  // Import the event emitter

// Emit an event to broadcast a message to all WebSocket clients
function broadcastMessage(message) {
    eventEmitter.emit('broadcast', message);
}

// Example usage
// broadcastMessage('Hello from another file!');
module.exports = broadcastMessage;