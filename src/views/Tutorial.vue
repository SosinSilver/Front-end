<template>
  <div id="background" class="background-darker d-flex justify-content-center align-items-center">
    <!-- carousel -->
    <!-- width 안 주면 캐러셀 고장남 -->
    <div id="carouselExampleCaptions" class="carousel slide w-50" data-interval="false">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
      </div>
      <div class="carousel-inner rounded text-stroke">
        <div class="carousel-item active">
          <img src="../assets/slide1.png" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block text-dark bg-dark-opacity rounded">
            <h2>무비트립 시작하기</h2>
            <h4>전 세계의 영화를 여행할 수 있습니다.</h4>
            <button class="btn border-0 rounded p-2 bg-info" @click="gotoLogin()">로그인하여 시작하기</button>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../assets/slide2.png" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block text-dark bg-dark-opacity rounded">
            <h2>국가 정보 확인</h2>
            <h4 style="font-weight: 500;">지도에서 국가를 클릭하여 정보를 확인할 수 있습니다.</h4>
            <button class="btn border-0 rounded p-2 bg-info" @click="gotoLogin()">로그인하여 시작하기</button>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../assets/slide3.png" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block text-dark bg-dark-opacity rounded">
            <h2>평점 등록</h2>
            <h4>시청한 영화의 평점을 등록할 수 있습니다.</h4>
            <button class="btn border-0 rounded p-2 bg-info" @click="gotoLogin()">로그인하여 시작하기</button>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../assets/slide4.png" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block text-dark bg-dark-opacity rounded">
            <h2>영화 추천</h2>
            <h4>사용자가 등록한 평점 정보 기반으로 영화를 추천해드립니다.</h4>
            <button class="btn border-0 rounded p-2 bg-info" @click="gotoLogin()">로그인하여 시작하기</button>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../assets/slide5.png" class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block text-dark bg-dark-opacity rounded">
            <h2>커뮤니티</h2>
            <h4>영화에 대해 유저 간 자유롭게 대화할 수 있습니다.</h4>
            <button class="btn border-0 rounded p-2 bg-info" @click="gotoLogin()">로그인하여 시작하기</button>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tutorial',
  methods: {
    gotoLogin: function () {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style>
  .text-stroke {
    text-shadow: black 2px 0 30px; 
  }

  h2 {
    font-weight: 700;
    color: white;
  }

  h4 {
    font-weight: 700;
    color: white;
  }

  .bg-dark-opacity {
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>