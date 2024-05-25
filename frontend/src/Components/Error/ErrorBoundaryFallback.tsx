import BoundarySvg from 'Components/Icon/BoundarySvg';
import { FC } from 'react';
import './Error.css';
import Button from 'Components/Buttons/Button/Button';

interface ErrorBoundaryProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorBoundaryFallback: FC<ErrorBoundaryProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="error-page">
          <div className="error-page__wrapper">
            <BoundarySvg />
            <p className="error-page__title">
              مشکلی ایجاد شده لطفا دوباره تلاش کنید.
            </p>
            <Button title='تلاش مجدد' onClick={resetErrorBoundary} className='m-top-16 btn-public--green'/>
          </div>
        </div>
  );
};

export default ErrorBoundaryFallback;
