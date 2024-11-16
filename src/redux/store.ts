import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import  TodoCreateSlice  from "./Slices/TodoSlices";

export const store = configureStore({
    reducer : {
  Todo: TodoCreateSlice
    }
});

export const useAppDispatch: () =>  typeof store.dispatch = useDispatch
export const useAppSelector:  TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector
