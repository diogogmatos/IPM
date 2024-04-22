<template>
  <div
    id="AppSidebar"
    class="bg-white min-w-96 rounded-r-3xl pt-12 border-r shadow-lg space-y-12 h-screen overflow-hidden"
  >
    <img src="/src/assets/logo.svg" alt="logo" class="w-32 h-32 mx-auto" />
    <h1 class="text-center text-2xl font-[700]">Posto #1</h1>
    <nav
      class="flex flex-col justify-between font-[600] text-2xl text-neutral-400 h-[calc(100dvh-304px)]"
    >
      <div>
        <router-link
          to="/"
          :class="`flex bg-neutral-100 p-3 w-full justify-center space-x-3 hover:text-primary-500 hover:bg-primary-100 transition-all ${services && 'text-primary-500 bg-primary-100'}`"
        >
          <i class="bi bi-tools"></i>
          <span>Serviços Atribuídos</span>
        </router-link>
        <router-link
          to="/?history"
          :class="`flex bg-neutral-100 p-3 w-full justify-center space-x-3 hover:text-primary-500 hover:bg-primary-100 transition-all ${history && 'text-primary-500 bg-primary-100'}`"
        >
          <i class="bi bi-clock-history"></i>
          <span>Histórico Serviços</span>
        </router-link>
      </div>
      <div>
        <router-link
          to="/profile"
          :class="`flex bg-neutral-100 p-3 px-12 w-full justify-between space-x-3 hover:text-primary-500 hover:bg-primary-100 transition-all ${$route.fullPath === '/profile' && 'text-primary-500 bg-primary-100'}`"
        >
          <div class="space-x-3">
            <i class="bi bi-person-fill"></i>
            <span>{{ session.name }}</span>
          </div>
          <span class="font-inter">-></span>
        </router-link>
        <button
          @click="logout"
          class="flex bg-red-100 text-red-600 p-3 px-12 w-full space-x-3 hover:text-white hover:bg-red-600 transition-all"
        >
          <i class="bi bi-door-open-fill"></i>
          <span>Sair</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import * as api from '../../api.ts'
import { useSessionStorage } from '@/stores/session.ts'

export default {
  data() {
    return {
      services: false,
      history: false,
      session: useSessionStorage()
    }
  },
  methods: {
    async checkPage() {
      if (this.$route.params.id) {
        const service = await api.get_Service(this.$route.params.id as string)
        if (service.estado === 'realizado' || service.estado === 'cancelado') {
          this.history = true
        } else {
          this.services = true
        }
      }
      if (this.$route.fullPath === '/') {
        this.services = true
      }
      if (this.$route.fullPath.includes('?history')) {
        this.history = true
      }
    },
    logout() {
      this.session.logout()
      this.$router.push('/login')
    }
  },
  mounted() {
    this.checkPage()
  }
}
</script>
