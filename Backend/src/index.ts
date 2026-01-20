import { WebSocketServer } from 'ws';
const wss=new WebSocketServer({port:8080});
let userCount=0;
wss.on('connection',(Socket)=>{
    userCount++;
    console.log('client connected #' + userCount);
    Socket.on('message',(data)=>{
        console.log('message received: ' + data);   
    });
    // Socket.send('Welcome to the WebSocket server! You are user #' + userCount);
    Socket.on('message',(data)=>{
        // Broadcast the received message to all connected clients
        wss.clients.forEach((client)=>{
            if(client.readyState===client.OPEN){
                client.send(`User #${userCount} says: ${data}`);
            }
        });
    });

});