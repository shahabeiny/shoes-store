import { memo, FC } from 'react';
import IconLazy from 'Components/Icon/IconLazy';
import './CustomUsageOption.css';

interface CustomOptionProps {
  innerProps: React.HTMLAttributes<HTMLDivElement>;
  label: string;
  data: { icon: string };
}

const CustomUsageOption: FC<CustomOptionProps> = ({ innerProps, label, data }) => (
  <div {...innerProps} className="option__wrapper">
     <IconLazy nameIcon={data.icon} />
    <span className="option__name-usage">{label}</span>
  </div>
);

export default CustomUsageOption;
