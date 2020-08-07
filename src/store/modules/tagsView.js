const state = {
  visitedViews: JSON.parse(localStorage.visitedViews || '[]').sort((a, b) => { return a.order - b.order }),
  cachedViews: JSON.parse(localStorage.cachedViews || '[]'),
  title: ''
}

const mutations = {
  ADD_TITLE: (state, title) => {
    state.title = title
  },
  ADD_VISITED_VIEW: (state, view) => {
    var item = { name: view.name, order: view.name.toLowerCase() === 'home' ? 0 : 1, title: view.meta.title, fullPath: view.fullPath, path: view.path, meta: view.meta }
    // if (state.visitedViews.some(v => v.path === view.path)) return
    if (state.visitedViews.some(v => v.fullPath === view.fullPath)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )

    var visitedViews = JSON.parse(localStorage.visitedViews || '[]')
    const index = visitedViews.findIndex(c => c.fullPath === item.fullPath)
    index > -1 && visitedViews.splice(index, 1)
    visitedViews.push(item)
    localStorage.visitedViews = JSON.stringify(visitedViews)
  },
  ADD_CACHED_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },

  DEL_VISITED_VIEW: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.fullPath === view.fullPath) {
      // if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }

    var visitedViews = JSON.parse(localStorage.visitedViews || '[]')
    const index = visitedViews.findIndex(c => c.name === view.name)
    index > -1 && visitedViews.splice(index, 1)
    localStorage.visitedViews = JSON.stringify(visitedViews)
  },
  DEL_CACHED_VIEW: (state, view) => {
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)
  },

  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    state.visitedViews = state.visitedViews.filter(v => {
      // return v.meta.affix || v.path === view.path
      return v.meta.affix || v.fullPath === view.fullPath
    })

    var visitedViews = JSON.parse(localStorage.visitedViews || '[]')
    var newVisitedViews = visitedViews.filter(v => {
      // return v.meta.affix || v.path === view.path
      return v.meta.affix || v.fullPath === view.fullPath
    })
    localStorage.visitedViews = JSON.stringify(newVisitedViews)
  },
  DEL_OTHERS_CACHED_VIEWS: (state, view) => {
    const index = state.cachedViews.indexOf(view.name)
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = []
    }
  },

  DEL_ALL_VISITED_VIEWS: state => {
    // keep affix tags
    // const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
    // state.visitedViews = affixTags
    state.visitedViews = []

    // var visitedViews = JSON.parse(localStorage.visitedViews || '[]')
    // var newVisitedViews = visitedViews.filter(tag => tag.meta.affix)
    // localStorage.visitedViews = JSON.stringify(newVisitedViews)
    localStorage.visitedViews = ''
  },
  DEL_ALL_CACHED_VIEWS: state => {
    state.cachedViews = []
  },

  UPDATE_VISITED_VIEW: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.fullPath === view.fullPath) {
      // if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  },
  EDIT_VISITED_VIEWS: (state, view) => {
    for (var Index in state.visitedViews) {
      if (state.visitedViews[Index].path === view.path) {
        state.visitedViews[Index].title = view.meta.title
      }
    }
  }
}

const actions = {
  addTitle({ commit }, title) {
    commit('ADD_TITLE', title)
  },
  //   addTitle(context, title) {
  //     context.commit('ADD_TITLE', title)
  //   },
  addView({ dispatch }, view) {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  addVisitedView({ commit }, view) {
    commit('ADD_VISITED_VIEW', view)
  },
  addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view)
  },

  delView({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delVisitedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },
  delCachedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', view)
      resolve([...state.cachedViews])
    })
  },

  delOthersViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delOthersVisitedViews', view)
      dispatch('delOthersCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delOthersVisitedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_VISITED_VIEWS', view)
      resolve([...state.visitedViews])
    })
  },
  delOthersCachedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_CACHED_VIEWS', view)
      resolve([...state.cachedViews])
    })
  },

  delAllViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delAllVisitedViews', view)
      dispatch('delAllCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delAllVisitedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_VISITED_VIEWS')
      resolve([...state.visitedViews])
    })
  },
  delAllCachedViews({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_CACHED_VIEWS')
      resolve([...state.cachedViews])
    })
  },

  updateVisitedView({ commit }, view) {
    commit('UPDATE_VISITED_VIEW', view)
  },
  editVisitedViews({ commit, state }, view) {
    return new Promise((resolve) => {
      commit('EDIT_VISITED_VIEWS', view)
      resolve([...state.visitedViews])
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
