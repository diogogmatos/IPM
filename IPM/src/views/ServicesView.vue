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
        :title="services[index]['descr']"
        :time="services[index]['duração']"
        :status="task.estado"
      />
    </div>
  </div>
</template>

<script>
import Popup from '@/components/Popup.vue'
import Dropdown from '@/components/Dropdown.vue'
import Box from '@/components/Box.vue'
import * as api from '../api.ts'

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
      serviceDefinitions: [],
      services: []
    }
  },
  mounted() {
    this.fetchServiceDefinitions()
  },
  methods: {
    async fetchServiceDefinitions() {
      try {
        const definitions = await api.list_Services()
        const services = []
        this.serviceDefinitions = definitions
        for (let i = 0; i < definitions.length; i++) {
          const service = await api.get_ServiceDefinition(definitions[i]['service-definitionId'])
          services.push(service)
        }
        this.services = services
      } catch (error) {
        console.error('Error fetching service definitions:', error)
      }
    }
  }
}
</script>
