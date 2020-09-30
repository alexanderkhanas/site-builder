import React, { useEffect } from "react";
import s from "./Login.module.css";
import { withFormik } from "formik";
import { connect } from "react-redux";
import Input from "../../misc/Input/Input";
import { FiKey, FiUser } from "react-icons/all";
import Button from "../../misc/Button/Button";
import { Link } from "react-router-dom";
import {
  facebookLoginAction,
  loginAction,
  registerAction,
} from "../../store/actions/userActions";
import { withRouter } from "react-router";
import AuthWrapper from "../../wrappers/AuthWrapper/AuthWrapper";
import { showModalAction } from "../../store/actions/assetsActions";

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

  return (
    <AuthWrapper title="Увійти">
      <div className={s.inputs__container}>
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
      </div>

      <Link to="/reset-password">Забули пароль?</Link>
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
    </AuthWrapper>
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
    { props: { login, history, register, showModal } }
  ) => {
    let isSuccess = false;
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
    } else {
      showModal(
        "Помилка авторизації",
        "При спробі входу сталась помилка, перевірте правильність введених даних"
      );
    }
  },
})(Login);

const routerHOC = withRouter(formikHOC);

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  login: (data, isRemember) => dispatch(loginAction(data, isRemember)),
  register: (data) => dispatch(registerAction(data)),
  facebookLogin: (data) => dispatch(facebookLoginAction(data)),
  showModal: (title, desc) => dispatch(showModalAction(title, desc)),
});

export default connect(mapStateToProps, mapDispatchToProps)(routerHOC);
