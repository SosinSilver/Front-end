<template>
  <div>
    <p class="text-start p-3" style="font-size: 14px; color: gray;">회원님을 위한 추천</p>
    <div id="recommendContainer" class="d-flex flex-wrap">
      <div class="w-25 p-2" v-for="movie in recommendList" :key="movie.pk">
        <img :src="`${posterUrl}${movie.fields.poster_path}`" alt="" class="d-block w-100 rounded"
        @click="selectMovie(movie.pk)">
        <span style="font-size: 14px;">{{ movie.fields.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Recommend',
  data: function () {
    return {
      page: 1,
      scrollEnd: false,
    }
  },
  props: {
    posterUrl: String,
    isScrollEnd: Boolean,
  },
  methods: {
    getRecommendMovies: function () {
      this.$store.dispatch('getRecommendMovies', 1)
    },
    selectMovie: function (movieId) {
      this.$store.dispatch('getMovieDetail', movieId)
    }
  },
  computed: {
    recommendList: function () {
      return this.$store.state.recommendList
    },
  },
  watch: {
    isScrollEnd: function() {
      if(this.isScrollEnd){
        this.$store.dispatch('getRecommendMovies', this.page+1)
        this.page+=1
      }
      this.$emit('make-scroll-end')
    }
  },
  created() {
    this.getRecommendMovies()
  },
}
</script>

<style>

</style>