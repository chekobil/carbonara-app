import { defineStore } from "pinia";
export const useQuoteStore = defineStore("quote", () => {
  const quote: Ref<Quote | null> = ref(null);
  const lastUpdate: Ref<number> = ref(0);

  const setQuote = (payload: Quote) => {
    quote.value = unref(payload);
    lastUpdate.value = new Date().valueOf();
  };

  const getStoredQuote = computed(() => quote);
  const canUpdateQuote = () => {
    if (!unref(quote)) return true;
    const now = new Date().valueOf();
    const diffSecs = (now - unref(lastUpdate)) / 1000;
    const timeLimit = 3 * 60 * 60; // 3 horas en secs
    return diffSecs > timeLimit;
  };
  return {
    setQuote,
    getStoredQuote,
    canUpdateQuote,
  };
});
