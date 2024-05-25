import * as Yup from 'yup';
import { fileSchema, imageFormats } from './BaseValidations/FileValidation';

export const ColorKindProductValidation = (imageRequired: boolean = true) => {
  return Yup.object().shape({
    colorId: Yup.object({
      value: Yup.string().required('موردی انتخاب نشده')
    }),
    image: fileSchema({
      required: imageRequired,
      fileType: imageFormats,
      maxSizeInBytes: 1068569
    })
  });
};

export const SizeKindProductValidation = Yup.object().shape({
  sizeId: Yup.object({
    value: Yup.string().required('موردی انتخاب نشده')
  }),
  total: Yup.number().required('تعداد کل وارد نشده').min(1, 'تعداد کل باید بیشتر یا مساوی یک باشد'),
  sold: Yup.number().required('تعداد فروخته وارد نشده'),
  eachCart: Yup.number()
    .required('تعداد سبد وارد نشده')
    .test('is-less-than-total', ' تعداد سبد نمی‌تواند بیشتر از تعداد کل باشد', function (value) {
      const { total } = this.parent;
      return value <= total;
    })
    .min(1, 'تعداد سبد باید بیشتر یا مساوی یک باشد'),
  frozen: Yup.number()
    .required('تعداد یخ زده وارد نشده')
    .test('is-less-than-total', 'تعداد یخ زده نمی‌تواند بیشتر از تعداد کل باشد', function (value) {
      const { total } = this.parent;
      return value <= total;
    }),
  price: Yup.number()
    .positive('فقط اعداد مثبت وارد شود')
    .min(1000, 'حداقل مبلغ مجاز ۱،۰۰۰ تومان')
    .max(10000000, 'حداکثر مبلغ مجاز ۱۰۰،۰۰۰،۰۰۰ تومان ')
    .required('قیمت محصول وارد نشده')
});
