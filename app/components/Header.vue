<template>
  <header>
    <div class="navbar-center lg:flex">
      <ul class="menu menu-horizontal px-1 w-full">
        <li>
          <a href="#" @click.prevent="handleGoTo('/')">
            <Icon name="tabler:home" size="1.2rem" /> Home
          </a>
        </li>
        <li>
          <a href="#" @click.prevent="handleGoTo('/stores')"
            ><Icon name="tabler:building-store" size="1.2rem" />Our stores</a
          >
        </li>
        <li class="flex-1 flex-row justify-end">
          <label class="swap swap-rotate">
            <input type="checkbox" @click="emit('change-theme', null)" />
            <span class="swap-on">
              <Icon
                name="material-symbols:wb-sunny-outline-rounded"
                mode="svg"
                size="1.4rem"
              />
            </span>
            <span class="swap-off">
              <Icon
                name="material-symbols:dark-mode-outline-rounded"
                mode="svg"
                size="1.4rem"
              />
            </span>
          </label>
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
