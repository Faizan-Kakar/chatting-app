const WebSocket = require('ws'); // Note the capital 'S' in WebSocket

const wss = new WebSocket.Server({ // Use WebSocket.Server instead of wss.Server
    port: 8080
});

const clients = new Set();



// Handling the event from the client side and also send the messages


wss.on('connection', (ws) => {
    console.log('Client connected');
    clients.add(ws);

    ws.on('message', (data) => {
        try {
            const message = JSON.parse(data);
            const messageType = message.type;
            switch (messageType) {
                case 'new-user-joined':
                    {
                        for (const client of clients) {
                            if (client !== ws) {
                                client.send(JSON.stringify({ type: 'user-joined', 
                                name: message.name }));
                            }
                        }
                    }
                    break;
                case 'send':
                    console.log("message recieved");
                    for (const client of clients) {
                        if (client !== ws) {
                            client.send(JSON.stringify({ type: 'recieve', text: message.text, name : message.name}));
                        }
                    }
                    break;
                // Add more cases for other message types
                default:
                    console.log('Unknown message type:', messageType);
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    ws.on('close', (data) => {
        clients.delete(wss);
    });
});


