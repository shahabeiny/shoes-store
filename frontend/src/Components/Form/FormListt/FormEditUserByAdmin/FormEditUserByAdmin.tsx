import { useFormik } from 'formik';
import { FC, memo, useMemo } from 'react';
import InputForm from '../../FormBase/InputForm';
import TitleInput from '../../FormBase/TitleInput/TitleInput';
import Button from 'Components/Buttons/Button/Button';
import { RoleModel } from 'models/RoleModel';
import UserModel from 'models/UserModel';
import { UserValidation } from 'validators/UsersValidation';
import useFileInput from 'hooks/useFileInput';
import Select from 'react-select';
import ErrorValidate from '../../FormBase/ErrorValidate/ErrorValidate';

interface FormEditUserByAdminPrpps {
  roles: RoleModel[];
  init: UserModel | null;
  onSubmit: (formData: FormData) => Promise<any>;
}

const FormEditUserByAdmin: FC<FormEditUserByAdminPrpps> = ({ roles, init, onSubmit }) => {
  const initialValues = useMemo(
    () => ({
      username: init!.username ?? '',
      name: init!.name ?? '',
      family: init!.family ?? '',
      email: init!.email ?? '',
      mobile: init!.mobile ?? '',
      address: init!.address ?? '',
      avatar: '',
      role: init
        ? { value: init.role?._id, label: `نقش ${init.role?.name}` }
        : { value: '', label: 'انتخاب نقش' }
    }),
    [init]
  );

  const formHook = useFormik({
    initialValues,
    onSubmit: () => submitForm(),
    validationSchema: UserValidation(false)
  });

  const { touched, errors, handleSubmit, getFieldProps, setSubmitting, resetForm } = formHook;

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
    formData.append('email', values.email);
    formData.append('mobile', values.mobile);
    formData.append('address', values.address);
    formData.append('role', values.role.value);
    if (init?._id) {
      formData.append('_id', init!._id);
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
      <InputForm
        placeholder="نام کاربری"
        type="text"
        {...formHook.getFieldProps('username')}
        icon="FaRegUserCircle"
        error={touched.username ? errors.username : ''}
      />

      <InputForm
        placeholder="اسم"
        type="text"
        {...formHook.getFieldProps('name')}
        icon="MdTitle"
        error={touched.name ? errors.name : ''}
      />

      <InputForm
        placeholder="فامیلی"
        type="text"
        {...formHook.getFieldProps('family')}
        icon="MdTitle"
        error={touched.family ? errors.family : ''}
      />

      <InputForm
        placeholder="ایمیل"
        type="text"
        {...formHook.getFieldProps('email')}
        icon="MdOutlineAlternateEmail"
        error={touched.email ? errors.email : ''}
      />

      <InputForm
        placeholder="شماره موبایل"
        type="text"
        {...formHook.getFieldProps('mobile')}
        icon="BsTelephone"
        error={touched.mobile ? errors.mobile : ''}
      />

      <InputForm
        placeholder="آدرس"
        type="text"
        {...getFieldProps('address')}
        icon="HiOutlineLocationMarker"
        error={touched.address ? errors.address : ''}
      />

      <Select
        name="role"
        className="m-top-16"
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        value={formHook.values.role}
        options={roles?.map((role) => ({ value: role._id ?? '', label: `نقش ${role.name}` })) || []}
        onChange={(v) => formHook.setFieldValue('role', v)}
        onBlur={formHook.handleBlur}
      />
      {errors.role && touched.role && <ErrorValidate title={errors.role.value ?? ''} />}

      <div>
        <TitleInput title="آپلود عکس:" />
        <InputForm
          type="file"
          name="avatar"
          onChange={handleInputChange}
          onBlur={formHook.handleBlur}
          accept="image/*"
          error={touched.avatar ? errors.avatar : ''}
        />
      </div>

      <Button
        className="btn-public--green width-100 m-top-16"
        title={formHook.isSubmitting ? 'درحال ثبت تغییرات...' : 'تغییر کاربر'}
        disabled={formHook.isSubmitting}
      />
    </form>
  );
};

export default memo(FormEditUserByAdmin);
