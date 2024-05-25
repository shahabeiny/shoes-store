import React, { FC } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './CarouselSlider.css';
import apiUrl from 'services/apiUrl';
import { BrandModel } from 'models/ProductModels';
import { Link } from 'react-router-dom';

type CarouselSliderProps = {
  className?:string;
  brands: BrandModel[];
};

const CarouselSlider: FC<CarouselSliderProps> = ({ brands,className }) => {
  return (
    <div className={`carousel__wrapper ${className || ''}`} style={{ overflow: 'hidden' }}>
      <Swiper
        className="carousel-sliders"
        modules={[Autoplay]}
        loop={true}
        spaceBetween={15}
        autoplay={{
          delay: 500,
          pauseOnMouseEnter: true,
          disableOnInteraction: false
        }}
        breakpoints={{
          480: { slidesPerView: 2 },
          740: { slidesPerView: 3 },
          1200: { slidesPerView: 8 },
        }}
        slidesPerView={5}
        pagination={{ clickable: true }}
        speed={10000}>
        {brands.map((brand) => (
          <SwiperSlide className="carousel-slider">
            <Link to={`/product/list?brand=${brand.slug}`} className="carousel-slider__wrapper">
              <img
                src={`${apiUrl}/${brand.image}`}
                alt={brand.nameEng}
                className="carousel-slider__img"
              />
            </Link>
          </SwiperSlide>
        ))}
       
      </Swiper>
    </div>
  );
};

export default React.memo(CarouselSlider);
