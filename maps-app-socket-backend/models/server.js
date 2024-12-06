const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");
const cors = require("cors");
const Markers = require("./markers");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    this.server = http.createServer(this.app);
    this.markers = new Markers();
    this.io = socketio(this.server, {
      cors: {
        origin: "*",
      },
    });
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }
  configSockets() {
    new Sockets(this.io);
  }

  execute() {
    this.middlewares();

    this.configSockets();

    this.server.listen(this.port, () => {
      console.log(`listening on ${this.port}`);
    });
  }
}

module.exports = Server;
