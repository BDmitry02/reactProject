import * as Yup from "yup";

export const LoginFormValidationSchema = Yup.object({
  email: Yup.string()
    .email("Неверный email адрес")
    .required("Введите email адрес"),
  password: Yup.string()
    .min(6, "Пароль должен состоять минимум из 6 символов")
    .required("Введите пароль"),
});
