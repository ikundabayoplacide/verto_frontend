import { apiSlice } from '../apiEntry';

export const statsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query<any[], void>({
      query: () => '/stats',
      providesTags: ['Stats'],
    }),
    createStat: builder.mutation<any, any>({
      query: (body) => ({ url: '/stats', method: 'POST', body }),
      invalidatesTags: ['Stats'],
    }),
    updateStat: builder.mutation<any, { id: number; body: any }>({
      query: ({ id, body }) => ({ url: `/stats/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Stats'],
    }),
    deleteStat: builder.mutation<any, number>({
      query: (id) => ({ url: `/stats/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Stats'],
    }),
  }),
});

export const { useGetStatsQuery, useCreateStatMutation, useUpdateStatMutation, useDeleteStatMutation } = statsApi;
