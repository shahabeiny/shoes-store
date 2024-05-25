import { FC, Suspense,lazy, memo } from 'react';
import './OrderItem.css';
import Color from 'Components/Color/Color';
import IconLazy from 'Components/Icon/IconLazy';
import { OrderModel } from 'models/OrderModel';
import apiUrl from 'services/apiUrl';
import { ToRial } from 'utilities/toRial';
import TomanSvg from 'Components/Icon/TomanSvg';
import { useCartTotals } from 'hooks/useCartTotals';
import { formatDate } from 'utilities/formatDate';
import { useCheckPermissionHook } from 'hooks/useCheckPermission';

const UserPopUp = lazy(() => import('../UserPopUp/UserPopUp'));

interface OrderItemProps {
  title: string;
  icon: string;
  className?: string;
  order: OrderModel;
  showIconConfirm?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const OrderItem: FC<OrderItemProps> = memo(({
  title,
  order,
  icon,
  className,
  showIconConfirm = false,
  onConfirm,
  onCancel
}) => {
  const { totalPrice } = useCartTotals({ products: order.products });
  const [checkPerm] = useCheckPermissionHook();
  const status_delivery = order.orderInfo.status_delivery;

  const iconsConfirm = () =>
    checkPerm('EDIT_ORDERS') &&
    status_delivery === 'not_confirmed' &&
    showIconConfirm && (
      <div className="order-item__header-left flex">
        <IconLazy
          nameIcon="GiConfirmed"
          color="var(--color-green)"
          title="تایید سفارش"
          fontSize="2.5rem"
          onClick={() => onConfirm?.()}
        />
        <IconLazy
          nameIcon="GiCancel"
          color="var(--color-red)"
          title="لغو سفارش"
          fontSize="2.5rem"
          onClick={() => onCancel?.()}
        />
      </div>
    );

  return (
    <section className={`order-item radius__outter ${className || ''}`}>
      <div className="order-item__top flex">
        <div className="order-item__header flex">
          <div className="order-item__header-right flex">
            <IconLazy
              nameIcon={icon}
              color={status_delivery === 'canceled' ? 'var(--color-red)' : 'var(--color-green)'}
            />
            <span>{title}</span>
          </div>
          {iconsConfirm()}
        </div>
        <div className="order-item__header-infos flex">
          <div className="order-item__title-wrapper flex">
            <span className="order-item__header-value">
              {formatDate(order.orderInfo.createdAt)}
            </span>
          </div>
          <div className="order-item__title-wrapper flex">
            <span className="order-item__header-title">کد سفارش</span>
            <span className="order-item__header-value">{order.orderInfo.orderID}</span>
          </div>
          <div className="order-item__title-wrapper flex">
            <span className="order-item__header-title">مبلغ</span>
            <span className="order-item__header-value">
              {ToRial(totalPrice.toString())} <TomanSvg />
            </span>
            
          </div>
          {order.orderInfo.user && (
              <span className="order-item__header-user">
                اطلاعات کاربر
                <div className="title-popup">
                  <Suspense>{<UserPopUp user={order.orderInfo.user} />}</Suspense>
                </div>
              </span>
            )}
        </div>
      </div>
      <div className="order-item__bottom flex">
        <div className="grid-box">
          {order?.products.map((pro) => (
            <div className="order-item__detail-product radius__inner flex" key={pro._id}>
              <div className="order-item__detail-product-img-wrapper flex">
                <img
                  src={`${apiUrl}/${pro.productColor.image}`}
                  alt="name shoe"
                  className="order-item__detail-product-img"
                />
                <div className="order-item__detail-product-num flex">
                  <span>{pro.count} *</span>
                  <Color color={pro.productColor.color.color} />
                </div>
              </div>
              <div className="order-item__detail-product-infos-wrapper flex">
                <span className="order-item__detail-product-name">{pro.product.name}</span>
                <span>سایز {pro.productSize.size?.sizeNumber}</span>
                <span>
                  {ToRial(pro?.finalPrice?.toString() ?? '')} <TomanSvg />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
},
(prevProps, nextProps) => {
  return (
    prevProps.order.orderInfo._id === nextProps.order.orderInfo._id 
  );
}
);

export default OrderItem;
