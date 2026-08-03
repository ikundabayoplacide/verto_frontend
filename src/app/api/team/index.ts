import { apiSlice } from '../apiEntry';

export const teamApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeam: builder.query<any[], void>({
      query: () => '/team',
      providesTags: ['Team'],
    }),
    getTeamMember: builder.query<any, number>({
      query: (id) => `/team/${id}`,
      providesTags: ['Team'],
    }),
    createTeamMember: builder.mutation<any, any>({
      query: (body) => ({ url: '/team', method: 'POST', body }),
      invalidatesTags: ['Team'],
    }),
    updateTeamMember: builder.mutation<any, { id: number; body: any }>({
      query: ({ id, body }) => ({ url: `/team/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Team'],
    }),
    deleteTeamMember: builder.mutation<any, number>({
      query: (id) => ({ url: `/team/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Team'],
    }),
  }),
});

export const { useGetTeamQuery, useGetTeamMemberQuery, useCreateTeamMemberMutation, useUpdateTeamMemberMutation, useDeleteTeamMemberMutation } = teamApi;
