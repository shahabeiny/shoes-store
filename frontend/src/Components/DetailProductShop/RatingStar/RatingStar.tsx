import { Rating } from '@mui/material';
import { FC, memo } from 'react';
import { useAppDispatch } from 'hooks/useReduxhook';
import useCheckLogin from 'hooks/useCheckLogin';
import { addRate } from 'Redux/store/favorite/favoriteThunks';

type RatingStarProps = {
  className?: string;
  value: number;
  id: string;
};

const RatingStar: FC<RatingStarProps> = ({ value, className, id }) => {
  const dispatch = useAppDispatch();
  const { checkLogin } = useCheckLogin();

  const handleRating = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    if (newValue !== null && checkLogin()) {
      dispatch(addRate({ productId: id, rate: newValue }));
    }
  };

  return (
    <Rating
      className={className || ''}
      value={value || 0}
      precision={1}
      name="size-large"
      size="large"
      readOnly={value > 0}
      onChange={handleRating}
    />
  );
};

export default memo(RatingStar);
