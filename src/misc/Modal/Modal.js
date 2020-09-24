import React from "react";
import s from "./Modal.module.css";
import { connect } from "react-redux";
import Button from "../Button/Button";

const Modal = ({ title, desc, onResolve, onReject, hide }) => {
  return (
    <div className={s.container}>
      <div className={s.inner}>
        <h3 className={s.title}>{title}</h3>
        {!!desc && <p className={s.desc}>{desc}</p>}
        <div className={s.buttons__container}>
          <Button title="Так" onClick={onResolve} className={s.button} />
          <Button
            title="Ні"
            onClick={onReject}
            isSecondary
            className={s.button}
          />
        </div>
      </div>
      <div className={s.overlay} onClick={hide} />
    </div>
  );
};

Modal.defaultProps = {
  onResolve: () => {},
  onReject: () => {},
};

const mapStateToProps = (state) => ({
  desc: state.assets.modal.desc,
  title: state.assets.modal.title,
  onResolve: state.assets.modal.onResolve,
  onReject: state.assets.modal.onReject,
  isVisible: state.assets.modal.isVisible,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
