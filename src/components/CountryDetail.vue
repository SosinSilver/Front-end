<template>
  <div>
    <div id="country-summary" class="d-flex align-items-center mt-2">
      <div id="flag" class="w-50">
        <img src="https://picsum.photos/200/300" alt="" width=80px height=40px>
      </div>
      <div id="name" class="w-50">
        <div style="font-size: 20px;">kr_name</div>
        <div style="font-size: 15px;">en_name</div>
      </div>
    </div>
    <hr class="mx-4 mt-1">
    <div id="country-place" class="d-flex justify-content-center">
      <div id="thumbnail" class="w-50">
        <!-- thumbnail 사진 추가할 부분 -->
        <img src="https://picsum.photos/200/300" alt="" width=100px height=50px>
      </div>
      <div class="w-50">
        <!-- 장소 이름과 장소 설명 -->
        <div style="font-size: 15px;">
          thumbnail_title
        </div>
        <div class="mt-1 w-100 px-3">
          <p style="text-overflow: ellipsis; font-size: 10px;">광화문(光化門)은 경복궁의 남쪽에 있는 정문이다.</p>
        </div>
      </div>
    </div>
    <hr class="mx-4 mt-0">
    <div class="w-100">
      <!-- weather box -->
      <div>
        <!-- now clock -->
        <div id="clock" style="font-size: 12px;">
          <span>{{ computedTime }}</span>
        </div>
        <div id="weather" class="d-flex justify-content-around align-items-center m-2">
          <div class="bold">
            대한민국 / 서울
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
      capital: 'Seoul',
    }
  },
  methods: {
    getWeather: function () {
      this.$store.dispatch('getWeather', this.capital)
    },
    onEverySecond: function () {
        this.date = new Date()
        setTimeout(this.onEverySecond, 1000)
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
      if (this.$store.state.weatherInfo !== null) {
        return Math.round(this.$store.state.weatherInfo.main.temp_max)
      } else {
        return null
      }
    },
    lowTemp: function () {
      if (this.$store.state.weatherInfo !== null){
        return Math.round(this.$store.state.weatherInfo.main.temp_min)
      } else {
        return null
      }
    },
    nowTemp: function () {
      if (this.$store.state.weatherInfo !== null){
        return Math.round(this.$store.state.weatherInfo.main.temp)
      } else {
        return null
      }
    },
    iconPath: function () {
      if (this.$store.state.weatherInfo !== null){
        const icon = this.$store.state.weatherInfo.weather[0].icon
        const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
        return iconUrl
      } else {
        return null
      }
    },
    computedTime: function () {
      return `${this.date.toLocaleString()}`
    }
  }
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