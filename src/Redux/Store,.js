import { configureStore } from "@reduxjs/toolkit";
import fetchDataReducer from './DataReducer'

export const store = configureStore({
    middleware: getDefaultMiddleware =>
getDefaultMiddleware({
  serializableCheck: false,
}),
    reducer:{
        fetchData : fetchDataReducer,
    }
})