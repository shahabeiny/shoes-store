import { FC } from 'react';
import { ColorModel } from 'models/ProductModels';
import DetailModal from '../ModalBase/DetailModal';
import FormColor from '../../Form/FormListt/FormColor/FormColor';

type ColorModalProps = {
  onHide: () => void;
  init: ColorModel | null;
  onSubmit: (formData: ColorModel) => Promise<any>;
};

const ColorModal: FC<ColorModalProps> = ({ onHide, init, onSubmit }) => {
  return (
    <DetailModal onHide={onHide}>
      <FormColor init={init} onSubmit={onSubmit} />
    </DetailModal>
  );
};

export default ColorModal;
