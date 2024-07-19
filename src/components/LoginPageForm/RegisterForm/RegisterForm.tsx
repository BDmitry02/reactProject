import { Formik, Form } from "formik";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { RegisterValidationSchema } from "../../../utils/validationSchemas/RegisterFormValidationSchema";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CommonTextInput from "../CommonTextInput";
import { useDispatch } from "react-redux";
import { logIn } from "../../../store/slices/LoginSlice";
interface LoginFormProps {
  setFormType: (formType: string) => void;
}

function RegisterForm({ setFormType }: LoginFormProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const FormValidationSchema = RegisterValidationSchema(t);

  return (
    <>
      <StyledArrowContainer>
        <ArrowBackIcon fontSize="large" onClick={() => setFormType("login")} />
      </StyledArrowContainer>
      <StyledRegisterFormContainer>
        <Formik
          initialValues={{
            name: "",
            surname: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={FormValidationSchema}
          onSubmit={(values) => {
            console.log(JSON.stringify(values, null, 2));
            dispatch(logIn());
          }}
        >
          <StyledForm className="form">
            <StyledFormHeader>{t("registerFormHeader")}</StyledFormHeader>
            <CommonTextInput
              label={t("nameLabel")}
              aria-describedby="outlined-required"
              name="name"
              type="text"
              autoComplete="given-name"
            />
            <CommonTextInput
              label={t("surnameLabel")}
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
              label={t("passwordLabel")}
              aria-describedby="outlined-password-input"
              name="password"
              type="password"
              autoComplete="new-password"
            />
            <CommonTextInput
              label={t("passwordConfirmationLabel")}
              aria-describedby="outlined-password-input"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
            />
            <SubmitButton type="submit">{t("registerFormHeader")}</SubmitButton>
          </StyledForm>
        </Formik>
      </StyledRegisterFormContainer>
    </>
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

const StyledRegisterFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledArrowContainer = styled.div`
  justify-self: flex-start;
  margin-left: 50px;
  margin-top: 10px;
  cursor: pointer;
`;
