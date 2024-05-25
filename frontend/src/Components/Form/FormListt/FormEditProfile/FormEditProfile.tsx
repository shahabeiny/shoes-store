import { useFormik } from 'formik';
import { FC, memo, useMemo } from 'react';
import InputForm from '../../FormBase/InputForm';
import Button from 'Components/Buttons/Button/Button';
import { UserProfileValidation } from 'validators/UsersValidation';
import { UserProileModel } from 'models/UserModel';
import TitleInput from '../../FormBase/TitleInput/TitleInput';
import useFileInput from 'hooks/useFileInput';

interface FormEditProfilePrpps {
  init: UserProileModel | null;
  onSubmit: (formData: FormData) => Promise<any>;
}

const FormEditProfile: FC<FormEditProfilePrpps> = ({ init, onSubmit }) => {
  const initialValues = useMemo(
    () => ({
      avatar: '',
      name: init!.name ?? '',
      family: init!.family ?? '',
      address: init!.address ?? '',
      username: init?.username ?? ''
    }),
    [init]
  );

  const formHook = useFormik({
    initialValues,
    onSubmit: () => submitForm(),
    validationSchema: UserProfileValidation(false)
  });

  const { handleInputChange } = useFileInput({
    fieldName: 'avatar',
    setFieldValue: formHook.setFieldValue
  });

  const createFormData = (values: Record<string, any>) => {
    const formData = new FormData();
    formData.append('avatar', values.avatar);
    formData.append('username', values.username);
    formData.append('name', values.name);
    formData.append('family', values.family);
    formData.append('address', values.address);

    return formData;
  };

  const submitForm = async () => {
    try {
      const formData = createFormData(formHook.values);
      await onSubmit(formData);
      formHook.resetForm();
    } catch (error) {
    } finally {
      formHook.setSubmitting(false);
    }
  };

  return (
    <form onSubmit={formHook.handleSubmit}>
      <InputForm
        placeholder="نام کاربری"
        type="text"
        {...formHook.getFieldProps('username')}
        icon="FaRegUserCircle"
        error={formHook.touched.username ? formHook.errors.username : ''}
      />

      <InputForm
        placeholder="اسم"
        type="text"
        {...formHook.getFieldProps('name')}
        icon="MdTitle"
        error={formHook.touched.name ? formHook.errors.name : ''}
      />

      <InputForm
        placeholder="فامیلی"
        type="text"
        {...formHook.getFieldProps('family')}
        icon="MdTitle"
        error={formHook.touched.family ? formHook.errors.family : ''}
      />

      <InputForm
        placeholder="آدرس"
        type="text"
        {...formHook.getFieldProps('address')}
        icon="HiOutlineLocationMarker"
        error={formHook.touched.address ? formHook.errors.address : ''}
      />

      <div>
        <TitleInput title="آپلود عکس:" />
        <InputForm
          type="file"
          name="avatar"
          onChange={handleInputChange}
          onBlur={formHook.handleBlur}
          accept="image/*"
          error={formHook.touched.avatar ? formHook.errors.avatar : ''}
        />
      </div>

      <Button
        className="btn-public--green width-100 m-top-16"
        title={formHook.isSubmitting ? 'درحال ثبت ...' : 'ثبت کردن'}
        disabled={formHook.isSubmitting}
      />
    </form>
  );
};

export default memo(FormEditProfile);
