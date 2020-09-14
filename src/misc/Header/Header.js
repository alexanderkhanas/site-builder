import React from "react";
import s from "./Header.module.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Header = ({ user }) => {
  return (
    <div className={s.container}>
      <div className={s.left__container}>
        <Link to="/">
          <img
            src={require("../../assets/logo.png")}
            className={s.logo}
            alt="loading"
          />
        </Link>
        <div className={s.main__content}>
          <Link className={s.header__item} to="/">
            ГОЛОВНА
          </Link>
          <Link className={s.header__item} to="/about">
            ПРО НАС
          </Link>
          <Link className={s.header__item} to="/tariffs">
            ТАРИФИ
          </Link>
          <Link className={s.header__item} to="/advantages">
            ПЕРЕВАГИ
          </Link>
          <Link className={s.header__item} to="/reviews">
            ВІДГУКИ
          </Link>
          <Link className={s.header__item} to="/ua/dashboard">
            ПАНЕЛЬ УПРАВЛІННЯ
          </Link>
        </div>
      </div>
      <div className={s.action__container}>
        {user.id ? (
          <Link to="/profile" className={s.header__item}>
            Профіль
          </Link>
        ) : (
          <Link to="/login" className={s.header__item}>
            Увійти
          </Link>
        )}
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
