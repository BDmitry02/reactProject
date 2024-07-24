import { Formik, Form } from "formik";
import CommonTextInput from "../CommonTextInput";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { LoginFormValidationSchema } from "../../../utils/validationSchemas/LoginFormValidationSchema";
import { logIn, setUserId } from "../../../store/slices/LoginSlice";
import useHttp from "../../../utils/useHttp/useHttp";
interface LoginFormProps {
  setFormType: (formType: string) => void;
}

type onSubmitProps = {
  email: string;
  password: string;
};

function LoginForm({ setFormType }: LoginFormProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const FormValidationSchema = LoginFormValidationSchema(t);
  const { request } = useHttp();

  const onSubmit = async (values: onSubmitProps) => {
    try {
      const res = await request({
        body: JSON.stringify(values),
        url: "http://localhost:3000/login",
        method: "POST",
      });

      dispatch(setUserId(res.userId));
      dispatch(logIn());
    } catch (error) {
      const typedError = error as { status?: number };
      if (typedError.status === 400) {
        enqueueSnackbar(t("loginFailed400"), { variant: "error" });
      } else {
        enqueueSnackbar(t("registrationFailed"), { variant: "error" });
      }
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={FormValidationSchema}
      onSubmit={onSubmit}
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
