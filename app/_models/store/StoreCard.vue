<template>
  <div class="store-item card card-compact w-full shadow-xl">
    <figure>
      <img
        loading="lazy"
        decoding="async"
        :src="`https://picsum.photos/id/${randomNumber(1, 100)}/200/120`"
        alt="Shoes"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        <Icon name="uil:github" size="1.4rem" />{{ storeData.name }}
      </h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { randomNumber } from "~/utils/numbers";
const props = defineProps<{
  storeData: Store;
}>();
</script>

<style lang="scss">
.store-item {
  content-visibility: auto;
  figure {
    img {
      width: 100%;
      aspect-ratio: 16/9;
    }
  }
}
</style>
