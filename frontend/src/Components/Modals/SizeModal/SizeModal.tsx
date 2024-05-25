import { FC } from 'react';
import { SizeModel } from 'models/ProductModels';
import DetailModal from '../ModalBase/DetailModal';
import FormSize from '../../Form/FormListt/FormSize/FormSize';

type SizeModalProps = {
  onHide: () => void;
  init: SizeModel | null;
  onSubmit: (formData: SizeModel) => Promise<any>;
};

const SizeModal: FC<SizeModalProps> = ({ onHide, init, onSubmit }) => {
  return (
    <DetailModal onHide={onHide}>
      <FormSize init={init} onSubmit={onSubmit} />
    </DetailModal>
  );
};

export default SizeModal;
