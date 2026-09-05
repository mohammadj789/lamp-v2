"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

export default function ReactQueryProvider({ children }) {
  const onError = (error) => {
    const errData = error.response?.data?.errors?.message;

    if (errData) enqueueSnackbar(errData);
  };

  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: { queries: { retry: false } },
      queryCache: new QueryCache({
        onError,
      }),
      mutationCache: new MutationCache({
        onError,
      }),
    }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  );
}
