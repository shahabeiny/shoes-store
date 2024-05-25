import { FC } from 'react';
import { UsageModel } from 'models/ProductModels';
import DetailModal from '../ModalBase/DetailModal';
import FormUsage from '../../Form/FormListt/FormUsage/FormUsage';

type UsageModalProps = {
  onHide: () => void;
  init: UsageModel | null;
  onSubmit: (formData: UsageModel) => Promise<any>;
};

const UsageModal: FC<UsageModalProps> = ({ onHide, init, onSubmit }) => {
  return (
    <DetailModal onHide={onHide}>
      <FormUsage init={init} onSubmit={onSubmit} />
    </DetailModal>
  );
};

export default UsageModal;
