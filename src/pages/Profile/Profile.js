import React from "react";
import s from "./Profile.module.css";
import { withFormik } from "formik";
import { connect } from "react-redux";
import Input from "../../misc/Input/Input";

const Profile = ({ user }) => {
  console.log("user ===", user);
  return (
    <div className={s.container}>
      <div className={s.inner}>
        <Input containerClass={s.input__container} label="Ім'я" />
      </div>
    </div>
  );
};

const formikHOC = withFormik({
  mapPropsToValues: () => ({}),
})(Profile);

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
