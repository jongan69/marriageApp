import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';

export default store = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
