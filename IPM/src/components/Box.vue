<template>
  <div class="relative bg-white rounded-lg shadow-2xl p-4 flex flex-col justify-between w-84">
    <Tag v-if="status === 'Realizado'" color="green" text="Realizado" />
    <Tag v-else color="red" text="Pendente" />
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
  import Tag from '@/components/Tag.vue';
export default {
  components: {
    Tag
  },
  props: {
    title: String,
    time: String,
    status: String,
  },
};
</script>