<template>
  <Layout>
    <div class="flex flex-row w-full h-full">
      <div
        v-if="!inProgress && !inSuspension"
        class="relative bg-white flex justify-center w-full h-full p-8 rounded-3xl shadow-md"
      >
        <a
          href="/"
          class="bg-primary text-white p-2 rounded-xl font-semibold text-5xl shadow-sm h-16 w-16 flex items-center justify-center absolute left-8"
        >
          <i class="bi bi-arrow-left-short"></i>
        </a>
        <div class="flex flex-col items-center">
          <h1 class="text-5xl font-bold mt-24">Substituir Pneus</h1>
          <h2 class="text-2xl font-semibold mt-4 text-zinc-400">Detalhes</h2>
          <div class="flex flex-row space-x-4 mt-4">
            <InfoTag color="green" text="Realizado" />
            <InfoTag color="red" text="Pendente" />
            <InfoTag color="orange" text="Em andamento" />
          </div>
          <div class="flex flex-row space-x-32 mt-8">
            <div class="flex flex-col">
              <h1 class="text-4xl font-semibold mt-4">Cliente</h1>
              <div class="flex flex-col space-x-4 mt-2">
                <span class="text-md">Nome</span>
                <p class="text-xl font-semibold">Diogo Matos</p>
              </div>
              <div class="flex flex-col space-x-4 mt-4">
                <span class="text-md">Email</span>
                <p class="text-xl font-semibold">js@email.com</p>
              </div>
              <div class="flex flex-col space-x-4 mt-4">
                <span class="text-md">Telefone</span>
                <p class="text-xl font-semibold">912345678</p>
              </div>
            </div>
            <div class="flex flex-col space-y-2">
              <h1 class="text-4xl font-semibold mt-4">Veículo</h1>
              <InfoTag color="red" text="08-25-AA" padding_x="4" padding_y="2" />
              <InfoTag color="red" text="08-25-AA" padding_x="4" padding_y="2" />
              <InfoTag color="red" text="08-25-AA" padding_x="4" padding_y="2" />
              <InfoTag color="red" text="08-25-AA" padding_x="4" padding_y="2" />
            </div>
          </div>
          <div class="mt-4 flex flex-row space-x-4">
            <button
              @click="startProcess"
              class="w-64 bg-primary text-white p-2 rounded-md font-semibold"
            >
              Iniciar
            </button>
            <button
              class="w-64 bg-white border-2 border-primary text-primary p-2 rounded-md font-semibold"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
      <div v-if="inProgress" class="relative bg-white flex justify-center w-5/6 m-24 rounded-xl">
        <div class="w-2/3">
          <div class="flex flex-col ml-4">
            <div class="">
              <h1 class="text-2xl font-bold mt-16">Notas</h1>
              <textarea
                class="w-2/3 h-40 mt-4 p-4 border-2 border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Escreva aqui as notas do serviço"
              ></textarea>
            </div>
            <div class="">
              <h1 class="text-2xl font-bold mt-8">Serviços Adicionais</h1>
              <input
                type="text"
                class="w-2/3 h-16 mt-4 p-4 border-2 border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Escreva aqui os serviços adicionais"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center w-1/3">
          <h1 class="text-5xl font-bold mt-24">Substituir Pneus</h1>
          <h2 class="text-2xl font-semibold mt-4 text-zinc-400">Detalhes</h2>
          <div class="flex flex-row space-x-4 mt-4">
            <InfoTag color="green" text="Realizado" />
            <InfoTag color="red" text="Pendente" />
            <InfoTag color="orange" text="Em andamento" />
          </div>
          <div class="flex flex-row space-x-32 mt-8">
            <div class="flex flex-col">
              <h1 class="text-4xl font-semibold mt-4">Cliente</h1>
              <div class="flex flex-col space-x-4 mt-2">
                <span class="text-md">Nome</span>
                <p class="text-xl font-semibold">Diogo Matos</p>
              </div>
              <div class="flex flex-col space-x-4 mt-4">
                <span class="text-md">Email</span>
                <p class="text-xl font-semibold">js@email.com</p>
              </div>
              <div class="flex flex-col space-x-4 mt-4">
                <span class="text-md">Telefone</span>
                <p class="text-xl font-semibold">912345678</p>
              </div>
            </div>
            <div class="flex flex-col space-y-2">
              <h1 class="text-4xl font-semibold mt-4">Veículo</h1>
              <InfoTag color="red" text="08-25-AA" padding_x="4" padding_y="2" />
              <InfoTag color="red" text="08-25-AA" padding_x="4" padding_y="2" />
              <InfoTag color="red" text="08-25-AA" padding_x="4" padding_y="2" />
              <InfoTag color="red" text="08-25-AA" padding_x="4" padding_y="2" />
            </div>
          </div>
          <div class="mt-4 flex flex-row space-x-4">
            <button
              @click="finishProcess"
              class="w-40 bg-primary text-white p-2 rounded-md font-semibold"
            >
              Concluir
            </button>
            <button
              @click="startSuspension"
              class="w-40 bg-white border-2 border-primary text-primary p-2 rounded-md font-semibold"
            >
              Suspender
            </button>
          </div>
        </div>
      </div>
      <div v-if="inSuspension" class="relative bg-white flex justify-center w-5/6 m-24 rounded-xl">
        <a
          href="/"
          class="bg-primary text-white p-2 rounded-md font-semibold h-16 w-16 flex items-center justify-center mt-4 absolute left-4"
        >
          <img src="../assets/left_arrow.svg" alt="arrow-left" class="w-8 h-8 inline-block" />
        </a>
        <div class="flex flex-col items-center">
          <h1 class="text-5xl font-bold mt-24">Substituir Pneus</h1>
          <h2 class="text-2xl font-semibold mt-4 text-zinc-400">Detalhes</h2>
          <div class="flex flex-row space-x-4 mt-4">
            <InfoTag color="green" text="Realizado" />
            <InfoTag color="red" text="Pendente" />
            <InfoTag color="orange" text="Em andamento" />
          </div>
          <div class="w-full">
            <h1 class="text-2xl font-bold mt-16">Motivo</h1>
            <textarea
              class="w-full h-40 mt-4 p-4 border-2 border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Motivo da Suspenção..."
            ></textarea>
          </div>
          <button
            @click="cancelProcess"
            class="w-full bg-primary text-white p-2 rounded-md font-semibold mt-4"
          >
            Suspender
          </button>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import InfoTag from '@/components/InfoTag.vue'
import Layout from '@/components/Layout/Layout.vue'

export default {
  components: {
    Layout,
    InfoTag
  },
  data() {
    return {
      inProgress: false,
      inSuspension: false
    }
  },
  methods: {
    startProcess() {
      // Logic to start the process
      this.inProgress = true
      this.inSuspension = false
    },
    cancelProcess() {
      // Logic to cancel the process
      this.inProgress = false
      this.inSuspension = false
    },
    finishProcess() {
      // Redirect to the next page
      this.$router.push('/')
    },
    startSuspension() {
      this.inProgress = false
      this.inSuspension = true
    },
    cancelSuspension() {
      this.inProgress = true
      this.inSuspension = false
    }
  }
}
</script>
