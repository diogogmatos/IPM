<template>
  <AppLayout>
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
      <AppDropdown
        :options="colorOptions"
        class=""
        placeholder="Tipo de Serviço"
        @dropdownChange="filterServices"
      />
      <AppDropdown
        :options="sortOptions"
        placeholder="Ordenar Por"
        @dropdownChange="sortServices"
      />
    </div>
    <div class="grid grid-cols-2 gap-4 w-fit mx-auto">
      <AppBox
        v-for="(service, index) in services"
        :key="index"
        :id="service.id"
        :title="service.title"
        :time="service.time"
        :status="service.status"
        :date="service.date ?? undefined"
      />
    </div>
  </AppLayout>
</template>

<script>
import AppDropdown from '@/components/AppDropdown.vue'
import AppBox from '@/components/AppBox.vue'
import AppLayout from '@/components/AppLayout/AppLayout.vue'
import * as api from '../api.ts'

export default {
  components: {
    AppLayout,
    AppDropdown,
    AppBox
  },
  methods: {
    async fetchServiceDefinitions() {
      try {
        this.services = await api
          .list_ServiceDisplay()
          .then((res) => res.filter((s) => s.status !== 'realizado'))
        this.originalServices = this.services
      } catch (error) {
        console.error('Error fetching service definitions:', error)
      }
    },
    sortServices(sortType) {
      switch (sortType) {
        case 'Duração (Crescente)':
          this.services.sort((a, b) => a.time - b.time)
          break
        case 'Duração (Decrescente)':
          this.services.sort((a, b) => b.time - a.time)
          break
        default:
          this.services.sort((a, b) => (a.id < b.id ? -1 : 1))
          break
      }
      console.log(this.services)
    },
    filterServices(filterType) {
      switch (filterType) {
        case 'Pendente':
          this.services = this.originalServices.filter((service) => service.status === 'nafila')
          break
        case 'Programado':
          this.services = this.originalServices.filter((service) => service.status === 'programado')
          break
        case 'Suspenso':
          this.services = this.originalServices.filter((service) => service.status === 'suspenso')
          break
        default:
          this.services = this.originalServices
          break
      }
    }
  },
  data() {
    return {
      colorOptions: ['Pendente', 'Programado', 'Suspenso'],
      sortOptions: ['Duração (Crescente)', 'Duração (Decrescente)'],
      services: [],
      originalServices: []
    }
  },
  mounted() {
    this.fetchServiceDefinitions()
  }
}
</script>
