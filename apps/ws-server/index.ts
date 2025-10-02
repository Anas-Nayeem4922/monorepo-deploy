import { client } from "db/client";
import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const allSockets: WebSocket[] = [];

const sendData = async () => {
    await client.chat.create({
        data: {
            message: "PONG",
        },
    });
};

wss.on("connection", (ws: WebSocket) => {
    allSockets.push(ws);
    ws.on("message", (data) => {
        if (data.toString() == "PING") {
            sendData();
            allSockets.forEach((s) => s.send("PONG"));
        }
    });
});
