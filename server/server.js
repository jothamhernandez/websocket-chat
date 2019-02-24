var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response){

});

server.listen(1337, function(){
    console.log('server is running');
});

var ws = new WebSocketServer({
    httpServer: server
});

var webChatClients = [];

ws.on('connect', function(data){
    data.on('close', function(message){
        webChatClients.splice(webChatClients.indexOf(this), 1);
    });

    data.on('message', function(message){
        if(this.protocol == 'webchat'){
            var message = message.utf8Data.split(',');
        }
        // console.log(message);
        
        webChatClients.forEach(e=>{
            console.log(e.user);
            console.log(message[0]);
            if(e.user == message[2]){
                e.send([data.user, message[1], e.user]);
            }
        });
    });

    
})

ws.on('request', function(request){
    if(request.requestedProtocols.includes('webchat')){
        var username = request.requestedProtocols[1];
        var connection = request.accept(null, request.origin);
        connection.protocol = 'webchat';
        connection.user = username;
        webChatClients.push(connection);
    }

    // EVERY ONLINE WEBCHAT CLIENTS
    // ['purpose','users']
    webChatClients.forEach(e =>{
        e.send(e.user);
    })

    console.log(webChatClients.length);
})