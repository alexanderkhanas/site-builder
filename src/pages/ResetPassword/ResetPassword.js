import React, { useState } from "react";
import s from "./ResetPassword.module.css";
import { Formik, withFormik } from "formik";
import { connect } from "react-redux";
import AuthWrapper from "../../wrappers/AuthWrapper/AuthWrapper";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import { object, string } from "yup";
import { showModalAction } from "../../store/actions/assetsActions";
import { sendResetCode } from "../../store/api/api";

const ResetPassword = ({
  handleChange,
  handleSubmit,
  handleBlur,
  values,
  errors,
  touched,
}) => {
  return (
    <AuthWrapper title="Відновлення паролю">
      <div>
        <Input
          label="E-mail"
          name="email"
          value={values.email}
          isError={errors.email}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="johndoe@gmail.com"
          containerClass={s.input__container}
        />
        <div className={s.actions__container}>
          <Button
            title="Відновити пароль"
            onClick={handleSubmit}
            isDisabled={!touched.email || errors.email}
          />
        </div>
      </div>
    </AuthWrapper>
  );
};

const formikHOC = withFormik({
  mapPropsToValues: () => ({
    email: "",
  }),
  validationSchema: object().shape({
    email: string().email().required(),
  }),
  handleSubmit: (values, { props: { showModal }, resetForm }) => {
    sendResetCode(values.email)
      .then(() => {
        showModal(
          "Посилання надіслано на пошту",
          "Щоб змінити пароль перейдіть за посиланням, надісланим на вказану пошту"
        );
        resetForm({ email: "" });
      })
      .catch(() => {
        showModal(
          "Невірно введена пошта",
          "Користувача з вказаною поштою не знайдено"
        );
      });
  },
})(ResetPassword);

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  showModal: (title, desc) => dispatch(showModalAction(title, desc)),
});

export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
