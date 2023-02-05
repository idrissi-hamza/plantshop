import React, { createContext, useReducer, Dispatch, useContext } from 'react';
import type { PlantType } from './data';
import Cookies from 'js-cookie';
// import Cookies from 'js-cookie';
//type of createContext

export type AddedPlant = PlantType & {
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
    payMethod: string;
  };
};

const cartCookie = Cookies.get('cart');
const initialState: State = {
  cart: cartCookie
    ? JSON.parse(cartCookie)
    : { cartItems: [], shippingAddress: {}, payMethod: '' },
};

type Action =
  | { type: 'CART_ADD_ITEM'; payload: AddedPlant }
  | { type: 'CART_REMOVE_ITEM'; payload: AddedPlant }
  | { type: 'CART_RESET' }
  | { type: 'CART_CLEAR_ITEMS' }
  | { type: 'SAVE_SHIPPING_ADDRESS'; payload: ShippingAdressType }
  | { type: 'SAVE_PAYMENT_METHOD'; payload: string };

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
          payMethod: '',
        },
      };

    case 'CART_CLEAR_ITEMS':
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    case 'SAVE_SHIPPING_ADDRESS':
      const shippingAddress = action.payload;
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress,
        },
      };

    case 'SAVE_PAYMENT_METHOD':
      const payMethod = action.payload;
      return {
        ...state,
        cart: {
          ...state.cart,
          payMethod,
        },
      };

    default:
      return state;
  }
};

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    storeReducer as React.Reducer<State, Action>,
    initialState as State
  );

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
