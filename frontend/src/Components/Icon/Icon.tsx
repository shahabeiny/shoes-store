import { IconBaseProps } from 'react-icons/lib';
import { memo, FC } from 'react';
import './Icon.css';

interface typesPropsIcon {
  nameIcon: string;
  fontSize?: string;
  color?: string;
  onClick?: () => void;
  propsIcon?: IconBaseProps;
  title?: string;
  className?: string;
}

const Icon: FC<typesPropsIcon> = ({
  nameIcon,
  fontSize = '2rem',
  color='var(--color-icon)',
  title,
  className,
  propsIcon,
  onClick
}) => {
  const ElementIcon = require(`react-icons/${nameIcon}`);

  return (
    <div
      style={{ fontSize, color }}
      className={`icon ${className || ''} ${onClick && 'icon--click'}`}
      onClick={() => onClick?.()}>
      {title && <span className="tooltip__child">{title}</span>}
      <ElementIcon {...propsIcon} />
    </div>
  );
};

export default memo(Icon);
