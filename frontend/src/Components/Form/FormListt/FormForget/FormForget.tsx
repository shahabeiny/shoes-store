import { FC, memo } from 'react';
import { useFormik } from 'formik';
import InputForm from '../../FormBase/InputForm';
import Button from 'Components/Buttons/Button/Button';
import { ForgetValidation } from 'validators/AuthValidations';

interface FormForgetProps {
  onSubmit: (formData: string) => Promise<any>;
}

const FormForget: FC<FormForgetProps> = ({ onSubmit }) => {
  const formHook = useFormik({
    initialValues: {
      mobile: ''
    },
    onSubmit: () => submitForm(),
    validationSchema: ForgetValidation
  });

  const submitForm = async () => {
    try {
      const formData = formHook.values.mobile;
      await onSubmit(formData);
      formHook.resetForm();
    } catch (error) {
    } finally {
      formHook.setSubmitting(false);
    }
  };

  return (
    <form onSubmit={formHook.handleSubmit} className="width-100">
      <InputForm
        placeholder="شماره موبایل"
        type="text"
        {...formHook.getFieldProps('mobile')}
        icon="BsTelephone"
        error={formHook.touched.mobile ? formHook.errors.mobile : ''}
      />

      <Button
        className="btn-public--green width-100 m-top-16"
        title={formHook.isSubmitting ? 'درحال ثبت ...' : 'ثبت'}
        disabled={formHook.isSubmitting}
      />
    </form>
  );
};

export default memo(FormForget);
