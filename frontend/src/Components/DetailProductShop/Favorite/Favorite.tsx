import { memo, FC } from 'react';
import IconLazy from 'Components/Icon/IconLazy';
import { useAppDispatch } from 'hooks/useReduxhook';
import { ProductModel } from 'models/ProductModels';
import useCheckLogin from 'hooks/useCheckLogin';
import { addFavorite, deleteFavorite } from 'Redux/store/favorite/favoriteThunks';

type FavoriteProps = {
  isFavorite: boolean;
  className?: string;
  product: ProductModel | null;
};

const Favorite: FC<FavoriteProps> = ({ isFavorite, product, className }) => {
  const dispatch = useAppDispatch();
  const { checkLogin } = useCheckLogin();

  const handleFavoriteClick = () => {
    if (product) {
      if (checkLogin()) {
        isFavorite
          ? dispatch(deleteFavorite({ product, kindPage: 'shop' }))
          : dispatch(addFavorite(product));
      }
    }
  };

  return (
    <div
      style={{ cursor: 'pointer' }}
      className={`radius__inner ${className}`}
      onClick={handleFavoriteClick}>
      {isFavorite ? (
        <IconLazy nameIcon="MdFavorite" color="var(--color-red)" />
      ) : (
        <IconLazy nameIcon="AiOutlineHeart" color="var(--color-red)" />
      )}
    </div>
  );
};

export default memo(Favorite);
