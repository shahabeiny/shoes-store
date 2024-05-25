import { FC, Suspense, lazy } from 'react';
import './CartPage.css';
import CircleSpinner from 'Components/Loadings/CircleSpinner/CircleSpinner';
import HelmetTitle from 'Components/HelmetTitle/HelmetTitle';
import CartInfo from 'Components/Cart/CartInfo/CartInfo';
import CartList from 'Components/Cart/Cart/CartList';
import EmptyCartSvg from 'Components/Icon/EmptyCartSvg';
import { useGetOrdersByUserQuery } from 'Redux/store/order/orderSlice';

const Error = lazy(() => import('Components/Error/Error'));

const CartPage: FC = () => {
  const { data: orders = [], isLoading } = useGetOrdersByUserQuery('q=cart');

  return (
    <>
      <HelmetTitle title="سبد خرید" />
      {isLoading ? (
        <CircleSpinner />
      ) : orders.length === 0 || orders[0].products.length === 0 ? (
        <Suspense>
          <Error title="سبد خرید خالی است" component={EmptyCartSvg} />
        </Suspense>
      ) : (
        <main className="cart">
          <div className="container">
            <div className="cart__wrapper">
              <CartList products={orders[0].products} />
              <CartInfo orderInfo={orders[0].orderInfo} products={orders[0].products} />
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default CartPage;
