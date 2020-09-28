import React, { useEffect, useState } from "react";
import s from "./Header.module.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { FaBars, FaTimes } from "react-icons/all";
import { stack as Menu } from "react-burger-menu";
import { withRouter } from "react-router";

const Header = ({ user, history }) => {
  const [isBarOpen, setBarOpen] = useState(null);
  const [isAnimation, setAnimation] = useState(false);
  const [sidebarIcon, setSidebarIcon] = useState(false);
  const [isFirstLoad, setFirstLoad] = useState(false);

  const openSidebar = () => setBarOpen(true);
  const closeSidebar = () => setBarOpen(false);
  const onStateMenuChange = (state) => setBarOpen(state.isOpen);

  const { pathname } = history.location;

  useEffect(() => {
    if (typeof isBarOpen !== "boolean") return;
    setAnimation((prev) => !prev);
    setTimeout(() => {
      setSidebarIcon((prev) => !prev);
    }, 250);
  }, [isBarOpen]);

  useEffect(() => {
    window.scroll({ left: 0, top: 0 });
    if (!isFirstLoad) {
      setFirstLoad(true);
      return;
    }
    if (isBarOpen) {
      setBarOpen(false);
    }
  }, [pathname]);

  return (
    <>
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
            <Link className={s.header__item} to="/about-us">
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
            {!!user.id && (
              <Link to="/sites" className={s.header__item}>
                МОЇ САЙТИ
              </Link>
            )}
            {!!user.id && (
              <Link to="/gallery" className={s.header__item}>
                ГАЛЕРЕЯ
              </Link>
            )}
            {/*<a className={s.header__item} href="http://panel.topfractal.com/">*/}
            {/*  ПАНЕЛЬ УПРАВЛІННЯ*/}
            {/*</a>*/}
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
      <div className={s.mobile__header}>
        <CSSTransition
          in={isAnimation}
          timeout={500}
          classNames={{
            enterActive: s.burger__icon__entering,
            enterDone: s.burger__icon__entered,
            exitActive: s.burger__icon__exiting,
            exitDone: s.burger__icon__exited,
          }}
        >
          {sidebarIcon ? (
            <FaTimes
              onClick={isBarOpen ? closeSidebar : openSidebar}
              className={s.burger__icon}
            />
          ) : (
            <FaBars
              className={s.burger__icon}
              onClick={isBarOpen ? closeSidebar : openSidebar}
            />
          )}
        </CSSTransition>
        <Link to="/select-template">
          <Button title="Створити" className={s.create__btn} />
        </Link>
      </div>

      <Menu
        width="300px"
        isOpen={isBarOpen}
        burgerButtonClassName={s.menu_hidden}
        menuClassName={s.menu_color}
        crossButtonClassName={s.exit_hidden}
        bmMenuWrap={s.menu_width}
        className={isBarOpen === null ? s.display_none : ""}
        disableAutoFocus
        itemListClassName={s.mobile__nav}
        itemClassName={s.mobile__nav__item}
        onStateChange={onStateMenuChange}
      >
        <Link to="/" className={s.mobile__logo__container}>
          <img
            src={require("../../assets/logo.png")}
            className={s.mobile__logo}
            alt="logo"
          />
        </Link>
        <Link to="/">ГОЛОВНА</Link>
        <Link to="/about-us">ПРО НАС</Link>
        <Link to="/tariffs">ТАРИФИ</Link>
        <Link to="/advantages">ПЕРЕВАГИ</Link>
        <Link to="/reviews">ВІДГУКИ</Link>
        {!!user.id && <Link to="/sites">МОЇ САЙТИ</Link>}
        <Link to="/gallery">ГАЛЕРЕЯ</Link>
        {user.id ? (
          <Link to="/profile">Профіль</Link>
        ) : (
          <Link to="/login">Увійти</Link>
        )}
      </Menu>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps, null)(Header));
