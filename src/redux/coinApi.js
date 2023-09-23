import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "https://api.coingecko.com/api/v3/coins";

export const coinApi = createApi({
  reducerPath: "coinApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: build => ({
    getCoinById: build.query({
      query: id => `/${id}`
    }),
    getCoinChart: build.query({
      query: args => {
        const { id, currency, days } = args;
        return {
          url: `/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`
        };
      },
      transformResponse: response => ({
        body: response.prices
      })
    }),
    getCoinsData: build.query({
      query: page =>
        `markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${
          page ? page : "1"
        }&sparkline=false&locale=en`
    })
  })
});

export const {
  useGetCoinByIdQuery,
  useGetCoinChartQuery,
  useGetCoinsDataQuery
} = coinApi;
