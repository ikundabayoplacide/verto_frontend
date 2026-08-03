import { apiSlice } from '../apiEntry';

export const mediaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMedia: builder.query<any[], { category?: string } | void>({
      query: (params) => ({ url: '/media', params: params || {} }),
      providesTags: ['Media'],
    }),
    getMediaBySlug: builder.query<any, string>({
      query: (slug) => `/media/${slug}`,
      providesTags: ['Media'],
    }),
    createMedia: builder.mutation<any, any>({
      query: (body) => ({ url: '/media', method: 'POST', body }),
      invalidatesTags: ['Media'],
    }),
    updateMedia: builder.mutation<any, { id: number; body: any }>({
      query: ({ id, body }) => ({ url: `/media/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Media'],
    }),
    deleteMedia: builder.mutation<any, number>({
      query: (id) => ({ url: `/media/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Media'],
    }),
  }),
});

export const { useGetMediaQuery, useGetMediaBySlugQuery, useCreateMediaMutation, useUpdateMediaMutation, useDeleteMediaMutation } = mediaApi;
