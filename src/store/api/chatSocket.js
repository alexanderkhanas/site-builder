import Echo from "laravel-echo";
import socketio from "socket.io-client";

const echo = new Echo({
  host: "https://topfractal.com:6001", //tried 127.0.0.1, localhost, ws:// etc...
  broadcaster: "socket.io",
  client: socketio,
});

console.log("echo ===", echo);

export const subcribeMessagesSocket = (callback) => {
  console.log("echo ===", echo);
  echo.channel("survey").listen("message", callback);
};

export const emitMessage = (message) => {
  echo.private("survey").whisper("sendMessage", message);
};
