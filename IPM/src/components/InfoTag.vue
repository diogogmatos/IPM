<template>
  <span :class="`text-${color}-600 font-bold bg-${color}-100 w-fit px-3 py-1 rounded-xl text-sm`">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    padding_x: {
      type: String,
      default: '3'
    },
    padding_y: {
      type: String,
      default: '1'
    }
  }
}
</script>
