<template>
  <div id="background" class="background-darker d-flex">
    <div class="w-50 h-100 my-box overflow-auto py-3" style="border-radius: 3px;" @scroll="onScrollEnd">
      <!-- 작성 폼 -->
      <div class="mx-3 bg-white rounded">
        <!-- 유저네임 + 해시태그 -->
        <div class="d-flex justify-content-between">
          <!-- <div class="mx-3 mt-3 rounded" style="background-color: #F0F2F5; width: 15%">
            <span>{{ $store.state.nickname }}</span>
          </div> -->
          <div class="px-3 pt-3">
            <div class="d-flex w-100">
              <i class="fas fa-user-circle me-2" style="font-size: 40px;"></i>
              <div class="d-flex w-100 flex-column text-start">
                <span style="font-size: 15px">{{ $store.state.nickname }}</span>
                <input 
                  type="text" 
                  placeholder="영화를 입력해주세요." 
                  class="px-2 w-100 rounded" 
                  style="border: none; font-size: 14px;" 
                  v-model.trim="hashtag"
                  @keyup.enter="createArticle"
                  autofocus
                >
              </div>
            </div>
          </div>
          <!-- <div class="mx-3 mt-3 rounded" style="background-color: #F0F2F5; width: 85%">
          </div> -->
        </div>
        <hr class="m-3">
        <!-- 내용 -->
        <div class="m-3 d-flex">
          <textarea 
            maxlength="200" 
            class="rounded my-textarea w-100 p-2"
            rows="4" 
            placeholder="내용을 입력해주세요.(200자)" 
            v-model.trim="content"
            @keyup.enter="createArticle"
          >
          </textarea>
        </div>
        <!-- 작성 버튼 -->
        <div class="text-end">
          <button 
            class="rounded mx-3 pb-3 bg-transparent bold" 
            style="font-size: 14px; border: none;" 
            @click="createArticle"
          >게시</button>
        </div>
      </div>
      <article-card
        v-for="(article, idx) in articles"
        :key="article.id"
        :idx="idx"
        :article="article"
        class="my-3"
      >
      </article-card>        
    </div>
    <!-- 바깥 클릭하면 닫히게 -->
    <div class="w-50 h-100 bg-transparent" @click="$router.push({name: 'Home'})">
    </div>
  </div>
</template>

<script>
import ArticleCard from '@/components/ArticleCard'

export default {
  name: 'Community',
  data: function() {
    return {
      page: 1,
      isScrollEnd: false,
      hashtag: '',
      content: '',
    }
  },
  components: {
    ArticleCard,
  },
  methods: {
    onScrollEnd: function () {
      const {scrollHeight, scrollTop, clientHeight} = document.querySelector('.overflow-auto')
      if (scrollHeight - scrollTop === clientHeight ) {
        this.isScrollEnd = true
      }
    },
    createArticle: function () {
      if(confirm('글을 작성하시겠습니까?')){
        if (this.content && this.hashtag) {
          const articleItem = {
            movieTitle: this.hashtag,
            content: this.content,
          }
          this.hashtag = ''
          this.content = ''
          this.$store.dispatch('createArticle', articleItem)
        } else {
          alert('빈 값이 있는 것 같아요! 확인해주세요.')
        }
      } else {
        alert('네 알겠습니당 !')
      }
    },
    getArticles: function (page) {
      this.$store.dispatch('getArticles', page)
    }
  },
  computed: {
    articles: function () {
      return this.$store.state.articleList
    }
  },
  created: function () {
    this.getArticles(1)
  },
  watch: {
    isScrollEnd: function() {
      if(this.isScrollEnd){
        this.getArticles(this.page + 1)
        this.page+=1
      }
      this.isScrollEnd = false
    }
  },
}
</script>

<style>
  .my-textarea {
    background-color: #F0F2F5; 
    /* height: 210px;  */
    resize: none; 
    border: none; 
    /* width: 93%; */
  }
</style>