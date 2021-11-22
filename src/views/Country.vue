<template lang="">
  <div id="background" class="background-darker d-flex">
    <div class="w-50 h-100 my-box overflow-auto" style="border-radius: 3px;" @scroll="onScrollEnd">
      <div id="country-movie-detail" class="d-flex pt-3">
        <div class="bg-white rounded mx-3" style="width: 60%;">
          <country-detail
            :country="country"
          >
          </country-detail>
        </div>
        <div class="bg-white rounded me-3" style="width: 40%;">
          <movie-list
            :country="country"
            :posterUrl="posterUrl"
          >
          </movie-list>
        </div>
      </div>
      <div class="sticky-top rounded m-3">
        <movie-detail
          :posterUrl="posterUrl"
        >
        </movie-detail>
      </div>
      <div class="bg-white rounded m-3">
        <recommend
          :posterUrl="posterUrl"
          :isScrollEnd="isScrollEnd"
          @make-scroll-end="makeScrollEnd"
        ></recommend>
      </div>
    </div>
    <div class="w-50 h-100 bg-transparent" @click="$router.push({name: 'Home'})">
    </div>
  </div>
</template>
<script>
import CountryDetail from '@/components/CountryDetail'
import MovieDetail from '@/components/MovieDetail'
import MovieList from '@/components/MovieList'
import Recommend from '@/components/Recommend'

export default {
  name: 'Country',
  data: function() {
    return {
      posterUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2',
      isScrollEnd: false,
    }
  },
  components: {
    CountryDetail,
    MovieDetail,
    MovieList,
    Recommend,
  },
  computed:{
    country: function () {
      if (!this.$store.state.countryList){
        return
      }
      const countryId = this.$route.params.countryNum
      return this.$store.state.countryList[countryId-1]
    },
  },
  methods: {
    onScrollEnd: function () {
      const {scrollHeight, scrollTop, clientHeight} = document.querySelector('.overflow-auto')
      if (scrollHeight - scrollTop === clientHeight ) {
        this.isScrollEnd = true
      }
    },
    makeScrollEnd: function () {
      this.isScrollEnd = false
    }
  }
}
</script>
<style>
  .background-darker {
    position:absolute; 
    left:0; 
    background-color:rgba(0,0,0, 0.3); 
    top:40px; 
    z-index:10; 
    width:100%; 
    height: calc(100% - 40px);
  }

  .my-box {
    background-color: #F0F2F5;
    border-radius: 10px;
  }

</style>