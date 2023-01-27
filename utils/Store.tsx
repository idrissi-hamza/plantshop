import React, { createContext, useReducer, Dispatch, useContext } from 'react';
import type { Plant } from './data';
import Cookies from 'js-cookie';
// import Cookies from 'js-cookie';
//type of createContext

export type AddedPlant = Plant & {
  quantity: number;
};
export type ShippingAdressType = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};
type State = {
  cart: {
    cartItems: AddedPlant[];
    shippingAddress: ShippingAdressType;
  };
};

const cartCookie = Cookies.get('cart');
const initialState: State = {
  cart: cartCookie
    ? JSON.parse(cartCookie)
    : { cartItems: [], shippingAddress: {} },
};

type Action =
  | { type: 'CART_ADD_ITEM'; payload: AddedPlant }
  | { type: 'CART_REMOVE_ITEM'; payload: AddedPlant }
  | { type: 'CART_RESET' }
  | { type: 'SAVE_SHIPPING_ADDRESS'; payload: ShippingAdressType };

type StoreDispatch = Dispatch<Action>;

// Context
const StoreStateContext = createContext<State | null>(null);
const StoreDispatchContext = createContext<StoreDispatch | null>(null);

//reducer
export const storeReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'CART_RESET':
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: {},
        },
      };

    case 'SAVE_SHIPPING_ADDRESS':
      const shippingAddress = action.payload;
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress
        },
      };

    default:
      return state;
  }
};

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  console.log('StoreContext state:', state);
  return (
    <StoreStateContext.Provider value={state}>
      <StoreDispatchContext.Provider value={dispatch}>
        {children}
      </StoreDispatchContext.Provider>
    </StoreStateContext.Provider>
  );
};

// custom Hooks
export const useStoreContext = () => {
  const state = useContext(StoreStateContext);
  const dispatch = useContext(StoreDispatchContext);
  if (!state || !dispatch) throw new Error('Cannot find StoreProvider');
  return { state, dispatch };
};
