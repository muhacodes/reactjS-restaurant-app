import { createSlice } from "@reduxjs/toolkit";

const Auth = createSlice({
  name: "auth",
  initialState: {userData : {}},
  reducers: {
    initialLogin: (state, actions) => {
      state.userData = actions.payload
      console.log('server acitons')
      console.log(actions.payload);
    },
    logout: (state) => {
        state.userData = {}
    },
  },
});

export const AuthActions = Auth.actions;
export default Auth.reducer;
