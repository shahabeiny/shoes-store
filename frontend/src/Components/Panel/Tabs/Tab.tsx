import { FC, useTransition } from 'react';
import Loading from 'Components/Loadings/Loading/Loading';

type TabProps = {
  name: string;
  nameEng: string;
  isActive: boolean;
  isShow?: boolean;
  onClick?: () => void;
};

const Tab: FC<TabProps> = ({ name, nameEng, isActive,isShow, onClick }) => {

  const [isPending,startTransition] = useTransition()
 const handleClick = () => {
    startTransition(()=>{
      onClick?.();
    })
   
  };

  if(isPending){
    return <Loading/>
  }
  
  return (
    <li className={`tab ${isActive ? 'tab--active' : ''}`} onClick={handleClick} >
      <span className="tab__title">{name}</span>
      {isShow && <span className="tab__title">{name}</span>}
    </li>
  );
};

export default Tab;
