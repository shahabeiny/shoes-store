import { Link } from 'react-router-dom';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './ProductSlider.css';
import { FC, memo } from 'react';
import { ProductModel } from 'models/ProductModels';
import apiUrl from 'services/apiUrl';
import IconLazy from 'Components/Icon/IconLazy';

type ProductSliderProps = {
  className?: string;
  titleSlide: string;
  linkAllSlide?: string;
  products: ProductModel[];
};

const ProductSlider: FC<ProductSliderProps> = ({
  className,
  titleSlide,
  linkAllSlide,
  products
}) => {
  return (
    <div className={`w-full ${className || ''}`}>
      <div className="product-slider__titles">
        <h1 className="product-slider__title">{titleSlide}</h1>
        {linkAllSlide && (
          <Link to={linkAllSlide} className="product-slider__title-link">
            همه
            <IconLazy nameIcon='IoIosArrowBack' color='var(--color-green)'/>
          </Link>
        )}
      </div>

      <Swiper
        modules={[Navigation, Pagination, A11y]}
        grabCursor={true}
        slidesPerView="auto"
        pagination={{ el: '.swiper-pagination', clickable: true }}
        spaceBetween={15}
        dir='rtl'
        
        // navigation={{
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev',
        //   clickable: true
        // }}
        breakpoints={{
          320: { slidesPerView: 1 },
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
          1200: { slidesPerView: 5 }
        }}
     
        className="w-full">
        {products &&
          products.map((product) => (
            <SwiperSlide className="product-slider">
              <Link to={`/product/detail/${product.slug}`} className="product-slider__wrapper">
                <span className="product-slider__brand">{product.brand.nameEng}</span>
                <img
                  src={`${apiUrl}/${product.image}`}
                  className="product-slider__img"
                  alt={product.name}
                  loading="lazy"
                  data-aos="zoom-in"
                />

                <div className="product-slider__detail">
                  <span className="product-slider__name">{product.name}</span>
                  <span className="product-slider__usage">{`مناسب ${product.usage.name}`}</span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
          
      </Swiper>
    </div>
  );
};

export default memo(ProductSlider);
