import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name: 'requests',
    initialState: null,
    reducers: {
        addRequest: (state, action) => {
            return action.payload;
        },
        removeRequest: (state, action) => {
            const newRequests = state.filter(r => r._id !== action.payload);
            return newRequests;
        },
    },
});

export const {addRequest, removeRequest} = requestsSlice.actions;
export default requestsSlice.reducer;