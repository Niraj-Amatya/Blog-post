import { createSlice } from '@reduxjs/toolkit';

// dummy data
const initialState = [
  { id: '0', name: 'Nirvan Amatya' },
  { id: '1', name: 'Naisha Amatya' },
  { id: '2', name: 'Sirjana Amatya' },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;
export default usersSlice.reducer;
