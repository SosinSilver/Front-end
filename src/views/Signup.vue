<template>
  <div class="signup" style="position:absolute; left:0; background-color:rgba(0,0,0, 0.3); top:40px; z-index:10; width:100%; height:100%;">
        <div style="position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%); width:25%; height: 80%;">
      <div style="background-color: #F0F2F5; border-radius: 5px; padding: 10px;">
        <h1>무비트립 시작하기</h1>
        <form action="">
          <div>
            <label for="">아이디</label>
            <input 
              type="text" 
              placeholder="아이디를 입력해주세요." 
              autofocus
              v-model="credentials.username"
            >
          </div>
          <div>
            <label for="">닉네임</label>
            <input 
              type="text" 
              placeholder="닉네임을 입력해주세요."
              v-model="credentials.nickname"
            >
          </div>
          <div>
            <label for="">비밀번호</label>
            <input
              type="password" 
              placeholder="비밀번호를 입력해주세요."
              v-model="credentials.password"
            >
          </div>
          <div>
            <label for="">비밀번호 확인</label>
            <input 
              type="password" 
              placeholder="비밀번호 확인"
              v-model="credentials.passwordConfirmation"
              @keyup.enter="signup(credentials)"
            >
          </div>
          <div>
            <button type="button" @click="signup(credentials)">회원가입</button>
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

</style>