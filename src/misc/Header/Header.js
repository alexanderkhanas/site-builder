import React from "react";
import s from "./Header.module.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Header = ({ user }) => {
  console.log("user ===", user);
  return (
    <div className={s.container}>
      <img
        src={require("../../assets/logo.png")}
        className={s.logo}
        alt="loading"
      />
      <div className={s.main__content}>
        {[
          "ПРО НАС",
          "ШАБЛОНИ",
          "ТАРИФИ",
          "ПЕРЕВАГИ",
          "ВІДГУКИ",
          "ПАНЕЛЬ УПРАВЛІННЯ",
        ].map((item, i) => (
          <span className={s.header__item} key={i}>
            {item}
          </span>
        ))}
      </div>
      <div className={s.action__container}>
        <Link to="/login" className={s.header__item}>
          Увійти
        </Link>
        <Link to="/select-template">
          <Button title="Створити" className={s.create__btn} />
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(Header);
