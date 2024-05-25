import { memo, FC, useContext, useState, Suspense, lazy } from 'react';
import TomanSvg from 'Components/Icon/TomanSvg';
import { ToRial } from 'utilities/toRial';
import Button from 'Components/Buttons/Button/Button';
import IconLazy from 'Components/Icon/IconLazy';
import { OrderInfoModel, OrderProductsModel } from 'models/OrderModel';
import './CartInfo.css';
import { useCartTotals } from 'hooks/useCartTotals';
import CounterDown from '../../CounterDown/CounterDown';
import { AuthContext } from 'context/ContextAuth';
import Loading from 'Components/Loadings/Loading/Loading';
import { useDeleteCartMutation, useFinishCartMutation } from 'Redux/store/order/orderSlice';

const EditProfileModal = lazy(() => import('Components/Modals/EditProfileModal/EditProfileModal'));

interface CartInfoProps {
  orderInfo: OrderInfoModel;
  products: OrderProductsModel[];
}

const CartInfo: FC<CartInfoProps> = ({ orderInfo, products }) => {
  const { totalPrice, totalCount } = useCartTotals({ products });
  const { userInfos, editMe } = useContext(AuthContext);
  const [isShowModal, setShowModal] = useState<boolean>(false);
  const [finishCart] = useFinishCartMutation();
  const [deleteCart] = useDeleteCartMutation();

  const handleDeleteCart = () => deleteCart({ orderSlug: 'q=cart', OrderId: orderInfo._id });

  const handleEdition = async (formData: FormData) => {
    try {
      formData.append('orderId', orderInfo._id);
      const result = await finishCart({ orderSlug: 'q=cart', orderData: formData }).unwrap();
      editMe(result);
      setShowModal(false);
      return result;
    } catch (error) {
      throw error;
    }
  };

  return (
    <section className="cart__info radius__outter" data-aos="fade-in">
      <div className="cart__info-content">
        <h3 className="cart__info-title">قیمت سبد : </h3>
        <span className="cart__info-value">
          {ToRial(totalPrice.toString())} <TomanSvg />
        </span>
      </div>
      <div className="cart__info-content">
        <h3 className="cart__info-title">تعداد محصول : </h3>
        <span className="cart__info-value">{`${totalCount} محصول`}</span>
      </div>
      <div className="cart__info-content">
        <h3 className="cart__info-title">مدت تکمیل سفارش : </h3>
        <CounterDown time={orderInfo.time_cancel} />
      </div>

      <div className="cart__info-footer">
        <IconLazy
          className="cart__info-footer-icon"
          color="var(--color-pink)"
          fontSize="var(--size-24)"
          nameIcon="HiOutlineTrash"
          title="حذف کل سبد خرید"
          onClick={handleDeleteCart}
        />

        <Button
          className="btn-public--green width-100"
          onClick={() => setShowModal(true)}
          title="تکمیل سفارش"
        />
      </div>

      {isShowModal && (
        <Suspense fallback={<Loading />}>
          <EditProfileModal
            init={{
              name: userInfos?.name!,
              family: userInfos?.family!,
              username: userInfos?.username!,
              address: userInfos?.address!
            }}
            onSubmit={handleEdition}
            onHide={() => setShowModal(false)}
          />
        </Suspense>
      )}
    </section>
  );
};

export default memo(CartInfo);
