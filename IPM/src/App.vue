<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import './index.css'
</script>

<template>
  <Layout>
    <RouterView />
  </Layout>
</template>

<script lang="ts">
import Layout from './components/Layout/Layout.vue'

export default {
  name: 'App',
  components: {
    Layout,
    RouterView
  }
}
</script>
