import { useState } from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import { SnackbarProvider } from "notistack";

function LoginPageForm() {
  const [formType, setFormType] = useState("login");

  const getForm = () => {
    if (formType === "login") {
      return <LoginForm setFormType={setFormType} />;
    } else {
      return <RegisterForm setFormType={setFormType} />;
    }
  };

  return (
    <StyledFormContainer>
      <SnackbarProvider maxSnack={3}>{getForm()}</SnackbarProvider>
    </StyledFormContainer>
  );
}

export default LoginPageForm;

const StyledFormContainer = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  flex-direction: column;
  height: calc(100vh - 90px - 70px);
  width: 100vw;
`;
