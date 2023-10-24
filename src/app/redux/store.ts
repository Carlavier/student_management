import { configureStore } from "@reduxjs/toolkit";
import { studentApi } from "./student.service";
import { setupListeners } from "@reduxjs/toolkit/query";
import addStudentFormReducer from "./addStudentForm.slice";

export const store = configureStore({
    reducer: {
        addStudentForm: addStudentFormReducer,
        [studentApi.reducerPath]: studentApi.reducer
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(studentApi.middleware);
    }, // ???
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState> 