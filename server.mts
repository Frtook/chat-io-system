import "dotenv/config";
import next from "next";
import { createServer } from "node:http";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME;
const port = parseInt(process.env.PORT || "3000");

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handle);
  const io = new Server(httpServer, {
    cors: {
      origin: "https://frtook-chat-system.vercel.app/:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("join-room", ({ room, username }) => {
      socket.join(room);
      socket.to(room).emit("user_joined", `${username} joined room`);
    });

    socket.on("message", ({ room, message, sernder }) => {
      socket.to(room).emit("message", { sernder, message });
    });

    socket.on("disconnect", () => {});
  });

  httpServer.listen(port, () => {});
});
