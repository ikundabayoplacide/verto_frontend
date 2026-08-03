import { apiSlice } from '../apiEntry';

export const sustainabilityCommitmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSustainabilityCommitments: builder.query<any[], void>({
      query: () => '/sustainability/commitments',
      providesTags: ['SustainabilityCommitments'],
    }),
    createSustainabilityCommitment: builder.mutation<any, any>({
      query: (body) => ({ url: '/sustainability/commitments', method: 'POST', body }),
      invalidatesTags: ['SustainabilityCommitments'],
    }),
    updateSustainabilityCommitment: builder.mutation<any, { id: number; body: any }>({
      query: ({ id, body }) => ({ url: `/sustainability/commitments/${id}`, method: 'PUT', body }),
      invalidatesTags: ['SustainabilityCommitments'],
    }),
    deleteSustainabilityCommitment: builder.mutation<any, number>({
      query: (id) => ({ url: `/sustainability/commitments/${id}`, method: 'DELETE' }),
      invalidatesTags: ['SustainabilityCommitments'],
    }),
  }),
});

export const { useGetSustainabilityCommitmentsQuery, useCreateSustainabilityCommitmentMutation, useUpdateSustainabilityCommitmentMutation, useDeleteSustainabilityCommitmentMutation } = sustainabilityCommitmentsApi;
