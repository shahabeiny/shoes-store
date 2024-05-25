import { FC, Suspense, lazy, useMemo } from 'react';
import { OrderModel } from '../../../models/OrderModel';
import OrderItem from './OrderItem';

const Error = lazy(() => import('../../Error/Error'));
const EmptyOrderSvg = lazy(() => import('../../Icon/EmptyOrderSvg'));

type OrderListProps = {
  title: string;
  icon: string;
  className?: string;
  orders: OrderModel[];
  onConfirm?: (order: OrderModel) => void;
  onCancel?: (order: OrderModel) => void;
};

const OrderList: FC<OrderListProps> = ({
  title,
  orders,
  icon,
  onConfirm,
  onCancel
}) => {


  return (
    <>
      {orders.length === 0 ? (
        <Suspense>
          <Error title="سفارشی وجود ندارد" component={EmptyOrderSvg} />
        </Suspense>
      ) : (
        <div className="m-top-16">{orders.map((order) => (
          <OrderItem
            key={order.orderInfo._id}
            title={title}
            icon={icon}
            order={order}
            showIconConfirm={onCancel || onConfirm ? true:false}
            onConfirm={() => onConfirm?.(order)}
            onCancel={() =>  onCancel?.(order)}
            className="m-top-16"
          />
        ))}</div>
      )}
    </>
  );
};
export default OrderList;
