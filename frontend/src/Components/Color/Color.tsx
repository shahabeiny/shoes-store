import { FC, memo } from 'react';
import './Color.css';

interface ColorProps {
  color: string;
  width?: string;
  height?: string;
  title?: string;
  className?: string;
  onClick?: () => void;
}

const Color: FC<ColorProps> = ({
  color,
  className = '',
  title = '',
  onClick,
  width = '',
  height = ''
}) => (
  <span
    className={`color ${className}`}
    style={{ backgroundColor: color, width, height, cursor: onClick ? 'pointer' : '' }}
    title={title}
    onClick={onClick}
  />
);

export default memo(Color);
