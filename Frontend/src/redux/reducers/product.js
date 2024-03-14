import { createReducer, createAction } from "@reduxjs/toolkit";

const LoadProductRequest = createAction("LoadProductRequest");
const LoadProductSuccess = createAction("LoadProductSuccess");
const LoadProductFail = createAction("LoadProductFail");

const initialState = {
};

export const productReducer = createReducer(
  initialState,

  (builder) => {
    builder
        
      .addCase(LoadProductRequest, (state) => {
        state.pLoading = true;
      })

      .addCase(LoadProductSuccess, (state, action) => {
        state.pLoading = false;
        state.products = action.payload;
      })
      .addCase(LoadProductFail, (state, action) => {
        state.pLoading = false;
        state.pError = action.payload;
      });
  }
);



























// export const userReducer = createReducer(initialState, {
//   LoadUserRequest: (state) => {
//     state.loading = true;
//   },
//   LoadUserSuccess: (state, action) => {
//     state.isAuthenticated = true;
//     state.loading = false;
//     state.user = action.payload;
//   },
//   LoadUserFail: (state, action) => {
//     state.loading = false;
//     state.error = action.payload;
//     state.isAuthenticated = false;
//   },
// });
