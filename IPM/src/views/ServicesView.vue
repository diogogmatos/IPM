<template>
  <Layout>
    <div class="flex flex-row justify-between items-center h-24 w-[784px] mx-auto space-x-4">
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
      <AppDropdown :options="colorOptions" class="" :placeholder="'Tipo de Serviço'"></AppDropdown>
      <AppDropdown
        :options="colorOptions"
        class=""
        :placeholder="'Duração (Crescente)'"
      ></AppDropdown>
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
  </Layout>
</template>

<script>
import AppDropdown from '@/components/AppDropdown.vue'
import Box from '@/components/AppBox.vue'
import Layout from '@/components/Layout/Layout.vue'
import { list_ServiceDefinitions } from '../api.ts'

export default {
  components: {
    Layout,
    AppDropdown,
    Box
  },
  methods: {
    openPopup() {
      this.$refs.popup.open()
    },
    async fetchServiceDefinitions() {
      try {
        const definitions = await list_ServiceDefinitions()
        this.serviceDefinitions = definitions
        console.log('Service definitions:', definitions)
      } catch (error) {
        console.error('Error fetching service definitions:', error)
      }
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
  }
}
</script>
