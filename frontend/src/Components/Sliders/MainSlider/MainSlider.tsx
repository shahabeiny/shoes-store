import './MainSlider.css';
import { Scrollbar, Pagination, Navigation, A11y, EffectCoverflow } from 'swiper/modules';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Color from '../../Color/Color';
import { ProductModel } from 'models/ProductModels';
import apiUrl from 'services/apiUrl';
import { convertColorToArray } from 'utilities/convertColorToArray';
import IconLazy from 'Components/Icon/IconLazy';

type MainSliderProps = {
  products: ProductModel[];
};

const MainSlider: FC<MainSliderProps> = ({ products }) => {
  return (
    <>
    <Swiper
      modules={[Navigation, Pagination, A11y, EffectCoverflow]}
      spaceBetween={15}
      grabCursor={true}
      slidesPerView="auto"
      pagination={{ el: '.swiper-pagination', clickable: true }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        clickable: true
      }}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5
      }}
      className="main-sliders">
      {products &&
        products.map((product) => (
          <SwiperSlide className="main-slider" data-aos="fade-in">
            <Link
              to={`/product/detail/${product.slug}`}
              className="main-slider__wrapper"
              data-aos="zoom-in">
              <span className="main-slider__brand">NIKE</span>
              <div className="main-slider__right">
                <div className="main-slider__img-wrapper">
                <img
                  src={`${apiUrl}/${product.image}`}
                  className="main-slider__img"
                  alt={product.name}
                />
                </div>
                <div className="main-slider__colors" data-aos="zoom-in">
                  {convertColorToArray(product.productColors!)
                    ?.slice(0, 3)
                    ?.map((color) => <Color color={color.color} className="main-slider__color" />)}
                  {product.productColors!.length > 3 && <IconLazy nameIcon="GoPlus" />}
                </div>
                <></>
              </div>
              <div className="main-slider__left">
                <span className="main-slider__name">{product.name}</span>
                <span className="main-slider__usage">{`مناسب ${product.usage.name}`}</span>
              </div>
            </Link>
          </SwiperSlide>
        ))}

      
    </Swiper>
    <div className="slider-controler">
    <div className="swiper-pagination"></div>
  </div>
    </>
  );
};

export default React.memo(MainSlider);
