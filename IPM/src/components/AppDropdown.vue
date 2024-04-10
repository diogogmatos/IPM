<template>
  <div class="relative transition ease-in-out delay-150" @click="toggleDropdown">
    <button
      v-if="!selectedOption"
      class="bg-white text-black font-medium px-4 h-12 rounded-2xl min-w-fit text-nowrap shadow-md border"
    >
      {{ placeholder }} <i class="bi bi-chevron-down"></i>
    </button>
    <button v-else class="bg-white text-black font-bold py-2 px-4 rounded">
      {{ selectedOption }}
    </button>
    <div
      v-if="isOpen"
      class="absolute mt-2 w-full bg-white border shadow-md rounded-2xl z-10 overflow-hidden"
    >
      <ul>
        <li
          v-for="(option, index) in options"
          :key="index"
          @click="selectOption(option)"
          class="py-2 px-4 hover:bg-neutral-100 cursor-pointer border-b"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Select an option'
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isOpen: false,
      selectedOption: ''
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    selectOption(option) {
      this.selectedOption = option
      this.isOpen = false
    }
  }
}
</script>
