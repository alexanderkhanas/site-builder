import React from "react";
import s from "./Modal.module.css";
import { connect } from "react-redux";

const Modal = ({ title, desc, onResolve, onReject }) => {
  return (
    <div className={s.container}>
      <div className={s.inner}></div>
    </div>
  );
};

Modal.defaultProps = {
  title: "",
  desc: "",
  onResolve: () => {},
  onReject: () => {},
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
