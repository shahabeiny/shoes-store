import loadable from '@loadable/component';
import './Icon.css';
import { memo, FC } from 'react';
import { IconBaseProps } from 'react-icons/lib';

type typesPropsIcon = {
  nameIcon: string;
  fontSize?: string;
  color?: string;
  onClick?: () => void;
  propsIcon?: IconBaseProps;
  title?: string;
  className?: string;
  aos?:string
}

const IconLazy: FC<typesPropsIcon> = ({
  nameIcon,
  aos,
  fontSize = '2rem',
  color = 'var(--color-icon)',
  title,
  className,
  propsIcon,
  onClick
}) => {
  const lib = nameIcon
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(' ')[0]
    .toLocaleLowerCase();
  const ElementIcon = loadable(() => import(`react-icons/${lib}/index.js`), {
    resolveComponent: (el: JSX.Element) => el[nameIcon as keyof JSX.Element]
  });

  return (
    <div
      style={{ fontSize, color }}
      data-aos={aos && aos}
      className={`icon ${className || ''} ${onClick ? 'icon--click':''}`}
      onClick={() => onClick?.()}>
      {title && <span className="tooltip__child">{title}</span>}
      <ElementIcon {...propsIcon} />
    </div>
  );
};

export default memo(IconLazy);
