import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ProductInterface } from "utils/Interfaces";

const productItems: ProductInterface[] = [];
const productSlice = createSlice({
  name: 'product',
  initialState: {
    productItems
  },
  reducers: {
    setProductItems: (state, action) => {
      state.productItems = action.payload
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.productItems = action.payload.product.productItems
    }
  }
})

export const { setProductItems } = productSlice.actions
export default productSlice.reducer