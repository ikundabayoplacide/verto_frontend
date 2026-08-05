import type { AuthUser } from '../../authSlice';
import { apiSlice } from '../apiEntry';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string; user: AuthUser }, { email: string; password: string }>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
    }),
    register: builder.mutation<
      { token: string; user: AuthUser },
      { name: string; email: string; password: string; role?: string }
    >({
      query: (body) => ({ url: '/auth/register', method: 'POST', body }),
    }),
    getMe: builder.query<{ user: AuthUser }, void>({
      query: () => '/auth/me',
      providesTags: ['Auth'],
    }),
    updateMe: builder.mutation<{ user: AuthUser }, { name?: string; email?: string; password?: string }>({
      query: (body) => ({ url: '/auth/me', method: 'PUT', body }),
      invalidatesTags: ['Auth'],
    }),
    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (body) => ({ url: '/auth/forgot-password', method: 'POST', body }),
    }),
    resetPassword: builder.mutation<{ message: string }, { token: string; password: string }>({
      query: ({ token, password }) => ({
        url: `/auth/reset-password/${token}`,
        method: 'POST',
        body: { password },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useUpdateMeMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
