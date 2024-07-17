import styled from "styled-components";
import { Form } from "formik";

export const StyledWrapper = styled.div`
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: lightblue;
`;

export const FormBackgroundLayer = styled.div`
  background-color: #d1c4e9;
  display: flex;
  flex-direction: column;
  padding: 50px;
  width: 40vw;
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const ErrorDiv = styled.div`
  color: red;
`;

export const StyledH2 = styled.h2`
  margin: 0;
`;

export const StyledSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7vw;
  height: 3.5vh;
  border-radius: 25px;
  cursor: pointer;
  color: #03a9f4;

  &:hover {
    background-color: lightblue;
  }
`;
