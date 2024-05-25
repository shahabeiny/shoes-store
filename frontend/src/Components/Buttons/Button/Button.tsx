import { Link } from 'react-router-dom';
import './Button.css';
import { FC } from 'react';

type ButtonProps = {
  className?: string;
  to?: string;
  disabled?: boolean;
  title: string;
  onClick?: () => void;
};

const Button: FC<ButtonProps> = ({ className, to, disabled, onClick, title}) => {
  if (to) {
    return (
      <Link to={to} className={`btn-public radius__inner ${className}`}>
        {title}
      </Link>
    );
  } else {
    return (
      <button
        className={`btn-public radius__inner ${className}`}
        disabled={disabled}
        onClick={onClick}
        type="submit">
        {title}
      </button>
    );
  }
};

export default Button;
