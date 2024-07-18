import { Formik, Form } from "formik";
import { Button } from "@mui/material";
import styled from "styled-components";
import { RegisterValidationSchema } from "../../../utils/validationSchemas/RegisterFormValidationSchema";
import CommonTextInput from "../CommonTextInput";

function RegisterForm() {
  return (
    <Formik
      initialValues={{
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={RegisterValidationSchema}
      onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}
    >
      <StyledForm className="form">
        <StyledFormHeader>Регистрация</StyledFormHeader>
        <CommonTextInput
          label="Имя"
          aria-describedby="outlined-required"
          name="name"
          type="text"
          autoComplete="given-name"
        />
        <CommonTextInput
          label="Фамилия"
          aria-describedby="outlined-required"
          name="surname"
          type="text"
          autoComplete="family-name"
        />
        <CommonTextInput
          label="Email"
          aria-describedby="outlined-required"
          name="email"
          type="email"
          autoComplete="email"
        />
        <CommonTextInput
          label="Пароль"
          aria-describedby="outlined-password-input"
          name="password"
          type="password"
          autoComplete="new-password"
        />
        <CommonTextInput
          label="Подтвердите пароль"
          aria-describedby="outlined-password-input"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
        />
        <Button variant="outlined" type="submit">
          Регистрация
        </Button>
      </StyledForm>
    </Formik>
  );
}

export default RegisterForm;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const StyledFormHeader = styled.h2`
  margin: 0;
`;

// const ThemedButton = styled(Button)`
//   border: 2px solid ${(props) => props.theme.submitFormButtonBorder};
//   color: ${(props) => props.theme.textColor};

//   &:hover {
//     color: ${(props) => props.theme.textColor};
//     border: 1px solid ${(props) => props.theme.submitFormButtonBorder};
//   }
// `;
