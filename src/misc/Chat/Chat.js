import React, { useEffect, useState } from "react";
import s from "./Chat.module.css";
import uuid from "react-uuid";
import classnames from "classnames";
import Input from "../Input/Input";
import { AiFillMail, BiMailSend, BiSend } from "react-icons/all";
import {
  sendMessageAction,
  subcribeToMessagesAction,
} from "../../store/actions/chatActions";
import { connect } from "react-redux";

const messages = [
  {
    author: "Vasyl kit",
    title: "Domain",
    message: "blya, dai domen nature",
    status: "read",
    sendBy: "user",
    id: uuid(),
  },
  {
    author: "Admin",
    title: "Domain",
    message: "Ne dam idy nahuy",
    status: "new",
    sendBy: "admin",
    id: uuid(),
  },
];

const Chat = ({ listenToMessages, sendMessage }) => {
  const [isExpanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded((prev) => !prev);
  useEffect(() => {
    listenToMessages();
    sendMessage({ title: "asdasfas" });
  }, []);
  return isExpanded ? (
    <div className={s.container}>
      <div className={s.inner}>
        <div className={s.header} onClick={toggleExpanded}>
          <h3 className={s.header__title}>Чат</h3>
        </div>
        <div className={s.messages__container}>
          {messages.map((msg) => {
            return (
              <div
                key={msg.id}
                className={classnames(s.message, {
                  [s.message__admin]: msg.sendBy === "admin",
                  [s.message__user]: msg.sendBy === "user",
                  [s.message__read]: msg.status === "read",
                })}
              >
                <p className={s.message__text}>{msg.message}</p>
              </div>
            );
          })}
        </div>
        <Input placeholder="Введіть повідомлення" inputClass={s.input}>
          <BiSend className={s.input__icon} />
        </Input>
      </div>
    </div>
  ) : (
    <div className={`${s.container} ${s.container__hidden}`}>
      <div className={s.inner}>
        <div className={s.header} onClick={toggleExpanded}>
          <h3 className={s.header__title}>Чат</h3>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  listenToMessages: () => dispatch(subcribeToMessagesAction()),
  sendMessage: (msg) => dispatch(sendMessageAction(msg)),
});

export default connect(null, mapDispatchToProps)(Chat);
