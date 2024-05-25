import { FC, memo, useCallback, useMemo } from 'react';
import Button from 'Components/Buttons/Button/Button';
import InputForm from '../../FormBase/InputForm';
import { useFormik } from 'formik';
import { UsageModel } from 'models/ProductModels';
import { UsageValidation } from 'validators/ProductValidations';
import Select from 'react-select';
import usageData from 'datas/usageData';
import ErrorValidate from '../../FormBase/ErrorValidate/ErrorValidate';
import CustomUsageOption from '../../FormOptions/CustomUsageOption/CustomUsageOption';
import TitleInput from '../../FormBase/TitleInput/TitleInput';

const getNameData = (icon: string) => {
  for (let i = 0; i < usageData.length; i++) {
    if (usageData[i].icon === icon) {
      return usageData[i].label;
    }
  }
  return null;
};

interface FormUsagePrpps {
  init: UsageModel | null;
  onSubmit: (formData: UsageModel) => Promise<any>;
}

const FormUsage: FC<FormUsagePrpps> = ({ init, onSubmit }) => {
  const initialValues = useMemo(
    () => ({
      name: init?.name ?? '',
      nameEng: init?.nameEng ?? '',
      icon: init
        ? { value:init._id, label: getNameData(init.icon), icon: init.icon }
        : { value: '', label: 'انتخاب آیکن', icon: '' }
    }),
    [init]
  );

  const formHook = useFormik({
    initialValues: initialValues,
    onSubmit: () => submitForm(),
    validationSchema: UsageValidation
  });

  const { touched, errors, handleSubmit, getFieldProps } = formHook;

  const submitForm = async () => {
    try {
      const formData: UsageModel = { ...formHook.values, icon: formHook.values.icon.icon };

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
    <form onSubmit={handleSubmit}>
      <InputForm
        placeholder="نام کاربرد"
        type="text"
        {...getFieldProps('name')}
        icon="GiMountainCave"
        error={touched.name ? errors.name : ''}
      />

      <InputForm
        placeholder="نام انگلیسی کاربرد"
        type="text"
        {...getFieldProps('nameEng')}
        icon="GiMountainCave"
        error={touched.nameEng ? errors.nameEng : ''}
      />

      <TitleInput title="انتخاب آیکن :" />
      <Select
        name="icon"
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        value={formHook.values.icon}
        options={usageData.map((item) => ({ ...item, key: item.icon }))}
        onChange={(v) => formHook.setFieldValue('icon', v)}
        onBlur={formHook.handleBlur}
        components={{ Option: CustomUsageOption as any }}
      />
      {formHook.errors.icon && formHook.touched.icon && (
        <ErrorValidate title={formHook.errors.icon.icon ?? ''} />
      )}

      <Button
        className="btn-public--green width-100 m-top-16"
        title={formHook.isSubmitting ? 'درحال ثبت کاربرد...' : 'ثبت کاربرد'}
        disabled={formHook.isSubmitting}
      />
    </form>
  );
};

export default memo(FormUsage);
