import { useState, FC, memo, useMemo } from 'react';
import { useFormik } from 'formik';
import TitleInput from '../../FormBase/TitleInput/TitleInput';
import { Sketch } from '@uiw/react-color';
import InputForm from '../../FormBase/InputForm';
import Button from 'Components/Buttons/Button/Button';
import { ColorModel } from 'models/ProductModels';
import { ColorValidation } from 'validators/ProductValidations';

interface FormColorProps {
  init: ColorModel | null;
  onSubmit: (formData: ColorModel) => Promise<any>;
}

const FormColor: FC<FormColorProps> = ({ init, onSubmit }) => {
  const [hex, setHex] = useState<string>(init?.color || '#fff');

  const initialValues = useMemo(
    () => ({
      name: init?.name ?? '',
      nameEng: init?.nameEng ?? ''
    }),
    [init]
  );

  const formHook = useFormik({
    initialValues,
    onSubmit: () => submitForm(),
    validationSchema: ColorValidation
  });

  const submitForm = async () => {
    try {
      const formData: ColorModel = { ...formHook.values, color: hex };

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
      <TitleInput title="انتخاب رنگ :" />
      <Sketch style={{ margin: '0 auto' }} color={hex} onChange={(color) => setHex(color.hex)} />

      <InputForm
        placeholder="نام رنگ"
        type="text"
        {...formHook.getFieldProps('name')}
        icon="IoMdColorFill"
        error={formHook.touched.name ? formHook.errors.name : ''}
      />

      <InputForm
        placeholder="نام انگلیسی رنگ"
        type="text"
        {...formHook.getFieldProps('nameEng')}
        icon="IoMdColorFill"
        error={formHook.touched.nameEng ? formHook.errors.nameEng : ''}
      />

      <Button
        className="btn-public--green width-100 m-top-16"
        title={formHook.isSubmitting ? 'درحال ثبت رنگ ...' : 'ثبت رنگ'}
        disabled={formHook.isSubmitting}
      />
    </form>
  );
};

export default memo(FormColor);
