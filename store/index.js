import { defineStore } from "pinia";

export const useListStore = defineStore('list', {
    state: () => ({
        lists: [],
        show: false
    }),
    getters:{
        shifts: state => state.lists
    },
    actions: {
        saveList(payload) {
            this.lists.push(payload)
            this.show = false
        },

        toggleShow(payload) {
            this.show = payload
        }
    }
})
