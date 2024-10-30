<template>
  <section class="stores-container" ref="storeListElm">
    <QuoteCard />
    <div v-if="!storeList.length">Loading store list ...</div>
    <div v-else class="store-list-container">
      <div class="title-group">
        <h1>Stores</h1>
        <StoreSearch @change="handleSearchStore" />
      </div>
      <StoreList :store-list="filteredStoreList || storeList" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useInfiniteScroll, useDebounceFn } from "@vueuse/core";
const { fetchStores } = useFetchStores();

const storeList: Ref<StoreList> = ref([]);
const filteredStoreList: Ref<StoreList | null> = ref(null);
const currentPage: Ref<number> = ref(1);
const storeListElm: Ref<HTMLElement | null> = ref(null);
const searchQuery: Ref<string> = ref("");

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
  if (searchQuery.value) handleSearchStore(searchQuery.value);
};

const handleSearchStore = (query: string) => {
  searchQuery.value = query;
  if (!query) {
    filteredStoreList.value = null;
    return;
  }
  filteredStoreList.value = unref(storeList).filter((store) =>
    store.name.includes(query)
  );
  if (filteredStoreList.value.length < 4) {
    getMoreStores();
  }
};
</script>

<style lang="scss">
.stores-container {
  width: 100%;
  flex: 0;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  justify-content: flex-start;
  align-items: center;
  > div {
    width: 100%;
  }
  .store-list-container {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    justify-content: flex-start;
    align-items: center;
  }
  h1 {
    font-weight: 600;
    font-size: 2.4rem;
  }
  .title-group {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0;
    h1 {
      flex: 1;
      text-align: center;
    }
    .store-search-container {
      flex: 1;
    }
  }
}
</style>
