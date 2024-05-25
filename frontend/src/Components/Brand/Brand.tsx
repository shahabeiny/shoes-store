import { FC, Suspense, lazy, memo, useState } from 'react';
import { BrandModel } from 'models/ProductModels';
import { Link } from 'react-router-dom';
import apiUrl from 'services/apiUrl';
import IconLazy from 'Components/Icon/IconLazy';
import Loading from 'Components/Loadings/Loading/Loading';

const BrandInfoModal = lazy(() => import('Components/Modals/BrandInfoModal/BrandInfoModal'));

type BrandProps = {
  brand: BrandModel;
};

const Brand: FC<BrandProps> = ({ brand }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalClosed, setModalClosed] = useState<boolean>(true);

  const handleIconClick = () => {
    setShowModal(true);
    setTimeout(() => {
      setModalClosed(false);
    }, 10);
  };

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!modalClosed) {
      event.preventDefault();
    }
  };

  const handleModalHide = () => {
    setShowModal(false);
    setModalClosed(true);
  };

  return (
    <div className="box-brand radius__inner" data-aos="fade-in">
      <Link
        to={`/product/list?brand=${brand.slug}`}
        className="box-brand__link"
        onClick={handleLinkClick}
        data-aos="zoom-in">
        <img src={`${apiUrl}/${brand.image}`} alt={brand.nameEng} className="box-brand__img" />
        <span className="box-brand__title">{`برند ${brand.name}`}</span>

        {showModal && (
          <Suspense fallback={<Loading />}>
            <BrandInfoModal infoBrand={brand.desc} onHide={handleModalHide} />
          </Suspense>
        )}
      </Link>

        <IconLazy
        aos="zoom-in"
          nameIcon="BsThreeDots"
          color="var(--color-white)"
          title={`درباره برند ${brand.name}`}
          className="box-brand__icon" onClick={handleIconClick}
        />
 
    </div>
  );
};

export default memo(Brand);
