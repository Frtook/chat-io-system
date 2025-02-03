import "dotenv/config";
import next from "next";
import { createServer } from "node:http";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3000");

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handle);
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("user connected ", socket.id);

    socket.on("join-room", ({ room, username }) => {
      socket.join(room);
      console.log("username ", username, "room", room);
      socket.to(room).emit("user_joined", `${username} joined room`);
    });

    socket.on("message", ({ room, message, sernder }) => {
      console.log(room, message, sernder);
      socket.to(room).emit("message", { sernder, message });
    });

    socket.on("disconnect", () => {
      console.log("disconnect ", socket.id);
    });
  });

  httpServer.listen(port, () => {
    console.log("server running on port", port);
  });
});
