<template>
  <div class="flex bg-primary-500 w-full">
    <AppSidebar />
    <main class="font-display p-12 overflow-scroll h-screen w-full">
      <slot />
    </main>
  </div>
</template>

<script>
import AppSidebar from './AppSidebar.vue'

export default {
  name: 'AppLayout',
  components: {
    AppSidebar
  }
}
</script>
