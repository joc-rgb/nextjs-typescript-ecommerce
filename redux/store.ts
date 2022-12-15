import { Action, configureStore,  ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from 'next-redux-wrapper';
import cartReducer from "redux/cartSlice";
import productReducer from "redux/productSlice";
import { persistReducer } from "redux-persist"; 
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import thunk from 'redux-thunk';
const createNoopStorage = () => {
  return {
    getItem(_key:string) {
      return Promise.resolve(null);
    },
    setItem(_key:string, value:string) {
      return Promise.resolve(value);
    },
    removeItem(_key:string) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();




export const makeStore = () => {

  const persistConfig = {
  key: 'cart',
    storage,
    whitelist: ['cartItems', 'quantity', 'total']
  }
  const persistedReducer = persistReducer(persistConfig, cartReducer)
  const store = configureStore({

  reducer: {
    cart:persistedReducer,
    product: productReducer
  },
  devTools: true,
  middleware:[thunk]
  })

  return store
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType=void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);

