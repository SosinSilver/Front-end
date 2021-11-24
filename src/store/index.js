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
    nickname: null,
    weatherInfo: null,
    countryList: null,
    movieList: null,
    movieInfo: null,
    recommendList: null,
    articleList: [],
  },
  mutations: {
    USER_LOGIN: function (state, nickname) {
      state.isLoggedIn = true
      state.nickname = nickname
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
      // console.log(recommendList)
      state.recommendList = recommendList
    },
    CREATE_ARTICLE: function (state, articleItem) {
      // console.log(state, article)
      const newArticleItem = {
        pk: articleItem.id,
        fields: {
          ...articleItem
        }
      }
      state.articleList.unshift(newArticleItem)
    },
    CREATE_COMMENT: function (state, { commentItem, idx }) {
      // console.log(idx)
      state.articleList[idx].fields.comments.unshift(commentItem)
    },
    GET_ARTICLES: function (state, articleList) {
      console.log(articleList)
      state.articleList = articleList
    },
    DELETE_ARTICLE: function (state, idx) {
      state.articleList.splice(idx, 1)
    },
    DELETE_COMMENT: function (state, { article_idx, comment_idx }) {
      state.articleList[article_idx].fields.comments.splice(comment_idx, 1)
    },
    LIKE_ARTICLE: function (state, idx) {
      
      if (state.articleList[idx].fields.is_liked) {
        state.articleList[idx].fields.like_count--
      } else {
        state.articleList[idx].fields.like_count++
      }
      
      state.articleList[idx].fields.is_liked = !state.articleList[idx].fields.is_liked
    },
  },
  actions: {
    userLogin: function ({ commit }) {
      const jwtToken = localStorage.getItem('jwt')
      
      axios({
        method:'get',
        url: `${API_URL}/accounts/nickname/`,
        headers: {Authorization: `Bearer ${jwtToken}`},
      })
        .then(res => {
          console.log(res.data.nickname)
          commit('USER_LOGIN', res.data.nickname)
        })
        .catch(err => {
          console.log(err)
        })

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
    },
    createArticle: function ({ commit }, articleItem) {
      const jwtToken = localStorage.getItem('jwt')

      axios({
        method:'post',
        url: `${API_URL}/community/article/create/`,
        headers: {Authorization: `Bearer ${jwtToken}`},
        data: {
          movie_title: articleItem.movieTitle,
          content: articleItem.content
        }
      })
        .then(res => {
          console.log(res.data, 'This is res.data')
          commit('CREATE_ARTICLE', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getArticles: function ({ commit, state }, page) {
      const jwtToken = localStorage.getItem('jwt')

      axios({
        method:'get',
        url: `${API_URL}/community/list/?page=${page}`,
        headers: {Authorization: `Bearer ${jwtToken}`},
      })
        .then(res => {
          // console.log(res.data, 'This is res.data')
          
          if (page > 1) {
            const originalList = state.articleList
            const newArticleList = res.data
            newArticleList.forEach((elem)=>{
              originalList.push(elem)
            })
            commit('GET_ARTICLES', originalList)
          } else {
            const newArticleList = res.data
            commit('GET_ARTICLES', newArticleList)
          }
        })
        .catch(err => {
          console.log(err)
        })

    },
    createComment: function ({ commit }, { commentItem, article_id, idx }) {
      const jwtToken = localStorage.getItem('jwt')
      // console.log(commentItem, article_id, idx)
      axios({
        method:'post',
        url: `${API_URL}/community/article/${article_id}/comment/create/`,
        headers: {Authorization: `Bearer ${jwtToken}`},
        data: commentItem,
      })
        .then(res => {
          // console.log(res.data, 'This is res.data')

          const payload = {
            commentItem: res.data,
            idx,
          }

          commit('CREATE_COMMENT', payload )
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteArticle: function ({ commit }, { article_id, idx }) {
      const jwtToken = localStorage.getItem('jwt')

      // console.log(article_id, idx)
      axios({
        method:'delete',
        url: `${API_URL}/community/article/${article_id}/delete/`,
        headers: {Authorization: `Bearer ${jwtToken}`},
      })
        .then(res => {
          console.log(res, 'This is res.data')
          commit('DELETE_ARTICLE', idx)
        })
        .catch(err => {
          console.log(err)
          alert('작성자만 삭제할 수 있습니다.')
        })
    },
    deleteComment: function ({ commit }, { comment_pk, comment_idx, article_idx }) {
      const jwtToken = localStorage.getItem('jwt')

      axios({
        method:'delete',
        url: `${API_URL}/community/article/comment/${comment_pk}/delete/`,
        headers: {Authorization: `Bearer ${jwtToken}`},
      })
        .then(res => {
          console.log(res, 'This is res.data')
          commit('DELETE_COMMENT', { comment_idx, article_idx })
        })
        .catch(err => {
          console.log(err)
          alert('작성자만 삭제할 수 있습니다.')
        })
    },
    likeArticle: function ({ commit }, { article_pk, idx }) {
      const jwtToken = localStorage.getItem('jwt')

      // console.log(article_id, idx)
      axios({
        method:'post',
        url: `${API_URL}/community/article/${article_pk}/like/`,
        headers: {Authorization: `Bearer ${jwtToken}`},
      })
        .then(res => {
          console.log(res, 'This is res.data')
          commit('LIKE_ARTICLE', idx)
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateArticle: function ({ commit }, { article_id, idx, articleItem }) {
      const jwtToken = localStorage.getItem('jwt')

      // console.log(article_id, idx)
      axios({
        method:'put',
        url: `${API_URL}/community/article/${article_id}/update/`,
        headers: {Authorization: `Bearer ${jwtToken}`},
        data: articleItem,
      })
        .then(res => {
          console.log(res, 'This is res.data')
          idx
          commit
          // commit('UPDATE_ARTICLE', idx)
        })
        .catch(err => {
          console.log(err)
          alert('작성자만 수정할 수 있습니다.')
        })
    }
  },
  modules: {
  },
})
