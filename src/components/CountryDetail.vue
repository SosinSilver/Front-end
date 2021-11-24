<template>
  <div class="mx-4 d-flex flex-column justify-content-around h-100">
    <div id="country-summary">
      <div class="w-100 d-flex align-items-center">
        <div id="flag" style="width: 33%;">
          <img :src="country.flag" alt="" width="100%" class="rounded">
        </div>
        <div id="name" style="width: 66%;">
          <div class="fw-bold" style="font-size: 24px;">{{ country.kr_name }}</div>
          <div style="font-size: 18px;">{{ country.en_name }}</div>
        </div>
      </div>
    </div>
    <hr>
    <div id="country-place" class="d-flex justify-content-center align-items-center">
      <div id="thumbnail" class="w-50">
        <!-- thumbnail 사진 추가할 부분 -->
        <img :src="country.thumbnail" alt="" width="80%" class="rounded">
      </div>
      <div class="w-50">
        <!-- 장소 이름과 장소 설명 -->
        <div class="fw-bold" style="font-size: 15px;">
          {{ country.thumbnail_title }}
        </div>
        <div class="mt-1 w-100 text-start">
          <p style="text-overflow: ellipsis; font-size: 10px;">{{ country.thumbnail_content }}</p>
        </div>
      </div>
    </div>
    <hr>
    <div class="w-100 pb-3">
      <!-- weather box -->
      <div>
        <!-- now clock -->
        <div id="clock" style="font-size: 12px;">
          <span>{{ computedTime }}</span>
        </div>
        <div id="weather" class="d-flex justify-content-around align-items-center">
          <div class="bold">
            {{ country.capital_kr }}
          </div>
          <img :src="iconPath" alt="weather-icon" width="50px" height="30px" style="object-fit: cover;">
          <div class="temperatures" style="font-size: 14px;">
            <div id="now">현재기온: {{ nowTemp }}°C</div>
            <span id="high" class="text-danger">{{ highTemp }}°C</span> / 
            <span id="low" class="text-primary">{{ lowTemp }}°C</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountryDetail',
  data: function () {
    return {
      date: '',
    }
  },
  props: {
    country: Object
  },
  methods: {
    onEverySecond: function () {
        const d1 = new Date()
        const utcDate = new Date(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds())
        const timestamp = utcDate.setHours(utcDate.getHours() + this.country.utc)
        this.date = new Date(timestamp)

        setTimeout(this.onEverySecond, 1000)
    },
    getWeather: function () {
      if(!this.country){
        return
      }
      this.$store.dispatch('getWeather', this.country.capital)
    },

  },
  created: function () {
    this.getWeather()
  },
  mounted: function () {
    this.onEverySecond()
  },
  computed: {
    highTemp: function () {
      if (!this.$store.state.weatherInfo) {
        return null
      }
      return Math.round(this.$store.state.weatherInfo.main.temp_max)
    },
    lowTemp: function () {
      if (!this.$store.state.weatherInfo){
        return null
      }
      return Math.round(this.$store.state.weatherInfo.main.temp_min)
    },
    nowTemp: function () {
      if (!this.$store.state.weatherInfo){
        return null
      }
      return Math.round(this.$store.state.weatherInfo.main.temp)
    },
    iconPath: function () {
      if (!this.$store.state.weatherInfo){
        return null
      }
      const icon = this.$store.state.weatherInfo.weather[0].icon
      const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
      return iconUrl
    },
    computedTime: function () {
      if(!this.country){
        return ''
      }
      const hour = Math.abs(this.country.utc).toString()
      let utcFormat = ''
      if(this.country.utc>=0){
        utcFormat = `UTC+${hour.padStart(2, '0')}:00`
      } else if(this.country.utc<0){
        utcFormat = `UTC-${hour.padStart(2, '0')}:00`
      }
      return `${utcFormat} | ${dateToString(this.date)}`
    }
  },
}

function dateToString(t) {
  if(!t){
    return
  }
  var year = t.getFullYear();
  var month = ('0' + (t.getMonth() + 1)).slice(-2);
  var day = ('0' + t.getDate()).slice(-2);

  var hours = ('0' + t.getHours()).slice(-2); 
  var minutes = ('0' + t.getMinutes()).slice(-2);
  var seconds = ('0' + t.getSeconds()).slice(-2); 

  var ampm = hours >= 12 ? 'pm' : 'am';

  return `${year}.${month}.${day}. ${hours}:${minutes}:${seconds} ${ampm}`
}
</script>

<style>
  .bold {
    font-weight: bold;
  }

  .container {
    display: flex;
    justify-content: center;
  }
</style>