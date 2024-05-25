import  { FC ,memo} from 'react';
import { ProductSizeModel } from 'models/ProductKindModel';
import { SizeModel } from 'models/ProductModels';
import FormSizeKindProduct from '../../Form/FormListt/FormSizeKindProduct/FormSizeKindProduct';
import DetailModal from '../ModalBase/DetailModal';

type Props = {
  productColorId?: string;
  sizes: SizeModel[];
  init: ProductSizeModel | null;
  onHide: () => void;
  onSubmit: (formData: ProductSizeModel) => Promise<any>;
};

const ProductKindSizeModal: FC<Props> = ({ onHide, init, sizes, productColorId, onSubmit }) => {
  return (
    <DetailModal onHide={onHide}>
      <FormSizeKindProduct init={init} onSubmit={onSubmit} sizes={sizes} productColorId={productColorId} />
    </DetailModal>
  );
};

export default memo(ProductKindSizeModal);
