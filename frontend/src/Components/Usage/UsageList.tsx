import { FC } from 'react';
import './Usage.css';
import Usage from './Usage';
import { UsageModel } from 'models/ProductModels';

type UsageListProps = {
  usages: UsageModel[];
  className?: string;
  limit?: number;
};

const UsageList: FC<UsageListProps> = ({ usages, className, limit}) => {
  const displayLimit = limit || usages.length;
  return (
    <div className={`grid-box ${className || ''}`}>
      {usages?.slice(0, displayLimit)?.map((usage) => <Usage key={usage._id} usage={usage} />)}
    </div>
  );
};

export default UsageList;
