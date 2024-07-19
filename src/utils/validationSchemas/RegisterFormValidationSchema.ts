import * as Yup from "yup";
import { TFunction } from "i18next";

export const RegisterValidationSchema = (t: TFunction) => {
  return Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-zА-Яа-я]+$/, t("nameValidation"))
      .required(t("nameRequired")),
    surname: Yup.string()
      .matches(/^[A-Za-zА-Яа-я]+$/, t("surnameValidation"))
      .required(t("surnameRequired")),
    email: Yup.string().email(t("emailInvalid")).required(t("emailRequired")),
    password: Yup.string()
      .min(6, t("passwordMin"))
      .required(t("passwordRequired")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], t("passwordDoesntMatch"))
      .required(t("passwordConfirmation")),
  });
};
