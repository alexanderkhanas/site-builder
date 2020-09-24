import React from "react";
import s from "./About.module.css";
import { withFormik } from "formik";
import { connect } from "react-redux";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import Input from "../../misc/Input/Input";
import { object, string } from "yup";
import Button from "../../misc/Button/Button";

const About = ({
  handleChange,
  handleBlur,
  handleSubmit,
  errors,
  touched,
  values,
}) => {
  return (
    <FixedWrapper className={s.container}>
      <div className={s.about__container}>
        <h1 className={s.about__title}>Про нас</h1>
        <div className={s.about__content}>
          <p>
            <strong>Denteco</strong> – це компанія, що займається{" "}
            <strong>
              розробкою сайтів та рекламних стратегій для лікарів-стоматологів
              та медиків.
            </strong>
          </p>
          <p>
            Ми розуміємо, що <strong> веб-сайт </strong> - це не просто набір
            сторінок, а <strong> комплексний маркетинговий інструмент, </strong>{" "}
            створений <strong> для розвитку Вашого бізнесу. </strong>
          </p>
          <p>
            Завдяки нашому сервісу Вам непотрібно продумувати структуру сайту,
            шукати програмістів, дизайнерів, копірайтерів й інших людей дотичних
            до даного процесу, усе що вам потрібно уже готове.
          </p>
          <p>
            {" "}
            За допомогою нашого сервісу ви зможете залучити ще більше
            зацікавлених відвідувачів з пошукових систем,{" "}
            <strong>
              отримати нових клієнтів, збільшити продажі і вивести бізнес на
              якісно новий рівень.{" "}
            </strong>
          </p>
          <p>
            Хочете щоб сайт Вашої стоматології справляв на клієнтів належне
            враження? Саме зараз Ви можете вибрати один із доступних
            дизайнерських макетів для Вашого корпоративного сайту, вибрати
            кольорову гаму, секції, які б ви хотіли бачити, все інше ми беремо
            на себе.
          </p>
          <p>
            {" "}
            Ознайомитись із функціоналом та дизайнерськими рішеннями можна{" "}
            <strong>тут.</strong>
          </p>
          <p>
            {" "}
            Не хвилюйтесь, якщо у Вас досі немає логотипу чи назви, це ми також
            продумали, платформа дає змогу підібрати назву чи логотип
            стоматології за лічені хвилини.
          </p>
          <p>
            {" "}
            Крім того, ми допоможемо Вам із{" "}
            <strong>
              {" "}
              стратегіями цифрового маркетингу та успіху в Інтернеті, налаштуємо
              рекламу Googlе, Facebook чи Instagram.
            </strong>
          </p>
          <h4>ВИБИРАЮЧИ НАС ВИ:</h4>
          <h5>Покращите імідж стоматології</h5>
          <p>
            Ми живемо в час стрімкого розвитку Інтернет технологій і більшість
            аудиторії переглядає інформацію про певний заклад саме тут. Власний
            веб-сайт стоматології є обов’язковою умовою отримання позитивного
            іміджу, залучення нової аудиторії і утримування старих клієнтів.
          </p>
          <h5>Збільшите профіт</h5>
          <p>
            Власний інтернет-сайт є потужною рекламною площадкою для просування
            послуг компанії на ринку що сприяє збільшенню продажів послуг вашої
            стоматології і прибутку компанії
          </p>
        </div>
      </div>
      <div className={s.form}>
        <div className={s.form__inner}>
          <h2 className={s.form__title}>Контактна форма</h2>
          <Input
            value={values.email}
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            label="E-mail"
            placeholder="johndoe@gmail.com"
            isError={touched.email && errors.email}
            containerClass={s.input__container}
          />
          <Input
            isTextarea
            value={values.message}
            label="Повідомлення"
            placeholder="Чудово, все сподобалось"
            onChange={handleChange}
            onBlur={handleBlur}
            name="message"
            isError={touched.message && errors.message}
            containerClass={s.input__container}
          />
          <Button
            isDisabled={
              Object.keys(errors).length || Object.keys(touched).length < 2
            }
            onClick={handleSubmit}
            title="Надіслати"
          />
        </div>
      </div>
    </FixedWrapper>
  );
};

const formikHOC = withFormik({
  mapPropsToValues: ({ user }) => ({
    email: user.email,
    message: "",
  }),
  validationSchema: object().shape({
    message: string().required(),
    email: string().email().required(),
  }),
  handleSubmit: (values) => {},
})(About);

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(formikHOC);
