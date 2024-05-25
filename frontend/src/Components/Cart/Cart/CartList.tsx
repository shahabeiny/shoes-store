import { FC } from 'react';
import Cart from './Cart';
import './Cart.css';
import { OrderProductsModel } from 'models/OrderModel';

interface CartListProps {
  products: OrderProductsModel[];
}

const CartList: FC<CartListProps> = ({ products }) => {
  
  return (
    <section className="cart-boxes">
      {products?.map((product) => (
        <Cart key={product._id} product={product}  />
      ))}
    </section>
  );
};

export default CartList;
