<template>
  <AppLayout>
    <div class="px-52">
      <div class="flex flex-row justify-between items-center h-24 w-full space-x-4">
        <div
          class="flex space-x-3 w-full h-12 rounded-2xl border shadow-md px-4 bg-white items-center text-neutral-400"
        >
          <i class="bi bi-search text-xl"></i>
          <input
            class="outline-none w-full"
            type="search"
            placeholder="Pesquise um serviço aqui..."
            v-bind="searchQuery"
            @input="searchServices($event.target.value)"
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
      <div v-if="!loaded" class="flex flex-col w-full mt-[20rem] items-center justify-center">
        <AppSpinner />
      </div>
      <div v-else-if="services.length !== 0" class="space-y-4">
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
      <div v-else>
        <h1 class="w-fit mx-auto text-white font-semibold text-2xl pt-20">
          Nenhuma correspondência encontrada.
        </h1>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import AppDropdown from '@/components/AppDropdown.vue'
import AppBox from '@/components/AppBox.vue'
import AppLayout from '@/components/AppLayout/AppLayout.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import * as api from '../api.ts'

export default {
  components: {
    AppLayout,
    AppDropdown,
    AppSpinner,
    AppBox
  },
  methods: {
    async fetchServiceDefinitions() {
      try {
        this.services = await api.list_ServiceDisplay()

        console.log(this.$route.query.history)
        console.log(this.$route)
        if (this.$route.query.history !== undefined)
          this.services = this.services.filter(
            (s) => s.status === 'realizado' || s.status === 'cancelado'
          )
        else
          this.services = this.services.filter(
            (s) => s.status !== 'realizado' && s.status !== 'cancelado'
          )

        this.originalServices = this.services
        this.loaded = true
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
    },
    filterServices(filterType) {
      switch (filterType) {
        case 'Pendente':
          this.services = this.originalServices.filter((service) => service.status === 'pendente')
          break
        case 'Programado':
          this.services = this.originalServices.filter((service) => service.status === 'programado')
          break
        case 'Suspenso':
          this.services = this.originalServices.filter((service) => service.status === 'suspenso')
          break
        case 'Realizado':
          this.services = this.originalServices.filter((service) => service.status === 'realizado')
          break
        case 'Cancelado':
          this.services = this.originalServices.filter((service) => service.status === 'cancelado')
          break
        default:
          this.services = this.originalServices.sort((a, b) => (a.id < b.id ? -1 : 1))
          break
      }
    },
    searchServices(searchQuery) {
      if (searchQuery && searchQuery != '' && !searchQuery.split('').every((c) => c === ' ')) {
        this.services = this.originalServices.filter((service) => {
          for (const [key, value] of Object.entries(service)) {
            const query_words = searchQuery.toLowerCase().split(' ')
            if (query_words.every((word) => String(value).toLowerCase().includes(word))) {
              return true
            }
          }
          return false
        })
      } else {
        this.services = this.originalServices.sort((a, b) => (a.id < b.id ? -1 : 1))
      }
    }
  },
  data() {
    return {
      colorOptions: this.$route.fullPath.includes('?history')
        ? ['Realizado', 'Cancelado']
        : ['Pendente', 'Programado', 'Suspenso'],
      sortOptions: ['Duração (Crescente)', 'Duração (Decrescente)'],
      services: [],
      originalServices: [],
      searchQuery: '',
      loaded: false
    }
  },
  mounted() {
    this.fetchServiceDefinitions()
  }
}
</script>
