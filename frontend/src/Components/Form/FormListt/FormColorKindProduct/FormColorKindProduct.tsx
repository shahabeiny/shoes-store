import { useFormik } from 'formik';
import { FC, memo, useMemo } from 'react';
import TitleInput from '../../FormBase/TitleInput/TitleInput';
import InputForm from '../../FormBase/InputForm';
import Button from 'Components/Buttons/Button/Button';
import { ColorModel } from 'models/ProductModels';
import { ProductColorModel } from 'models/ProductKindModel';
import { ColorKindProductValidation } from 'validators/ProductKindValidations';
import useFileInput from 'hooks/useFileInput';
import Select from 'react-select';
import ErrorValidate from '../../FormBase/ErrorValidate/ErrorValidate';
import CustomColorOption from '../../FormOptions/CustomColorOption/CustomColorOption';

interface FormColorKindProductPrpps {
  colors: ColorModel[];
  productId?: string;
  init: ProductColorModel | null;
  onSubmit: (formData: FormData) => Promise<any>;
}

const FormColorKindProduct: FC<FormColorKindProductPrpps> = ({
  colors,
  productId,
  init,
  onSubmit
}) => {
  const initialValues = useMemo(
    () => ({
      colorId: init
        ? { value: init.color._id, label: `رنگ ${init.color.name}`, color: init.color.color }
        : { value: '', label: 'انتخاب رنگ', color: '' },
      image: ''
    }),
    [init]
  );

  const formHook = useFormik({
    initialValues,
    onSubmit: () => submitForm(),
    validationSchema: init ? ColorKindProductValidation(false) : ColorKindProductValidation
  });

  const { handleInputChange } = useFileInput({
    fieldName: 'image',
    setFieldValue: formHook.setFieldValue
  });

  const optionsCreator = (colors: ColorModel[]) => {
    return (
      colors?.map((co) => ({ value: co._id ?? '', label: `رنگ ${co.name}`, color: co.color })) || []
    );
  };

  const { touched, errors, handleSubmit, setSubmitting, resetForm } = formHook;

  const createFormData = (values: Record<string, any>) => {
    const formData = new FormData();
    formData.append('colorId', values.colorId.value);
    formData.append('image', values.image);
    formData.append('productId', productId ?? '');
    if (init?._id) {
      formData.append('productColorId', init!._id);
    }
    return formData;
  };

  const submitForm = async () => {
    try {
      const formData = createFormData(formHook.values);
      await onSubmit(formData);
      resetForm();
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Select
        name="colorId"
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        value={formHook.values.colorId}
        options={optionsCreator(colors)}
        onChange={(v) => formHook.setFieldValue('colorId', v)}
        onBlur={formHook.handleBlur}
        components={{ Option: CustomColorOption as any }}
      />
      {formHook.errors.colorId && formHook.touched.colorId && (
        <ErrorValidate title={formHook.errors.colorId.value ?? ''} />
      )}

      <div className="singer-list__modal-input">
        <TitleInput title="آپلود بنر:" />
        <InputForm
          type="file"
          name="image"
          onChange={handleInputChange}
          onBlur={formHook.handleBlur}
          accept="image/*"
          error={touched.image ? errors.image : ''}
        />
      </div>

      <Button
        className="btn-public--green width-100 m-top-16"
        title={formHook.isSubmitting ? 'درحال ثبت تنوع...' : 'ثبت تنوع'}
        disabled={formHook.isSubmitting}
      />
    </form>
  );
};

export default memo(FormColorKindProduct);
