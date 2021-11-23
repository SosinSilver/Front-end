<template>
  <div>
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
      <div class="carousel-inner rounded">
        <div 
          v-for="(movie, index) in movieList" 
          :key="movie.id" 
          class="carousel-item" 
          :class="{ 'active': index === 0 }"
        >
          <img :src="posterUrl+movie.poster_path" class="d-block w-100 rounded" 
            :alt="movie.title" 
            @click="selectMovie(movie.id)"
          >
          <div v-if="!movie.is_voted" class="text-end" style="font-size: 10px; color: gray;">
          시청한 영화인가요?<br>
          평점을 남겨주세요.
          </div>
          <div v-else class="text-end" style="font-size: 10px; color: gray;">
          생각이 바뀌셨나요?<br>
          평점을 수정할 수 있습니다.
          </div>
          <div :id="`star-${movie.id}`" class="star-select" style="font-size: 20px;">
            <i v-for="(e, idx) in movie.is_voted" :key="'fill'+idx" class="rating__star fas fa-star"></i>
            <i v-for="(e, idx) in 5-movie.is_voted" :key="'blank'+idx" class="rating__star far fa-star"></i>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MovieList',
  data() {
    return {
    }
  },
  props: {
    country: Object,
    posterUrl: String,
  },
  methods: {
    getMovies: function () {
      if(!this.country){
        return
      }
      this.$store.dispatch('getMovies', this.country.id)
    },
    getRatingStars: function () {
      setTimeout(() => {
        const ratingStars = [...document.getElementsByClassName("rating__star")]
        this.executeRating(ratingStars)
        console.log(this.movieList.length, ratingStars.length)
      }, 500);
    },
    executeRating: function (stars) {
      if(!stars){
        return 
      }
      const starClassActive = "rating__star fas fa-star";
      const starClassInactive = "rating__star far fa-star";

      const jwtToken = localStorage.getItem('jwt')
      const API_URL = process.env.VUE_APP_SERVER_URL

      // const starsLength = stars.length;
      let i;
      stars.map((star) => {
        star.onclick = () => {
          i = stars.indexOf(star)
          const movie_idx = parseInt(i/5)

          axios({
            method: 'post',
            url: `${API_URL}/movies/vote/`,
            headers: {Authorization: `Bearer ${jwtToken}`},
            data: {
              movie:this.movieList[movie_idx].id,
              vote_score: i%5+1,
            }
          })
            .then(res => {
              res
              if (star.className===starClassInactive) {
                for (let x = i; x >= movie_idx*5; --x) {
                  stars[x].className = starClassActive
                }
              } else {
                for (let x = i+1; x < movie_idx*5+5; x++) {
                  stars[x].className = starClassInactive
                }
              }
            })
            .catch(err =>{
              console.log(err)
            })
        }
      })
    },
    selectMovie: function (movieId) {
      this.$store.dispatch('getMovieDetail', movieId)
    }
  },
  computed: {
    movieList: function () {
      if (!this.$store.state.movieList){
        return
      }
      return this.$store.state.movieList
    },
  },
  mounted: function () {
    this.getRatingStars()
  },
  created: function () {
    this.getMovies()
  },
}
</script>

<style>
.rating__star {
   cursor: pointer;
   color: #dabd18b2;
}
.rating__star:hover {
   filter: drop-shadow(1px 1px 4px gold);
}
</style>