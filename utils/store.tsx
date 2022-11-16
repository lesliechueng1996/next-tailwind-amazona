import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { Product } from './data';

export enum StoreActionEnum {
  CART_ADD_ITEM = 'CART_ADD_ITEM',
  CART_REMOVE_ITEM = 'CART_REMOVE_ITEM',
}

interface CartType extends Product {
  quantity: number;
}

export type StoreAction = {
  type: StoreActionEnum;
  payload: CartType;
};

interface StoreType {
  cart: Array<CartType>;
}

const initValue: StoreType = {
  cart: [],
};

export const Store = createContext<{
  state: StoreType;
  dispatch: Dispatch<StoreAction>;
}>({
  state: initValue,
  dispatch: () => {
    /** noop */
  },
});

const reducer = (state: StoreType, action: StoreAction) => {
  switch (action.type) {
    case StoreActionEnum.CART_ADD_ITEM:
      const product = action.payload;
      const index = state.cart.findIndex((item) => item.slug === product.slug);
      if (index >= 0) {
        const newCart = [...state.cart];
        newCart[index] = product;
        return {
          ...state,
          cart: newCart,
        };
      } else {
        const newCart = [...state.cart, product];
        return {
          ...state,
          cart: newCart,
        };
      }
    case StoreActionEnum.CART_REMOVE_ITEM:
      const removeProduct = action.payload;
      const newCart = state.cart.filter(
        (item) => item.slug !== removeProduct.slug
      );
      return {
        ...state,
        cart: newCart,
      };
    default:
      return state;
  }
};

export default function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initValue);

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
}
