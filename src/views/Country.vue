<template lang="">
  <div id="background" class="background-darker d-flex">
    <div class="w-50 h-100 my-box overflow-auto" style="border-radius: 3px;">
      <div id="country-movie-detail" class="d-flex pt-3">
        <div class="bg-white container-box mx-3" style="width: 60%;">
          <country-detail></country-detail>
        </div>
        <div class="bg-white container-box me-3" style="width: 40%;">
          <movie-list></movie-list>
        </div>
      </div>
      <div class="bg-dark sticky-top container-box m-3">
        <movie-detail></movie-detail>
      </div>
      <div class="bg-white container-box-long m-3">
        <recommend></recommend>
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

const backgroundDiv = document.getElementById('background');

window.addEventListener('click', (e)=>{
    e.target === backgroundDiv ? backgroundDiv.setAttribute('style', 'display:none;') : false
});

export default {
  name: 'Country',
  data: function() {
    return {
      country_id : this.$route.params.countryNum
    }
  },
  components: {
    CountryDetail,
    MovieDetail,
    MovieList,
    Recommend,
  },
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

  .container-box {
    height: 250px;
    border-radius: 8px;
  }

  .container-box-long {
    height: 2000px;
    border-radius: 8px;
  }
</style>