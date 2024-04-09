<template>
  <span :class="`text-${color}-800 font-bold bg-${color}-200 w-fit px-${padding_x} py-${padding_y} rounded-xl`">
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
      default: 2
    },
    padding_y:{
        type: String,
        default: 1
    }
  }
};
</script>
