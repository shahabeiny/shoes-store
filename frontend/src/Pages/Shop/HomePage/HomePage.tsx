import { FC, Suspense, lazy } from 'react';
import 'swiper/swiper-bundle.css';
import CarouselBrand from 'Components/Sliders/CarouselSlider/CarouselSlider';
import BannerMain from 'Components/BannerMain/BannerMain';
import HelmetTitle from 'Components/HelmetTitle/HelmetTitle';
import Loading from 'Components/Loadings/Loading/Loading';
import { useGetHeaderQuery, useGetMainInfoQuery } from 'Redux/store/home/homeSlice';
import CircleSpinner from 'Components/Loadings/CircleSpinner/CircleSpinner';

const UsageList = lazy(() => import('Components/Usage/UsageList'));
const MainSlider = lazy(() => import('Components/Sliders/MainSlider/MainSlider'));
const ProductSlider = lazy(() => import('Components/Sliders/ProductSlider/ProductSlider'));

const HomePage: FC = () => {
  const { data: { brands = [], usages = [] } = {} } = useGetHeaderQuery();
  const { data: { sellingProducts = [], newest = [], mainSlider = [] } = {}, isLoading } =
    useGetMainInfoQuery();

  return (
    <>
      <HelmetTitle title="فروشگاه کفش شهاب" />
      {isLoading ? (
        <CircleSpinner />
      ) : (
        <div className="home-page">
          <Suspense fallback={<Loading />}>
            <MainSlider products={mainSlider} />
          </Suspense>

          <CarouselBrand brands={brands} className="container m-top-32" />

          <ProductSlider
            className="container m-top-32"
            linkAllSlide="/product/list"
            titleSlide="جدیدترین ها"
            products={newest}
          />

          <BannerMain className="m-top-32" />

          <Suspense fallback={<Loading />}>
            <ProductSlider
              className="container m-top-32"
              titleSlide="پرفروش ها"
              products={sellingProducts}
            />
          </Suspense>

          <Suspense fallback={<Loading />}>
            <UsageList usages={usages} className="container m-top-32" limit={6} />
          </Suspense>
        </div>
      )}
    </>
  );
};

export default HomePage;
