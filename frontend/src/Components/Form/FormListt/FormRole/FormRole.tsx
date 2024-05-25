import { FC, memo, useMemo } from 'react';
import { useFormik } from 'formik';
import InputForm from '../../FormBase/InputForm';
import TitleInput from '../../FormBase/TitleInput/TitleInput';
import Select from 'react-select';
import { PermissionModel, RoleModel, addRoleModel } from 'models/RoleModel';
import Button from 'Components/Buttons/Button/Button';
import { RoleValidation } from 'validators/UsersValidation';

interface FormRoleProps {
  init: RoleModel | null;
  permissions: PermissionModel[];
  onSubmit: (formData: addRoleModel) => Promise<any>;
}

type permForServer = { value: string; label: string };

const FormRole: FC<FormRoleProps> = ({ init, onSubmit, permissions }) => {
  const initialValues = useMemo(() => ({
    name: init ? init.name : '',
    nameEng: init ? init.nameEng : '',
    permissions: init ? optionsCreator(init.permissions) : []
  }), [init]);
  
  const formHook = useFormik({
    initialValues,
    onSubmit: () => submitForm(),
    validationSchema: RoleValidation
  });

  function optionsCreator(permissions: PermissionModel[]) {
    let arr: { value: string; label: string }[] = [];
    permissions?.map((per) => arr.push({ value: per._id, label: per.name }));
    return arr;
  }

  const submitForm = async () => {
    try {
      const formData: addRoleModel = {
        ...formHook.values,
        permissions: formHook.values.permissions.map((per: permForServer) => per.value) 
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
      <InputForm
        placeholder="نام نقش"
        type="text"
        {...formHook.getFieldProps('name')}
        icon="RiAdminLine"
        error={formHook.touched.name ? formHook.errors.name : ''}
      />

      <InputForm
        placeholder="نام انگلیسی نقش"
        type="text"
        {...formHook.getFieldProps('nameEng')}
        icon="RiAdminLine"
        error={formHook.touched.nameEng ? formHook.errors.nameEng : ''}
      />

      <TitleInput title="انتخاب مجوز :" />

      <Select
        name="permissions"
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 })
        }}
        value={formHook.values.permissions}
        options={optionsCreator(permissions)}
        onChange={(v) => formHook.setFieldValue('permissions', v)}
        onBlur={formHook.handleBlur}
        isMulti
      />

      <Button
        className="btn-public--green width-100 m-top-16"
        title={formHook.isSubmitting ? 'درحال ثبت نقش...' : 'ثبت نقش'}
        disabled={formHook.isSubmitting}
      />
    </form>
  );
};

export default memo(FormRole);
