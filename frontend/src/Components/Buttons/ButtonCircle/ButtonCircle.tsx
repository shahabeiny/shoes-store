import { FC,memo } from 'react';
import './ButtonCircle.css';
import IconLazy from 'Components/Icon/IconLazy';

interface ButtonCircleProps {
  className?: string;
  title: string;
  icon: string;
  onClick?: () => void;
}

const ButtonCircle: FC<ButtonCircleProps> = ({ icon, onClick, title, className }) => (
  <div className={`btn-circle ${className}`} title={title} onClick={onClick}>
    <IconLazy nameIcon={icon}  color="var(--color-white)" />
  </div>
);

export default memo(ButtonCircle);
