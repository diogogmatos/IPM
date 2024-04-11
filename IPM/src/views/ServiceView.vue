<template>
  <div class="flex flex-row w-full h-full">
    <AppLayout>
      <div
        class="relative bg-white flex justify-center w-full h-full rounded-3xl shadow-md overflow-hidden"
      >
        <div class="w-full h-full p-8 overflow-scroll overflow-x-hidden">
          <button
            v-if="inSuspension"
            @click="cancelSuspension"
            class="bg-primary-500 text-white hover:bg-opacity-80 transition-all p-2 rounded-xl font-semibold text-5xl shadow-sm h-16 w-16 flex items-center justify-center absolute left-8"
          >
            <i class="bi bi-arrow-left-short"></i>
          </button>
          <a
            v-else-if="!inProgress"
            href="/"
            class="bg-primary-500 text-white hover:bg-opacity-80 transition-all p-2 rounded-xl font-semibold text-5xl shadow-sm h-16 w-16 flex items-center justify-center absolute left-8"
          >
            <i class="bi bi-arrow-left-short"></i>
          </a>
          <div class="flex flex-row space-x-20 justify-center items-center h-full">
            <div v-if="inProgress" :class="` w-[400px] space-y-6`">
              <div class="space-y-3">
                <h1 class="text-xl font-semibold ml-3">Notas</h1>
                <textarea
                  class="border rounded-xl w-full h-52 p-4 outline-none focus:border-primary-500 resize-none"
                  placeholder="Notas a adicionar..."
                />
              </div>
              <div class="space-y-3">
                <h1 class="text-xl font-semibold ml-3">Serviços Adicionais</h1>
                <AppButton :active="false" :style="`w-full h-12`"> + </AppButton>
              </div>
            </div>
            <div :class="`flex flex-col ${inProgress ? 'w-[400px]' : 'w-full'} space-y-12`">
              <div class="flex flex-col space-y-6">
                <h1
                  :class="`text-5xl font-semibold text-center ${!inProgress ? 'px-28' : 'max-w-[400px]'}`"
                >
                  {{ service.title }}
                </h1>
                <h2
                  :class="`text-2xl font-semibold text-zinc-400 w-full text-center ${!inProgress && 'px-32'}`"
                >
                  {{ service.description }}
                </h2>
                <div :class="`flex flex-row space-x-4 w-fit border-b pb-12 mx-auto`">
                  <InfoTag color="primary">
                    <i class="bi bi-info-circle"></i> {{ service.id }}
                  </InfoTag>
                  <InfoTag v-if="service.status === 'realizado'" color="green">Realizado</InfoTag>
                  <InfoTag v-else-if="service.status === 'nafila'" color="yellow">Pendente</InfoTag>
                  <InfoTag v-else-if="service.status === 'programado'" color="blue"
                    >Programado</InfoTag
                  >
                  <InfoTag v-else-if="service.status === 'suspenso'" color="red">Suspenso</InfoTag>
                  <InfoTag v-if="service.date" color="purple">
                    {{ padNumber(service.date.getDate(), 2) }}/{{
                      padNumber(service.date.getMonth() + 1, 2)
                    }}
                    · {{ service.date.getHours() }}:{{ service.date.getMinutes() }}h
                  </InfoTag>
                </div>
              </div>
              <div>
                <div v-if="inSuspension" class="flex flex-col justify-center mx-40">
                  <div class="space-y-3 mx-32">
                    <h1 class="text-xl font-semibold ml-3">Motivo</h1>
                    <textarea
                      class="border rounded-xl w-full h-52 p-4 outline-none focus:border-primary-500 resize-none"
                      placeholder="Motivo da suspensão..."
                    />
                  </div>
                </div>
                <div
                  v-else
                  :class="`flex flex-row justify-center ${!inProgress ? 'space-x-32' : 'space-x-20'}`"
                >
                  <div class="flex flex-col space-y-4">
                    <h1 class="text-4xl font-semibold pb-4 border-b">Cliente</h1>
                    <div class="flex flex-col space-x-2">
                      <span class="text-md">Nome</span>
                      <p class="text-xl font-semibold">{{ service.client_name }}</p>
                    </div>
                    <div class="flex flex-col space-x-2">
                      <span class="text-md">Email</span>
                      <p class="text-xl font-semibold">{{ service.client_email }}</p>
                    </div>
                    <div class="flex flex-col space-x-2">
                      <span class="text-md">Telefone</span>
                      <p class="text-xl font-semibold">{{ service.client_phone }}</p>
                    </div>
                  </div>
                  <div class="flex flex-col space-y-4 items-center">
                    <h1 class="text-4xl font-semibold pb-4 mb-3 border-b">Veículo</h1>
                    <InfoTag color="blue">
                      <i class="bi bi-car-front-fill"></i> {{ service.vehicleId }}
                    </InfoTag>
                    <InfoTag color="lime">
                      <i class="bi bi-fuel-pump-fill"></i> {{ service.vehicle_type }}
                    </InfoTag>
                    <InfoTag color="neutral">
                      <i class="bi bi-signpost-fill"></i> {{ service.vehicle_kms }} Km
                    </InfoTag>
                    <InfoTag color="orange">
                      <i class="bi bi-gear-wide-connected"></i>
                      {{
                        service.vehicle_torque === undefined
                          ? service.vehicle_power
                          : service.vehicle_torque
                      }}
                      cm³
                    </InfoTag>
                  </div>
                </div>
              </div>
              <div v-if="!done" :class="`flex flex-row space-x-4 justify-center px-2`">
                <!-- botão iniciar/concluir da página inicial de um serviço/página de um serviço em progresso, respetivamente -->
                <PopConfirm
                  v-if="!inSuspension"
                  :title="
                    inProgress
                      ? 'Tem a certeza que pretende concluir o serviço?'
                      : 'Tem a certeza que pretende iniciar o serviço?'
                  "
                  :onConfirm="inProgress ? finishProcess : startProcess"
                  :buttonProps="inProgress ? 'w-full' : 'px-28'"
                >
                  {{ inProgress ? 'Concluir' : 'Iniciar' }}
                </PopConfirm>
                <!-- botão suspender da página de suspensão -->
                <PopConfirm
                  v-else
                  :title="'Tem a certeza que pretende suspender o serviço?'"
                  :buttonProps="'w-60 mx-40 h-12'"
                  :onConfirm="startSuspension"
                >
                  Suspender
                </PopConfirm>
                <!-- botão cancelar da página inicial do serviço -->
                <PopConfirm
                  v-if="!inProgress && !inSuspension"
                  :title="'Tem a certeza que pretende cancelar o serviço?'"
                  :onConfirm="cancelProcess"
                  :buttonActive="false"
                >
                  Cancelar
                </PopConfirm>
                <!-- botão suspender da página de um serviço em progresso -->
                <AppButton v-else-if="inProgress" @click="startSuspension"> Suspender </AppButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  </div>
</template>

<script>
import InfoTag from '@/components/InfoTag.vue'
import AppLayout from '@/components/AppLayout/AppLayout.vue'
import AppButton from '@/components/AppButton.vue'
import PopConfirm from '@/components/PopConfirm.vue'
import * as api from '../api.ts'

export default {
  components: {
    AppButton,
    AppLayout,
    InfoTag,
    PopConfirm
  },
  data() {
    return {
      inProgress: false,
      inSuspension: false,
      service: [],
      serviceDefinition: [],
      vehicle: [],
      client: [],
      done: false,
      padNumber: (n, l) => `${n}`.padStart(l, '0')
    }
  },
  mounted() {
    this.fetchService()
  },
  methods: {
    startProcess() {
      this.inProgress = true
      this.inSuspension = false
    },
    cancelProcess() {
      this.inProgress = false
      this.inSuspension = false
    },
    finishProcess() {
      this.$router.push('/')
    },
    startSuspension() {
      this.inProgress = false
      this.inSuspension = true
    },
    cancelSuspension() {
      this.inProgress = true
      this.inSuspension = false
    },
    async fetchService() {
      try {
        this.service = await api.get_ServiceDisplay(this.$route.params.id)
        this.done = this.service.status === 'realizado'
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
