<template>
  <div class="login" style="position:absolute; left:0; background-color:rgba(0,0,0, 0.3); top:40px; z-index:10; width:100%; height:100%;">
    <div class="login-form">
      <div style="background-color: white; border-radius: 5px; padding: 10px;">
        <button @click="$router.push({ name: 'Home' })" class="btn btn-secondary btn-sm close">X</button>
        <h1 class="mt-5">무비트립에 로그인</h1>
        <form action="">
          <div style="margin: 1rem">
            <div style="text-align: left;">
              <label for="id">아이디</label>
            </div>
            <input 
              type="text" 
              placeholder="아이디를 입력해주세요." 
              autofocus
              v-model="credentials.username"
              id="id"
              class="form-control"
            >
          </div>
          <div style="margin: 1rem">
            <div style="text-align: left;">
              <label for="password">비밀번호</label>
            </div>
            <input 
              type="password" 
              placeholder="비밀번호를 입력해주세요."
              v-model="credentials.password"
              @keyup.enter="login(credentials)"
              id="password"
              class="form-control"
            >
          </div>
          <div class="m-3">
            <button 
              type="button" 
              @click="login(credentials)"
              class="btn btn-primary w-100"
            >로그인</button>
          </div>
          <div>
            <p>
              <span class="text-primary" style="cursor: pointer;" @click="$router.push({name: 'Signup'})">회원가입</span>
               또는 소셜 로그인으로 간편하게 시작하기
            </p>
          </div>
          <div id="social-icons" class="d-flex px-4 mb-3">
            <img src="../assets/google.png" alt="google-logo" width="40px">
          </div>
        </form>
        
        
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data: function () {
    return {
      credentials: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    login: function (credentials) {
      
      const SERVER_URL = process.env.VUE_APP_SERVER_URL

      axios({
        method: 'post',
        url: `${SERVER_URL}/accounts/api/token/`,
        data: credentials,
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(res => {
          // console.log(res.data)
          localStorage.setItem('jwt', res.data.access)
          localStorage.setItem('jwt-refresh', res.data.refresh)
          this.$store.dispatch('userLogin')
          this.$router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

  .close {
    float: right;
  }

  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); 
    min-width: 400px;
    height: 80%;
  }

  /* .input-form {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    margin-top: 0.5rem;
  } */

</style>