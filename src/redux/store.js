import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import cartReducer from "../redux/cartSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "cart",
  storage,
  whitelist: ["items", "totalQuantity", "totalPrice"], // Qué guardar del estado
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const serializableCheck = {
  ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
  ignoredPaths: ["register", "rehydrate"],
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck }),
});

export const persistor = persistStore(store);
