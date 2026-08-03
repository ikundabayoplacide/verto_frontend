import { apiSlice } from '../apiEntry';

export const settingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query<any[], void>({
      query: () => '/settings',
      providesTags: ['Settings'],
    }),
    upsertSetting: builder.mutation<any, { key: string; value: string }>({
      query: (body) => ({ url: '/settings', method: 'PUT', body }),
      invalidatesTags: ['Settings'],
    }),
    deleteSetting: builder.mutation<any, number>({
      query: (id) => ({ url: `/settings/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Settings'],
    }),
  }),
});

export const { useGetSettingsQuery, useUpsertSettingMutation, useDeleteSettingMutation } = settingsApi;
