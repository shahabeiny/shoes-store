import './AddCategory.css';
import IconLazy from 'Components/Icon/IconLazy';
import { memo, FC, lazy, Suspense } from 'react';
import { useCheckPermissionHook } from 'hooks/useCheckPermission';

const ButtonCircle = lazy(() => import('Components/Buttons/ButtonCircle/ButtonCircle'));

type AddCategoryProps = {
  icon: string;
  permission: string;
  title: string;
  className?: string;
  onClick: () => void;
};

const AddCategory: FC<AddCategoryProps> = memo(
  ({ icon, title, className, permission, onClick }) => {
    const [checkPerm] = useCheckPermissionHook();
    console.log('aaaa');
    return (
      <div className={`add-category ${!checkPerm(permission) ? 'add-category--hidden' : ''}`}>
        <div className={`box-value radius__outter ${className}`} onClick={onClick}>
          <IconLazy nameIcon={icon} color="var(--color-green)" />
          <span className="box-value__title">{title}</span>
        </div>

        <Suspense>
          <ButtonCircle className="box-value__mobile" title={title} icon={icon} onClick={onClick} />
        </Suspense>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.title === nextProps.title;
  }
);

export default AddCategory;
