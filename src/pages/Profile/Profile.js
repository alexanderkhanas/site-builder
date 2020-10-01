import React, { useEffect, useRef } from "react";
import s from "./Profile.module.css";
import { withFormik } from "formik";
import { connect } from "react-redux";
import Input from "../../misc/Input/Input";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import { ReactComponent as BiExit } from "../../assets/exit.svg";
import { ReactComponent as BiPencil } from "../../assets/pencil.svg";
import {
  editUserAction,
  logoutUserAction,
  uploadAvatarAction,
} from "../../store/actions/userActions";
import { object, string } from "yup";
import Button from "../../misc/Button/Button";
import {
  hideModalAction,
  showModalAction,
} from "../../store/actions/assetsActions";

const Profile = ({
  user,
  values,
  setValues,
  errors,
  handleSubmit,
  handleChange,
  showModal,
  hideModal,
  logout,
  uploadAvatar,
}) => {
  const uploadInputRef = useRef();

  const { avatar } = user;

  const showPickImageModal = () => {
    uploadInputRef.current.click();
  };

  const onImageUpload = ({ target: { files } }) => {
    const [file] = files;
    const reader = new FileReader();
    reader.onload = async ({ target: { result } }) => {
      const formData = new FormData();
      formData.append("imageFile", [result]);
      uploadAvatar(formData);
    };
    reader.readAsDataURL(file);
  };

  const logoutHandler = () => {
    showModal(
      "Вийти з профілю?",
      "Щоб увійти наступного разу вам потрібно ввести логін і пароль.",
      logout
    );
  };

  useEffect(() => {
    setValues({
      fName: user.first_name,
      lName: user.last_name,
      email: user.email,
    });
  }, [user]);

  return (
    <FixedWrapper>
      <div className={s.container}>
        <div className={s.inner}>
          <Button isRound className={s.logout__button} onClick={logoutHandler}>
            <BiExit className={s.logout__button__icon} />
          </Button>
          <div className={s.avatar__container}>
            <img
              onClick={showPickImageModal}
              src={avatar || require("../../assets/avatar-placeholder.png")}
              className={s.avatar}
              alt="loading"
            />
            <input
              onChange={onImageUpload}
              type="file"
              accept="image/*"
              ref={uploadInputRef}
              className={s.hidden}
            />
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
  },
})(Profile);

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  editUser: (user) => dispatch(editUserAction(user)),
  showModal: (title, desc, onResolve, onReject) =>
    dispatch(showModalAction(title, desc, onResolve, onReject)),
  logout: () => dispatch(logoutUserAction()),
  uploadAvatar: (imageFormData) => dispatch(uploadAvatarAction(imageFormData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(formikHOC);
