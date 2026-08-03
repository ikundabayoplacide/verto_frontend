import { apiSlice } from '../apiEntry';

export const partnersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPartners: builder.query<any[], void>({
      query: () => '/partners',
      providesTags: ['Partners'],
    }),
    createPartner: builder.mutation<any, any>({
      query: (body) => ({ url: '/partners', method: 'POST', body }),
      invalidatesTags: ['Partners'],
    }),
    updatePartner: builder.mutation<any, { id: number; body: any }>({
      query: ({ id, body }) => ({ url: `/partners/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Partners'],
    }),
    deletePartner: builder.mutation<any, number>({
      query: (id) => ({ url: `/partners/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Partners'],
    }),
  }),
});

export const { useGetPartnersQuery, useCreatePartnerMutation, useUpdatePartnerMutation, useDeletePartnerMutation } = partnersApi;
