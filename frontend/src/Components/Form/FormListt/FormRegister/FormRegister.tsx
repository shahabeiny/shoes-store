import { FC, memo } from 'react';
import { useFormik } from 'formik';
import InputForm from '../../FormBase/InputForm';
import Button from 'Components/Buttons/Button/Button';
import { RegisterValidation } from 'validators/AuthValidations';
import LoginModel from 'models/LoginModel';

interface FormRegisterProps {
  onSubmit: (formData: LoginModel) => Promise<any>;
}

const FormRegister: FC<FormRegisterProps> = ({ onSubmit }) => {
  const formHook = useFormik({
    initialValues: {
      username: '',
      mobile: '',
      email: '',
      password: ''
    },
    onSubmit: () => submitForm(),
    validationSchema: RegisterValidation
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
    <form onSubmit={formHook.handleSubmit} className="width-100">
      <InputForm
        placeholder="نام کاربری"
        type="text"
        {...formHook.getFieldProps('username')}
        icon="FaRegUserCircle"
        error={formHook.touched.username ? formHook.errors.username : ''}
      />

      <InputForm
        placeholder="شماره موبایل"
        type="text"
        {...formHook.getFieldProps('mobile')}
        icon="BsTelephone"
        error={formHook.touched.mobile ? formHook.errors.mobile : ''}
      />

      <InputForm
        placeholder="ایمیل"
        type="email"
        {...formHook.getFieldProps('email')}
        icon="MdOutlineAlternateEmail"
        error={formHook.touched.email ? formHook.errors.email : ''}
      />

      <InputForm
        placeholder="رمز عبور"
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

export default memo(FormRegister);
