import { memo, lazy, Suspense } from 'react';

const BoxLink = lazy(() => import('Components/Panel/BoxLink/BoxLink'));

const BoxLinkList = () => {
  const permission = 'SHOW_PRODUCTS';
  return (
    <div className="product__box-titles" data-aos="fade-left">
      <Suspense>
        <BoxLink title="برندها" link="brands" icon="BiCategory" permission={permission} />
        <BoxLink title="رنگ ها" link="colors" icon="IoMdColorFill" permission={permission} />
        <BoxLink title="سایز ها" link="sizes" icon="LiaShoePrintsSolid" permission={permission} />
        <BoxLink title="کاربرد ها" link="usages" icon="GiMountainCave" permission={permission} />
      </Suspense>
    </div>
  );
};

export default memo(BoxLinkList);
