import { FC, memo, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import InputForm from '../../FormBase/InputForm';
import { ProductModel } from 'models/ProductModels';
import useDebounce from 'hooks/useDebounce';
import './SearchProduct.css';
import { SearchProductValidation } from 'validators/ProductValidations';
import { convertColorToArray } from 'utilities/convertColorToArray';
import { useAppDispatch, useAppSelector } from 'hooks/useReduxhook';
import { getProducts } from 'Redux/store/product/productThunks';

type SearchProduct = {
  selectedProduct: (product: ProductModel) => void;
};

const SearchProduct: FC<SearchProduct> = ({  selectedProduct }) => {
  const [clickDisabled, setClickDisabled] = useState(false);
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);

  const formHook = useFormik({
    initialValues: { name: '' },
    onSubmit: (values) => {
      // onSubmit(values.name);
    },
    validationSchema: SearchProductValidation
  });

  const debouncedSearch = useDebounce(formHook.values.name);

  useEffect(() => {
    formHook.validateForm();
  }, [formHook.values.name]);

  useEffect(() => {
    if (debouncedSearch.length ) dispatch(getProducts(`?name=${debouncedSearch}&is_slide=false&is_panel=false`));
  }, [debouncedSearch]);

  const handleClick = (product: ProductModel) => {
    if (!clickDisabled) {
      setClickDisabled(true);

      setTimeout(() => {
        setClickDisabled(false);
      }, 1000);

      selectedProduct(product);
    }
  };


  return (
    <form onSubmit={formHook.handleSubmit} className="autocomplete__form">
      <InputForm
        type="search"
        name="name"
        placeholder="نام کفش"
        value={formHook.values.name}
        onChange={formHook.handleChange}
        error={formHook.touched.name ? formHook.errors.name : ''}
      />

      <ul className="results">
        {formHook.values.name.length && products.length > 0
          ? products.map((product) => (
              <li className="results__item" key={product._id} onClick={() => handleClick(product)}>
                {` ${product.name} _ در ${convertColorToArray(product.productColors!)?.length} رنگ `}
              </li>
            ))
          : null}
      </ul>
    </form>
  );
};

export default memo(SearchProduct);
