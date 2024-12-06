const Markers = require("./markers");

class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
    this.marskers = new Markers();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      console.log("Cliente conectado");

      socket.emit("active-markers", this.marskers.actives);

      socket.on("new-marker", (marker) => {
        console.log("nemesis,", marker);
        this.marskers.addMarker(marker);
        socket.broadcast.emit("new-marker",  marker);
      });

      socket.on("update-marker", (data) => {
        console.log(data);
        this.io.emit("mensaje-from-server", data);
      });
    });
  }
}

module.exports = Sockets;
