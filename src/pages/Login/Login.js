import React from "react";
import s from "./Login.module.css";
import { withFormik } from "formik";
import { connect } from "react-redux";
import FixedWrapper from "../../wrappers/FixedWrapper";
import Input from "../../misc/Input/Input";
import { FiKey, FiUser } from "react-icons/all";
import Button from "../../misc/Button/Button";
import Checkbox from "../../misc/Checkbox/Checkbox";
import { Link } from "react-router-dom";
import { loginAction } from "../../store/actions/userActions";
import { compose } from "recompose";
import { withRouter } from "react-router";

const Login = ({
  values,
  setValues,
  handleChange,
  errors,
  handleBlur,
  touched,
  handleSubmit,
}) => {
  const toggleRemember = () => {
    setValues({ ...values, isRemember: !values.isRemember });
  };

  return (
    <FixedWrapper className={s.container}>
      <div className={s.inner}>
        <div className={s.logo__container}>
          <img src={require("../../assets/logo.png")} className={s.logo} />
        </div>
        <div className={s.form__container}>
          <h2 className={s.title}>Увійти</h2>
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
          <Checkbox
            containerStyle={s.input__container}
            title="Запам'ятати мене"
            name="isRemember"
            onChange={handleChange}
            checked={values.isRemember}
            onTitleClick={toggleRemember}
          />
          <div className={s.submit__container}>
            <Button
              isDisabled={
                errors.email ||
                errors.password ||
                !touched.email ||
                !touched.password
              }
              onClick={handleSubmit}
              title="Увійти"
              className={s.submit__button}
            />
            <Link to="/register" className={s.register__link}>
              Зареєструватись
            </Link>
          </div>
          <div className={s.actions__container}>
            <span className={s.action__title}>Або увійти за допомогою</span>
            <a href="https://dent.eco/ua/auth/google">
              <img
                src={require("../../assets/google.png")}
                className={s.social__icon}
              />
            </a>
            <a href="https://dent.eco/ua/redirect">
              <img
                src={require("../../assets/facebook.png")}
                className={s.social__icon}
              />
            </a>
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
    isRemember: true,
  }),
  validate: ({ email, password }) => {
    const errors = {};
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      errors.email = "invalid";
    }
    if (password.length < 6) {
      errors.password = "too short";
    }
    return errors;
  },
  handleSubmit: async (
    { email, password, isRemember },
    { props: { login, history } }
  ) => {
    const isSuccess = await login(
      {
        email,
        password,
      },
      isRemember
    );
    if (isSuccess) {
      history.push("/profile");
    }
    console.log("isSuccess ===", isSuccess);
  },
})(Login);

const routerHOC = withRouter(formikHOC);

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  login: (data, isRemember) => dispatch(loginAction(data, isRemember)),
});

export default connect(mapStateToProps, mapDispatchToProps)(routerHOC);
