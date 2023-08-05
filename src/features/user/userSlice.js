import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUserOrders,updateUser,fetchLoggedInUser } from './userAPI';

const initialState = {
  userOrders: [],
  status: 'idle',
  userInfo : null
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (id) => {
    const response = await fetchLoggedInUserOrders(id);
    return response.data;
  }
);

export const fetchLoggedInUsersAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (id) => {
    const response = await fetchLoggedInUser(id);
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (id) => {
    const response = await updateUser(id);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // this info can be different or more from loggedin user info
        state.userOrders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // this info can be different or more from loggedin user info
        state.userOrders = action.payload;
      })
      .addCase(fetchLoggedInUsersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUsersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // this info can be different or more from loggedin user info
        state.userInfo = action.payload;
      })
  },
});

export const { increment} = userSlice.actions;

export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
