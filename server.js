const http = require("http");
const server = http.createServer((req, res)) => {});

server.listenerCount(3000, ()=> {
    console.log(`Server is running`)
});