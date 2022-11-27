import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defineReducer } from ".";

const slice = createSlice({
	name: 'API',
	initialState: {
		isConnected: false
	},
	reducers: {
		setIsConnected(state, { payload }: PayloadAction<boolean>) {
			state.isConnected = payload;
		}
	}
});

export const apiActions = slice.actions;
export const apiReducer = defineReducer('api', slice);