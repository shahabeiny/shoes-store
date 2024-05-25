import { FC, memo } from 'react';
import './BoxTitle.css';
import IconLazy from 'Components/Icon/IconLazy';

type BoxTitleProps = {
  icon: string;
  value: string | number | undefined;
  title: string;
  colorIcon?: string;
};

const BoxTitle: FC<BoxTitleProps> = ({ icon, title, value, colorIcon }) => (
  <div className="section-title">
    <div className="section-title__key">
      <IconLazy nameIcon={icon} color={colorIcon}/>
      <span>{title}</span>
    </div>

    <span className="section-title__value">{value}</span>
  </div>
);

export default memo(BoxTitle);
