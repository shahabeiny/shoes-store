import { memo, FC } from 'react';
import './BannerMain.css';
import IconLazy from 'Components/Icon/IconLazy';
import Color from 'Components/Color/Color';
import { Link } from 'react-router-dom';

type BannerMainProps = {
  className?: string;
};

const BannerMain: FC<BannerMainProps> = ({ className }) => {
  return (
    <Link to="/" className={`banner-main radius__outter  ${className || ''}`}>
      <div className="banner-main__info">
        <div className="banner-main__info-top">
          <h2 className="banner-main__name" data-aos="fade-up">
            Nike Air Max Fusion
          </h2>
          <p className="banner-main__desc" data-aos="fade-up">
            یک کفش ورزشی معتبر از برند معروف است. این کفش با ترکیبی از طراحی مدرن، فناوری پیشرفته و
            راحتی بی‌نظیر، جلب توجه علاقمندان به ورزش و استایل زندگی شده است. در طراحی این کفش، از
            جنس چرم با کیفیت بالا برای بازوی بالا استفاده شده است. این بازو با جزئیات دقیق و
            دوخت‌های مرتب به کفش زیبایی خاصی افزوده و احساس لطافت و استفاده را بهبود می‌بخشد.
          </p>
        </div>

        <div className="banner-main__info-bottom">
          <div className="banner-main__rate" data-aos="fade-in">
            <span className="banner-main__title">(محبوب هفته)</span>
            <span className="banner-main__rate-num">3</span>
            <IconLazy color="var(--color-yellow)" nameIcon="AiFillStar" />
          </div>

          <div className="banner-main__color-wraper" data-aos="fade-in">
            <span className="banner-main__color-title">در 3 رنگ</span>
            <div className="banner-main__colors">
              <Color color="#000" className="banner-main__color" />
              <Color color="#ff0eee" className="banner-main__color" />
              <Color color="var(--color-red)" className="banner-main__color" />
            </div>
          </div>
        </div>
      </div>

      <div className="banner-main__img-wraper">
        <img src="/images/green.png" alt="banner-main" className="banner-main__img" />
      </div>
    </Link>
  );
};

export default memo(BannerMain);
