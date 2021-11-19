<template>
  <div class="signup" style="position:absolute; left:0; background-color:rgba(0,0,0, 0.3); top:40px; z-index:10; width:100%; height:100%;">
    <div class="login-form">
      <div style="background-color: #F0F2F5; border-radius: 5px; padding: 10px;">
        <button @click="$router.push({ name: 'Home' })" class="btn btn-secondary btn-sm close">X</button>
        <h1 class="mt-5">무비트립 시작하기</h1>
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
              <label for="nickname">닉네임</label>
            </div>
            <input 
              type="text" 
              placeholder="닉네임을 입력해주세요." 
              autofocus
              v-model="credentials.nickname"
              id="nickname"
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
              autofocus
              v-model="credentials.password"
              id="password"
              class="form-control"
            >
          </div>
          <div style="margin: 1rem">
            <div style="text-align: left;">
              <label for="password-confirmation">비밀번호 확인</label>
            </div>
            <input 
              type="password" 
              placeholder="비밀번호를 한 번 더입력해주세요."
              v-model="credentials.passwordConfirmation"
              @keyup.enter="signup(credentials)"
              id="password-confirmation"
              class="form-control"
            >
          </div>
          <div class="m-3">
            <button 
              type="button" 
              @click="signup(credentials)"
              class="btn btn-primary w-100"
            >회원가입</button>
          </div>
        </form>

        
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Signup',
  data: function () {
    return {
      credentials: {
        username: '',
        nickname: '',
        password: '',
        passwordConfirmation: '',
      }
    }
  },
  methods: {
    signup: function (credentials) {

      const SERVER_URL = process.env.VUE_APP_SERVER_URL

      axios({
        method: 'post',
        url: `${SERVER_URL}/accounts/signup/`,
        data: credentials,
      })
        .then(res => {
          console.log(res)
          this.$router.push({ name: 'Login' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); 
    min-width: 400px;
    height: 80%;
  }
</style>