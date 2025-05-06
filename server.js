const WebSocket = require('ws');
const http = require('http');

// Создаем HTTP-сервер
const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('message', (message) => {
        console.log(`Received: ${message}`);
        // Отправляем сообщение всем подключенным клиентам
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString()); // Убедитесь, что отправляется строка
            }
        });
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });
});

// Используем порт 8080
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`WebSocket server is running on ws://localhost:${PORT}`);
});
