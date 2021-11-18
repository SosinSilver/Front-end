import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB_AQ9AXrs9EaqjVf3xousiVBJmoH-u1-Y',
    libraries: 'places', 
  },
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
