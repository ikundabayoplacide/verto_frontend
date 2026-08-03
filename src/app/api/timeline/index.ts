import { apiSlice } from '../apiEntry';

export const timelineApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTimeline: builder.query<any[], void>({
      query: () => '/timeline',
      providesTags: ['Timeline'],
    }),
    createTimelineEntry: builder.mutation<any, any>({
      query: (body) => ({ url: '/timeline', method: 'POST', body }),
      invalidatesTags: ['Timeline'],
    }),
    updateTimelineEntry: builder.mutation<any, { id: number; body: any }>({
      query: ({ id, body }) => ({ url: `/timeline/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Timeline'],
    }),
    deleteTimelineEntry: builder.mutation<any, number>({
      query: (id) => ({ url: `/timeline/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Timeline'],
    }),
  }),
});

export const { useGetTimelineQuery, useCreateTimelineEntryMutation, useUpdateTimelineEntryMutation, useDeleteTimelineEntryMutation } = timelineApi;
