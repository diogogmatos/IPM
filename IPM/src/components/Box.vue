<template>
  <div class="relative bg-white rounded-lg shadow-2xl p-4 flex flex-col justify-between w-84">
    <span v-if="status === 'Realizado'" class="text-green-800 font-bold bg-green-200 w-fit px-2 rounded-xl">
      Realizado
    </span>
    <span v-else class="text-red-800 font-bold bg-red-200 w-fit px-2 rounded-xl">
      Pendente
    </span>
    <div class="flex flex-row items-center space-x-4">
        <h3 class="text-lg font-bold text-gray-800">
        {{ title }}
        </h3>
        <p class="text-gray-600 absolute bottom-4 right-4">
        {{ time }}
        </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    time: String,
    status: String,
  },
};
</script>