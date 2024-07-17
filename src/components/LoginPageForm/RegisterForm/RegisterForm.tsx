import * as Yup from "yup";
import { Formik } from "formik";
import MyTextInput from "../MyTextInput";
import { StyledForm, StyledH2 } from "../StyledFormComponents";
import { Button } from "@mui/material";

const RegisterForm = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .matches(/^[A-Za-zА-Яа-я]+$/, "В имени не должно быть цифр")
          .required("Введите ваше имя"),
        surname: Yup.string()
          .matches(/^[A-Za-zА-Яа-я]+$/, "В фамилии не должно быть цифр")
          .required("Введите вашу фамилию"),
        email: Yup.string()
          .email("Неверный email адрес")
          .required("Введите email адрес"),
        password: Yup.string()
          .min(6, "Пароль должен состоять минимум из 6 символов")
          .required("Введите пароль"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Пароли не совпадают")
          .required("Required"),
      })}
      onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}
    >
      <StyledForm className="form">
        <StyledH2>Регистрация</StyledH2>
        <MyTextInput
          label="Имя"
          aria-describedby="outlined-required"
          name="name"
          type="text"
        />
        <MyTextInput
          label="Фамилия"
          aria-describedby="outlined-required"
          name="surname"
          type="text"
        />
        <MyTextInput
          label="Email"
          aria-describedby="outlined-required"
          name="email"
          type="email"
        />
        <MyTextInput
          label="Пароль"
          aria-describedby="outlined-password-input"
          name="password"
          type="password"
        />
        <MyTextInput
          label="Подтвердите пароль"
          aria-describedby="outlined-password-input"
          name="confirmPassword"
          type="password"
        />
        <Button variant="outlined" color="info" type="submit">
          Регистрация
        </Button>
      </StyledForm>
    </Formik>
  );
};

export default RegisterForm;
