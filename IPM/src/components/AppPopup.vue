<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 max-w-md">
      <div class="flex justify-center items-center">
        <h2 class="text-lg font-semibold">{{ title }}</h2>
      </div>
      <div class="mt-4 space-x-4">
        <button class="bg-primary-500 text-white font-bold py-2 px-4 rounded">
          {{ text_left }}
        </button>
        <button
          @click="close"
          class="text-primary-500 border-2 border-primary-500 font-bold py-2 px-4 rounded"
        >
          {{ text_right }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    }
  },
  props: {
    title: {
      type: String,
      default: 'Popup'
    },
    text_left: {
      type: String,
      default: 'Sim'
    },
    text_right: {
      type: String,
      default: 'Não'
    }
  },
  methods: {
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    }
  }
}
</script>
