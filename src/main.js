import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css'

import VTooltip from 'v-tooltip' 
Vue.use(VTooltip)

import VueIziToast from 'vue-izitoast'
import 'izitoast/dist/css/iziToast.min.css'
Vue.use(VueIziToast)

import titleMixin from './mixins/titleMixin'
Vue.mixin(titleMixin)

import pageClassMixin from './mixins/pageClassMixin'
Vue.mixin(pageClassMixin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
