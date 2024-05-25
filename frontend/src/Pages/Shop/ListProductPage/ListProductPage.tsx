import { lazy, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/useReduxhook';
import { useLocation } from 'react-router-dom';
import { getProducts } from 'Redux/store/product/productThunks';
import HelmetTitle from 'Components/HelmetTitle/HelmetTitle';
import CircleSpinner from 'Components/Loadings/CircleSpinner/CircleSpinner';
import ProductList from 'Components/Product/ProductList';

const ListProductPage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    const separator = location.search ? '&' : '?';
    dispatch(getProducts(`${location.search}${separator}is_panel=${false}`));
  }, [location.pathname, location.search]);

  return (
    <div>
      <HelmetTitle title="لیست محصولات" />
      <div className="container">
        {loading ? <CircleSpinner /> : <ProductList products={products} link="/product/detail" />}
      </div>
    </div>
  );
};

export default ListProductPage;
