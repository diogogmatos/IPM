<template>
  <div class="bg-primary min-h-screen max-h-fit min-w-screen flex flex-row">
    <div id="Sidebar" class="bg-white w-1/6 rounded-r-2xl py-4">
      <img src="../assets/logo.svg" alt="logo" class="w-36 h-36 mx-auto">
      <h1 class="text-center text-2xl font-bold">Posto 1</h1>
      
      <div class="mt-16 h-full">
        <div class="px-8 bg-zinc-100 h-12 flex items-center">
          <button class="text-center text-lg font-semibold text-zinc-500">Serviços atríbuidos</button>
        </div>
        <div class="px-8 bg-orange-100 h-12 flex items-center">
          <button class="text-center text-lg font-semibold text-orange-500">Histórico de Serviços</button>
        </div>
      </div>

      <div class="absolute bottom-0 w-1/6">
          <div class="px-8 bg-zinc-100 h-12 flex items-center">
            <button class="text-center text-lg font-semibold text-zinc-500">Diogo Matos</button>
          </div>
          <div class="px-8 bg-orange-200 h-12 flex items-center">
            <button class="text-center text-lg font-semibold text-orange-500">Sair</button>
          </div>
      </div>
    </div>
    <div id="main-content" class="flex flex-col w-5/6 mt-16">
      <div class="flex flex-row justify-center items-center h-24 w-full space-x-6">
        <input type="search" class="w-1/5 h-12 rounded-lg shadow-xl px-4" placeholder="Pesquisar"></input>
        <Dropdown :options="colorOptions" class="" :placeholder="'Tipo de Serviço'"></Dropdown>
        <Dropdown :options="colorOptions" class="" :placeholder="'Duração (Crescente)'"></Dropdown>
      </div>
      <div class="grid grid-cols-2 gap-x-16 gap-y-4 mx-auto">
        <Box v-for="(task, index) in tasks" :key="index" :title="task.title" :time="task.time" :status="task.status" />
      </div>
    </div>
  </div>
</template>

<script>
import Popup from '../components/Popup.vue';
import Dropdown from '../components/Dropdown.vue';
import Box from '../components/Box.vue';

export default {
  components: {
    Popup,
    Dropdown,
    Box
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
      ]
    };
  }
};
</script>
