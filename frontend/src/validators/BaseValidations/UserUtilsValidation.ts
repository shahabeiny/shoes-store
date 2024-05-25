import * as Yup from 'yup';
import { mobileRegex, passwordRegex } from './RegexValid';

export const validatePassword = () =>
  Yup.string()
    .required('رمزعبور وارد نشده')
    .matches(passwordRegex, 'حداقل باید 8 کاراکتر و شامل اعداد،حروف کوچک،بزرگ و کاراکتر خاص باشد');

export const isEmailValid = (email: string | undefined) => Yup.string().email().isValidSync(email);

export const isPhoneValid = (mobile: string | undefined) =>
  Yup.string().matches(mobileRegex).isValidSync(mobile);
