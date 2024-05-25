import { FC } from 'react';
import DetailModal from '../ModalBase/DetailModal';
import FormChangePass from '../../Form/FormListt/FormChangePass/FormChangePass';

type EditPassByAdminModalProps = {
  onHide: () => void;
  onSubmit: (formData: string) => Promise<any>;
};

const EditPassByAdminModal: FC<EditPassByAdminModalProps> = ({ onHide, onSubmit }) => {
  return (
    <DetailModal onHide={onHide}>
      <FormChangePass  onSubmit={onSubmit} />
    </DetailModal>
  );
};

export default EditPassByAdminModal;
