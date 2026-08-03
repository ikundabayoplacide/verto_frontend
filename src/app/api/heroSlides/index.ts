import { apiSlice } from '../apiEntry';

export const heroSlidesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeroSlides: builder.query<any[], void>({
      query: () => '/hero-slides',
      providesTags: ['HeroSlides'],
    }),
    createHeroSlide: builder.mutation<any, any>({
      query: (body) => ({ url: '/hero-slides', method: 'POST', body }),
      invalidatesTags: ['HeroSlides'],
    }),
    updateHeroSlide: builder.mutation<any, { id: number; body: any }>({
      query: ({ id, body }) => ({ url: `/hero-slides/${id}`, method: 'PUT', body }),
      invalidatesTags: ['HeroSlides'],
    }),
    deleteHeroSlide: builder.mutation<any, number>({
      query: (id) => ({ url: `/hero-slides/${id}`, method: 'DELETE' }),
      invalidatesTags: ['HeroSlides'],
    }),
  }),
});

export const { useGetHeroSlidesQuery, useCreateHeroSlideMutation, useUpdateHeroSlideMutation, useDeleteHeroSlideMutation } = heroSlidesApi;
