import { Suspense, lazy, FC, useEffect, useState, useCallback } from 'react';
import './ProductsPanel.css';
import { useAppDispatch, useAppSelector } from 'hooks/useReduxhook';
import CircleSpinner from 'Components/Loadings/CircleSpinner/CircleSpinner';
import Loading from 'Components/Loadings/Loading/Loading';
import ProductList from 'Components/Product/ProductList';
import { getProducts, addProduct, editProduct } from 'Redux/store/product/productThunks';
import { ProductModel } from 'models/ProductModels';
import BoxLinkList from './BoxLinkList';
import HelmetTitle from 'Components/HelmetTitle/HelmetTitle';

const ProductModal = lazy(() => import('Components/Modals/ProductModal/ProductModal'));
const AddCategory = lazy(() => import('Components/AddCategory/AddCategory'));

const ProductsPanel: FC = () => {
  const [currentProduct, setCurrentProduct] = useState<ProductModel | null>(null);
  const [ShowModal, setShowModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { products, brands, usages, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts('?is_panel=true'));
  }, []);

  const handleModal = useCallback((showModal: boolean, product: ProductModel | null = null) => {
    setCurrentProduct(product);
    setShowModal(showModal);
  }, []);

  const handleForm = async (formData: FormData) => {
    try {
      const thunk = currentProduct ? editProduct : addProduct;
      const result = await dispatch(thunk(formData)).unwrap();
      handleModal(false);
      return result;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="product">
      <HelmetTitle title="دموی محصولات" />
      {loading ? (
        <CircleSpinner />
      ) : (
        <>
          <section className="product__top">
            <BoxLinkList />
            <AddCategory
              title="افزودن کفش"
              permission="EDIT_PRODUCTS"
              icon="GiConverseShoe"
              onClick={() => setShowModal(true)}
            />
          </section>

          <section>
            <ProductList
              products={products}
              permission="EDIT_PRODUCTS"
              link="kinds"
              isShowIconKind
              onEdit={(product) => handleModal(true, product)}
            />
          </section>

          {ShowModal && (
            <Suspense fallback={<Loading />}>
              <ProductModal
                brands={brands}
                usages={usages}
                init={currentProduct}
                onSubmit={handleForm}
                onHide={() => handleModal(false)}
              />
            </Suspense>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsPanel;
