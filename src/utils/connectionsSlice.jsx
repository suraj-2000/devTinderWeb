import { createSlice } from "@reduxjs/toolkit";

const conectionsSlice = createSlice({
    name: 'connections',
    initialState: null,
    reducers: {
        addConnection: (state, action) => {
            return action.payload;
        },
        removeConnection: () => {
            return null;
        },
    },
});

export const {addConnection, removeConnection} = conectionsSlice.actions;
export default conectionsSlice.reducer;