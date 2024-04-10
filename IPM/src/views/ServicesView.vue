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
        :title="services[index]['descr']"
        :time="services[index]['duração']"
        :status="task.estado"
      />
    </div>
  </Layout>
</template>

<script>
import AppDropdown from '@/components/AppDropdown.vue'
import Box from '@/components/AppBox.vue'
import Layout from '@/components/Layout/Layout.vue'
import * as api from '../api.ts'

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
  }
}
</script>
