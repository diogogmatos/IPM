<template>
  <div class="flex bg-primary">
    <Sidebar />
    <main class="font-display p-12 overflow-scroll h-screen w-full">
      <slot />
    </main>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue'

export default {
  name: 'Layout',
  components: {
    Sidebar
  }
}
</script>
