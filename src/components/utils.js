import { sum } from "ramda";
import useCartItemsStore from "src/sources/useCartItemsStore";

export const cartTotalOf = (products, priceKey) => {
  const { cartItems } = useCartItemsStore.getState();

  return sum(
    products.map(product => product[priceKey] * cartItems[product.slug])
  );
};
