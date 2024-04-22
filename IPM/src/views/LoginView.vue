<template>
  <div class="bg-primary-500 w-screen h-screen">
    <div class="flex justify-center items-center h-full">
      <div
        class="flex flex-col justify-between bg-white p-8 rounded-2xl border shadow-md w-1/4 h-[30rem]"
      >
        <img src="/src/assets/logo.svg" alt="logo" class="w-36 h-36 mx-auto" />
        <form class="flex flex-col justify-center h-fit space-y-6" @submit.prevent>
          <div>
            <label for="email" class="block text-sm font-medium ml-2">Email</label>
            <input
              placeholder="name@example.com"
              id="email"
              name="email"
              class="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              v-model="email"
              required
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium ml-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              class="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              v-model="password"
              required
            />
          </div>
          <div class="pt-2">
            <button
              type="submit"
              class="w-full bg-primary-500 text-white p-2 rounded-md hover:bg-opacity-80 transition-all"
              @click="login"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import * as api from '../api.ts'
import { useSessionStorage } from '@/stores/session.ts'

const session = useSessionStorage()

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      const token = await api.login_Employee(this.email, this.password)
      if (token) {
        session.login(token.id, token.name, token.type)
        this.$router.push('/')
      } else {
        alert('Invalid email or password!')
      }
    }
  }
}
</script>
