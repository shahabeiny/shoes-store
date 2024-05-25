import { FC, memo } from 'react';
import { useFormik } from 'formik';
import InputForm from '../../FormBase/InputForm';
import Button from 'Components/Buttons/Button/Button';
import { LoginValidation } from 'validators/AuthValidations';
import LoginModel from 'models/LoginModel';

interface FormLoginProps {
  onSubmit: (formData: LoginModel) => Promise<any>;
}

const FormLogin: FC<FormLoginProps> = ({ onSubmit }) => {
  const formHook = useFormik({
    initialValues: {
      email_or_phone: '',
      password: ''
    },
    onSubmit: () => submitForm(),
    validationSchema: LoginValidation
  });

  const submitForm = async () => {
    try {
      const formData: LoginModel = { ...formHook.values };

      await onSubmit(formData);
      formHook.resetForm();
    } catch (error) {
    } finally {
      formHook.setSubmitting(false);
    }
  };

  return (
    <form onSubmit={formHook.handleSubmit} className='width-100'>
      <InputForm
        placeholder="شماره موبایل یا ایمیل"
        type="text"
        {...formHook.getFieldProps('email_or_phone')}
        icon="IoIosLogIn"
        error={formHook.touched.email_or_phone ? formHook.errors.email_or_phone : ''}
      />

      <InputForm
        placeholder="رمزعبور"
        type="text"
        {...formHook.getFieldProps('password')}
        icon="BiLockAlt"
        error={formHook.touched.password ? formHook.errors.password : ''}
      />

      <Button
        className="btn-public--green width-100 m-top-16"
        title={formHook.isSubmitting ? 'درحال ثبت ...' : 'ثبت'}
        disabled={formHook.isSubmitting}
      />
    </form>
  );
};

export default memo(FormLogin);
