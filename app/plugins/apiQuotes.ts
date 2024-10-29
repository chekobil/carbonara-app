import type { NitroFetchRequest, $Fetch } from "nitropack";

declare global {
  interface Headers {
    "X-Api-Key": string;
  }
}

export default defineNuxtPlugin({
  setup() {
    const baseURL = useRuntimeConfig().public.quoteApiBaseUrl as string;
    const apiKey = useRuntimeConfig().public.quoteApiToken as string;
    const api: $Fetch<QuoteList, NitroFetchRequest> = $fetch.create({
      baseURL,
      async onRequest({ options }) {
        options.headers = {
          ...options.headers,
          "X-Api-Key": apiKey,
        };
      },
    });
    return {
      provide: {
        apiQuotes: api,
      },
    };
  },
});
