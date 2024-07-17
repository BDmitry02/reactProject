import MyForm from "../../components/LoginPageForm/LoginPageForm";
import {
  StyledWrapper,
  FormBackgroundLayer,
} from "../../components/LoginPageForm/StyledFormComponents";

const LoginPage = () => {
  return (
    <StyledWrapper className="wrapper">
      <FormBackgroundLayer className="form-background-layer">
        <MyForm />
      </FormBackgroundLayer>
    </StyledWrapper>
  );
};

export default LoginPage;
