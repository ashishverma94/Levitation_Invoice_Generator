import { productReducer } from "./reducers/product";
import { userReducer } from "./reducers/user";
import { configureStore } from "@reduxjs/toolkit";

const Store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
  },
});

export default Store;
