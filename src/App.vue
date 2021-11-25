<template>
  <div id="app">
    <div id="nav">
      <div style="padding-left: .5rem;">
        <img alt="Vue logo" src="./assets/logo.png" width="40" height="40">
        <router-link to="/" class="fw-bold" style="color: black; display: block; float: right; font-size: 24px; height: 40px; line-height: 40px;">무비트립</router-link>
      </div>
      <div style="line-height: 40px; padding-right: .5rem;">
        <router-link to="/">홈</router-link> |
        <span v-if="isLoggedIn">
          <router-link to="/board">커뮤니티</router-link> |
          <router-link to="#" @click.native="logout()">로그아웃</router-link>
        </span>
        <span v-else>
          <router-link to="/login">로그인</router-link> |
          <router-link to="/signup">회원가입</router-link>
        </span>
      </div>
    </div>
    <GoogleMap class="google-map">
    </GoogleMap>

    <transition name="fade">
      <router-view/>
    </transition>

  </div>
</template>
<script>
import GoogleMap from './components/GoogleMap.vue'
// import { mapState } from 'vuex'

export default {
  components: {
    GoogleMap
  },
  created: function () {
    if (localStorage.getItem('jwt')) {
      this.$store.dispatch('userLogin')
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('userLogout')
      localStorage.removeItem('jwt')
      localStorage.removeItem('jwt-refresh')
      this.$router.push({name: 'Login'})
    }
  },
  computed: {
    // ...mapState([
    //   'isLoggedIn'
    // ]),
    isLoggedIn: function () {
      // console.log(this.$store.state.isLoggedIn)
      return this.$store.state.isLoggedIn
    }
  },
  mounted: function() {
    if (!this.$store.state.isLoggedIn) {
      this.$router.push({ name: 'Tutorial' })
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}

#nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  background-color: white;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.google-map {
  position: absolute; 
  width:100%; 
  top: 40px; 
  left: 0; 
  z-index: -1;
}
</style>
