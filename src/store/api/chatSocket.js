import Echo from "laravel-echo";
import socketio from "socket.io-client";
import Pusher from "pusher-js";

const options = {
  broadcaster: "pusher",
  key: "73e386dafe027e023ebe",
  cluster: "eu",
  forceTLS: true,
  encrypted: false,
  //authEndpoint is your apiUrl + /broadcasting/auth
  authEndpoint: "https://topfractal.com/api/v1/broadcasting/auth",
  // As I'm using JWT tokens, I need to manually set up the headers.
};

const echo = new Echo(options);
console.log("echo ===", echo);

export const subcribeMessagesSocket = (callback) => {
  console.log("echo here ===", echo);
  // echo.join("chat");

  const result = echo.private("messages.12412412").listen(".chat", callback);
  console.log("result ===", result);
  echo.private("private-messages.12412412").listen(".chat", (data) => {
    console.log("rumman");
    console.log(data);
  });
  // echo.channel("chat").listen("NewMessage", callback);
};

export const emitMessage = (message) => {
  echo.private("message").whisper("sendMessage", message);
};
