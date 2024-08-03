import { useState } from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';

function LoginPageForm() {
  const [formType, setFormType] = useState('login');

  return (
    <StyledFormContainer>
      {formType === 'login' ? (
        <LoginForm setFormType={setFormType} />
      ) : (
        <RegisterForm setFormType={setFormType} />
      )}
    </StyledFormContainer>
  );
}

export default LoginPageForm;

const StyledFormContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: calc(100vh - 90px - 70px);
  margin: 20px 0px;
  width: 100vw;
`;
