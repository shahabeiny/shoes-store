import { FC } from 'react';
import { BrandModel, ProductModel, UsageModel } from 'models/ProductModels';
import DetailModal from '../ModalBase/DetailModal';
import FormProduct from '../../Form/FormListt/FormProduct/FormProduct';

type ProductModalProps = {
  onHide: () => void;
  brands: BrandModel[];
  usages: UsageModel[];
  init: ProductModel | null;
  onSubmit: (formData: FormData) => Promise<any>;
};

const ProductModal: FC<ProductModalProps> = ({ onHide, init, onSubmit, brands, usages }) => {
  return (
    <DetailModal onHide={onHide}>
      <FormProduct init={init} onSubmit={onSubmit} usages={usages} brands={brands} />
    </DetailModal>
  );
};

export default ProductModal;
