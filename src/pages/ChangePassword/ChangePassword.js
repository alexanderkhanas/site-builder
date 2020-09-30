import React from "react";
import s from "./ChangePassword.module.css";
import { withFormik } from "formik";
import { connect } from "react-redux";
import AuthWrapper from "../../wrappers/AuthWrapper/AuthWrapper";
import Input from "../../misc/Input/Input";
import { object, ref, string } from "yup";
import { withRouter } from "react-router";
import Button from "../../misc/Button/Button";
import { changePasswordAction } from "../../store/actions/userActions";

const ChangePassword = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
}) => {
  return (
    <AuthWrapper title="Зміна паролю">
      <Input
        containerClass={s.input__container}
        label="Пароль"
        type="password"
        name="password"
        value={values.password}
        isError={errors.password}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="*******"
      />
      <Input
        containerClass={s.input__container}
        label="Підвердження паролю"
        type="password"
        name="passwordConfirm"
        value={values.passwordConfirm}
        onBlur={handleBlur}
        isError={errors.passwordConfirm}
        onChange={handleChange}
        placeholder="*******"
      />
      <Button
        title="Змінити пароль"
        onClick={handleSubmit}
        isDisabled={
          errors.password || errors.passwordConfirm || !touched.password
        }
      />
    </AuthWrapper>
  );
};

const formikHOC = withFormik({
  mapPropsToValues: () => ({
    password: "",
    passwordConfirm: "",
  }),
  validationSchema: object().shape({
    password: string().min(6).required("Password is required"),
    passwordConfirm: string()
      .oneOf([ref("password"), null], "Passwords must match")
      .required(),
  }),
  handleSubmit: async (
    { password },
    { props: { match, history, changePassword } }
  ) => {
    const { code } = match.params;
    const isSuccess = await changePassword(password, code);
    if (isSuccess) {
      history.push("/profile");
    }
  },
})(ChangePassword);

const routerHOC = withRouter(formikHOC);

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  changePassword: (password, code) =>
    dispatch(changePasswordAction(password, code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(routerHOC);
