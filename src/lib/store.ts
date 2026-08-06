import { configureStore } from '@reduxjs/toolkit';
import examReducer from './features/exam/examSlice';
import userReducer from './features/user/userSlice';
import { examApi } from './features/exam/examApi';

export const makeStore = () => {
    return configureStore({
        reducer: {
            exam: examReducer,
            user: userReducer,
            [examApi.reducerPath]: examApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(examApi.middleware),
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
