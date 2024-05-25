import { FC, memo } from 'react';
import BoxTitle from '../BoxTitle/BoxTitle';
import { ProductSizeModel } from 'models/ProductKindModel';
import { formatDate } from 'utilities/formatDate';

type props = {
  productSize: ProductSizeModel;
};

const BoxesTitleDetailProduct: FC<props> = ({ productSize }) => {
  return (
    <div className="product-kind__titles" data-aos="zoom-in">
      <BoxTitle
        icon="BsWallet2"
        colorIcon="var(--color-green)"
        value={`${productSize?.total} جفت`}
        title="تعداد قابل سفارش:"
      />
      <BoxTitle
        icon="BsCartCheck"
        colorIcon="var(--color-green)"
        value={`${productSize?.eachCart} جفت`}
        title="مجاز برای هر سبد:"
      />
      <BoxTitle
        icon="GiFrozenBlock"
        colorIcon="var(--color-green)"
        value={`${productSize?.frozen} جفت`}
        title="فریز شده:"
      />

      <BoxTitle
        icon="MdOutlineSell"
        colorIcon="var(--color-green)"
        value={`${productSize?.sold} جفت`}
        title="فروخته شده:"
      />

      <BoxTitle
        icon="BsCalendarDate"
        colorIcon="var(--color-green)"
        value={productSize?.createdAt ? formatDate(productSize?.createdAt ?? '') : ''}
        title="تاریخ تولید:"
      />
    </div>
  );
};

export default memo(BoxesTitleDetailProduct);
