import { configureStore, combineReducers } from "@reduxjs/toolkit";
import mailReducer from "./Slices/MailSlice";
import userReducer from "./Slices/UserSlice";
import appReducer from "./Slices/AppSlice";

const rootReducer = combineReducers({
  app: appReducer,
  mail: mailReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store.getState>;

export default store;
