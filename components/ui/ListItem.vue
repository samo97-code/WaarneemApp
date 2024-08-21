<script setup>

const props = defineProps({
  shift: {
    type: Object,
  }
})

</script>

<template>
  <div class="bg-white shadow-xl rounded-md px-8 py-4 mb-8">
    <div class="header flex justify-between items-center mb-4">
      <h3 class="text-[#484848] text-4xl font-medium">{{shift.title}}</h3>

      <img src="/images/edit-dark.svg" alt="Edit" class="cursor-pointer" />
    </div>

    <p class="text-2xl text-[#484848]">
      {{ shift.description }}
    </p>

    <div class="mt-8">
      <h3 class="text-[#484848] text-4xl font-medium mb-3">Dates</h3>

      <div :key="index" v-for="item in shift.optionList" class="overflow-x-scroll sm:overflow-x-hidden bg-[#484848] rounded-md px-6 sm:px-10 py-4 flex gap-x-4 items-center justify-between mb-4">
        <div class="flex items-center gap-x-4 sm:gap-x-12">
          <span class="text-x text-white whitespace-nowrap">{{ item.date }}</span>

          <div class="flex items-center gap-x-4 sm:gap-x-5">
            <span class="text-x text-white whitespace-nowrap">{{ item.startTime }}</span>
            <span class="text-x text-white whitespace-nowrap">{{item.endTime}}</span>
          </div>

          <span class="text-x text-white whitespace-nowrap">{{ item.type }}</span>
        </div>

        <div>
          <span class="text-x text-white whitespace-nowrap">€{{item.price}}</span>
        </div>
      </div>
    </div>
  </div>

</template>

