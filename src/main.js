import 'gsap/CSSPlugin'
import Vue from 'vue'
import App from './App.vue'
import './assets/scss/app.scss'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'

export const corsAnywhere = `https://cors-anywhere.herokuapp.com/`;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  provide: createProvider().provide(),
  render: h => h(App)
}).$mount('#app')
