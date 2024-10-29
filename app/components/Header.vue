<template>
  <header>
    <div class="navbar-center lg:flex">
      <ul class="menu menu-horizontal px-1 w-full">
        <li><a href="/">Home</a></li>
        <li><a href="/stores">Stores</a></li>
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
const emit = defineEmits<{
  "change-theme": [null];
}>();
</script>
