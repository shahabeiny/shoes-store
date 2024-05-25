import { FC, memo } from 'react';
import { OrderProductsModel } from 'models/OrderModel';
import { Link } from 'react-router-dom';
import apiUrl from 'services/apiUrl';
import IconLazy from 'Components/Icon/IconLazy';
import Color from 'Components/Color/Color';
import { ToRial } from 'utilities/toRial';
import TomanSvg from 'Components/Icon/TomanSvg';
import CartCounter from '../CartCounter/CartCounter';
import {
  useAddToCartMutation,
  useDeleteProductCartMutation,
  useMuinesFromCartMutation
} from 'Redux/store/order/orderSlice';

type CartProps = {
  product: OrderProductsModel;
};

const Cart: FC<CartProps> = ({ product }) => {
  const { _id, count, productSize, productColor } = product;
  const [addToCart] = useAddToCartMutation();
  const [muinesFromCart] = useMuinesFromCartMutation();
  const [deleteProductCart] = useDeleteProductCartMutation();

  const submitAddCart = () => {
    addToCart({
      cartData: {
        productId: product.product._id,
        productColorId: productColor._id,
        productSizeId: productSize._id ?? ''
      },
      orderSlug: 'q=cart'
    });
  };

  const submitMuinesCart = () => {
    muinesFromCart({
      cartData: {
        productSizeId: productSize._id ?? '',
        productOrderId: _id
      },
      orderSlug: 'q=cart'
    });
  };

  const submitDeleteProduct = () => {
    deleteProductCart({ orderSlug: 'q=cart', productOrderId: product._id });
  };

  return (
    <div className="cart-box radius__outter" key={_id} data-aos="fade-in">
      <div className="cart-box__right" data-aos="zoom-in">
        <Link to={`/product/detail/${product.product.slug}`} className="cart-box__img-wrapper">
          <img
            src={`${apiUrl}/${productColor.image}`}
            alt="cart-img"
            loading="lazy"
            className="cart-box__img"
          />
        </Link>

        <CartCounter
          count={+count}
          eachCart={+productSize.eachCart}
          total={+productSize.total}
          onIncrement={submitAddCart}
          onDecrement={submitMuinesCart}
          onDelete={submitDeleteProduct}
        />
      </div>
      <div className="cart-box__left">
        <IconLazy
          color="var(--color-pink)"
          className="cart-box__trash"
          nameIcon="HiOutlineTrash"
          title="حذف محصول از سبد"
          onClick={submitDeleteProduct}
          aos="zoom-in"
        />

        <div data-aos="zoom-in">
          <h2 className="cart-box__product-name">{`کفش ${product.product.name}`}</h2>
          <div className="cart-box__color-wrapper">
            <Color color={productColor.color.color} />
            <span className="cart-box__color">{productColor.color.name}</span>
          </div>
          <div className="cart-box__size-wrapper">
            <IconLazy nameIcon="LiaShoePrintsSolid" />

            <span className="cart-box__size">{`سایز ${productSize.size?.sizeNumber}`}</span>
          </div>
          <div className="cart-box__count-wrapper">
            <IconLazy nameIcon="GiConverseShoe" />

            <span className="cart-box__count">{`${count} جفت `}</span>
          </div>
          <div className="cart-box__price-wrapper">
            <IconLazy nameIcon="BsCurrencyDollar" />

            <span className="cart-box__price-title">قیمت:</span>
            <span className="cart-box__price">
              {ToRial(productSize.price.toString())} <TomanSvg />
            </span>
          </div>
          <div className="cart-box__price-end-wrapper">
            <IconLazy nameIcon="BsCart" />
            <span className="cart-box__price-end-title">قیمت نهایی:</span>
            <span className="cart-box__price-end">
              {ToRial((+productSize.price * +count).toString())} <TomanSvg />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Cart);
