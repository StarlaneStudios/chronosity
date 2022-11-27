import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defineReducer } from ".";

const slice = createSlice({
	name: 'profile',
	initialState: {
		profile: null as any
	},
	reducers: {

		setProfile(state, { payload }: PayloadAction<any>) {
			state.profile = payload;
		},

		clearProfile(state) {
			state.profile = null;
		}
	}
});

export const profileActions = slice.actions;
export const profileReducer = defineReducer('profile', slice);