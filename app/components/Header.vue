<template>
  <header>
    <div class="navbar-center lg:flex">
      <ul class="menu menu-horizontal px-1 w-full">
        <li><a href="#" @click.prevent="handleGoTo('/')">Home</a></li>
        <li><a href="#" @click.prevent="handleGoTo('/stores')">Stores</a></li>
        <li
          class="flex-1 flex-row justify-end"
          @click="emit('change-theme', null)"
        >
          <a>Theme</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
const router = useRouter();
const emit = defineEmits<{
  "change-theme": [null];
}>();

const handleGoTo = (newPath: string) => {
  router.push({ path: String(newPath) });
};
</script>
