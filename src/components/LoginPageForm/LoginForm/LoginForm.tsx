import * as Yup from "yup";
import { Formik } from "formik";
import MyTextInput from "../MyTextInput";
import { Button } from "@mui/material";

import { StyledForm, StyledH2, StyledSpan } from "../StyledFormComponents";

const LoginForm = ({ setFormType }) => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Неверный email адрес")
          .required("Введите email адрес"),
        password: Yup.string()
          .min(6, "Пароль должен состоять минимум из 6 символов")
          .required("Введите пароль"),
      })}
      onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}
    >
      <StyledForm>
        <StyledH2>Войти</StyledH2>
        <MyTextInput
          label="Email"
          id="outlined-required"
          name="email"
          type="email"
        />
        <MyTextInput
          label="Пароль"
          id="outlined-password-input"
          name="password"
          type="password"
        />
        <StyledSpan tabIndex="0" onClick={() => setFormType("register")}>
          Создать аккаунт
        </StyledSpan>
        <Button variant="outlined" color="info" type="submit">
          Войти
        </Button>
      </StyledForm>
    </Formik>
  );
};

export default LoginForm;
