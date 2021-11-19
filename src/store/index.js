import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    weatherInfo: null,
  },
  mutations: {
    USER_LOGIN: function (state) {
      state.isLoggedIn = true
    },
    USER_LOGOUT: function (state) {
      state.isLoggedIn = false
    },
    GET_WEATHER: function (state, weatherData) {
      // console.log(weatherData)
      state.weatherInfo = weatherData
    }
  },
  actions: {
    userLogin: function ({ commit }) {
      commit('USER_LOGIN')
    },
    userLogout: function ({ commit }) {
      commit('USER_LOGOUT')
    },
    getWeather: function ({ commit }, capital) {
      const API_KEY = '7f8f280f3bd95249cccec581aab4499c'
      const API_URL = 'https://api.openweathermap.org/data/2.5/weather?'

      axios({
        method: 'get',
        url: `${API_URL}q=${capital}&appid=${API_KEY}&units=metric`
      })
        .then(res => {
          // console.log(res.data, commit)
          const weatherData = res.data
          commit('GET_WEATHER', weatherData)
        })
        .catch(err => {
          console.log(err)
        })

    }
  },
  modules: {
  },
})
