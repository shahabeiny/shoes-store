import { TabModel } from "../models/TabModel";


export const tabOrderDatas: TabModel[] = [
  { id: '1', name: 'جاری', nameEng: 'not_delivered', icon: 'TbTruckDelivery' },
  { id: '2', name: 'تحویل شده', nameEng: 'delivered', icon: 'FaRegCheckCircle' },
  { id: '3', name: 'تایید نشده', nameEng: 'not_confirmed', icon: 'RiHourglass2Fill' },
  { id: '4', name: 'کنسل شده', nameEng: 'canceled', icon: 'ImCancelCircle' }
];

export const tabUserDatas: TabModel[] = [
  { id: '1', name: 'غیر مسدود', nameEng: 'nonbanned', icon: 'TbUserCheck' },
  { id: '2', name: 'مسدود شده', nameEng: 'banned', icon: 'RiUserForbidLine' },
  { id: '3', name: 'تایید نشده', nameEng: 'inactive', icon: 'LiaUserTimesSolid' },
];