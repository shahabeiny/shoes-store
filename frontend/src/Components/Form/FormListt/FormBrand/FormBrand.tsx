import { FC, memo, useMemo } from 'react';
import Button from 'Components/Buttons/Button/Button';
import InputForm from '../../FormBase/InputForm';
import { useFormik } from 'formik';
import { BrandValidation } from 'validators/ProductValidations';
import TitleInput from '../../FormBase/TitleInput/TitleInput';
import { BrandModel } from 'models/ProductModels';
import useFileInput from 'hooks/useFileInput';

interface FormBrandPrpps {
  init: BrandModel | null;
  onSubmit: (formData: FormData) => Promise<any>;
}

const FormBrand: FC<FormBrandPrpps> = ({ init, onSubmit }) => {

  const initialValues = useMemo(
    () => ({
      name: init?.name ?? '',
      nameEng: init?.nameEng ?? '',
      image: '',
      desc: init?.desc ?? ''
    }),
    [init]
  );

  const formHook = useFormik({
    initialValues,
    onSubmit: () => submitForm(),
    validationSchema: init ? BrandValidation(false) : BrandValidation
  });

  const { handleInputChange } = useFileInput({
    fieldName: 'image',
    setFieldValue: formHook.setFieldValue
  });

  const { touched, errors, handleSubmit, getFieldProps, setSubmitting, resetForm } = formHook;

  const createFormData = (values: Record<string, any>) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]?.toString() ?? '');
    }
    
    formData.append('image', values.image);
    if (init?._id) {
      formData.append('_id', init._id);
    }
    
    return formData;
  };

  const submitForm = async () => {
    try {
      const formData = createFormData(formHook.values)
      await onSubmit(formData);
      resetForm();
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputForm
        placeholder="نام برند"
        type="text"
        {...getFieldProps('name')}
        icon="MdOutlineTitle"
        error={touched.name ? errors.name : ''}
      />

      <InputForm
        placeholder="نام انگلیسی برند"
        type="text"
        {...getFieldProps('nameEng')}
        icon="MdOutlineTitle"
        error={touched.nameEng ? errors.nameEng : ''}
      />

      <InputForm
        placeholder="توضیحات برند"
        type="textarea"
        {...getFieldProps('desc')}
        icon="MdOutlineDescription"
        error={touched.desc ? errors.desc : ''}
      />

      <div>
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
        title={formHook.isSubmitting ? 'درحال ثبت برند...' : 'ثبت برند'}
        disabled={formHook.isSubmitting}
      />
    </form>
  );
};

export default memo(FormBrand);
