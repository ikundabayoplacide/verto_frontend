import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'admin' | 'editor';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
}

const initialState: AuthState = {
  user:  null,
  token: localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: AuthUser; token: string }>) {
      state.user  = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    clearCredentials(state) {
      state.user  = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('rememberMe');
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;

/* ── typed selectors ── */
import type { RootState } from './store';
export const selectCurrentUser  = (s: RootState) => s.auth.user;
export const selectCurrentRole  = (s: RootState) => s.auth.user?.role ?? null;
export const selectIsAdmin      = (s: RootState) => s.auth.user?.role === 'admin';
export const selectIsEditor     = (s: RootState) => s.auth.user?.role === 'editor';
export const selectIsLoggedIn   = (s: RootState) => !!s.auth.token;
