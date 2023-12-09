import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://cryptos-tm.ddns.net/api/"
  }),
  endpoints: builder => ({
    getAllNews: builder.query({
      query: () => "/articles"
    })
  })
});

export const { useGetAllNewsQuery } = newsApi;
