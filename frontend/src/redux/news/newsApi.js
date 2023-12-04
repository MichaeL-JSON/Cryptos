import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://cryptos-tm.ddns.net:5000/api/"
  }),
  endpoints: builder => ({
    getAllNews: builder.query({
      query: () => "/articles"
    })
  })
});

export const { useGetAllNewsQuery } = newsApi;
