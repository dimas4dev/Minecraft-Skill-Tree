import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import skillTreeReducer from './skillTreeSlice';

export const skillTreeStore = configureStore({
    reducer: {
        skillTree: skillTreeReducer,
    },
});

export type RootState = ReturnType<typeof skillTreeStore.getState>;
export type AppDispatch = typeof skillTreeStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
