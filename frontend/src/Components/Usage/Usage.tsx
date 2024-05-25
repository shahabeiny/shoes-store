import { FC, memo } from 'react';
import IconLazy from 'Components/Icon/IconLazy';
import { UsageModel } from 'models/ProductModels';
import { Link } from 'react-router-dom';

type UsageProps = {
  usage: UsageModel;
};

const Usage: FC<UsageProps> = ({ usage }) => {
  return (
    <Link
      to={`/product/list?usage=${usage.slug}`}
      className="box-usage radius__inner"
      data-aos="fade-in">
      <IconLazy nameIcon={usage.icon} fontSize="3rem" color="var(--color-white)" aos="zoom-in" />
      <span className="box-usage__title" data-aos="zoom-in">{`کاربرد ${usage.name}`}</span>
    </Link>
  );
};

export default memo(Usage);
