import { apiSlice } from '../apiEntry';

export const coreValuesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoreValues: builder.query<any[], void>({
      query: () => '/core-values',
      providesTags: ['CoreValues'],
    }),
    createCoreValue: builder.mutation<any, any>({
      query: (body) => ({ url: '/core-values', method: 'POST', body }),
      invalidatesTags: ['CoreValues'],
    }),
    updateCoreValue: builder.mutation<any, { id: number; body: any }>({
      query: ({ id, body }) => ({ url: `/core-values/${id}`, method: 'PUT', body }),
      invalidatesTags: ['CoreValues'],
    }),
    deleteCoreValue: builder.mutation<any, number>({
      query: (id) => ({ url: `/core-values/${id}`, method: 'DELETE' }),
      invalidatesTags: ['CoreValues'],
    }),
  }),
});

export const { useGetCoreValuesQuery, useCreateCoreValueMutation, useUpdateCoreValueMutation, useDeleteCoreValueMutation } = coreValuesApi;
