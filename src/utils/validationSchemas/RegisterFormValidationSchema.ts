import * as Yup from "yup";

export const RegisterValidationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-zА-Яа-я]+$/, "В имени не должно быть цифр")
    .required("Введите ваше имя"),
  surname: Yup.string()
    .matches(/^[A-Za-zА-Яа-я]+$/, "В фамилии не должно быть цифр")
    .required("Введите вашу фамилию"),
  email: Yup.string()
    .email("Неверный email адрес")
    .required("Введите email адрес"),
  password: Yup.string()
    .min(6, "Пароль должен состоять минимум из 6 символов")
    .required("Введите пароль"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Пароли не совпадают")
    .required("Подтвердите ваш пароль"),
});
