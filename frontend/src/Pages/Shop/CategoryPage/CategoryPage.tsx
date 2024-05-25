import BrandList from 'Components/Brand/BrandList';
import CircleSpinner from 'Components/Loadings/CircleSpinner/CircleSpinner';
import UsageList from 'Components/Usage/UsageList';
import { useGetHeaderQuery } from 'Redux/store/home/homeSlice';
import { FC, Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

const Error = lazy(() => import('Components/Error/Error'));

const CategoryPage: FC = () => {
  const { slug } = useParams();
  const { data: { brands = [], usages = [] } = {},isLoading } = useGetHeaderQuery();

  return (
    <div className="container">
      {isLoading ? (
        <CircleSpinner />
      ) : brands.length === 0 || usages.length === 0 ? (
        <Suspense>
          <Error icon="BiCategory" />
        </Suspense>
      ) : slug === 'usages' ? (
        <UsageList usages={usages} />
      ) : (
        <BrandList brands={brands} />
      )}
    </div>
  );
};

export default CategoryPage;
