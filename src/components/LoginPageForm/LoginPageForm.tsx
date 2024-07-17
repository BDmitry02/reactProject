import { useState } from "react";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";

const MyForm = () => {
  const [formType, setFormType] = useState("login");

  const getForm = () => {
    if (formType === "login") {
      return <LoginForm setFormType={setFormType} />;
    } else {
      return <RegisterForm />;
    }
  };

  return getForm();
};

export default MyForm;
