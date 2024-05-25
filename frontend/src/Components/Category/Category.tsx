import './Category.css';
import { FC, memo } from 'react';
import IconLazy from 'Components/Icon/IconLazy';
import { useCheckPermissionHook } from 'hooks/useCheckPermission';
import { BrandModel, ColorModel, SizeModel, UsageModel } from 'models/ProductModels';
import { PermissionModel, RoleModel } from 'models/RoleModel';
import { CategoryItem } from './CategoryItem';

type CategoryProps<T extends BrandModel | ColorModel | SizeModel | UsageModel | RoleModel> = {
  data: T & { categoryType: 'Brand' | 'Color' | 'Size' | 'Usage' | 'Role' };
  className?: string;
  permission: string;
  onEdit: () => void;
  onDelete: () => void;
};

const Category: FC<CategoryProps<any>> = memo(
  ({ data, permission, onEdit, onDelete }) => {
    const [checkPerm] = useCheckPermissionHook();
console.log("shaha")
    return (
      <section className="category radius__outter" key={data._id} data-aos="fade-in">
        <div className="category__info-wrapper" data-aos="zoom-in">
          <CategoryItem data={data} />
        </div>
        {checkPerm(permission) && (
          <div className="category__opration-wrapper">
            <IconLazy
              className="m-left-12"
              color="var(--color-pink)"
              nameIcon="HiOutlineTrash"
              title="حذف"
              aos="zoom-in"
              onClick={() => onDelete()}
            />

            <IconLazy
              color="var(--color-blue)"
              nameIcon="AiOutlineEdit"
              title="ویرایش"
              aos="zoom-in"
              onClick={() => onEdit()}
            />
          </div>
        )}
      </section>
    );
  },
  (prevProps, nextProps) => {
    const prevData = prevProps.data;
    const nextData = nextProps.data;
    return (
      prevData._id === nextData._id &&
      (prevData.name ?? '') === (nextData.name ?? '') &&
      (prevData.nameEng ?? '') === (nextData.nameEng ?? '') &&
      (prevData.color ?? '') === (nextData.color ?? '') &&
      (prevData.image ?? '') === (nextData.image ?? '') &&
      (prevData.icon ?? '') === (nextData.icon ?? '') &&
      (prevData.desc ?? '') === (nextData.desc ?? '') &&
      (prevData.sizeNumber ?? '') === (nextData.sizeNumber ?? '') &&
      ((!prevData.permissions && !nextData.permissions) || // If both are null or undefined
        (prevData.permissions &&
          nextData.permissions && // If both exist
          prevData.permissions.length === nextData.permissions.length && // Check the number of elements
          prevData.permissions.every((prevPermission: PermissionModel) =>
            nextData.permissions.some(
              (nextPermission: PermissionModel) => prevPermission._id === nextPermission._id
            )
          )))
    );
  }
);

export default Category;
