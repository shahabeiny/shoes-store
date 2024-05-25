import React, { FC } from 'react';
import { ProductColorModel } from 'models/ProductKindModel';
import DetailModal from '../ModalBase/DetailModal';
import FormColorKindProduct from '../../Form/FormListt/FormColorKindProduct/FormColorKindProduct';
import { ColorModel } from 'models/ProductModels';

type Props = {
  onHide: () => void;
  colors: ColorModel[];
  init: ProductColorModel | null;
  productId?: string;
  onSubmit: (formData: FormData) => Promise<any>;
};

const ProductKindColorModal: FC<Props> = ({ onHide, init, colors, productId, onSubmit }) => {
  return (
    <DetailModal onHide={onHide}>
      <FormColorKindProduct init={init} onSubmit={onSubmit} colors={colors} productId={productId} />
    </DetailModal>
  );
};

export default ProductKindColorModal;
