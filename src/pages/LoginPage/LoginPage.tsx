import MyForm from "../../components/LoginPageForm/LoginPageForm";
import {
  StyledWrapper,
  FormBackgroundLayer,
} from "../../components/LoginPageForm/StyledFormComponents";

const LoginPage = () => {
  return (
    <StyledWrapper>
      <FormBackgroundLayer>
        <MyForm />
      </FormBackgroundLayer>
    </StyledWrapper>
  );
};

export default LoginPage;
