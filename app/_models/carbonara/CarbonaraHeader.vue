<template>
  <div class="hero bg-base-200 min-h-30">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-4xl font-bold">Carbonara</h1>
        <p class="mt-2">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi.
        </p>
        <button
          class="mt-2 btn btn-primary btn-xs btn-outline"
          @click="handleGoToStores"
        >
          Visit our stores
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const handleGoToStores = () => {
  router.push({ path: "/stores" });
};
</script>
