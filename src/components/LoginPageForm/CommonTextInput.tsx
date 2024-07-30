import { TextField } from '@mui/material';
import { useField } from 'formik';
import styled from 'styled-components';

interface MyTextInputProps {
  name: string;
  label: string;
  type: string;
  autoComplete?: string;
  'aria-describedby'?: string;
}

function CommonTextInput({ ...props }: MyTextInputProps) {
  const [field, meta] = useField(props);
  return (
    <StyledInputContainer>
      <StyledTextField {...props} {...field} />
      {meta.touched && meta.error ? (
        <ErrorMessage className="error">{meta.error}</ErrorMessage>
      ) : null}
    </StyledInputContainer>
  );
}

export default CommonTextInput;

const ErrorMessage = styled.div`
  color: #9d0f0fe6;
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: ${(props) => props.theme.textColor};
    }

    &.Mui-focused fieldset {
      border-color: ${(props) => props.theme.headerAndFooterColor};
    }
  }
  & .MuiOutlinedInput-input {
    color: ${(props) => props.theme.textColor};
  }
  & .MuiInputLabel-root {
    color: ${(props) => props.theme.textColor};

    &.Mui-focused {
      color: ${(props) => props.theme.textColor};
    }
  }
`;

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
