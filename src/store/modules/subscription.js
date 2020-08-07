const state = {
  message: null
}

const mutations = {
  CHANGE_VALUE(state, value) {
    state.message = value
  }
}

const actions = {
  setValue({ commit }, data) {
    commit('CHANGE_VALUE', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

