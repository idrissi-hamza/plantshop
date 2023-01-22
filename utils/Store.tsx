import React, { createContext, useReducer, Dispatch, useContext } from 'react';
// import type { Plant } from './data';

//type of createContext

export type AddedPlant = {
  name: string;
  slug: string;
  family: string;
  image: string[];
  price: string;
  rating: number;
  countInStock: number;
  description: string;
  specifications: string[];
  quantity: number;
};

type State = {
  cart: { cartItems: AddedPlant[] };
};

const initialState: State = {
  cart: { cartItems: [] },
};

type Action =
  | { type: 'CART_ADD_ITEM'; payload: AddedPlant }
  | { type: 'PREVIOUS' };

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
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    // case 'PREVIOUS':
    //   return { ...state, step: state.step - 1 };
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
