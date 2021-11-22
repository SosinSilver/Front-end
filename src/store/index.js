import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate";

const API_URL = process.env.VUE_APP_SERVER_URL

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    isLoggedIn: false,
    weatherInfo: null,
    countryList: null,
    movieList: null,
    movieInfo: null,
    recommendList: null,
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
    },
    GET_COUNTRIES: function (state, countryInfo) {
      state.countryList = countryInfo
    },
    GET_MOVIES: function (state, movieList) {
      state.movieList = movieList
    },
    GET_MOVIE_DETAIL: function (state, movieInfo) {
      state.movieInfo = movieInfo
    },
    GET_RECOMMEND_MOVIES: function (state, recommendList) {
      console.log(recommendList)
      state.recommendList = recommendList
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
      const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather?'

      axios({
        method: 'get',
        url: `${WEATHER_API_URL}q=${capital}&appid=${API_KEY}&units=metric`
      })
        .then(res => {
          // console.log(res.data, commit)
          const weatherData = res.data
          commit('GET_WEATHER', weatherData)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCountries: function ({ commit }) {
      const jwtToken = localStorage.getItem('jwt')

      if(!jwtToken){
        return
      }
      axios({
        method:'get',
        url: `${API_URL}/movies/country/list/`,
        headers: {Authorization: `Bearer ${jwtToken}`},
      })
        .then(res => {
          const countryList = res.data
          // console.log(countryList)
          commit('GET_COUNTRIES', countryList)          
        })
        .catch(err => {
          console.log(err)
        })
    },
    getMovies: function ({ commit }, country) {
      const jwtToken = localStorage.getItem('jwt')

      if(!jwtToken){
        return
      }
      axios({
        method:'get',
        url: `${API_URL}/movies/movies/${country}/`,
        headers: {Authorization: `Bearer ${jwtToken}`},
      })
        .then(res => {
          const movieList = res.data
          // console.log(movieList)
          commit('GET_MOVIES', movieList)          
        })
        .catch(err => {
          console.log(err)
        })
    },
    getMovieDetail: function ({ commit }, movieId) {
      const jwtToken = localStorage.getItem('jwt')

      if(!jwtToken || !movieId){
        return
      }
      axios({
        method:'get',
        url: `${API_URL}/movies/movie/${movieId}/`,
        headers: {Authorization: `Bearer ${jwtToken}`},
      })
        .then(res => {
          const movieInfo = res.data
          console.log(movieInfo)
          commit('GET_MOVIE_DETAIL', movieInfo)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getRecommendMovies: function ({ commit, state }, page) {
      const jwtToken = localStorage.getItem('jwt')

      if(!jwtToken || !page){
        return
      }

      axios({
        method:'get',
        url: `${API_URL}/movies/recommend/?page=${page}`,
        headers: {Authorization: `Bearer ${jwtToken}`},
      })
        .then(res => {
          if (page > 1) {
            const originalList = state.recommendList
            const newRecommendList = res.data
            newRecommendList.forEach((elem)=>{
              originalList.push(elem)
            })
            commit('GET_RECOMMEND_MOVIES', originalList)
          } else {
            const newRecommendList = res.data
            commit('GET_RECOMMEND_MOVIES', newRecommendList)
          }

        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  },
})
