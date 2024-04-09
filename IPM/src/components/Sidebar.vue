<template>
    <div id="Sidebar" class="relative bg-white w-1/6 rounded-r-2xl py-4">
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

      <div class="absolute bottom-0 min-w-[100%]">
          <div class="px-8 bg-zinc-100 h-12 flex items-center">
            <button class="text-center text-lg font-semibold text-zinc-500">Diogo Matos</button>
          </div>
          <div class="px-8 bg-orange-200 h-12 flex items-center">
            <button class="text-center text-lg font-semibold text-orange-500">Sair</button>
          </div>
      </div>
    </div>
</template>

<script>
export default {
};

</script>