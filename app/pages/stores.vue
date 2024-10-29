<template>
  <div class="card card-compact w-96 shadow-xl">
    <figure>
      <img
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        alt="Shoes"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title"><Icon name="uil:github" size="1.4rem" />Shoes!</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">
          Buy Now <Icon name="uil:github" size="1.4rem" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const storeList: StoreList = [];
</script>

<style scoped></style>
