import { 
  SET_PAGE_CLASS  
} from './actions.type'

import { 
  COMMIT_PAGE_CLASS
} from './mutations.type'

const state = {
  pageClass: '',
}

const getters = {
  pageClass (state) {
    return state.pageClass
  }
}

const actions = {
  [SET_PAGE_CLASS] ({ commit }, cls) {
    commit(COMMIT_PAGE_CLASS, cls)
  }
}

const mutations = {
  [COMMIT_PAGE_CLASS] (state, cls) {
    state.pageClass = cls
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
