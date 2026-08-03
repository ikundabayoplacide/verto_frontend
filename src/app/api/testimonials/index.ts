import { apiSlice } from '../apiEntry';

export const testimonialsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTestimonials: builder.query<any[], void>({
      query: () => '/testimonials',
      providesTags: ['Testimonials'],
    }),
    createTestimonial: builder.mutation<any, any>({
      query: (body) => ({ url: '/testimonials', method: 'POST', body }),
      invalidatesTags: ['Testimonials'],
    }),
    updateTestimonial: builder.mutation<any, { id: number; body: any }>({
      query: ({ id, body }) => ({ url: `/testimonials/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Testimonials'],
    }),
    deleteTestimonial: builder.mutation<any, number>({
      query: (id) => ({ url: `/testimonials/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Testimonials'],
    }),
  }),
});

export const { useGetTestimonialsQuery, useCreateTestimonialMutation, useUpdateTestimonialMutation, useDeleteTestimonialMutation } = testimonialsApi;
