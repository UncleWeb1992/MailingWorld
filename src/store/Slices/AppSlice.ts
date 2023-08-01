import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SideBarLinks } from "../../constants/db";
import { SidebarLinks as SidebarLinksType } from "../../types/types";

const initialState = {
  loading: true,
  fiedls: SideBarLinks,
};

const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setFields: (state, action: PayloadAction<SidebarLinksType[]>) => {
      state.fiedls = action.payload;
    },
  },
});

const { reducer: appReducer, actions } = AppSlice;
export const { setLoading, setFields } = actions;

export default appReducer;
