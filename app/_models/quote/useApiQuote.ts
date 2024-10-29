import type { UseFetchOptions } from "nuxt/app";
import type { $Fetch } from "nitropack";

export function useFetchQuote<T>(
  url: string | (() => string),
  options?: UseFetchOptions<any>
) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$apiQuotes as $Fetch,
  });
}
