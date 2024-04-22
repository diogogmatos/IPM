import { defineStore } from 'pinia'

export const useSessionStorage = defineStore('session', {
  state: () => ({
    id: '',
    name: '',
    type: ''
  }),
  actions: {
    login(id: string, name: string, type: string) {
      this.id = id
      this.name = name
      this.type = type
    },
    logout() {
      this.id = ''
      this.name = ''
      this.type = ''
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.id && state.name && state.type
    }
  },
  persist: true
})
