import { FC } from 'react';
import DetailModal from '../ModalBase/DetailModal';
import UserModel from 'models/UserModel';
import FormEditUserByAdmin from '../../Form/FormListt/FormEditUserByAdmin/FormEditUserByAdmin';
import { RoleModel } from 'models/RoleModel';

type EditUserByAdminModalProps = {
  onHide: () => void;
  roles:RoleModel[];
  init: UserModel | null;
  onSubmit: (formData: FormData) => Promise<any>;
};

const EditUserByAdminModal: FC<EditUserByAdminModalProps> = ({ onHide, init,roles, onSubmit }) => {
  return (
    <DetailModal onHide={onHide}>
      <FormEditUserByAdmin init={init} roles={roles} onSubmit={onSubmit} />
    </DetailModal>
  );
};

export default EditUserByAdminModal;
