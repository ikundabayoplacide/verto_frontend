import { apiSlice } from '../apiEntry';

export const servicesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query<any[], void>({
      query: () => '/services',
      providesTags: ['Services'],
    }),
    getServiceBySlug: builder.query<any, string>({
      query: (slug) => `/services/${slug}`,
      providesTags: ['Services'],
    }),
    createService: builder.mutation<any, any>({
      query: (body) => ({ url: '/services', method: 'POST', body }),
      invalidatesTags: ['Services'],
    }),
    updateService: builder.mutation<any, { id: number; body: any }>({
      query: ({ id, body }) => ({ url: `/services/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Services'],
    }),
    deleteService: builder.mutation<any, number>({
      query: (id) => ({ url: `/services/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Services'],
    }),
  }),
});

export const { useGetServicesQuery, useGetServiceBySlugQuery, useCreateServiceMutation, useUpdateServiceMutation, useDeleteServiceMutation } = servicesApi;
