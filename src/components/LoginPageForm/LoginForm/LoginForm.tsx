import { Formik, Form } from "formik";
import CommonTextInput from "../CommonTextInput";
import { Button } from "@mui/material";
import styled from "styled-components";
import { LoginFormValidationSchema } from "../../../utils/validationSchemas/LoginFormValidationSchema";

interface LoginFormProps {
  setFormType: (formType: string) => void;
}

function LoginForm({ setFormType }: LoginFormProps) {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginFormValidationSchema}
      onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}
    >
      <StyledForm>
        <StyledFormHeader>Войти</StyledFormHeader>
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
          autoComplete="current-password"
        />
        <StyledRegisterButton onClick={() => setFormType("register")}>
          Создать аккаунт
        </StyledRegisterButton>
        <Button variant="outlined" color="info" type="submit">
          Войти
        </Button>
      </StyledForm>
    </Formik>
  );
}

export default LoginForm;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const StyledRegisterButton = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7vw;
  height: 3.5vh;
  border-radius: 25px;
  cursor: pointer;
  color: ${(props) => props.theme.createAccountText};

  &:hover {
    background-color: ${(props) => props.theme.createAccountHoverColor};
  }
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
