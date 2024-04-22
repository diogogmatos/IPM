<template>
  <Menu as="div" :class="`relative inline-block text-left ${customButtonProps !== '' && 'w-full'}`">
    <div>
      <MenuButton
        v-if="customButtonProps === ''"
        class="inline-flex justify-left gap-x-1.5 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-md border hover:bg-neutral-100 transition-all w-52 text-nowrap h-12 items-center"
      >
        <span class="flex justify-between w-full">
          {{ selectedOption ? selectedOption : placeholder }}
          <i class="bi bi-chevron-down -mr-1 text-neutral-400"></i>
        </span>
      </MenuButton>
      <MenuButton v-else class="w-full">
        <AppButton :style="customButtonProps" :active="customButtonActive">
          <slot />
        </AppButton>
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-full overflow-hidden origin-top-right rounded-2xl bg-white shadow-lg border focus:outline-none"
      >
        <div class="max-h-48 overflow-y-scroll">
          <MenuItem
            v-for="(option, index) in options"
            :key="index"
            @click="toggleOption(option)"
            v-slot="{ active }"
          >
            <div
              :class="`
              ${active ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-700'} ${selectedOption === option && highlightSelected && 'bg-neutral-200'} block px-4 py-2 text-sm select-none`"
            >
              {{ option }}
            </div>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script lang="ts" setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import AppButton from '@/components/AppButton.vue'
import type { PropType } from 'vue'
</script>

<script lang="ts">
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Select an option'
    },
    options: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    customButtonProps: {
      type: String,
      default: ''
    },
    customButtonActive: {
      type: Boolean,
      default: false
    },
    highlightSelected: {
      type: Boolean,
      default: true
    }
  },
  emits: ['dropdownChange'],
  data() {
    return {
      selectedOption: ''
    }
  },
  methods: {
    toggleOption(option: string) {
      if (this.selectedOption === option) {
        this.selectedOption = ''
      } else {
        this.selectedOption = option
      }
      this.$emit('dropdownChange', this.selectedOption)
    }
  }
}
</script>
