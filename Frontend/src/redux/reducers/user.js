import { createReducer, createAction } from "@reduxjs/toolkit";

const LoadUserRequest = createAction("LoadUserRequest");
const LoadUserSuccess = createAction("LoadUserSuccess");
const LoadUserFail = createAction("LoadUserFail");

const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(
  initialState,

  (builder) => {
    builder

      .addCase(LoadUserRequest, (state) => {
        state.loading = true;
      })

      .addCase(LoadUserSuccess, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(LoadUserFail, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
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
