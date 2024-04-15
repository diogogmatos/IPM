<template>
  <a
    :href="`/services/${id}`"
    class="relative bg-white rounded-2xl w-full border shadow-md p-4 flex flex-col space-y-2 hover:-translate-y-1 hover:shadow-lg transition-all"
  >
    <div class="flex space-x-3">
      <InfoTag color="primary"> <i class="bi bi-info-circle"></i> {{ id }} </InfoTag>
      <InfoTag v-if="status === 'realizado'" color="green">Realizado</InfoTag>
      <InfoTag v-else-if="status === 'pendente'" color="yellow">Pendente</InfoTag>
      <InfoTag v-else-if="status === 'programado'" color="blue">Programado</InfoTag>
      <InfoTag v-else-if="status === 'suspenso'" color="red">Suspenso</InfoTag>
      <InfoTag v-else-if="status === 'cancelado'" color="red">Cancelado</InfoTag>
      <InfoTag v-if="date" color="purple">
        {{ padNumber(date.getDate(), 2) }}/{{ padNumber(date.getMonth() + 1, 2) }} ·
        {{ date.getHours() }}:{{ date.getMinutes() }}h
      </InfoTag>
    </div>
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
  data() {
    return {
      padNumber: (n, l) => `${n}`.padStart(l, '0')
    }
  },
  components: {
    InfoTag
  },
  props: {
    title: String,
    time: Number,
    status: String,
    id: String,
    date: Date
  }
}
</script>
