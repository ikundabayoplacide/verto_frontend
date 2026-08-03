import { apiSlice } from '../apiEntry';

export const certificateApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCertificates: builder.query({
      query: () => '/certificates',
      providesTags: ['Certificates'],
    }),
    createCertificate: builder.mutation({
      query: (body) => ({ url: '/certificates', method: 'POST', body }),
      invalidatesTags: ['Certificates'],
    }),
    updateCertificate: builder.mutation({
      query: ({ id, body }) => ({ url: `/certificates/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Certificates'],
    }),
    deleteCertificate: builder.mutation({
      query: (id) => ({ url: `/certificates/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Certificates'],
    }),
  }),
});

export const {
  useGetCertificatesQuery,
  useCreateCertificateMutation,
  useUpdateCertificateMutation,
  useDeleteCertificateMutation,
} = certificateApi;
