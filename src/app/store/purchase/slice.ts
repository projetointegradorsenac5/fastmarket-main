import { createSlice } from "@reduxjs/toolkit";
import { initialState } from './initialState';
import loadLastPurchaseAsyncBuilder from "./builder/loadLastPurchaseBuilder";
import loadAllPurchasesBuilder from "./builder/loadAllPurchasesBuilder";

export const purchaseSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        loadLastPurchaseAsyncBuilder(builder)
        loadAllPurchasesBuilder(builder)
    },
});