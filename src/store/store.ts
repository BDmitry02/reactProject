import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/ThemeSlice";
import loginReducer from "./slices/LoginSlice";
import filtersReducer from "./slices/FiltersSlice";
import productsReducer from "./slices/productsSlice";


const store = configureStore({
  reducer: {
    theme: themeReducer,
    login: loginReducer,
    filters: filtersReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
