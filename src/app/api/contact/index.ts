import { apiSlice } from '../apiEntry';

export const contactApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitContact: builder.mutation<any, { name: string; email: string; phone?: string; subject?: string; message: string }>({
      query: (body) => ({ url: '/contact', method: 'POST', body }),
    }),
    getContacts: builder.query<any[], void>({
      query: () => '/contact',
      providesTags: ['Contact'],
    }),
    markContactRead: builder.mutation<any, number>({
      query: (id) => ({ url: `/contact/${id}/read`, method: 'PATCH' }),
      invalidatesTags: ['Contact'],
    }),
    deleteContact: builder.mutation<any, number>({
      query: (id) => ({ url: `/contact/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Contact'],
    }),
    replyContact: builder.mutation<any, { id: number; reply: string }>({
      query: ({ id, reply }) => ({ url: `/contact/${id}/reply`, method: 'PUT', body: { reply } }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const { useSubmitContactMutation, useGetContactsQuery, useMarkContactReadMutation, useDeleteContactMutation, useReplyContactMutation } = contactApi;
