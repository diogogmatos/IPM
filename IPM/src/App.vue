<script setup lang="ts">
import { RouterView } from 'vue-router'
import './index.css'
</script>

<template>
  <RouterView />
</template>

<script lang="ts">
export default {
  name: 'App',
  components: {
    RouterView
  }
}
</script>
