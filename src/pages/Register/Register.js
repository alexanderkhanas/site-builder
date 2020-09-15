import React from "react";
import s from "./Register.module.css";
import { withFormik } from "formik";
import { connect } from "react-redux";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import Input from "../../misc/Input/Input";
import Button from "../../misc/Button/Button";
import { registerAction } from "../../store/actions/userActions";
import { withRouter } from "react-router";

const Register = ({ values, handleChange, handleSubmit }) => {
  return (
    <FixedWrapper className={s.container}>
      <div className={s.inner}>
        <Input
          name="email"
          value={values.email}
          onChange={handleChange}
          label="Пошта"
        />
        <Button
          className={s.button}
          onClick={handleSubmit}
          title="Зареєструватись"
        />
      </div>
    </FixedWrapper>
  );
};

const formikHOC = withFormik({
  mapPropsToValues: () => ({
    email: "",
  }),
  handleSubmit: async (values, { props: { register, history } }) => {
    const isSuccess = await register(values);
    if (isSuccess) {
      history.push("/profile");
    }
  },
})(Register);

const routerHOC = withRouter(formikHOC);

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  register: (data) => dispatch(registerAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(routerHOC);
