import * as Yup from 'yup';
import {
  isEmailValid,
  isPhoneValid,
  validatePassword
} from './BaseValidations/UserUtilsValidation';

const validateEmailOrPhone = (value: string | undefined) => {
  return isEmailValid(value) || isPhoneValid(value);
};

export const LoginValidation = Yup.object().shape({
  email_or_phone: Yup.string()
    .required('ایمیل یا شماره موبایل وارد نشده است')
    .test('email_or_phone', 'ایمیل یا شماره موبایل نامعتبر', validateEmailOrPhone),
  password: validatePassword()
});

export const RegisterValidation = Yup.object().shape({
  username: Yup.string().required('نام کاربری وارد نشده است'),
  mobile: Yup.string()
    .required('شماره موبایل وارد نشده ')
    .test('mobile', 'شماره موبایل نامعتبر', (value) => isPhoneValid(value)),
  email: Yup.string().email().required('ایمیل وارد نشده است'),
  password: validatePassword()
});

export const ChangePassValidation = Yup.object().shape({
  password: validatePassword(),
  repeatPassword:Yup.string()
  .oneOf([Yup.ref('password')], 'تکرار پسورد باید مشابه با پسورد باشد')
  .required('تکرار پسورد الزامی است')
});

export const ForgetValidation = Yup.object().shape({
  mobile: Yup.string()
    .required('شماره موبایل وارد نشده ')
    .test('mobile', 'شماره موبایل نامعتبر', (value) => isPhoneValid(value)),
});
