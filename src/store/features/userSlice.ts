import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {UserInfo} from '../../appTypes/user';

interface UserState {
  info: UserInfo;
}

const initialState: UserState = {
  info: {
    name: '',
    email: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.info = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;

export const {setUserInfo} = userSlice.actions;
