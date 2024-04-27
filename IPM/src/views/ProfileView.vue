<template>
  <AppLayout>
    <div
      class="relative bg-white flex justify-center w-full h-full rounded-3xl shadow-md overflow-hidden"
    >
      <div
        class="w-full h-full p-8 overflow-scroll overflow-x-hidden flex flex-col justify-center items-center space-y-12"
      >
        <div v-if="!changingPassword" class="space-y-6 w-fit">
          <div class="space-y-1">
            <label for="name">Nome</label>
            <p id="name" class="text-3xl font-semibold">
              {{ session.name }}
            </p>
          </div>
          <div class="space-y-1">
            <label for="name">Email</label>
            <p id="name" class="text-3xl font-semibold">
              {{ session.id }}
            </p>
          </div>
          <div class="space-y-1">
            <label for="name">Especialidade</label>
            <p id="name" class="text-3xl font-semibold">
              {{ session.type }}
            </p>
          </div>
          <AppButton
            :active="true"
            :style="'w-full p-3'"
            @click="
              () => {
                changingPassword = true
              }
            "
            >Alterar Password -></AppButton
          >
        </div>
        <div v-else class="space-y-6 w-fit">
          <div>
            <label for="password" class="block text-sm font-medium ml-2">Password Atual</label>
            <input
              type="password"
              id="password"
              name="password"
              class="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              v-model="password"
              required
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium ml-2">Nova Password</label>
            <input
              type="password"
              id="password"
              name="password"
              class="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              v-model="newPassword"
              required
            />
          </div>
          <div class="flex space-x-2">
            <AppButton :style="'w-full p-2'" :active="true" @click="changePassword"
              >Confirmar</AppButton
            >
            <AppButton
              :style="'w-full p-2'"
              @click="
                () => {
                  changingPassword = false
                }
              "
              >Cancelar</AppButton
            >
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import AppLayout from '@/components/AppLayout/AppLayout.vue'
import AppButton from '@/components/AppButton.vue'
import * as api from '../api.ts'
import { useSessionStorage } from '@/stores/session.ts'

export default {
  components: {
    AppLayout,
    AppButton
  },
  data() {
    return {
      changingPassword: false,
      password: '',
      newPassword: '',
      session: useSessionStorage()
    }
  },
  methods: {
    async changePassword() {
      const r = await api.change_EmployeePassword(this.session.id, this.password, this.newPassword)
      if (r) {
        alert('Password alterada com sucesso!')
        this.changingPassword = false
      } else {
        alert('Password atual inválida!')
      }
    }
  }
}
</script>
