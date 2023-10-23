import { configureStore } from "@reduxjs/toolkit";
import { studentApi } from "./student.service";
import { setupListeners } from "@reduxjs/toolkit/query";
import studentReducer from "./students.slice";

export const store = configureStore({
    reducer: {
        students: studentReducer,
        [studentApi.reducerPath]: studentApi.reducer
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(studentApi.middleware);
    },
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState> 