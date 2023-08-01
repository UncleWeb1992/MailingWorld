import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

const { reducer: userReducer, actions } = UserSlice;
export const { setUserName } = actions;

export default userReducer;
