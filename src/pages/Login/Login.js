import React, { useRef } from "react";
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
import { loginAction } from "../../store/actions/userActions";
import { withRouter } from "react-router";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

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

  const onFacebookLoggedIn = (res) => {
    console.log("facebook ===", res);
  };

  const onGoogleLoggedIn = (res) => {
    console.log("google ===", res);
  };

  // accessToken: "EAADop4DaCMUBABs8ppWTE5zcWU92JxqfVllgCFZA4ZAawnePhexXxB5ZA820Uw1inhtcXXUvZCkET027prmYSPZC02ftNlxyucgqzG2rcIKTPUn5cKK7iy4E8lxMkHoLksrV3ZCp1HXCIV3yVA08I8EhHtQIwSvq9OEZB7naSGfrAkMdloiMtpe4ZBZAMBmjvf1ufhZBzFZBW329QZDZD"
  // data_access_expiration_time: 1609052275
  // email: "alexander.khanas03@gmail.com"
  // expiresIn: 3724
  // graphDomain: "facebook"
  // id: "174708917559456"
  // name: "Alexander Khanas"
  // picture:
  //     data:
  //         height: 50
  //          width: 50
  //          is_silhouette: true
  //          url: "https://scontent.fifo4-1.fna.fbcdn.net/v/t1.30497-1/cp0/c15.0.50.50a/p50x50/84628273_176159830277856_972693363922829312_n.jpg?_nc_cat=1&_nc_sid=12b3be&_nc_ohc=Ej-s2wsYTIgAX9oGSdS&_nc_ht=scontent.fifo4-1.fna&_nc_tp=27&oh=7ea1ec6a3abeb17c318bf1a77a9477d1&oe=5F98F338"
  //
  // __proto__: Object
  // __proto__: Object
  // signedRequest: "x3CKhsMU5VlFtkA7WBKNy8agXRyb1djs900vaJTcWoI.eyJ1c2VyX2lkIjoiMTc0NzA4OTE3NTU5NDU2IiwiY29kZSI6IkFRRDRnSnhSamRzbmRhVGJGcFpoMDNtWEJVSUhGU3VtalZsdjZmNlZ4THZTTlpVRWxtYmFvaDlHdE5NLVpxVi1RUjQxRVRHMk9vbXJFT0FnSEl1RVo1TWt5aktIaHZsNHZNaEJyOU1qamVnX3FzbEJzZHh6d1REZFdudDJoekFYUF9ZeFV3aXJxNWFmQm1JMXhKT0ZXUFppQ0RTcldjNUNvTS0tVVpwclhhQzQwN3JaRlNlbkhEOVdrbnpWdlFfcnk2eDRkeGpDZ19EVTJyeUhDSUUyOExfTzBMY09ReXZUWHFfZl81ZVpzWjJsbEhxRU0wSVIwdHNFckVJUHBfbjdBZU82QUZYdFZYN2NCZ1ZkWWpLVkg0c3g1OUhoenV6TUlPUXkwZHdUTWxnZVVVcFh0alFHd2pLV1FTanN6Y01YenozMHBrREdzdGZ6MXlPQ1FVYlNnc2lHIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE2MDEyNzYyNzZ9"
  // userID: "174708917559456"

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
