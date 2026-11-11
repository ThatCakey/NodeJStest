const express = require("express");
const path = require("path");
const http = require("http");
const { WebSocketServer } = require("ws");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.send(JSON.stringify({ type: "hello", message: "Connected!" }));

  const timer = setInterval(() => {
    ws.send(JSON.stringify({ type: "time", value: new Date().toLocaleTimeString() }));
  }, 1000);

  ws.on("close", () => {
    clearInterval(timer);
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT);
});