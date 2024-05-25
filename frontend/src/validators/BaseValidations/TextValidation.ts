import * as Yup from 'yup';

type NameValidLabel = 'انگلیسی' | 'فارسی';

const textValidation = (
  type: 'name' | 'text',
  label: NameValidLabel | undefined,
  regex: RegExp | undefined,
  min: number,
  max: number,
  isRequired: boolean = true
) => {
  let validation = Yup.string().trim()
    .min(min, `حداقل باید ${min} حرف باشد`)
    .max(max, `حداکثر باید ${max} حرف باشد`);

  if (isRequired) {
    validation = validation.required(`وارد نشده`);
  }

  if (type === 'name' && label && regex) {
    validation = validation.matches(
      regex,
      `باید ${label === 'انگلیسی' ? 'انگلیسی' : 'فارسی'} نوشته شود`
    );
  }

  return validation;
};

export default textValidation;
