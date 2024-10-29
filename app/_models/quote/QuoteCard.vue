<template>
  <span v-if="quoteError">Error getting quote</span>
  <span v-else-if="!Object.keys(quote)?.length">Loading quote...</span>
  <div
    v-else
    class="hero min-h-80"
    style="
      background-image: url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp);
    "
  >
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-neutral-content text-center">
      <div class="px-20">
        <p class="text-xl font-bold">
          {{ quote.quote }}
        </p>
        <div class="text-sm font-bold mt-6">{{ quote.author }}</div>
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

<style scoped></style>
