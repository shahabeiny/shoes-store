import { useEffect, useState } from 'react';
import HelmetTitle from 'Components/HelmetTitle/HelmetTitle';
import Tabs from 'Components/Panel/Tabs/Tabs';
import CircleSpinner from 'Components/Loadings/CircleSpinner/CircleSpinner';
import OrderList from 'Components/Panel/OrderItem/OrderList';
import { TabModel } from 'models/TabModel';
import { tabOrderDatas } from 'datas/tabData';
import { useGetOrdersByUserQuery } from 'Redux/store/order/orderSlice';

const MyOrderPanel = () => {
  const [tab, setTab] = useState<TabModel>(tabOrderDatas[0]);
  const {
    data:orders=[],
    refetch,
    isLoading
  } = useGetOrdersByUserQuery(`q=me&activeTab=${tab.nameEng}`);
  
  useEffect(() => {
    refetch();
  }, [tab, refetch]);

  return (
    <>
      <HelmetTitle title="سفارشات من" />

      <div className="m-top-16">
        <Tabs
          className="order__tab"
          tabDatas={tabOrderDatas}
          getNameTab={(tabInfo) => setTab(tabInfo)}
        />

        {isLoading ? (
          <CircleSpinner />
        ) : (
          <OrderList title={tab.name} icon={tab.icon} orders={orders} />
        )}
      </div>
    </>
  );
};

export default MyOrderPanel;
