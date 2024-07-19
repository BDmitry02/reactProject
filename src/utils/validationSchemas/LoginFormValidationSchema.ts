import * as Yup from "yup";
import { TFunction } from "i18next";

export const LoginFormValidationSchema = (t: TFunction) => {
  return Yup.object({
    email: Yup.string().email(t("emailInvalid")).required(t("emailRequired")),
    password: Yup.string()
      .min(6, t("passwordMin"))
      .required(t("passwordRequired")),
  });
};
