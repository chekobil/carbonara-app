<template>
  <div class="stores-container">
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
const storeList: Ref<StoreList> = ref([]);
import storesData from "~/_models/store/stores.json";
onMounted(async () => {
  storeList.value = storesData.slice(0, 20);
});
</script>

<style lang="scss">
.stores-container {
  width: 100%;
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
