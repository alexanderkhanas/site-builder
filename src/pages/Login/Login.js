import React, { useEffect, useRef, useState } from "react";
import s from "./Login.module.css";
import { withFormik } from "formik";
import { connect } from "react-redux";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import Input from "../../misc/Input/Input";
import {
  AiFillFacebook,
  FiKey,
  FiUser,
  TiSocialFacebookCircular,
} from "react-icons/all";
import Button from "../../misc/Button/Button";
import Checkbox from "../../misc/Checkbox/Checkbox";
import { Link } from "react-router-dom";
import {
  facebookLoginAction,
  loginAction,
  registerAction,
} from "../../store/actions/userActions";
import { withRouter } from "react-router";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

const Login = ({
  values,
  setValues,
  handleChange,
  errors,
  setErrors,
  handleBlur,
  touched,
  handleSubmit,
  facebookLogin,
}) => {
  const { isLogin } = values;
  const toggleLogin = () => {
    setValues({ ...values, isLogin: !isLogin });
  };

  const onFacebookLoggedIn = (res) => {
    const {
      id,
      email,
      name,
      picture: {
        data: { url },
      },
    } = res;
    const [fName, lName] = name.split(" ");
    console.log("facebook login ===", {
      facebook_user_id: id,
      email,
      avatar: url,
      first_name: fName,
      last_name: lName,
    });
    facebookLogin({
      facebook_user_id: id,
      email,
      avatar: url,
      first_name: fName,
      last_name: lName,
    });
  };

  const onGoogleLoggedIn = (res) => {
    console.log("google ===", res);
  };

  useEffect(() => {
    if (!isLogin) {
      const tempErrors = { ...errors };
      delete tempErrors.password;
      setErrors(tempErrors);
    }
  }, [isLogin]);

  const isValidLogin =
    isLogin &&
    !errors.password &&
    !errors.email &&
    touched.email &&
    touched.password;
  const isValidRegister = !isLogin && !errors.email && touched.email;

  console.log("disabled ===", !isValidLogin && !isValidRegister);

  console.log("errors ===", errors);

  return (
    <FixedWrapper className={s.container}>
      <div className={s.inner}>
        <div className={s.logo__container}>
          <img
            src={require("../../assets/logo.png")}
            className={s.logo}
            alt="loading"
          />
        </div>
        <div className={s.form__container}>
          <h2 className={s.title}>Увійти</h2>
          <div className={s.actions__container}>
            <GoogleLogin
              clientId="827143410680-ad89eag6n70npuf5ge4oc9mgkums1me7.apps.googleusercontent.com"
              buttonText="Увійти за допомогою Google"
              onSuccess={onGoogleLoggedIn}
              onFailure={onGoogleLoggedIn}
              className={s.google__login}
            />
            <FacebookLogin
              appId="255806118955205"
              language="uk_UA"
              size="small"
              cssClass={s.facebook__login}
              fields="name,email,picture"
              callback={onFacebookLoggedIn}
              textButton="Увійти за допомогою Facebook"
              icon={<AiFillFacebook className={s.social__icon} />}
            />
          </div>
          <Input
            containerClass={s.input__container}
            placeholder="john-doe@gmail.com"
            label="E-mail"
            name="email"
            Icon={FiUser}
            isError={errors.email && touched.email}
            onBlur={handleBlur}
            value={values.email}
            onChange={handleChange}
          />
          {isLogin && (
            <Input
              containerClass={s.input__container}
              placeholder="********"
              type="password"
              name="password"
              label="Пароль"
              Icon={FiKey}
              iconClass={s.icon}
              isError={errors.password && touched.password}
              onBlur={handleBlur}
              value={values.password}
              onChange={handleChange}
            />
          )}
          <div className={s.submit__container}>
            <Button
              type="submit"
              onClick={handleSubmit}
              // onClick={() => console.log("here")}
              isDisabled={!isValidLogin && !isValidRegister}
              title={!isLogin ? "Зареєструватись" : "Увійти"}
              className={s.submit__button}
            />
            <span onClick={toggleLogin} className={s.link}>
              {isLogin ? "Зареєструватись" : "Увійти"}
            </span>
          </div>
        </div>
      </div>
    </FixedWrapper>
  );
};

const formikHOC = withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: "",
    isLogin: true,
  }),
  validate: ({ email, password, isLogin }) => {
    const errors = {};
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      errors.email = "invalid";
    }
    if (password.length < 6 && isLogin) {
      errors.password = "too short";
    }
    return errors;
  },
  handleSubmit: async (
    { email, password, isLogin },
    { props: { login, history, register } }
  ) => {
    console.log("is login ===", isLogin);
    let isSuccess = false;
    console.log("is success ===", isSuccess);
    if (isLogin) {
      isSuccess = await login({
        email,
        password,
      });
    } else {
      isSuccess = await register({ email });
    }
    console.log("is success ===", isSuccess);
    if (isSuccess) {
      history.push("/profile");
    }
  },
})(Login);

const routerHOC = withRouter(formikHOC);

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  login: (data, isRemember) => dispatch(loginAction(data, isRemember)),
  register: (data) => dispatch(registerAction(data)),
  facebookLogin: (data) => dispatch(facebookLoginAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(routerHOC);
