import * as Yup from "yup";
import { Formik } from "formik";
import MyTextInput from "../MyTextInput";
import { Button } from "@mui/material";

import { StyledForm, StyledH2, StyledSpan } from "../StyledFormComponents";

interface LoginFormProps {
  setFormType: (formType: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setFormType }) => {
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
          aria-describedby="outlined-required"
          name="email"
          type="email"
          autoComplete="email"
        />
        <MyTextInput
          label="Пароль"
          aria-describedby="outlined-password-input"
          name="password"
          type="password"
          autoComplete="current-password"
        />
        <StyledSpan onClick={() => setFormType("register")}>
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
