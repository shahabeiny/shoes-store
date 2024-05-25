import { memo, FC } from 'react';
import apiUrl from 'services/apiUrl';
import "./CustomBrandOption.css"

interface CustomOptionProps {
  innerProps: React.HTMLAttributes<HTMLDivElement>;
  label: string;
  data: { img: string };
}

const CustomBrandOption: FC<CustomOptionProps> = ({ innerProps, label, data }) => (
  <div {...innerProps} className="option__wrapper">
     <img src={`${apiUrl}/${data.img}`} alt={label} className="option__img-brand" />
    <span className="option__name-brand">{label}</span>
  </div>
);

export default memo(CustomBrandOption);
