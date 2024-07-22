import i18next from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(initReactI18next)
  // .use(LanguageDetector)
  .init({
    fallbackLng: localStorage.getItem("i18nextLng") || "ru",
    resources: {
      ru: {
        translation: {
          loginFormHeader: "Войти",
          passwordLabel: "Пароль",
          createAccountButton: "Создать аккаунт",

          registerFormHeader: "Регистрация",
          nameLabel: "Имя",
          surnameLabel: "Фамилия",
          passwordConfirmationLabel: "Подтвердите пароль",

          emailInvalid: "Неверный email адрес",
          emailRequired: "Введите email адрес",
          passwordMin: "Пароль должен состоять минимум из 6 символов",
          passwordRequired: "Введите пароль",
          passwordDoesntMatch: "Пароли не совпадают",
          passwordConfirmation: "Подтвердите пароль",

          nameValidation: "В имени не должно быть цифр",
          nameRequired: "Введите ваше имя",
          surnameValidation: "В фамилии не должно быть цифр",
          surnameRequired: "Введите вашу фамилию",

          registrationFailed400: "Этот email адрес уже зарегистрирован",
          registrationFailed:
            "К сожалению, произошла ошибка, пожалуйста попробуйте позже",
          loginFailed400: "Неверный email или пароль",
        },
      },
      en: {
        translation: {
          loginFormHeader: "Sign in",
          passwordLabel: "Password",
          createAccountButton: "Create account",

          registerFormHeader: "Sign up",
          nameLabel: "First name",
          surnameLabel: "Last name",
          passwordConfirmationLabel: "Confirm the password",

          emailInvalid: "Wrong email address",
          emailRequired: "Enter email address",
          passwordMin: "Password must be at least 6 characters",
          passwordRequired: "Enter password",
          passwordDoesntMatch: "Password doesn`t match",
          passwordConfirmation: "Confirm the password",

          nameValidation: "The name should not contain numbers",
          nameRequired: "Enter your name",
          surnameValidation: "Last name should not contain numbers",
          surnameRequired: "Enter your last name",

          registrationFailed400: "This email address is already registered",
          registrationFailed:
            "Sorry, an error occurred, please try again later",
          loginFailed400: "Invalid email or password",
        },
      },
      ua: {
        translation: {
          loginFormHeader: "Увійти",
          passwordLabel: "Пароль",
          createAccountButton: "Створити аккаунт",

          registerFormHeader: "Створити аккаунт",
          nameLabel: "Ім'я",
          surnameLabel: "Прізвище",
          passwordConfirmationLabel: "Підтвердіть пароль",

          emailInvalid: "Невірна email адреса",
          emailRequired: "Введіть email адресу",
          passwordMin: "Пароль має містити не менше 6 символів",
          passwordRequired: "Введіть пароль",
          passwordDoesntMatch: "Паролі не співпадають",
          passwordConfirmation: "Підтвердіть пароль",

          nameValidation: "Ім'я не має містити цифр",
          nameRequired: "Введіть ваше ім'я",
          surnameValidation: "Прізвище не має містити цифр",
          surnameRequired: "Введіть ваше прізвище",

          registrationFailed400: "Ця електронна адреса вже зареєстрована",
          registrationFailed:
            "На жаль, сталася помилка, будь ласка спробуйте пізніше",
          loginFailed400: "Невірний email або пароль",
        },
      },
    },
  });

export default i18next;
