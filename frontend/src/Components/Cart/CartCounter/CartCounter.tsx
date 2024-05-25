import { FC, memo } from 'react';
import IconLazy from 'Components/Icon/IconLazy';

type CartCounterProps = {
  count: number;
  eachCart: number;
  total: number;
  onDelete: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
};

const CartCounter: FC<CartCounterProps> = ({
  count,
  eachCart,
  total,
  onDelete,
  onIncrement,
  onDecrement
}) => {
  return (
    <div className="cart-box__counter radius__inner">
      {count < eachCart && total !== 0 ? (
        <IconLazy color="var(--color-pink)" nameIcon="AiOutlinePlus" onClick={onIncrement} />
      ) : (
        <span className="counter__number-max">حداکثر</span>
      )}

      <h3 className="cart-box__counter-num">{count}</h3>

      {count > 1 ? (
        <IconLazy color="var(--color-pink)" nameIcon="FaMinus" onClick={onDecrement} />
      ) : (
        <IconLazy color="var(--color-pink)" nameIcon="HiOutlineTrash" onClick={onDelete} />
      )}
    </div>
  );
};

export default memo(CartCounter);
