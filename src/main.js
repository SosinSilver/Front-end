import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const GOOGLE_API_KEY = process.env.VUE_APP_GOOGLE_API_KEY

Vue.use(VueGoogleMaps, {
  load: {
    key: GOOGLE_API_KEY,
    libraries: 'places', 
  },
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
