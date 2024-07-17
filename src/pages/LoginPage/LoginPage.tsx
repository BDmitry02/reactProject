import LoginPageForm from "../../components/LoginPageForm/LoginPageForm";
import {
  StyledWrapper,
  FormBackgroundLayer,
} from "../../components/LoginPageForm/StyledFormComponents";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const LoginPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta name="login" content="Login or register page" />
        <title>Login Page</title>
      </Helmet>
      <StyledWrapper>
        <FormBackgroundLayer>
          <LoginPageForm />
        </FormBackgroundLayer>
      </StyledWrapper>
    </HelmetProvider>
  );
};

export default LoginPage;
