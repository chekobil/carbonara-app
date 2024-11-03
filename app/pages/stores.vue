<template>
  <section class="stores-container" ref="storeListElm">
    <QuoteCard />
    <div v-if="!storeList.length">Loading store list ...</div>
    <div v-else class="store-list-container">
      <div class="title-group">
        <h1>Stores</h1>
        <StoreSearch @change="handleGetNewSearch" />
      </div>
      <div class="search-results-count">
        <small
          >Loaded {{ storeList?.length ?? 0 }}/{{ storesTotal ?? 0 }}
          <span v-if="searchQuery">(filtered by {{ searchQuery }})</span></small
        >
      </div>
      <StoreList :store-list="storeList" />
    </div>
  </section>
</template>

<script setup lang="ts">
const { fetchStores } = useFetchStores();
const { findIntersectingElement } = useStoresIntersection();

const storeList: Ref<StoreList> = ref([]);
const storesTotal: Ref<number> = ref(0);
const filteredStoreList: Ref<StoreList | null> = ref(null);
const currentPage: Ref<number> = ref(1);
const storeListElm: Ref<HTMLElement | null> = ref(null);
const searchQuery: Ref<string> = ref("");

const listIsInLastPage = computed(() => {
  return unref(storeList)?.length < unref(storesTotal);
});

onMounted(async () => {
  getStores(1);
});

const getStores = async (page: number) => {
  currentPage.value = page;
  const { data, total } = await fetchStores(page, unref(searchQuery));
  storeList.value = data;
  storesTotal.value = total;
  findIntersectingElement(storeListElm, ".store-item", getMoreStores);
};
const getMoreStores = async () => {
  if (!listIsInLastPage.value) {
    return;
  }
  currentPage.value++;
  const { data, total } = await fetchStores(
    currentPage.value,
    unref(searchQuery)
  );
  storeList.value = [...storeList.value, ...data];
  storesTotal.value = total;
  findIntersectingElement(storeListElm, ".store-item", getMoreStores);
};

const handleGetNewSearch = (val: string) => {
  searchQuery.value = val;
  getStores(1, val);
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
  .search-results-count {
    align-self: flex-start;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 0.2rem 0.8rem;
    border-radius: 1rem;
    z-index: 2;
    position: sticky;
    top: 0;
    left: 0;
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
