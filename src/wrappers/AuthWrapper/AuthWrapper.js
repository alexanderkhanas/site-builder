import React from "react";
import s from "./AuthWrapper.module.css";
import FixedWrapper from "../FixedWrapper/FixedWrapper";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { AiFillFacebook } from "react-icons/all";
import {
  facebookLoginAction,
  googleLoginAction,
  loginAction,
  registerAction,
} from "../../store/actions/userActions";
import { connect } from "react-redux";

const AuthWrapper = ({
  children,
  title,
  withSocialMedia = true,
  facebookLogin,
  googleLogin,
}) => {
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
    facebookLogin({
      facebook_user_id: id,
      email,
      avatar: url,
      first_name: fName,
      last_name: lName,
    });
  };

  const onGoogleLoggedIn = (res) => {
    const { profileObj } = res;
    googleLogin({
      email: profileObj.email,
      avatar: profileObj.imageUrl,
      first_name: profileObj.givenName,
      last_name: profileObj.familyName,
      google_id: profileObj.googleId,
    });
  };
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
          {!!title && <h2 className={s.title}>{title}</h2>}
          {withSocialMedia && (
            <>
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
              <div className={s.mobile__actions__container}>
                <GoogleLogin
                  clientId="827143410680-ad89eag6n70npuf5ge4oc9mgkums1me7.apps.googleusercontent.com"
                  buttonText="Google"
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
                  textButton="Facebook"
                  icon={<AiFillFacebook className={s.social__icon} />}
                />
              </div>
            </>
          )}
          {children}
        </div>
      </div>
    </FixedWrapper>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  facebookLogin: (data) => dispatch(facebookLoginAction(data)),
  googleLogin: (data) => dispatch(googleLoginAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthWrapper);
