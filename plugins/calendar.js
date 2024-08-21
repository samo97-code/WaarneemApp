import { defineNuxtPlugin } from 'nuxt/app';
import VCalendar from 'v-calendar';

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(VCalendar);
});
