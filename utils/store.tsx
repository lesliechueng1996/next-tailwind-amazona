import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { Product } from './data';
import Cookies from 'js-cookie';

export enum StoreActionEnum {
  CART_ADD_ITEM = 'CART_ADD_ITEM',
  CART_REMOVE_ITEM = 'CART_REMOVE_ITEM',
}

export interface CartType extends Product {
  quantity: number;
}

export type StoreAction = {
  type: StoreActionEnum;
  payload: CartType;
};

interface StoreType {
  cart: {
    cartItems: Array<CartType>;
  };
}

const cookieCart = Cookies.get('cart');
const initValue: StoreType = {
  cart: cookieCart
    ? JSON.parse(cookieCart)
    : {
        cartItems: [],
      },
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
      const index = state.cart.cartItems.findIndex(
        (item) => item.slug === product.slug
      );
      if (index >= 0) {
        const newCart = [...state.cart.cartItems];
        newCart[index] = product;
        Cookies.set(
          'cart',
          JSON.stringify({
            ...state.cart,
            cartItems: newCart,
          })
        );
        return {
          ...state,
          cart: {
            ...state.cart,
            cartItems: newCart,
          },
        };
      } else {
        const newCart = [...state.cart.cartItems, product];
        Cookies.set(
          'cart',
          JSON.stringify({
            ...state.cart,
            cartItems: newCart,
          })
        );
        return {
          ...state,
          cart: {
            ...state.cart,
            cartItems: newCart,
          },
        };
      }
    case StoreActionEnum.CART_REMOVE_ITEM:
      const removeProduct = action.payload;
      const newCart = state.cart.cartItems.filter(
        (item) => item.slug !== removeProduct.slug
      );
      Cookies.set(
        'cart',
        JSON.stringify({
          ...state.cart,
          cartItems: newCart,
        })
      );
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: newCart,
        },
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
