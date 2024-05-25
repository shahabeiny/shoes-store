import { FC } from 'react';
import "./BrandInfoModal.css"
import DetailModal from '../ModalBase/DetailModal';

type BrandInfoModalProps = {
  onHide: () => void;
  infoBrand:string;
};

const BrandInfoModal: FC<BrandInfoModalProps> = ({ onHide,infoBrand}) => {
  return (
    <DetailModal onHide={onHide}>
      <p className='brand-info'>{infoBrand}</p>
    </DetailModal>
  );
};

export default BrandInfoModal;
