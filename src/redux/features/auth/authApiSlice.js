import { apiSlice } from "@api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApiSlice;
