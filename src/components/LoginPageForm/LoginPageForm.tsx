import { useState } from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";

function LoginPageForm() {
  const [formType, setFormType] = useState("login");

  const getForm = () => {
    if (formType === "login") {
      return <LoginForm setFormType={setFormType} />;
    } else {
      return <RegisterForm />;
    }
  };

  return <StyledFormContainer>{getForm()}</StyledFormContainer>;
}

export default LoginPageForm;

const StyledFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 90px - 70px);
  width: 100vw;
`;
