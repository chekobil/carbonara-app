<template>
  <div class="stores-list">
    <StoreCard
      v-for="store in storeList"
      :store-data="store"
      :key="`store-${store.id}`"
    />
  </div>
  <!-- TODO. Fill with fake elements to have a "real" scroll -->
</template>

<script setup lang="ts">
const props = defineProps<{
  storeList: StoreList;
}>();
</script>

<style lang="scss">
.stores-list {
  min-width: 100%;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 95%);
  justify-content: center;
  gap: 1rem;
  $layout-breakpoint-mobile: 480px;
  $layout-breakpoint-mobile-h: 560px;
  $layout-breakpoint-tablet: 900px;
  $layout-breakpoint-laptop: 1080px;
  $layout-breakpoint-desktop: 1280px;
  @media (min-width: $layout-breakpoint-mobile) {
    grid-template-columns: repeat(auto-fill, 88%);
  }
  @media (min-width: $layout-breakpoint-mobile-h) {
    grid-template-columns: repeat(auto-fill, 46%);
  }
  @media (min-width: $layout-breakpoint-tablet) {
    grid-template-columns: repeat(auto-fill, 30%);
  }
  @media (min-width: $layout-breakpoint-laptop) {
    grid-template-columns: repeat(auto-fill, 23%);
  }
}
</style>
