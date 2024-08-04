import { Formik, Form } from 'formik';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { RegisterValidationSchema } from '../../../utils/validationSchemas/RegisterFormValidationSchema';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CommonTextInput from '../CommonTextInput';
import { useAppDispatch } from '../../../utils/store/hook';
import { logIn, setUserId } from '../../../utils/store/slices/LoginSlice';
import useHttp from '../../../utils/useHttp/useHttp';

interface LoginFormProps {
  setFormType: (formType: string) => void;
}

type onSubmitProps = {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function RegisterForm({ setFormType }: LoginFormProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { request } = useHttp();
  const FormValidationSchema = RegisterValidationSchema(t);

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (values: onSubmitProps) => {
    try {
      const res = await request({
        body: values,
        url: 'http://localhost:3000/users/register',
        method: 'POST',
      });

      dispatch(setUserId(res.userId));
      dispatch(logIn());
      navigate('/page/1');
    } catch (error) {
      console.log(error);
      const typedError = error as { status?: number };
      if (typedError.status === 400) {
        enqueueSnackbar(t('registrationFailed400'), { variant: 'error' });
      } else {
        enqueueSnackbar(t('registrationFailed'), { variant: 'error' });
      }
    }
  };

  return (
    <>
      <StyledArrowContainer>
        <ArrowBackIcon fontSize="large" onClick={() => setFormType('login')} />
      </StyledArrowContainer>
      <StyledRegisterFormContainer>
        <Formik
          initialValues={{
            name: '',
            surname: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={FormValidationSchema}
          onSubmit={onSubmit}
        >
          <StyledForm className="form">
            <StyledFormHeader>{t('registerFormHeader')}</StyledFormHeader>
            <CommonTextInput
              label={t('nameLabel')}
              aria-describedby="outlined-required"
              name="name"
              type="text"
              autoComplete="given-name"
            />
            <CommonTextInput
              label={t('surnameLabel')}
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
              label={t('passwordLabel')}
              aria-describedby="outlined-password-input"
              name="password"
              type="password"
              autoComplete="new-password"
            />
            <CommonTextInput
              label={t('passwordConfirmationLabel')}
              aria-describedby="outlined-password-input"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
            />
            <SubmitButton type="submit">{t('registerFormHeader')}</SubmitButton>
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
  width: 150px;
  height: 40px;
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

  @media (max-width: 768px) {
    margin-left: 30px;
  }

  @media (max-width: 480px) {
    margin-left: 10px;
  }
`;
