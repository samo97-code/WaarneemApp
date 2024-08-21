<script setup>
import Button from "~/components/ui/Button.vue";
import {ref, watch} from 'vue';
import 'v-calendar/dist/style.css';
import {DatePicker} from 'v-calendar';
import {formatDate} from "~/utils/index.js";
import {useListStore} from "~/store/index.js";


//Store
const listStore = useListStore()


//State
const dates = ref([])
const selected = ref({})
const types = ['Consultation', 'Telephone', 'Ambulance']
const form = ref({
  title: '',
  description: ''
})
const optionList = ref([])

//Methods
const addDate = () => {
  dates.value.push({
    date: new Date(),
  });

  optionList.value.push({
    date: formatDate(new Date()),
    startTime: '',
    entTime: '',
    price: 0,
    type: 'Consultation',
  })

  setTimeout(()=>{
    const buttons = document.querySelectorAll('.date-buttons');
    const btn = buttons[dates.value.length - 1]
    btn.click();
  },100)
}
const removeDate = (date, hide) => {
  dates.value = dates.value.filter((d) => d !== date);
  hide();
}
const dateSelected = (e, date, toggle,i) => {
  selected.value = date;
  toggle({ref: e.target});
}



const deleteItem = () => {

}

const saveItem = () => {
  const data = {
    title: form.value.title,
    description: form.value.description,
    optionList: optionList.value,
  }

  listStore.saveList(data)
}

</script>

<template>
  <div :class="`${ listStore.show ? 'visible min-w-[460px] w-[460px] h-screen' : 'hidden min-w-[0] w-[0]'}`" class="sidebar shadow-lg bg-white h-full px-6 py-4">
    <div class="mb-10">
      <h2 class="text-[#484848] text-4xl font-bold">Create/Edit</h2>
      <span class="bg-[#FF7E82] w-[70%] h-[4px] block"></span>
    </div>

    <div class="form-group flex flex-col mb-4">
      <label for="title" class="text-md text-[#484848] mb-2">Title</label>
      <input id="title" type="text" v-model="form.title" class="px-3 py-2 border border-black rounded-[4px] outline-none">
    </div>

    <div class="form-group flex flex-col mb-4">
      <label for="desc" class="text-md text-[#484848] mb-2">Description</label>
      <textarea id="desc" v-model="form.description" class="px-3 py-2 border border-black rounded-[4px] outline-none" rows="4"/>
    </div>


    <div class="bg-white p-2 w-full border rounded">
      <DatePicker v-model="selected.date">
        <template #default="{ inputValue, togglePopover, hidePopover }">
          <div class="flex flex-wrap" v-show="dates.length">
            <button
                v-for="(date, i) in dates"
                :id="`${i}-button`"
                :key="date.date.getTime()"
                class="date-buttons flex items-center bg-indigo-100 hover:bg-indigo-200 text-sm text-indigo-600 font-semibold h-8 px-2 m-1 rounded-lg border-2 border-transparent focus:border-indigo-600 focus:outline-none"
                @click.stop="dateSelected($event, date, togglePopover,i)"
            >
              {{ date.date.toLocaleDateString() }}
              <svg
                  class="w-4 h-4 text-gray-600 hover:text-indigo-600 ml-1 -mr-1"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  @click.stop="removeDate(date, hidePopover)"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </template>
      </DatePicker>
      <button
          class="text-sm text-indigo-600 font-semibold hover:text-indigo-500 px-2 h-8 focus:outline-none"
          @click.stop="addDate"
      >
        + Add Date
      </button>
    </div>

    <div class="dates mt-6 mb-4">
      <div v-for="(item, i) in optionList" :key="i">
        <div class="flex items-center justify-between mb-1">
          <h5 class="text-[#484848] text-lg font-semibold">{{item.date}}</h5>
          <img src="/images/clear.svg" alt="Remove" class="cursor-pointer"/>
        </div>

        <div class="bg-[#484848] px-3 py-3">
          <div class="flex items-center justify-between gap-x-3">
            <div class="form-group flex flex-col">
              <label for="startTime" class="text-md text-white mb-1">Start Time</label>
              <input v-model="optionList[i].startTime" id="startTime" type="time" class="px-3 py-2 border border-black rounded-[4px] outline-none">
            </div>
            <div class="form-group flex flex-col">
              <label for="endTime" class="text-md text-white mb-1">End Time</label>
              <input v-model="optionList[i].endTime" id="endTime" type="time" class="px-3 py-2 border border-black rounded-[4px] outline-none">
            </div>
            <div class="form-group flex flex-col">
              <label for="price" class="text-md text-white mb-1">Price</label>
              <input v-model="optionList[i].price" id="price" type="number" class="px-3 py-2 border border-black rounded-[4px] outline-none w-full">
            </div>
          </div>

          <div class="form-group flex flex-col mb-4">
            <label for="type" class="text-md text-white mb-2">Type</label>
            <select v-model="optionList[i].type" id="type" class="px-3 py-2 border border-black rounded-[4px] outline-none">
              <option :value="type" v-for="type in types" :key="type">{{ type }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="actions flex items-center justify-between">
      <Button type="button" :title="'Delete'" @clickHandler="deleteItem"/>
      <Button type="button" :title="'Save'" filled @clickHandler="saveItem"/>
    </div>
  </div>
</template>

<style scoped>
textarea {
  resize: none;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
