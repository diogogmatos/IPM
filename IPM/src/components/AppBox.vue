<template>
  <a
    :href="`/services/${id}`"
    class="relative bg-white rounded-2xl border shadow-md p-4 flex flex-col w-96 space-y-2 hover:-translate-y-1 hover:shadow-lg transition-all"
  >
    <InfoTag v-if="status === 'Realizado'" color="green" text="Realizado" />
    <InfoTag v-else color="red" text="Pendente" />
    <div class="flex flex-row items-center space-x-4 justify-between h-full">
      <h1 class="text-2xl font-[600]">
        {{ title }}
      </h1>
      <p class="text-neutral-400 font-semibold text-xl min-w-fit text-nowrap">
        <i class="bi bi-hourglass-split"></i> {{ time }} min
      </p>
    </div>
  </a>
</template>

<script>
import InfoTag from '@/components/InfoTag.vue'
export default {
  components: {
    InfoTag
  },
  props: {
    title: String,
    time: String,
    status: String,
    id: String
  }
}
</script>
