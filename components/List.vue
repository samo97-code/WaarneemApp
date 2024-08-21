<script setup>
import Button from "~/components/ui/Button.vue";
import ListItem from "~/components/ui/ListItem.vue";
import {useListStore} from "~/store";


//Store
const listStore = useListStore()

//Methods
const clickHandler = ()=>{
  listStore.toggleShow(!listStore.show)
}
</script>

<template>
  <div class="list mt-8 w-full">
    <div class="header flex justify-between mb-8">
      <div>
        <h2 class="text-[#484848] text-4xl font-bold">Shifts</h2>
        <span class="bg-[#FF7E82] w-[70%] h-[4px] block"></span>
      </div>

      <Button type="button" :title="'ADD SHIFT'" filled @clickHandler="clickHandler"/>
    </div>


    <ListItem v-for="(shift,i) in listStore.shifts" :shift="shift" key="i"/>
  </div>
</template>

