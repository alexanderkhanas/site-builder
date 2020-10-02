import React, { useEffect, useMemo, useState } from "react";
import s from "./Header.module.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as FaTimes } from "../../assets/times.svg";
import { ReactComponent as FaBars } from "../../assets/bars.svg";
import { stack as Menu } from "react-burger-menu";
import { withRouter } from "react-router";
import { changeLanguageAction } from "../../store/actions/contentActions";
import classnames from "classnames";

const Header = ({ user, history, content, changeLanguage }) => {
  const [isBarOpen, setBarOpen] = useState(null);
  const [isAnimation, setAnimation] = useState(false);
  const [sidebarIcon, setSidebarIcon] = useState(false);
  const [isFirstLoad, setFirstLoad] = useState(false);
  const [isHomeScreen, setHomeScreen] = useState(true);

  const { lang, allLanguages } = content;

  const languageOptions = useMemo(() => {
    return allLanguages.map((lang) => ({ label: lang, value: lang }));
  }, [allLanguages]);

  const openSidebar = () => setBarOpen(true);
  const closeSidebar = () => setBarOpen(false);
  const onStateMenuChange = (state) => setBarOpen(state.isOpen);

  const onLanguageSelect = ({ value }) => {
    changeLanguage(value);
  };

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
    if (pathname === "/") {
      setHomeScreen(true);
    } else if (pathname !== "/" && isHomeScreen) {
      setHomeScreen(false);
    }
    if (!isFirstLoad) {
      setFirstLoad(true);
      return;
    }
    if (isBarOpen) {
      setBarOpen(false);
    }
  }, [pathname]);

  const [isCreateButtonVisible] = useMemo(() => {
    return [
      !pathname?.includes("/create-site") &&
        !pathname?.includes("/edit-site") &&
        pathname !== "/sites",
      pathname === "/",
      pathname === "/",
    ];
  }, [pathname]);

  return (
    <>
      <div>
        <div
          className={classnames(s.header__container, s.desktop__header, {
            [s.header__small]: !isHomeScreen,
          })}
        >
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
                {!pathname.includes("/site/") && (
                  <Link className={s.header__item} to="/">
                    Головна
                  </Link>
                )}
                {!pathname.includes("/site/") && (
                  <Link className={s.header__item} to="/about-us">
                    Про нас
                  </Link>
                )}
                {!pathname.includes("/site/") && (
                  <Link className={s.header__item} to="/tariffs">
                    Тарифи
                  </Link>
                )}
                {!pathname.includes("/site/") && (
                  <Link className={s.header__item} to="/advantages">
                    Переваги
                  </Link>
                )}
                {!pathname.includes("/site/") && (
                  <Link className={s.header__item} to="/reviews">
                    Відгуки
                  </Link>
                )}

                {!!user.id && (
                  <Link to="/gallery" className={s.header__item}>
                    Галерея
                  </Link>
                )}
                {!!user.id && (
                  <Link to="/sites" className={s.header__item}>
                    Мої сайти
                  </Link>
                )}
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
              {isCreateButtonVisible && (
                <Link to="/select-template">
                  <Button
                    size="lg"
                    title="Створити"
                    className={s.create__btn}
                  />
                </Link>
              )}
            </div>
          </div>
          {isHomeScreen && (
            <div className={s.home__header__inner}>
              <img
                src={require("../../assets/home-header.png")}
                alt="loading"
                className={s.home__header__image}
              />
              <div className={s.home__header__main__content}>
                <h1 className={s.home__header__title}>
                  Streamline Your Social Media And Content Marketing
                </h1>
                <p className={s.home__header__desc}>
                  Powerful content marketing and social media management
                  platform for publishers, brands, agencies and, startups who
                  want to share the best content consistently and increase their
                  reach.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={`${s.header__container} ${s.mobile__header__container}`}>
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
        {isHomeScreen && (
          <div className={s.home__header__inner}>
            {/*<Link to="/select-template">*/}
            <Button size="lg" title="Створити" className={s.create__btn} />
            {/*</Link>*/}
            <img
              src={require("../../assets/home-header.png")}
              alt="loading"
              className={s.home__header__image}
            />
            <div className={s.home__header__main__content}>
              <h1 className={s.home__header__title}>
                Streamline Your Social Media And Content Marketing
              </h1>
              <p className={s.home__header__desc}>
                Powerful content marketing and social media management platform
                for publishers, brands, agencies and, startups who want to share
                the best content consistently and increase their reach.
              </p>
            </div>
          </div>
        )}
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
        {/*<Link to="/" className={s.mobile__logo__container}>*/}
        {/*    <img*/}
        {/*        src={require("../../assets/logo.png")}*/}
        {/*        className={s.mobile__logo}*/}
        {/*        alt="logo"*/}
        {/*    />*/}
        {/*</Link>*/}
        <FaTimes className={s.close__icon__mobile} onClick={closeSidebar} />
        <Link to="/">ГОЛОВНА</Link>
        <Link to="/about-us">ПРО НАС</Link>
        <Link to="/tariffs">ТАРИФИ</Link>
        <Link to="/advantages">ПЕРЕВАГИ</Link>
        <Link to="/reviews">ВІДГУКИ</Link>
        {!!user.id && <Link to="/sites">МОЇ САЙТИ</Link>}
        {!!user.id && <Link to="/gallery">ГАЛЕРЕЯ</Link>}
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
  content: state.content,
});

const mapDispatchToProps = (dispatch) => ({
  changeLanguage: (lang) => dispatch(changeLanguageAction(lang)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
