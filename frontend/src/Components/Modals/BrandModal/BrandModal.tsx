import { FC } from 'react';
import { BrandModel } from 'models/ProductModels';
import FormBrand from '../../Form/FormListt/FormBrand/FormBrand';
import DetailModal from '../ModalBase/DetailModal';

type BrandModalProps = {
  onHide: () => void;
  init: BrandModel | null;
  onSubmit: (formData: FormData) => Promise<any>;
};

const BrandModal: FC<BrandModalProps> = ({ onHide, init, onSubmit }) => {
  return (
    <DetailModal onHide={onHide}>
      <FormBrand init={init} onSubmit={onSubmit} />
    </DetailModal>
  );
};

export default BrandModal;
