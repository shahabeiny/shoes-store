import * as Yup from 'yup';

export const imageFormats = ['image/png', 'image/jpeg'];

type FileValidOptions = {
  required: boolean;
  fileType?: string[];
  maxSizeInBytes: number;
  titleRequired?: string;
};

export const fileSchema = ({
  required,
  titleRequired = "عکس",
  fileType,
  maxSizeInBytes = 1068569
}: FileValidOptions) => {
  let schema = required ? Yup.mixed().required(`${titleRequired} وارد نشده`) : Yup.mixed();

  if (fileType) {
    schema = schema.test(
      'is-valid-type',
      'فرمت نامعتبر',
      (value: any) => !value || fileType.includes(value.type)
    );
  }

  if (maxSizeInBytes) {
    schema = schema.test(
      'FILE_ZISE',
      'حداکثر آپلود ' + Math.trunc(maxSizeInBytes / 1000000) + 'mb',
      (value: any) => !value || value.size <= maxSizeInBytes
    );
  }

  return schema;
};
