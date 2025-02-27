import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    clothingItems: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setClothingItems(state, items) {
      state.clothingItems = items
    },
  },
  actions: {
    login({ commit }, user) {
      // Perform login and commit user
      commit('setUser', user)
    },
    fetchClothingItems({ commit }) {
      // Fetch clothing items and commit to state
      commit('setClothingItems', [])
    },
  },
  modules: {},
})
