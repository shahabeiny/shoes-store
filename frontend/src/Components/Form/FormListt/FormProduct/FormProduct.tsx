import Button from 'Components/Buttons/Button/Button';
import { FC, memo, useMemo } from 'react';
import InputForm from '../../FormBase/InputForm';
import TitleInput from '../../FormBase/TitleInput/TitleInput';
import { useFormik } from 'formik';
import Select from 'react-select';
import { BrandModel, ProductModel, UsageModel } from 'models/ProductModels';
import { ProductValidation } from 'validators/ProductValidations';
import useFileInput from 'hooks/useFileInput';
import CustomBrandOption from '../../FormOptions/CustomBrandOption/CustomBrandOption';
import ErrorValidate from '../../FormBase/ErrorValidate/ErrorValidate';
import CustomUsageOption from '../../FormOptions/CustomUsageOption/CustomUsageOption';

interface FormProductPrpps {
  brands: BrandModel[];
  usages: UsageModel[];
  init: ProductModel | null;
  onSubmit: (formData: FormData) => Promise<any>;
}

const FormProduct: FC<FormProductPrpps> = ({ brands, usages, init, onSubmit }) => {
  const initialValues = useMemo(
    () => ({
      name: init?.name ?? '',
      nameEng: init?.nameEng ?? '',
      image: '',
      desc: init?.desc ?? '',
      brandId: init
        ? { value: init.brand?._id, label: `برند ${init.brand?.name}`, img: init.brand.image }
        : { value: '', label: 'انتخاب برند', img: '' },
      usageId: init
        ? { value: init.usage?._id, label: `کاربرد ${init.usage?.name}`, icon: init.usage.icon }
        : { value: '', label: 'انتخاب کاربرد', icon: '' }
    }),
    [init]
  );

  const formHook = useFormik({
    initialValues,
    onSubmit: () => submitForm(),
    validationSchema: init ? ProductValidation(false) : ProductValidation
  });

  const { handleInputChange } = useFileInput({
    fieldName: 'image',
    setFieldValue: formHook.setFieldValue
  });

  const optionsCreator = (brands: BrandModel[]) => {
    return (
      brands?.map((b) => ({ value: b._id ?? '', label: `برند ${b.name}`, img: b.image })) || []
    );
  };

  const optionsCreatorUsage = (usages: UsageModel[]) => {
    return (
      usages?.map((b) => ({ value: b._id ?? '', label: `کاربرد ${b.name}`, icon: b.icon })) || []
    );
  };

  const { touched, errors, handleSubmit, getFieldProps, setSubmitting, resetForm } = formHook;

  const createFormData = (values: Record<string, any>) => {
    const formData = new FormData();
    formData.append('image', values.image);
    formData.append('name', values.name);
    formData.append('nameEng', values.nameEng);
    formData.append('desc', values.desc);
    formData.append('brandId', values.brandId.value);
    formData.append('usageId', values.usageId.value);
    if (init?._id) {
      formData.append('_id', init._id);
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
        placeholder="نام محصول"
        type="text"
        {...getFieldProps('name')}
        icon="MdOutlineTitle"
        error={touched.name ? errors.name : ''}
      />

      <InputForm
        placeholder="نام انگلیسی محصول"
        type="text"
        {...getFieldProps('nameEng')}
        icon="MdOutlineTitle"
        error={touched.nameEng ? errors.nameEng : ''}
      />

      <Select
        name="brandId"
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        value={formHook.values.brandId}
        options={optionsCreator(brands)}
        className="m-top-16"
        onChange={(v) => formHook.setFieldValue('brandId', v)}
        onBlur={formHook.handleBlur}
        components={{ Option: CustomBrandOption as any }}
      />
      {formHook.errors.brandId && formHook.touched.brandId && (
        <ErrorValidate title={formHook.errors.brandId.value ?? ''} />
      )}

      <Select
        name="usageId"
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        value={formHook.values.usageId}
        options={optionsCreatorUsage(usages)}
        className="m-top-16"
        onChange={(v) => formHook.setFieldValue('usageId', v)}
        onBlur={formHook.handleBlur}
        components={{ Option: CustomUsageOption as any }}
      />
      {formHook.errors.usageId && formHook.touched.usageId && (
        <ErrorValidate title={formHook.errors.usageId.value ?? ''} />
      )}

      <InputForm
        placeholder="توضیحات محصول"
        type="textarea"
        {...getFieldProps('desc')}
        icon="MdOutlineDescription"
        error={touched.desc ? errors.desc : ''}
      />

      <div>
        <TitleInput title="آپلود عکس دمو محصول:" />
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
        title={formHook.isSubmitting ? 'درحال ثبت محصول...' : 'ثبت محصول'}
        disabled={formHook.isSubmitting}
      />
    </form>
  );
};

export default memo(FormProduct);
