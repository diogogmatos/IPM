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
            @input="setSearchQuery(($event?.target as HTMLInputElement)?.value)"
          />
        </div>
        <AppDropdown
          :options="typeOptions"
          class=""
          placeholder="Tipo de Serviço"
          @dropdownChange="setFilterType"
        />
        <AppDropdown
          :options="sortOptions"
          placeholder="Ordenar Por"
          @dropdownChange="setSortMethod"
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

<script lang="ts">
import AppDropdown from '@/components/AppDropdown.vue'
import AppBox from '@/components/AppBox.vue'
import AppLayout from '@/components/AppLayout/AppLayout.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import * as api from '../api.ts'
import * as types from '../types.ts'
import { useSessionStorage } from '@/stores/session.ts'

const session = useSessionStorage()

function sortServices(sortType: string, services: types.ServiceDisplay[]) {
  switch (sortType) {
    case 'Duração (Crescente)':
      return services.sort((a, b) => a.time - b.time)
    case 'Duração (Decrescente)':
      return services.sort((a, b) => b.time - a.time)
    default:
      return services.sort((a, b) => (a.id < b.id ? -1 : 1))
  }
}

function filterServices(filterType: string, services: types.ServiceDisplay[]) {
  switch (filterType) {
    case 'Pendente':
      return services.filter((service) => service.status === 'pendente')
    case 'Programado':
      return services.filter((service) => service.status === 'programado')
    case 'Suspenso':
      return services.filter((service) => service.status === 'suspenso')
    case 'Realizado':
      return services.filter((service) => service.status === 'realizado')
    case 'Cancelado':
      return services.filter((service) => service.status === 'cancelado')
    default:
      return services.sort((a, b) => (a.id < b.id ? -1 : 1))
  }
}

function searchServices(searchQuery: string, services: types.ServiceDisplay[]) {
  if (searchQuery && searchQuery != '' && !searchQuery.split('').every((c) => c === ' ')) {
    return services.filter((service) => {
      for (const [_, value] of Object.entries(service)) {
        const query_words = searchQuery.toLowerCase().split(' ')
        if (query_words.every((word) => String(value).toLowerCase().includes(word))) {
          return true
        }
      }
      return false
    })
  } else {
    return services.sort((a, b) => (a.id < b.id ? -1 : 1))
  }
}

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
        const vehicleTypes = await api.list_VehicleTypes()
        this.services = this.services.filter((s) =>
          vehicleTypes[session.type].serviços.includes(s.service_type)
        )

        if (this.$route.query.history !== undefined)
          this.services = this.services.filter(
            (s) =>
              (s.status === 'realizado' || s.status === 'cancelado') &&
              s.employee === session.$state.id
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
    updateServices() {
      this.services = this.originalServices
      this.services = searchServices(this.searchQuery, this.services)
      this.services = filterServices(this.filterType, this.services)
      this.services = sortServices(this.sortMethod, this.services)
    },
    setSearchQuery(query: string) {
      this.searchQuery = query
      this.updateServices()
    },
    setFilterType(type: string) {
      this.filterType = type
      this.updateServices()
    },
    setSortMethod(method: string) {
      this.sortMethod = method
      this.updateServices()
    }
  },
  data() {
    return {
      typeOptions: this.$route.fullPath.includes('?history')
        ? ['Realizado', 'Cancelado']
        : (['Pendente', 'Programado', 'Suspenso'] as string[]),
      sortOptions: ['Duração (Crescente)', 'Duração (Decrescente)'] as string[],
      services: [] as types.ServiceDisplay[],
      originalServices: [] as types.ServiceDisplay[],
      searchQuery: '' as string,
      filterType: '' as string,
      sortMethod: '' as string,
      loaded: false as boolean
    }
  },
  mounted() {
    this.fetchServiceDefinitions()
  }
}
</script>
