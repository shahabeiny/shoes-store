import { FC } from 'react';
import DetailModal from '../ModalBase/DetailModal';
import { UserProileModel } from 'models/UserModel';
import FormEditProfile from '../../Form/FormListt/FormEditProfile/FormEditProfile';

type EditProfileModalProps = {
  onHide: () => void;
  init:  UserProileModel| null;
  onSubmit: (formData: FormData) => Promise<any>;
};

const EditProfileModal: FC<EditProfileModalProps> = ({ onHide, init, onSubmit }) => {

  return (
    <DetailModal onHide={onHide}>
      <FormEditProfile init={init}  onSubmit={onSubmit} />
    </DetailModal>
  );
};

export default EditProfileModal;
