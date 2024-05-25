import { FC, memo } from 'react';
import { useFormik } from 'formik';
import InputForm from '../../FormBase/InputForm';
import Button from 'Components/Buttons/Button/Button';
import { ChangePassValidation } from 'validators/AuthValidations';

interface FormChangePassProps {
  onSubmit: (formData: string) => Promise<any>;
}

const FormChangePass: FC<FormChangePassProps> = ({ onSubmit }) => {
  const formHook = useFormik({
    initialValues: {
      password: '',
      repeatPassword: ''
    },
    onSubmit: () => submitForm(),
    validationSchema: ChangePassValidation
  });

  const submitForm = async () => {
    try {
      const formData = formHook.values.password;
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
        placeholder="رمز عبور"
        type="text"
        {...formHook.getFieldProps('password')}
        icon="BiLockAlt"
        error={formHook.touched.password ? formHook.errors.password : ''}
      />

      <InputForm
        placeholder="تکرار رمز عبور"
        type="text"
        {...formHook.getFieldProps('repeatPassword')}
        icon="BiLockAlt"
        error={formHook.touched.repeatPassword ? formHook.errors.repeatPassword : ''}
      />

      <Button
        className="btn-public--green width-100 m-top-16"
        title={formHook.isSubmitting ? 'درحال ثبت ...' : 'ثبت'}
        disabled={formHook.isSubmitting}
      />
    </form>
  );
};

export default memo(FormChangePass);
