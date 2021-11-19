<template>
  <div class="login" style="position:absolute; left:0; background-color:rgba(0,0,0, 0.3); top:40px; z-index:10; width:100%; height:100%;">
    <div style="position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%); width:25%; height: 80%;">
      <div style="background-color: #F0F2F5; border-radius: 5px; padding: 10px;">
        <h1>무비트립에 로그인</h1>
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
            <label for="">비밀번호</label>
            <input 
              type="password" 
              placeholder="비밀번호를 입력해주세요."
              v-model="credentials.password"
              @keyup.enter="login(credentials)"
            >
          </div>
          <div>
            <button type="button" @click="login(credentials)">로그인</button>
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

</style>