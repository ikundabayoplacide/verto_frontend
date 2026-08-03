import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../config";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Auth', 'Users', 'Contact', 'Services', 'Team', 'Media', 'Testimonials', 'Partners', 'Stats', 'CoreValues', 'HeroSlides', 'Timeline', 'SustainabilityPillars', 'SustainabilityInitiatives', 'SustainabilityCommitments', 'Certificates', 'MediaHighlights', 'Settings', 'Notification'],
  endpoints: () => ({}),
});

export const apiEntry = apiSlice;
