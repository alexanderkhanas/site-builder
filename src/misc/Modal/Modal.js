import React from "react";
import s from "./Modal.module.css";
import { connect } from "react-redux";
import Button from "../Button/Button";
import { hideModalAction } from "../../store/actions/assetsActions";

const Modal = ({ title, desc, onResolve, onReject, hide, isVisible }) => {
  const resolveHandler = () => {
    onResolve();
    hide();
  };

  const rejectHandler = () => {
    onReject();
    hide();
  };

  return (
    isVisible && (
      <div className={s.container}>
        <div className={s.inner}>
          <h2 className={s.title}>{title}</h2>
          {!!desc && <p className={s.desc}>{desc}</p>}
          <div className={s.buttons__container}>
            <Button title="Так" onClick={resolveHandler} className={s.button} />
            <Button
              title="Ні"
              onClick={rejectHandler}
              isSecondary
              className={s.button}
            />
          </div>
        </div>
        <div className={s.overlay} onClick={hide} />
      </div>
    )
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
const mapDispatchToProps = (dispatch) => ({
  hide: () => dispatch(hideModalAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
