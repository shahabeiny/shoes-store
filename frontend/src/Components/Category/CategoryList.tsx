import { FC,  lazy, memo, Suspense } from 'react';
import Category from './Category';

const Error = lazy(() => import('../Error/Error'));

type CategoryListProps<T> = {
  data: T[];
  type : 'Brand' | 'Usage' | 'Color' | 'Size' | 'Role';
  permission: string;
  iconError: string;
  titleError?: string;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
};

const CategoryList: FC<CategoryListProps<any>> = memo(({
  data,
  type,
  permission,
  iconError,
  titleError,
  onEdit,
  onDelete
}) => {

  return (
    <div>
      {data.length === 0 ? (
        <Suspense>
          <Error title={titleError ? titleError : 'موردی یافت نشد'} icon={iconError} />
        </Suspense>
      ) : (
        <div className="grid-box m-top-16"> {data.map((item) => (
          <Category
            key={item._id}
            data={{ ...item, categoryType: type }}
            permission={permission}
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(item)}
          />
        ))}</div>
      )}
    </div>
  );
},
  (prevProps, nextProps) => {
    const prevData = prevProps.data;
    const nextData = nextProps.data;
    return (
      prevData === nextData
    );
  }
);

export default CategoryList;
