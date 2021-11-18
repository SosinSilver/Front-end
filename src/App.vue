<template>
  <div id="app">
    <div id="nav">
      <div style="padding-left: .5rem;">
        <img alt="Vue logo" src="./assets/logo.png" width="40" height="40">
        <span class="fw-bold" style="display: block; float: right; font-size: 24px; height: 40px; line-height: 40px;">무비트립</span>
      </div>
      <div style="line-height: 40px; padding-right: .5rem;">
        <router-link to="/">커뮤니티</router-link> |
        <router-link to="/login">로그인</router-link> |
        <router-link to="/signup">회원가입</router-link>
      </div>
    </div>
    <GoogleMap style="position: absolute; width:100%; height:100%; top: 0; left: 0; z-index: -1;">
    </GoogleMap>

    <transition name="fade">
      <router-view/>
    </transition>

  </div>
</template>
<script>
import GoogleMap from './components/GoogleMap.vue'

export default {
  components: {
    GoogleMap
  },
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
</style>
