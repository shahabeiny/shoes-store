import * as Yup from 'yup';
import { fileSchema, imageFormats } from './BaseValidations/FileValidation';
import { nameEnglishRegex, namePersionRegex } from './BaseValidations/RegexValid';
import textValidation from './BaseValidations/TextValidation';
import { isEmailValid, isPhoneValid } from './BaseValidations/UserUtilsValidation';

export const UserValidation = (imageRequired: boolean = true) => {
  return Yup.object({
    name: textValidation('name', 'فارسی', namePersionRegex, 2, 15, false),
    family: textValidation('name', 'فارسی', namePersionRegex, 2, 15, false),
    username: Yup.string().required('نام کاربری وارد نشده است'),
    address: textValidation('text', undefined, undefined, 2, 200, false),
    mobile: Yup.string()
      .required('شماره موبایل وارد نشده ')
      .test('mobile', 'شماره موبایل نامعتبر', (value) => isPhoneValid(value)),
    email: Yup.string()
      .required('ایمیل وارد نشده')
      .test('mobile', 'ایمیل نامعتبر', (value) => isEmailValid(value)),
    role: Yup.object({
      value: Yup.string().required('موردی انتخاب نشده')
    }),
    avatar: fileSchema({
      required: imageRequired,
      fileType: imageFormats,
      maxSizeInBytes: 1068569,
      titleRequired: 'عکس'
    })
  });
};

export const RoleValidation = Yup.object({
  name: textValidation('name', 'فارسی', namePersionRegex, 2, 15),
  nameEng: textValidation('name', 'انگلیسی', nameEnglishRegex, 2, 20),
  permissions: Yup.array().min(0)
});

export const UserProfileValidation = (imageRequired: boolean = true) => {
  return Yup.object({
    username: Yup.string().required('نام کاربری وارد نشده است'),
    name: textValidation('name', 'فارسی', namePersionRegex, 2, 15),
    family: textValidation('name', 'فارسی', namePersionRegex, 2, 15),
    address: textValidation('text', undefined, undefined, 2, 200,true),
    avatar: fileSchema({
      required: imageRequired,
      fileType: imageFormats,
      maxSizeInBytes: 1068569,
      titleRequired: 'عکس'
    })
  });
};
