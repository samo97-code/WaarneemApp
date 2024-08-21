<script setup>

const emit = defineEmits(['clickHandler'])

const props = defineProps({
  type: {
    type: String,
    default: "button"
  },
  title: {
    type: String,
    default: ''
  },
  filled: {
    type: Boolean,
    default: false
  }

})
</script>

<template>
  <button
      :type="type" :class="`${filled ? 'bg-[#484848] text-white border-transparent' : 'text-[#484848] border-[#484848]'}`"
      class="px-14 py-2 rounded-md text-lg font-medium border"
      @click="emit('clickHandler')">
    {{ title }}
  </button>

</template>

<style scoped>

</style>
