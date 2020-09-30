import React, { useEffect, useState } from "react";
import s from "./Chat.module.css";
import uuid from "react-uuid";
import classnames from "classnames";
import Input from "../Input/Input";
import { AiFillMail, BiMailSend, BiSend } from "react-icons/all";
import { subcribeToMessagesAction } from "../../store/actions/chatActions";
import { connect } from "react-redux";
import { emitMessage } from "../../store/api/chatSocket";

const Chat = ({ subcribeToMessages, messages }) => {
  const [isExpanded, setExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [chatId] = useState(uuid());
  const toggleExpanded = () => setExpanded((prev) => !prev);

  const sendMessage = () => {
    if (!inputValue) return;
    emitMessage(chatId, {
      author: "Vasyl kit",
      id: uuid(),
      message: inputValue,
      sendBy: "user",
      status: "read",
    });
  };

  useEffect(() => {
    subcribeToMessages(chatId);
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
        <Input
          onChange={({ target }) => setInputValue(target.value)}
          value={inputValue}
          placeholder="Введіть повідомлення"
          inputClass={s.input}
        >
          <BiSend className={s.input__icon} onClick={sendMessage} />
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

const mapStateToProps = (state) => ({
  messages: state.chat.messages,
});

const mapDispatchToProps = (dispatch) => ({
  subcribeToMessages: (chatId) => dispatch(subcribeToMessagesAction(chatId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
