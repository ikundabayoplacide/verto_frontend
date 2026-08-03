import { apiSlice } from '../apiEntry';

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<any[], void>({
      query: () => '/auth/users',
      providesTags: ['Users'],
    }),
    updateUser: builder.mutation<any, { id: number; body: any }>({
      query: ({ id, body }) => ({ url: `/auth/users/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation<any, number>({
      query: (id) => ({ url: `/auth/users/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const { useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation } = usersApi;
