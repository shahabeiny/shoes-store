import { FC, memo } from 'react';
import './Size.css';

interface SizeProps {
  size?: number;
  className?: string;
  onClick?: () => void;
}

const Size: FC<SizeProps> = ({ size, className, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <span className={`size-box  ${className || ''}`} onClick={handleClick}>
      {size}
    </span>
  );
};

export default memo(Size);
