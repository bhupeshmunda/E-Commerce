import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import  favoriteReducer from "./features/favorites/favoriteSlice.js";
import { getFavoritesFromLocalStorage } from "../Utils/localStorage.js";
import cartSliceReducer from "./features/cart/cartSlice.js"
import shopSliceReducer from "./features/shop/shopSlice.js"

const initialFavorites = getFavoritesFromLocalStorage() || [];

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        favorites: favoriteReducer,
        cart: cartSliceReducer,
        shop: shopSliceReducer,
    },

    preloadedState: {
        favorites: initialFavorites,
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

setupListeners(store.dispatch);
export default store;