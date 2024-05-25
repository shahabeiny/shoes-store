import { FC, Suspense, lazy } from 'react';
import User from './User';
import UserModel from 'models/UserModel';

const Error = lazy(() => import('Components/Error/Error'));

type UserListProps = {
  users: UserModel[];
  className?: string;
  iconError: string;
  titleError?: string;
  onEdit: (user: UserModel) => void;
  onBann?: (user: UserModel) => void;
  onEditPass: (user: UserModel) => void;
  onDeleteInactive?: (user: UserModel) => void;
};

const UserList: FC<UserListProps> = ({
  users,
  className,
  iconError,
  titleError,
  onEdit,
  onBann,
  onDeleteInactive,
  onEditPass
}) => {
  return (
    <>
      {users.length === 0 ? (
        <Suspense>
          <Error title={titleError ? titleError : 'کاربری یافت نشد'} icon={iconError} />
        </Suspense>
      ) : (
        <div className="grid-box m-top-16">
          {users.map((user) => (
            <User
              key={user._id}
              className={className}
              user={user}
              onEdit={() => onEdit(user)}
              onBann={() => onBann?.(user)}
              onEditPass={() => onEditPass(user)}
              onDeleteInactive={() => onDeleteInactive?.(user)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default UserList;
