import InputForm from '../../FormBase/InputForm';
import { useFormik } from 'formik';
import { FC, memo, useMemo } from 'react';
import Button from 'Components/Buttons/Button/Button';
import { SizeModel } from 'models/ProductModels';
import { EditProductSizeModel, ProductSizeModel } from 'models/ProductKindModel';
import { SizeKindProductValidation } from 'validators/ProductKindValidations';
import ErrorValidate from '../../FormBase/ErrorValidate/ErrorValidate';
import Select from 'react-select';

interface FormSizeKindProductPrpps {
  productColorId?: string;
  sizes: SizeModel[];
  init: ProductSizeModel | null;
  onSubmit: (formData: ProductSizeModel) => Promise<any>;
}

const FormSizeKindProduct: FC<FormSizeKindProductPrpps> = ({
  productColorId,
  sizes,
  init,
  onSubmit
}) => {
  const initialValues = useMemo(
    () => ({
      total: init?.total ?? '',
      eachCart: init?.eachCart ?? '',
      sold: init?.sold ?? '',
      frozen: init?.frozen ?? '',
      price: init?.price ?? '',
      sizeId: init
        ? { value: init.size?._id, label: `سایز ${init.size?.sizeNumber}` }
        : { value: '', label: 'انتخاب سایز' }
    }),
    [init]
  );

  const formHook = useFormik({
    initialValues,
    onSubmit: () => submitForm(),
    validationSchema: SizeKindProductValidation
  });

  const submitForm = async () => {
    try {
      const formData: EditProductSizeModel = {
        ...formHook.values,
        sizeId: formHook.values.sizeId.value,
        productColorId
      };
      if (init?._id) {
        formData._id = init?._id ?? '';
      }

      await onSubmit(formData);
      formHook.resetForm();
    } catch (error) {
    } finally {
      formHook.setSubmitting(false);
    }
  };

  return (
    <form onSubmit={formHook.handleSubmit}>
      <Select
        name="sizeId"
        placeholder="انتخاب سایز"
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        value={formHook.values.sizeId}
        options={
          sizes?.map((size) => ({ value: size._id ?? '', label: `سایز ${size.sizeNumber}` })) || []
        }
        onChange={(v) => formHook.setFieldValue('sizeId', v)}
        onBlur={formHook.handleBlur}
      />
      {formHook.errors.sizeId && formHook.touched.sizeId && (
        <ErrorValidate title={formHook.errors.sizeId.value ?? ''} />
      )}

      <InputForm
        placeholder="تعداد کل محصول"
        type="number"
        {...formHook.getFieldProps('total')}
        icon="BsWallet2"
        error={formHook.touched.total ? formHook.errors.total : ''}
      />

      <InputForm
        placeholder="تعداد هر سبد "
        type="number"
        {...formHook.getFieldProps('eachCart')}
        icon="BsCart"
        error={formHook.touched.eachCart ? formHook.errors.eachCart : ''}
      />

      <InputForm
        placeholder="تعداد فروخته شده محصول"
        type="number"
        {...formHook.getFieldProps('sold')}
        icon="MdOutlineSell"
        error={formHook.touched.sold ? formHook.errors.sold : ''}
      />

      <InputForm
        placeholder="تعداد فریز شده محصول"
        type="number"
        {...formHook.getFieldProps('frozen')}
        icon="GiFrozenBlock"
        error={formHook.touched.frozen ? formHook.errors.frozen : ''}
      />

      <InputForm
        placeholder="قیمت را وارد کنید"
        type="number"
        {...formHook.getFieldProps('price')}
        icon="BsCurrencyDollar"
        error={formHook.touched.price ? formHook.errors.price : ''}
      />

      <Button
        className="btn-public--green width-100 m-top-16"
        title={formHook.isSubmitting ? 'درحال ثبت سایز...' : 'ثبت سایز'}
        disabled={formHook.isSubmitting}
      />
    </form>
  );
};

export default memo(FormSizeKindProduct);
