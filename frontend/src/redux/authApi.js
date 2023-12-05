import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const API_URL = `https://${API_HOST}:${API_PORT}/api`
const API_URL = `https://cryptos-tm.ddns.net/api/auth`

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: build => ({
    registration: build.mutation({
      query: data => ({
        url: `/registration`,
        method: "POST",
        body: { user: data }
      })
    }),
    login: build.mutation({
      query: data => ({
        url: `/login`,
        method: "POST",
        body: { user: data }
      })
    }),
    logout: build.mutation({
      query: () => ({
        url: `/logout`,
        method: "POST"
      })
    }),
    updateAccessToken: build.mutation({
      query: () => ({
        url: `/refresh`,
        method: "POST"
      })
    }),
    activatedEmail: build.query({
      query: ({ userId, activationToken }) => ({
        url: `/activate?userId=${userId}&activationToken=${activationToken}`
      })
    }),
    getUsers: build.query({
      query: () => ({
        url: `/users`
      })
    }),
  })
});

export const {
  useRegistrationMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateAccessTokenMutation
} = authApi;
