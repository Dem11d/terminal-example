const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);


function* createMockDataGenerator(){
    let pipelineCnt = 0;
    while(true){
        const period = Math.floor(Math.random() * 10) + 1;
        for(let i = 0; i<=period; i++){
            yield {id: pipelineCnt, data:i}
        }
        pipelineCnt++;
    }
}

const getApiAndEmit = (socket, generator) => {
    socket.emit('data', generator.next().value);
};


let interval;
io.on("connection", socket => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    const generator = createMockDataGenerator();
    interval = setInterval(() => getApiAndEmit(socket, generator ), 500);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
