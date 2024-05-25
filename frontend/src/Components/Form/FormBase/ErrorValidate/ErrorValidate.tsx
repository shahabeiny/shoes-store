import {memo,FC} from 'react'
import "./ErrorValidate.css";

interface ErrorValidateProps {
  title: string;
  className?: string;
}

const ErrorValidate:FC<ErrorValidateProps> = ({title,className })=> {
  return <h2 className={`error-validate ${className}`}>{title}</h2>;
}

export default memo(ErrorValidate);