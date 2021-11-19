import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false
  },
  mutations: {
    USER_LOGIN: function (state) {
      state.isLoggedIn = true
    },
    USER_LOGOUT: function (state) {
      state.isLoggedIn = false
    }
  },
  actions: {
    userLogin: function ({ commit }) {
      commit('USER_LOGIN')
    },
    userLogout: function ({ commit }) {
      commit('USER_LOGOUT')
    }
  },
  modules: {
  },
})
