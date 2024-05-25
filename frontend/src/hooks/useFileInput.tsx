import { ChangeEvent, useCallback } from 'react';


interface UseFileInputOptions {
  fieldName: string;
  setFieldValue: (fieldName: string, value: any) => void;
}

const useFileInput = ({ fieldName,setFieldValue }: UseFileInputOptions) => {


  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      setFieldValue(fieldName, e.target.files[0]);
    },
    [setFieldValue, fieldName]
  );

  return { handleInputChange };
};

export default useFileInput;


