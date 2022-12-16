import { createSlice } from "@reduxjs/toolkit";
import { CartItemInterface } from "utils/Interfaces";

const cartItems: CartItemInterface[] = [];
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartShow: false,
    cartItems,
    quantity:0,
    total:0,
  },
  reducers: {
    addToCart: (state, action) => {
      console.log("This", state.cartItems.length)
      
      const index = state.cartItems.findIndex((i: CartItemInterface) => i.slug === action.payload.slug)
      state.quantity+=action.payload.quantity
      state.total += action.payload.price * action.payload.quantity
      if (index !== -1) {
        state.cartItems[index].quantity += action.payload.quantity;
      }else {
      state.cartItems.push({ ...action.payload, quantity: action.payload.quantity });
      }
      console.log({...state.cartItems})
    },
    setCartShow: (state, action) => {
      state.cartShow = action.payload
  
    },
    addItemQuantity: (state, action) => {
      const index = state.cartItems.findIndex((i: CartItemInterface) => i.slug === action.payload.slug)
      state.cartItems[index].quantity += 1;
      state.quantity+=1
      state.total += action.payload.price * action.payload.quantity
    },
    removeItemQuantity: (state, action) => {
      const index = state.cartItems.findIndex((i: CartItemInterface) => i.slug === action.payload.slug)
      state.cartItems[index].quantity -= 1;
      if (state.cartItems[index].quantity == 0) {
        const updatedCart = state.cartItems.filter((i: CartItemInterface) => i.id !== action.payload.id);
        state.cartItems = updatedCart;
      }
      state.quantity-=1
      state.total -= action.payload.price
      //localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    clearCart: (state, action) => {
      state.cartItems = action.payload;
      state.quantity = 0;
      state.total = 0
    }
  },
  
})

export const { addToCart, setCartShow, addItemQuantity, removeItemQuantity,clearCart } = cartSlice.actions
export default cartSlice.reducer