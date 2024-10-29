<template>
  <div class="stores-container" ref="storeListElm">
    <QuoteCard />
    <h1>Stores</h1>
    <div v-if="!storeList.length">Loading store list ...</div>
    <div v-else>
      <StoreSearch />
      <StoreList :store-list="storeList" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInfiniteScroll, useDebounceFn } from "@vueuse/core";
const { fetchStores } = useFetchStores();

const storeList: Ref<StoreList> = ref([]);
const currentPage: Ref<number> = ref(1);
const storeListElm: Ref<HTMLElement | null> = ref(null);

const { reset } = useInfiniteScroll(
  storeListElm,
  () => {
    const debounceGetMore = useDebounceFn(() => {
      getMoreStores();
    }, 400);
    debounceGetMore();
  },
  { direction: "bottom", distance: 200, interval: 400 }
);

onMounted(async () => {
  getStores(currentPage.value);
});

const getStores = async (page: number) => {
  const res = await fetchStores(page);
  storeList.value = res;
};
const getMoreStores = async () => {
  currentPage.value++;
  const res = await fetchStores(currentPage.value);
  storeList.value = [...storeList.value, ...res];
};
</script>

<style lang="scss">
.stores-container {
  width: 100%;
  flex: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-start;
  align-items: center;
  > div {
    width: 100%;
  }
  h1 {
    font-weight: 600;
    font-size: 2.4rem;
  }
}
</style>
