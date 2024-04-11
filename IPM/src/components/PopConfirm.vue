<template>
  <AppButton :style="buttonProps" :active="buttonActive" @click="toggleModal()">
    <slot />
  </AppButton>
  <div
    @click="toggleModal()"
    :class="`${isOpen ? 'opacity-100' : 'opacity-0'} ${isHidden && 'hidden'} duration-200 flex flex-col transition-all fixed top-0 right-0 h-screen w-screen bg-black/30 justify-center items-center`"
  >
    <div
      class="w-84 h-fit bg-white border rounded-3xl shadow-md p-8 py-12 ml-96 text-center space-y-6"
    >
      <h1 class="font-semibold text-xl">{{ title }}</h1>
      <div class="space-x-4">
        <AppButton :active="true" :style="`w-20 h-12`" @click="onConfirm()"> Sim </AppButton>
        <AppButton :active="false" :style="`w-20 h-12`" @click="onCancel()"> Não </AppButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue'
</script>

<script>
export default {
  data() {
    return {
      isOpen: false,
      isHidden: true
    }
  },
  methods: {
    toggleModal() {
      if (this.isOpen) {
        this.isOpen = false
        setTimeout(() => {
          this.isHidden = true
        }, 200)
      } else {
        this.isHidden = false
        setTimeout(() => {
          this.isOpen = true
        }, 0)
      }
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    onConfirm: {
      type: Function,
      required: true
    },
    onCancel: {
      type: Function,
      default: () => {}
    },
    buttonProps: {
      type: String
    },
    buttonActive: {
      type: Boolean,
      default: true
    }
  }
}
</script>
