import Vue from 'vue'
import Vuex from 'vuex'

import general from './general.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    general,    
  }
})
