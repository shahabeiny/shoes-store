import { useState, memo, FC } from 'react';
import Tab from './Tab';
import './Tab.css';
import IconLazy from 'Components/Icon/IconLazy';
import { TabModel } from 'models/TabModel';

type TabsProps = {
  className?: string;
  tabDatas: TabModel[];
  getNameTab: (tab: TabModel) => void;
};

const Tabs: FC<TabsProps> = ({ className, getNameTab, tabDatas }) => {
  const [idCurrent, setIdCurrent] = useState('1');
  const [activeMobile, setActiveMobile] = useState<boolean>(false);

  const handleTabClick = (tab: TabModel) => {
    setIdCurrent(tab.id);
    getNameTab(tab);
    setActiveMobile(false);
  };

  const renderTabs = () => (
    <>
      {tabDatas.map((tab) => (
        <Tab
          key={tab.id}
          name={tab.name}
          nameEng={tab.nameEng}
          isActive={tab.id === idCurrent}
          isShow={tab.isShow}
          onClick={() => handleTabClick(tab)}
        />
      ))}
    </>
  );

  return (
    <>
      {/* <div className="activator-tabs" onClick={() => setActiveMobile(true)} data-aos="fade-left">
        <IconLazy nameIcon="BsFilterLeft" fontSize="var(--size-24)" color="var(--color-green)" />
        <span className="activator-tabs__title">فیلتر</span>
      </div> */}
{/* 
      <ul className={`tabs__mobile radius__outter ${activeMobile ? 'tabs__mobile--active' : ''}`}>
        {renderTabs()}
      </ul> */}

      <ul className={`tabs radius__outter ${className || ''}`} data-aos="fade-left">
        {renderTabs()}
      </ul>

      <div
        className={`cover-tabs ${activeMobile ? 'cover-tabs--show' : ''}`}
        onClick={() => setActiveMobile(false)}></div>
    </>
  );
};

export default memo(Tabs);
