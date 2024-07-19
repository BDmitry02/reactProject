import { Formik, Form } from "formik";
import CommonTextInput from "../CommonTextInput";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { LoginFormValidationSchema } from "../../../utils/validationSchemas/LoginFormValidationSchema";
import { logIn } from "../../../store/slices/LoginSlice";
interface LoginFormProps {
  setFormType: (formType: string) => void;
}

function LoginForm({ setFormType }: LoginFormProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const FormValidationSchema = LoginFormValidationSchema(t);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={FormValidationSchema}
      onSubmit={(values) => {
        console.log(JSON.stringify(values, null, 2));
        dispatch(logIn());
      }}
    >
      <StyledForm>
        <StyledFormHeader>{t("loginFormHeader")}</StyledFormHeader>
        <CommonTextInput
          label="Email"
          aria-describedby="outlined-required"
          name="email"
          type="email"
          autoComplete="email"
        />
        <CommonTextInput
          label={t("passwordLabel")}
          aria-describedby="outlined-password-input"
          name="password"
          type="password"
          autoComplete="current-password"
        />
        <StyledRegisterButton onClick={() => setFormType("register")}>
          {t("createAccountButton")}
        </StyledRegisterButton>
        <SubmitButton color="info" type="submit">
          {t("loginFormHeader")}
        </SubmitButton>
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

const SubmitButton = styled.button`
  border: 2px solid ${(props) => props.theme.submitFormButtonBorder};
  color: ${(props) => props.theme.textColor};
  background-color: transparent;
  width: 9vw;
  height: 4vh;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    box-shadow: 2px 2px 2px 1px ${(props) => props.theme.submitFormButtonBorder};
  }
`;
