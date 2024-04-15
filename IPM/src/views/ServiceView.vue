<template>
  <div class="flex flex-row w-full h-full">
    <AppLayout>
      <div
        class="relative bg-white flex justify-center w-full h-full rounded-3xl shadow-md overflow-hidden"
      >
        <div class="w-full h-full p-8 overflow-scroll overflow-x-hidden">
          <button
            v-if="inSuspension || inCanceling"
            @click="inSuspension ? stopSuspension() : stopCancelProcess()"
            class="bg-primary-500 text-white hover:bg-opacity-80 transition-all p-2 rounded-xl font-semibold text-5xl shadow-sm h-16 w-16 flex items-center justify-center absolute left-8"
          >
            <i class="bi bi-arrow-left-short"></i>
          </button>
          <a
            v-else-if="!inProgress"
            :href="`${servicesPage ? '/' : historyPage ? '/?history' : ''}`"
            class="bg-primary-500 text-white hover:bg-opacity-80 transition-all p-2 rounded-xl font-semibold text-5xl shadow-sm h-16 w-16 flex items-center justify-center absolute left-8"
          >
            <i class="bi bi-arrow-left-short"></i>
          </a>
          <div v-if="!loaded" class="flex flex-col w-full h-full items-center justify-center">
            <AppSpinner :dark="true" />
          </div>
          <div v-else class="flex flex-row space-x-20 justify-center items-center h-full">
            <div v-if="inProgress || finished" :class="` w-[400px] space-y-6`">
              <div v-if="service.status !== 'cancelado'" class="space-y-3">
                <h1 class="text-xl font-semibold ml-3">Notas</h1>
                <textarea
                  v-if="!finished"
                  class="border rounded-xl w-full h-52 p-4 outline-none focus:border-primary-500 resize-none"
                  placeholder="Notas a adicionar..."
                  v-bind="notes"
                />
                <textarea
                  v-else-if="service.notes && service.notes.length > 0"
                  class="border rounded-xl w-full h-52 p-4 outline-none focus:border-primary-500 resize-none"
                  readonly
                  disabled
                  v-model="service.notes"
                />
                <p
                  v-if="finished && (!service.notes || service.notes.length === 0)"
                  class="text-gray-400"
                >
                  Não foram registadas notas adicionais para este serviço.
                </p>
              </div>
              <div v-if="service.status !== 'cancelado'" class="space-y-3">
                <h1 class="text-xl font-semibold ml-3">Serviços Adicionais</h1>
                <div
                  v-for="(service, index) in selected_aditional_services"
                  :key="index"
                  class="w-full bg-white border rounded-xl p-3 font-medium flex justify-between"
                >
                  {{ service }}
                  <button v-if="!finished" @click="removeService(index)">
                    <i
                      class="bi bi-trash-fill text-neutral-400 hover:text-red-500 transition-all"
                    ></i>
                  </button>
                </div>
                <AppDropdown
                  v-if="!finished"
                  :customButtonActive="false"
                  :customButtonProps="`w-full h-12`"
                  :options="shown_aditional_services"
                  :highlightSelected="false"
                  @dropdownChange="addService"
                >
                  +
                </AppDropdown>
                <p
                  v-if="finished && selected_aditional_services.length === 0"
                  class="text-gray-400"
                >
                  Não foram recomendados serviços adicionais.
                </p>
              </div>
              <div v-else class="space-y-3">
                <h1 class="text-xl font-semibold ml-3">Motivo de Cancelamento</h1>
                <textarea
                  v-if="service.motive && service.motive.length > 0"
                  class="border rounded-xl w-full h-52 p-4 outline-none focus:border-primary-500 resize-none"
                  readonly
                  disabled
                  v-model="service.motive"
                />
                <p v-else class="text-gray-400">
                  Não foi indicado um motivo para o cancelamento do serviço.
                </p>
              </div>
            </div>
            <div
              :class="`flex flex-col ${inProgress || finished ? 'w-[400px]' : 'w-full'} space-y-12`"
            >
              <div class="flex flex-col space-y-6">
                <h1
                  :class="`text-5xl font-semibold text-center ${!(inProgress || finished) ? 'px-28' : 'max-w-[400px]'}`"
                >
                  {{ service.title }}
                </h1>
                <h2
                  :class="`text-2xl font-semibold text-zinc-400 w-full text-center ${!(inProgress || finished) && 'px-32'}`"
                >
                  {{ service.description }}
                </h2>
                <div :class="`flex flex-row space-x-4 w-fit border-b pb-12 mx-auto`">
                  <InfoTag color="primary">
                    <i class="bi bi-info-circle"></i> {{ service.id }}
                  </InfoTag>
                  <InfoTag v-if="service.status === 'realizado'" color="green">Realizado</InfoTag>
                  <InfoTag v-else-if="service.status === 'pendente'" color="yellow"
                    >Pendente</InfoTag
                  >
                  <InfoTag v-else-if="service.status === 'programado'" color="blue"
                    >Programado</InfoTag
                  >
                  <InfoTag v-else-if="service.status === 'suspenso'" color="red">Suspenso</InfoTag>
                  <InfoTag v-else-if="service.status === 'cancelado'" color="red"
                    >Cancelado</InfoTag
                  >
                  <InfoTag v-if="service.date" color="purple">
                    {{ padNumber(service.date.getDate(), 2) }}/{{
                      padNumber(service.date.getMonth() + 1, 2)
                    }}
                    · {{ service.date.getHours() }}:{{ service.date.getMinutes() }}h
                  </InfoTag>
                </div>
              </div>
              <div class="space-y-10">
                <div
                  v-if="
                    service.status === 'suspenso' && !inProgress && !inSuspension && !inCanceling
                  "
                  class="space-y-3"
                >
                  <h1 class="text-xl font-semibold text-center">Motivo de Suspensão</h1>
                  <p
                    v-if="service.motive && service.motive.length > 0"
                    class="text-gray-600 text-center"
                  >
                    {{ service.motive }}
                  </p>
                  <p v-else class="text-gray-400 text-center">
                    Não foi indicado um motivo para a suspensão.
                  </p>
                </div>
                <div v-if="inSuspension || inCanceling" class="flex flex-col justify-center mx-40">
                  <div class="space-y-3 mx-32">
                    <h1 class="text-xl font-semibold ml-3">Motivo</h1>
                    <textarea
                      class="border rounded-xl w-full h-52 p-4 outline-none focus:border-primary-500 resize-none"
                      :placeholder="
                        inSuspension ? 'Motivo da suspensão...' : 'Motivo do cancelamento...'
                      "
                    />
                  </div>
                </div>
                <div
                  v-else
                  :class="`flex flex-row justify-center ${!(inProgress || finished || service.status === 'suspenso') ? 'space-x-32' : 'space-x-20'}`"
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
                  <div
                    :class="`flex flex-col items-center ${service.vehicle_torque && service.vehicle_power ? 'space-y-3' : 'space-y-4'}`"
                  >
                    <h1
                      :class="`text-4xl font-semibold pb-4 border-b ${service.vehicle_torque && service.vehicle_power ? '' : 'mb-3'}`"
                    >
                      Veículo
                    </h1>
                    <InfoTag color="blue">
                      <i class="bi bi-car-front-fill"></i> {{ service.vehicleId }}
                    </InfoTag>
                    <InfoTag color="lime">
                      <i class="bi bi-fuel-pump-fill"></i> {{ service.vehicle_type }}
                    </InfoTag>
                    <InfoTag v-if="service.vehicle_torque" color="orange">
                      <i class="bi bi-gear-wide-connected"></i>
                      {{ service.vehicle_torque }}
                      cm³
                    </InfoTag>
                    <InfoTag v-if="service.vehicle_power !== undefined" color="orange">
                      <i class="bi bi-lightning-fill"></i>
                      {{ service.vehicle_power }} kWh
                    </InfoTag>
                    <InfoTag color="neutral">
                      <i class="bi bi-signpost-fill"></i> {{ service.vehicle_kms }} Km
                    </InfoTag>
                  </div>
                </div>
              </div>
              <div v-if="!finished" :class="`flex flex-row space-x-4 justify-center px-2`">
                <!-- botão iniciar/concluir da página inicial de um serviço/página de um serviço em progresso, respetivamente -->
                <PopConfirm
                  v-if="!inSuspension && !inCanceling"
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
                  v-else-if="inSuspension"
                  :title="'Tem a certeza que pretende suspender o serviço?'"
                  :buttonProps="'w-60 mx-40 h-12'"
                  :onConfirm="() => {}"
                >
                  Suspender
                </PopConfirm>
                <!-- botão cancelar da página de cancelamento -->
                <PopConfirm
                  v-else
                  :title="'Tem a certeza que pretende cancelar o serviço?'"
                  :buttonProps="'w-60 mx-40 h-12'"
                  :onConfirm="() => {}"
                >
                  Cancelar
                </PopConfirm>
                <!-- botão cancelar da página inicial de um serviço -->
                <AppButton
                  v-if="!inProgress && !inSuspension && !inCanceling"
                  @click="startCancelProcess"
                >
                  Cancelar
                </AppButton>
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
import AppDropdown from '@/components/AppDropdown.vue'
import AppSpinner from '@/components/AppSpinner.vue'
import * as api from '../api.ts'

export default {
  components: {
    AppSpinner,
    AppButton,
    AppLayout,
    InfoTag,
    AppDropdown,
    PopConfirm
  },
  data() {
    return {
      inProgress: false,
      inSuspension: false,
      inCanceling: false,
      service: [],
      aditional_services: [],
      selected_aditional_services: [],
      vehicle: [],
      client: [],
      finished: false,
      notes: '',
      padNumber: (n, l) => `${n}`.padStart(l, '0'),
      servicesPage: false,
      historyPage: false,
      loaded: false
    }
  },
  mounted() {
    this.fetchService()
    this.checkPage()
  },
  methods: {
    startProcess() {
      this.inProgress = true
      this.inSuspension = false
      this.inCanceling = false
    },
    startCancelProcess() {
      this.inProgress = false
      this.inSuspension = false
      this.inCanceling = true
    },
    stopCancelProcess() {
      this.inProgress = false
      this.inSuspension = false
      this.inCanceling = false
    },
    cancelProcess() {
      // cenas
    },
    finishProcess() {
      this.$router.push('/')
    },
    startSuspension() {
      this.inProgress = false
      this.inSuspension = true
      this.inCanceling = false
    },
    stopSuspension() {
      this.inProgress = true
      this.inSuspension = false
      this.inCanceling = false
    },
    addService(service) {
      if (service !== '' && !this.selected_aditional_services.includes(service)) {
        this.selected_aditional_services.push(service)
        this.shown_aditional_services = this.aditional_services.filter(
          (s) => !this.selected_aditional_services.includes(s)
        )
      }
    },
    removeService(index) {
      this.selected_aditional_services = this.selected_aditional_services.filter(
        (s, i) => i !== index
      )
      this.shown_aditional_services = this.aditional_services.filter(
        (s) => !this.selected_aditional_services.includes(s)
      )
    },
    async fetchService() {
      try {
        this.service = await api.get_ServiceDisplay(this.$route.params.id)
        this.finished = this.service.status === 'realizado' || this.service.status === 'cancelado'
        this.aditional_services = await api.list_ServiceDefinitions()
        if (this.finished && this.service.status === 'realizado') {
          this.selected_aditional_services = this.service.aditional_services
            .map((sid) => this.aditional_services[sid])
            .map((s) => s.descr)
            .sort()
          this.shown_aditional_services = this.aditional_services
        } else {
          this.aditional_services = Object.values(this.aditional_services)
            .map((s) => s.descr)
            .sort()
          this.shown_aditional_services = this.aditional_services
        }
        this.loaded = true
      } catch (error) {
        console.error(error)
      }
    },
    async checkPage() {
      if (this.$route.params.id) {
        const service = await api.get_Service(this.$route.params.id)
        if (service.estado === 'realizado' || service.estado === 'cancelado') {
          this.historyPage = true
        } else {
          this.servicesPage = true
        }
      }
      if (this.$route.fullPath === '/') {
        this.servicesPage = true
      }
      if (this.$route.fullPath.includes('?history')) {
        this.historyPage = true
      }
    }
  }
}
</script>
