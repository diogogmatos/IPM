<template>
  <span
    :class="`text-${color}-600 font-bold bg-${color}-100 border-${color}-600/20 border w-fit px-3 py-1 rounded-xl text-sm`"
  >
    <slot />
  </span>
</template>

<script lang="ts">
export default {
  props: {
    color: {
      type: String,
      required: true
    }
  }
}
</script>
