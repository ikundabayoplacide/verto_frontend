import { apiSlice } from '../apiEntry';

export const sustainabilityPillarsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSustainabilityPillars: builder.query<any[], void>({
      query: () => '/sustainability/pillars',
      providesTags: ['SustainabilityPillars'],
    }),
    createSustainabilityPillar: builder.mutation<any, any>({
      query: (body) => ({ url: '/sustainability/pillars', method: 'POST', body }),
      invalidatesTags: ['SustainabilityPillars'],
    }),
    updateSustainabilityPillar: builder.mutation<any, { id: number; body: any }>({
      query: ({ id, body }) => ({ url: `/sustainability/pillars/${id}`, method: 'PUT', body }),
      invalidatesTags: ['SustainabilityPillars'],
    }),
    deleteSustainabilityPillar: builder.mutation<any, number>({
      query: (id) => ({ url: `/sustainability/pillars/${id}`, method: 'DELETE' }),
      invalidatesTags: ['SustainabilityPillars'],
    }),
  }),
});

export const { useGetSustainabilityPillarsQuery, useCreateSustainabilityPillarMutation, useUpdateSustainabilityPillarMutation, useDeleteSustainabilityPillarMutation } = sustainabilityPillarsApi;
