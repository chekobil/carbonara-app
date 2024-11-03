<template>
  <div
    class="hero relative min-h-60"
    style="
      background-image: url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp);
    "
  >
    <div class="hero-overlay bg-opacity-60 max-h-60 absolute inset-0"></div>
    <div
      class="hero-content text-neutral-content text-center max-h-60 absolute inset-0"
    >
      <div class="quote-content">
        <div v-if="quoteError">Error getting quote</div>
        <div v-else-if="!Object.keys(quote)?.length">Loading quote...</div>
        <div v-else class="quote-text">
          {{ quote.quote }}
        </div>
        <div class="quote-author">{{ quote.author }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const quote: Ref<Quote> = ref({});
const { setQuote, canUpdateQuote, getStoredQuote } = useQuoteStore();
const { data, error, execute } = await useFetchQuote("quotes", {
  params: {
    category: "happiness",
  },
  immediate: false,
});
onMounted(() => {
  if (canUpdateQuote()) {
    execute();
  } else {
    quote.value = unref(getStoredQuote) as Quote;
  }
});
watch(data, (val) => {
  setQuote(val[0]);
  quote.value = val[0];
});
const quoteError = computed(() => {
  return error.value;
});
</script>

<style lang="scss">
.quote-content {
  padding: 0 0;
  width: min(700px, 80vw);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  .quote-text {
    font-size: var(--font-size-lg);
    font-weight: 600;
    line-height: 1.2;
  }
  .quote-author {
    font-size: var(--font-size-sm);
    font-weight: 100;
  }
}
</style>
