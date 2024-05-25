import { OrderProductsModel } from 'models/OrderModel';
import { useMemo } from 'react';

interface UseCartTotalsProps {
  products: OrderProductsModel[];
}

export const useCartTotals = ({ products }: UseCartTotalsProps) => {
  const totals = useMemo(() => {
    let totalPrice = 0;
    let totalCount = 0;

    for (const product of products) {
      const price = 'price' in product.productSize ? product.productSize.price : 0;
      totalCount += +product.count;
      totalPrice += +price * +product.count;
    }

    return { totalPrice, totalCount };
  }, [products]);

  return totals;
};
