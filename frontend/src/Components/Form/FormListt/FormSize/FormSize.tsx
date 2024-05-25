import InputForm from '../../FormBase/InputForm';
import Button from 'Components/Buttons/Button/Button';
import { FC, memo, useCallback } from 'react';
import { useFormik } from 'formik';
import { SizeModel } from 'models/ProductModels';
import { SizeValidation } from 'validators/ProductValidations';

interface FormSizePrpp {
  init: SizeModel | null;
  onSubmit: (formData: SizeModel) => Promise<any>;
}

const FormSize: FC<FormSizePrpp> = ({ init, onSubmit }) => {
  const formHook = useFormik({
    initialValues: {
      sizeNumber: init ? init.sizeNumber : 32
    },
    onSubmit: () => submitForm(),
    validationSchema: SizeValidation
  });

  const submitForm = async () => {
    try {
      const formData: SizeModel = {
        ...formHook.values,
        _id: init?._id ?? ''
      };

      // if (init?._id) {
      //   formData._id = init?._id ?? '';
      // }
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
        placeholder="سایز را وارد کنید"
        type="number"
        {...formHook.getFieldProps('sizeNumber')}
        icon="LiaShoePrintsSolid"
        error={formHook.touched.sizeNumber ? formHook.errors.sizeNumber : ''}
      />

      <Button
        className="btn-public--green width-100 m-top-16"
        title={formHook.isSubmitting ? 'درحال ثبت سایز...' : 'ثبت سایز'}
        disabled={formHook.isSubmitting}
      />
    </form>
  );
};

export default memo(FormSize);
