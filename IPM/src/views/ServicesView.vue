<template>
  <div class="px-[205px]">
    <div class="flex flex-row justify-between items-center h-24 w-full mx-auto space-x-4">
      <div
        class="flex space-x-3 w-full h-12 rounded-2xl border shadow-md px-4 bg-white items-center text-neutral-400"
      >
        <i class="bi bi-search text-xl"></i>
        <input
          class="outline-none w-full"
          type="search"
          placeholder="Pesquise um serviço aqui..."
        />
      </div>
      <Dropdown :options="colorOptions" class="" :placeholder="'Tipo de Serviço'"></Dropdown>
      <Dropdown :options="colorOptions" class="" :placeholder="'Duração (Crescente)'"></Dropdown>
    </div>
    <div class="grid grid-cols-2 gap-4 w-fit mx-auto">
      <Box
        v-for="(task, index) in serviceDefinitions"
        :key="index"
        :id="task.id"
        :title="task.descr"
        :time="task.duração"
        :status="Realizado"
      />
    </div>
  </div>
</template>

<script>
import Popup from '@/components/Popup.vue'
import Dropdown from '@/components/Dropdown.vue'
import Box from '@/components/Box.vue'
import { list_ServiceDefinitions } from '../api.ts'

export default {
  components: {
    Popup,
    Dropdown,
    Box
  },
  methods: {
    openPopup() {
      this.$refs.popup.open()
    }
  },
  data() {
    return {
      colorOptions: ['Red', 'Green', 'Blue'],
      tasks: [
        { title: 'Substituir Pneus', time: '40min', status: 'Realizado' },
        { title: 'Mudar Óleo', time: '30min', status: 'Pendente' },
        { title: 'Substituir Pneus', time: '40min', status: 'Realizado' },
        { title: 'Mudar Óleo', time: '30min', status: 'Pendente' },
        { title: 'Substituir Pneus', time: '40min', status: 'Realizado' },
        { title: 'Mudar Óleo', time: '30min', status: 'Pendente' },
        { title: 'Substituir Pneus', time: '40min', status: 'Realizado' },
        { title: 'Mudar Óleo', time: '30min', status: 'Pendente' },
        { title: 'Substituir Pneus', time: '40min', status: 'Realizado' },
        { title: 'Mudar Óleo', time: '30min', status: 'Pendente' },
        { title: 'Substituir Pneus', time: '40min', status: 'Realizado' },
        { title: 'Mudar Óleo', time: '30min', status: 'Pendente' },
        { title: 'Substituir Pneus', time: '40min', status: 'Realizado' },
        { title: 'Mudar Óleo', time: '30min', status: 'Pendente' }
      ],
      serviceDefinitions: []
    }
  },
  mounted() {
    this.fetchServiceDefinitions()
  },
  methods: {
    async fetchServiceDefinitions() {
      try {
        const definitions = await list_ServiceDefinitions()
        this.serviceDefinitions = definitions
        console.log('Service definitions:', definitions)
      } catch (error) {
        console.error('Error fetching service definitions:', error)
      }
    }
  }
}
</script>
