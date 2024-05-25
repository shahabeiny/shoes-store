import './OrderPanel.css';
import Tabs from 'Components/Panel/Tabs/Tabs';
import { FC, useEffect, useState } from 'react';
import HelmetTitle from 'Components/HelmetTitle/HelmetTitle';
import CircleSpinner from 'Components/Loadings/CircleSpinner/CircleSpinner';
import { OrderModel } from 'models/OrderModel';
import OrderList from 'Components/Panel/OrderItem/OrderList';
import BoxLink from 'Components/Panel/BoxLink/BoxLink';
import { handleWarningSwal } from 'utilities/sweetalert';
import { TabModel } from 'models/TabModel';
import { tabOrderDatas } from 'datas/tabData';
import { useConfirmOrderMutation, useGetOrdersByAdminQuery } from 'Redux/store/order/orderSlice';

const OrderPanel: FC = () => {
  const [tab, setTab] = useState<TabModel>(tabOrderDatas[0]);
  const [confirmOrder] = useConfirmOrderMutation();
  const {
    data: orders = [],
    refetch,
    isLoading
  } = useGetOrdersByAdminQuery(`activeTab=${tab.nameEng}`);

  useEffect(() => {
    refetch();
  }, [tab, refetch]);

  const handleConfirm = (order: OrderModel, operate: boolean) => {
    handleWarningSwal(
      () =>
        confirmOrder({
          orderSlug: `activeTab=${tab.nameEng}`,
          orderData: { orderId: order.orderInfo._id, operate }
        }),
      `آیا سفارش ${operate ? 'تایید' : 'کنسل'} شود؟`,
      operate ? 'تایید' : 'کنسل'
    );
  };

  return (
    <>
      <HelmetTitle title="همه سفارشات" />

      <div className="order__box-title">
        <BoxLink title="سفارشات من" link="me" icon="BsCart3" />
      </div>

      <div className="order__wrapper m-top-16">
        <Tabs
          className="order__tab"
          tabDatas={tabOrderDatas}
          getNameTab={(tabInfo) => setTab(tabInfo)}
        />

        {isLoading ? (
          <CircleSpinner />
        ) : (
          <OrderList
            title={tab.name}
            icon={tab.icon}
            orders={orders}
            onConfirm={(order) => handleConfirm(order, true)}
            onCancel={(order) => handleConfirm(order, false)}
          />
        )}
      </div>
    </>
  );
};

export default OrderPanel;
