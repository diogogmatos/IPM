<template>
  <button
    :class="`${active ? 'bg-primary-500 text-white hover:bg-opacity-80' : 'bg-white text-primary-500 hover:bg-primary-100'} rounded-xl border-primary-500 border-2 font-semibold transition-all ${style}`"
  >
    <slot />
  </button>
</template>

<script lang="ts">
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    style: {
      type: String,
      default: 'p-3 px-4'
    }
  }
}
</script>
