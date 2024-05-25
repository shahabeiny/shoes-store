import HelmetTitle from 'Components/HelmetTitle/HelmetTitle';
import { lazy, memo, FC } from 'react';

const Error = lazy(() => import('Components/Error/Error'));
const NotFoundSvg = lazy(() => import('Components/Icon/NotFoundSvg'));

const NotFoundPage = () => {
  return (
    <div>
      <HelmetTitle title="404" />
      <Error title="صفحه درخواستی وجود ندارد" component={NotFoundSvg} linkReturn={{ link:'/',text:"بازگشت به صفحه اصلی" }}/>
    </div>
  );
};

export default memo(NotFoundPage);
