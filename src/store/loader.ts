import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defineReducer } from ".";

const slice = createSlice({
	name: 'loader',
	initialState: {
		loading: {} as Record<string, boolean>
	},
	reducers: {
		registerLoader(state, { payload }: PayloadAction<string>) {
			state.loading[payload] = false;
		},

		completeLoader(state, { payload }: PayloadAction<string>) {
			state.loading[payload] = true;
		}
	}
});

export const loaderActions = slice.actions;
export const loaderReducer = defineReducer('loader', slice);