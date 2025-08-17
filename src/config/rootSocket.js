const rootSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("新连接");
    socket.on("join-room", (room) => {
      console.log("加入房间", room);
      socket.join(room);
    });
    socket.on("disconnect", () => {
      console.log("断开连接");
      console.log(socket.rooms.size);
    });
  });
  return io;
};
module.exports = rootSocket;
