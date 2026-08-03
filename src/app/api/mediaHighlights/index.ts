import { apiSlice } from '../apiEntry';

export const mediaHighlightsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMediaHighlights: builder.query({
      query: () => '/media-highlights',
      providesTags: ['MediaHighlights'],
    }),
    createMediaHighlight: builder.mutation({
      query: (body) => ({ url: '/media-highlights', method: 'POST', body }),
      invalidatesTags: ['MediaHighlights'],
    }),
    updateMediaHighlight: builder.mutation({
      query: ({ id, body }) => ({ url: `/media-highlights/${id}`, method: 'PUT', body }),
      invalidatesTags: ['MediaHighlights'],
    }),
    deleteMediaHighlight: builder.mutation({
      query: (id) => ({ url: `/media-highlights/${id}`, method: 'DELETE' }),
      invalidatesTags: ['MediaHighlights'],
    }),
  }),
});

export const {
  useGetMediaHighlightsQuery,
  useCreateMediaHighlightMutation,
  useUpdateMediaHighlightMutation,
  useDeleteMediaHighlightMutation,
} = mediaHighlightsApi;
