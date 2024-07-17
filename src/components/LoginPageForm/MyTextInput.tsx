import { TextField } from "@mui/material";
import { useField } from "formik";
import { StyledDiv, ErrorDiv } from "./StyledFormComponents";

const MyTextInput = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <StyledDiv>
      <TextField {...props} {...field} />
      {meta.touched && meta.error ? (
        <ErrorDiv className="error">{meta.error}</ErrorDiv>
      ) : null}
    </StyledDiv>
  );
};

export default MyTextInput;
