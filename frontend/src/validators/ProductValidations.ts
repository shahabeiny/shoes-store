import * as Yup from 'yup';
import { nameEnglishRegex, namePersionOrEnglishRegex, namePersionRegex } from './BaseValidations/RegexValid';
import { fileSchema, imageFormats } from './BaseValidations/FileValidation';
import textValidation from './BaseValidations/TextValidation';

export const ProductValidation = (imageRequired: boolean = true) => {
  return Yup.object({
    name: textValidation('name', 'فارسی', namePersionRegex, 2, 15),
    nameEng: textValidation('name', 'انگلیسی', nameEnglishRegex, 2, 20),
    desc: textValidation('text', undefined, undefined, 2, 200),
    brandId:  Yup.object({
      value: Yup.string().required('موردی انتخاب نشده')
    }),
    usageId: Yup.object({
      value: Yup.string().required('موردی انتخاب نشده')
    }),
    image: fileSchema({
      required: imageRequired,
      fileType: imageFormats,
      maxSizeInBytes: 1068569,
      titleRequired: 'عکس'
    })
  });
};

export const BrandValidation = (imageRequired: boolean = true) => {
  return Yup.object({
    name: textValidation('name', 'فارسی', namePersionRegex, 2, 15),
    nameEng: textValidation('name', 'انگلیسی', nameEnglishRegex, 2, 20),
    desc: textValidation('text', undefined, undefined, 2, 200),

    image: fileSchema({
      required: imageRequired,
      fileType: imageFormats,
      maxSizeInBytes: 1068569,
      titleRequired: 'عکس'
    })
  });
};

export const UsageValidation = (imageRequired: boolean = true) => {
  return Yup.object({
    name: textValidation('name', 'فارسی', namePersionRegex, 2, 15),
    nameEng: textValidation('name', 'انگلیسی', nameEnglishRegex, 2, 20),
    icon:Yup.object({
      icon: Yup.string().required('موردی انتخاب نشده')
    })
  });
};

export const ColorValidation = Yup.object({
  name: textValidation('name', 'فارسی', namePersionRegex, 2, 15),
  nameEng: textValidation('name', 'انگلیسی', nameEnglishRegex, 2, 20)
});

export const SizeValidation = Yup.object({
  sizeNumber: Yup.number()
    .positive('فقط اعداد مثبت وارد شود')
    .min(32, 'حداقل رقم مجاز عدد 32')
    .max(46, 'حداکثر رقم مجاز عدد 46 ')
    .required('سایز وارد نشده')
});

export const SearchProductValidation = Yup.object({
    name: textValidation('name', 'فارسی', namePersionOrEnglishRegex, 2, 20),
  });
