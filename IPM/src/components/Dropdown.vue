<template>
  <div class="relative transition ease-in-out delay-150" @click="toggleDropdown">
    <button v-if="!selectedOption" class="bg-white text-black font-bold py-3 px-4 rounded-xl shadow-xl ">
      {{ placeholder }}
      <svg class="h-5 w-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>
    <button v-else class="bg-white text-black font-bold py-2 px-4 rounded">
      {{ selectedOption }}
      <svg class="h-5 w-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>
    <div v-if="isOpen" class="absolute mt-2 w-full bg-white shadow-lg rounded-md z-10">
      <ul>
        <li v-for="(option, index) in options" :key="index" @click="selectOption(option)" class="py-2 px-4 hover:bg-gray-100 cursor-pointer">{{ option }}</li>
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
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isOpen = false;
    }
  }
};
</script>
