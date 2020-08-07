const state = {
  iframes: JSON.parse(localStorage.visitedViews || '[]'),
  lastCloseTime: null
}

const mutations = {
  // 添加
  ADD_IFRAME: (state, iframe) => {
    if (state.iframes.length === 0) {
      state.iframes.push(iframe)
      return
    }
    const index = state.iframes.findIndex(item => item.name === iframe.name)
    if (index > -1) {
      if (state.iframes[index].meta.iframeUrl === iframe.meta.iframeUrl) {
        return
      } else {
        state.iframes.splice(index, 1)
      }
    }
    state.iframes.push(iframe)
  },
  // 删除
  DEL_IFRAME: (state, iframe) => {
    const index = state.iframes.findIndex(item => item.name === iframe.name)
    index > -1 && state.iframes.splice(index, 1)
  },
  // 删除所有
  DEL_ALL_IFRAME: (state) => {
    state.iframes = []
  }
}

const actions = {
  addIframe({ commit, state }, iframe) {
    return new Promise(resolve => {
      commit('ADD_IFRAME', iframe)
      resolve([...state.iframes])
    })
  },
  delIframe({ commit, state }, iframe) {
    return new Promise(resolve => {
      commit('DEL_IFRAME', iframe)
      resolve([...state.iframes])
    })
  },
  delAllIframe({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_IFRAME')
      resolve([...state.iframes])
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
