import React, { useEffect, useRef } from "react";
import s from "./Profile.module.css";
import { withFormik } from "formik";
import { connect } from "react-redux";
import Input from "../../misc/Input/Input";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import { BiExit, BiPencil, FiLogOut } from "react-icons/all";
import { editUserAction } from "../../store/actions/userActions";
import { object, string } from "yup";
import Button from "../../misc/Button/Button";

const Profile = ({
  user,
  values,
  setValues,
  errors,
  handleSubmit,
  handleChange,
}) => {
  const uploadInputRef = useRef();
  useEffect(() => {
    setValues({
      fName: user.first_name,
      lName: user.last_name,
      email: user.email,
    });
  }, [user]);

  console.log("errors ===", errors);

  return (
    <FixedWrapper>
      <div className={s.container}>
        <div className={s.inner}>
          <Button isRound className={s.logout__button}>
            <BiExit className={s.logout__button__icon} />
          </Button>
          <div className={s.avatar__container}>
            <img
              src={require("../../assets/avatar-placeholder.png")}
              className={s.avatar}
              alt="loading"
            />
            <input ref={uploadInputRef} className={s.hidden} />
          </div>
          <Input
            containerClass={s.input__container}
            label="Ім'я"
            placeholder="John"
            name="fName"
            onChange={handleChange}
            value={values.fName}
          />
          <Input
            containerClass={s.input__container}
            label="Прізвище"
            placeholder="Doe"
            name="lName"
            onChange={handleChange}
            value={values.lName}
          />
          <Input
            containerClass={s.input__container}
            label="E-mail"
            placeholder="johndoe@gmail.com"
            name="email"
            onChange={handleChange}
            value={values.email}
          />
          <button
            disabled={Object.keys(errors).length}
            className={s.save__profile__btn}
            onClick={handleSubmit}
          >
            Змінити
            <span className={s.profile__btn__overlay}>
              <BiPencil className={s.profile__btn__overlay__icon} />
            </span>
          </button>
        </div>
      </div>
    </FixedWrapper>
  );
};

const formikHOC = withFormik({
  mapPropsToValues: ({ user }) => ({
    fName: user.first_name,
    lName: user.last_name,
    email: user.email,
  }),
  validationSchema: object().shape({
    fName: string().required(),
    lName: string().required(),
    email: string().email().required(),
  }),
  handleSubmit: async (values, { props: { editUser } }) => {
    const isSuccess = await editUser({
      first_name: values.fName,
      last_name: values.lName,
      email: values.email,
    });
    console.log("is success ===", isSuccess);
  },
})(Profile);

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  editUser: (user) => dispatch(editUserAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
