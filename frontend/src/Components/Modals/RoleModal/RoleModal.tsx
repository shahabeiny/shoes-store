import { FC } from 'react';
import DetailModal from '../ModalBase/DetailModal';
import { PermissionModel, RoleModel, addRoleModel } from 'models/RoleModel';
import FormRole from '../../Form/FormListt/FormRole/FormRole';

type RoleModalProps = {
  onHide: () => void;
  init: RoleModel | null;
  onSubmit: (formData: addRoleModel) => Promise<any>;
  permissions: PermissionModel[];
};

const RoleModal: FC<RoleModalProps> = ({ onHide, init, onSubmit, permissions }) => {
  return (
    <DetailModal onHide={onHide}>
      <FormRole init={init} onSubmit={onSubmit} permissions={permissions} />
    </DetailModal>
  );
};

export default RoleModal;
