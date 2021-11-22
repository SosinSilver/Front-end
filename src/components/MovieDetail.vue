<template>
  <div class="bg-white p-3 text-start" style="color: black;">
    <div v-if="movieInfo" class="d-flex">
      <div class="w-75 me-3">
        <h2 class="d-inline">{{ movieInfo.title }}</h2>
        <p class="d-inline">{{ movieInfo.released_date | getYear }}</p>

        <div class="float-end">
          평점 {{ movieInfo.vote_average | round }}
        </div>

        <div class="mt-3">
          개요 : <span v-for="genre in movieInfo.genres" :key="genre.id">{{ genre.name }} </span>| {{ movieInfo.released_date }} 개봉
        </div>
        <div>
          감독 : {{ movieInfo.director }}
        </div>
        <div>
          출연진 :  <span v-for="(actor, idx) in movieInfo.actors" :key="actor.id">{{ actor.name }}<span v-if="idx<4"> | </span></span>
        </div>
        <div class="text-start" style="font-size: 14px;">
          줄거리 : {{ movieInfo.overview | truncateWord }}
        </div>
      </div>
      <div class="w-25">
        <img :src="`${posterUrl}${movieInfo.poster_path}`" alt="" class="d-block w-100 rounded">
      </div>

    </div>
    <div v-else>
      궁금한 영화를 선택해주세요.
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'MovieDetail',
  data: function () {
    return {

    }
  },
  props: {
    posterUrl: String
  },
  methods: {
    selectMovie: function () {
      this.$store.dispatch('getMovieDetail', this.selectedMovie)
    }
  }, 
  computed: {
    movieInfo: function () {
      return this.$store.state.movieInfo
    }
  },
  filters: {
    getYear: function (value) {
      return value.split('-')[0]
    },
    truncateWord: function (value) {
      if(value.length > 120) {
        return value.slice(0, 120) + '...'
      }
      else{
        return value
      }
    },
    round: function (value) {
      return Number(value).toFixed(1)
    }
  }
}
</script>

<style>

</style>