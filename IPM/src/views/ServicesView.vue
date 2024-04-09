<template>
  <div class="bg-primary min-h-screen max-h-fit min-w-screen flex flex-row">
    <Sidebar />
    <div id="main-content" class="flex flex-col w-5/6 mt-16">
      <div class="flex flex-row justify-center items-center h-24 w-full space-x-6">
        <input type="search" class="w-1/5 h-12 rounded-lg shadow-xl px-4" placeholder="Pesquisar"></input>
        <Dropdown :options="colorOptions" class="" :placeholder="'Tipo de Serviço'"></Dropdown>
        <Dropdown :options="colorOptions" class="" :placeholder="'Duração (Crescente)'"></Dropdown>
      </div>
      <div class="grid grid-cols-2 gap-x-16 gap-y-4 mx-auto">
        <Box v-for="(task, index) in serviceDefinitions" :key="index" :title="task.descr" :time="task.duração" :status="Realizado" />
      </div>
    </div>
  </div>
</template>

<script>
import Popup from '@/components/Popup.vue';
import Dropdown from '@/components/Dropdown.vue';
import Box from '@/components/Box.vue';
import Sidebar from '@/components/Sidebar.vue';
import { list_ServiceDefinitions } from "../api.ts";

export default {
  components: {
    Popup,
    Dropdown,
    Box,
    Sidebar
  },
  methods: {
    openPopup() {
      this.$refs.popup.open();
    }
  },
  data() {
    return {
      colorOptions: ['Red', 'Green', 'Blue'],
      tasks: [
        { title: "Substituir Pneus", time: "40min", status: "Realizado" },
        { title: "Mudar Óleo", time: "30min", status: "Pendente" },
        { title: "Substituir Pneus", time: "40min", status: "Realizado" },
        { title: "Mudar Óleo", time: "30min", status: "Pendente" },
        { title: "Substituir Pneus", time: "40min", status: "Realizado" },
        { title: "Mudar Óleo", time: "30min", status: "Pendente" },
        { title: "Substituir Pneus", time: "40min", status: "Realizado" },
        { title: "Mudar Óleo", time: "30min", status: "Pendente" },
        { title: "Substituir Pneus", time: "40min", status: "Realizado" },
        { title: "Mudar Óleo", time: "30min", status: "Pendente" },
        { title: "Substituir Pneus", time: "40min", status: "Realizado" },
        { title: "Mudar Óleo", time: "30min", status: "Pendente" },
        { title: "Substituir Pneus", time: "40min", status: "Realizado" },
        { title: "Mudar Óleo", time: "30min", status: "Pendente" },
      ],
      serviceDefinitions: []
    };
  },
    mounted() {
    this.fetchServiceDefinitions();
  },
  methods: {
    async fetchServiceDefinitions() {
      try {
        const definitions = await list_ServiceDefinitions();
        this.serviceDefinitions = definitions;
        console.log("Service definitions:", definitions);
      } catch (error) {
        console.error("Error fetching service definitions:", error);
      }
    }
  }
};
</script>
