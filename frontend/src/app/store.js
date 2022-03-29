import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import moviesReducer from '../features/movies/moviesSlice';
import generalReducer from '../features/general/generalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    general: generalReducer
  },
});
