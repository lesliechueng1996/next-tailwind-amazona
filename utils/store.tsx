import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { Product } from './data';

export enum StoreActionEnum {
  CART_ADD_ITEM = 'CART_ADD_ITEM',
}

interface CartType extends Product {
  quantity: number;
}

export type StoreAction = {
  type: StoreActionEnum.CART_ADD_ITEM;
  payload: CartType;
};

interface StoreType {
  cart: Array<CartType>;
}

export const Store = createContext<
  { state: StoreType; dispatch: Dispatch<StoreAction> } | undefined
>(undefined);

const initValue: StoreType = {
  cart: [],
};

const reducer = (state: StoreType, action: StoreAction) => {
  switch (action.type) {
    case StoreActionEnum.CART_ADD_ITEM:
      const CartType = action.payload;
      const index = state.cart.findIndex((item) => item.slug === CartType.slug);
      if (index >= 0) {
        const newCart = [...state.cart];
        newCart[index] = CartType;
        return {
          ...state,
          cart: newCart,
        };
      } else {
        const newCart = [...state.cart, CartType];
        return {
          ...state,
          cart: newCart,
        };
      }
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
