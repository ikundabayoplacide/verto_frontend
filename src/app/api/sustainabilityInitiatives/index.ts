import { apiSlice } from '../apiEntry';

export const sustainabilityInitiativesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSustainabilityInitiatives: builder.query<any[], { type?: string } | void>({
      query: (params) => ({ url: '/sustainability/initiatives', params: params || {} }),
      providesTags: ['SustainabilityInitiatives'],
    }),
    createSustainabilityInitiative: builder.mutation<any, any>({
      query: (body) => ({ url: '/sustainability/initiatives', method: 'POST', body }),
      invalidatesTags: ['SustainabilityInitiatives'],
    }),
    updateSustainabilityInitiative: builder.mutation<any, { id: number; body: any }>({
      query: ({ id, body }) => ({ url: `/sustainability/initiatives/${id}`, method: 'PUT', body }),
      invalidatesTags: ['SustainabilityInitiatives'],
    }),
    deleteSustainabilityInitiative: builder.mutation<any, number>({
      query: (id) => ({ url: `/sustainability/initiatives/${id}`, method: 'DELETE' }),
      invalidatesTags: ['SustainabilityInitiatives'],
    }),
  }),
});

export const { useGetSustainabilityInitiativesQuery, useCreateSustainabilityInitiativeMutation, useUpdateSustainabilityInitiativeMutation, useDeleteSustainabilityInitiativeMutation } = sustainabilityInitiativesApi;
