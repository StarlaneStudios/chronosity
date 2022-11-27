import { ColorScheme } from "@mantine/core";
import { createSlice } from "@reduxjs/toolkit";
import { defineReducer } from ".";

const slice = createSlice({
	name: 'client',
	initialState: {
		colorScheme: 'light' as ColorScheme
	},
	reducers: {
		toggleColorScheme(state) {
			state.colorScheme = state.colorScheme === 'light' ? 'dark' : 'light';
		},
	}
});

export const clientActions = slice.actions;
export const clientReducer = defineReducer('client', slice);