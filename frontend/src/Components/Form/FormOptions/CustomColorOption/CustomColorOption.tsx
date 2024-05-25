import { memo, FC } from 'react';
import './CustomColorOption.css';

interface CustomOptionProps {
  innerProps: React.HTMLAttributes<HTMLDivElement>;
  label: string;
  data: { color: string };
}

const CustomColorOption: FC<CustomOptionProps> = ({ innerProps, label, data }) => (
  <div {...innerProps} className="option__wrapper">
    <span className="option__name-color" style={{ color: data.color }}>
      {`${label} _ `}
    </span>
    <span style={{ color: data.color }}>{data.color}</span>
  </div>
);

export default memo(CustomColorOption);
