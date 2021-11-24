<template>
  <div>
    <!-- {{ article }} -->
    <div class="mx-3 bg-white rounded">
      <!-- 프로필 동그라미, 닉네임, 영화제목, 삭제버튼 -->
      <div class="p-3 d-flex justify-content-between">
        <!-- 프로필 부분 -->
        <div class="d-flex">
          <i class="fas fa-user-circle me-2" style="font-size: 40px;"></i>
          <div class="d-flex flex-column text-start">
            <span style="font-size: 15px">{{ article.fields.nickname }}</span>
            <span v-if="mode" style="font-size: 12px">{{ article.fields.movie_title }}</span>
            <input v-else 
              type="text" 
              v-model="article.fields.movie_title"
              class="px-2 w-100 rounded" 
              style="border: none; font-size: 14px;"
            >
          </div>
        </div>
        <!-- 삭제 버튼 -->
        <div v-if="article.fields.nickname == $store.state.nickname">
          <i v-if="mode" class="fas fa-pencil-alt pe-2 pointer" style="font-size: 13px;" @click="changeMode"></i>
          <i v-else class="fas fa-check pe-2 pointer" style="font-size: 13px;" @click="updateArticle(article.pk)"></i>
          <i v-if="mode" class="fas fa-trash-alt pointer" style="font-size: 13px;" @click="deleteArticle(article.pk, idx)"></i>
          <i v-else class="fas fa-times pointer" style="font-size: 13px;" @click="cancelUpdate"></i>
        </div>
      </div>
      <!-- 내용 -->
      <div class="px-3 text-start">
        <p v-if="mode">{{ article.fields.content }}</p>
        <textarea 
          v-else 
          v-model="article.fields.content"
          maxlength="200"
          class="rounded my-textarea w-100 p-2"
        >
        </textarea>
      </div>
      <!-- 좋아요 아이콘, 댓글 아이콘 -->
      <div class="d-flex px-3">
        <i 
          class="fa-heart me-2 pointer" 
          :class="{ fas: article.fields.is_liked, far: !article.fields.is_liked, fill: article.fields.is_liked}" 
          style="font-size: 20px;"
          @click="likeArticle(article.pk)"
        ></i>
        <i class="far fa-comment pointer" style="font-size: 20px;" @click="autofocusing()"></i>
      </div>
      <!-- <hr class="mx-3 my-1"> -->
      <!-- 좋아요 수 -->
      <div class="mt-2 px-3 text-start bold" style="font-size: 12px">
        <span>좋아요 {{ article.fields.like_count }}개</span>
      </div>
      <!-- 댓글 표시 및 삭제-->
      <div v-if="isFull">
        <div 
          v-for="(comment, comment_idx) in article.fields.comments"
          :key="comment.id"
          class="text-start mx-3"
        >
          <span class="bold me-2" style="font-size: 13px">{{ comment.nickname }}</span>
          <span style="font-size: 13px">{{ comment.content }}</span>
          <i class="fas fa-times ms-2" style="font-size: 12px; cursor: pointer;" @click="deleteComment(comment.pk, comment_idx, idx)"></i>
        </div>
      </div>
      <div v-else>
        <div 
          v-for="(comment, comment_idx) in shortComments"
          :key="comment.id"
          class="text-start mx-3"
        >
          <span class="bold me-2" style="font-size: 13px">{{ comment.nickname }}</span>
          <span style="font-size: 13px">{{ comment.content }}</span>
          <i class="fas fa-times ms-2" style="font-size: 12px; cursor: pointer;" @click="deleteComment(comment.pk, comment_idx, idx)"></i>
        </div>
        <div 
          v-if="article.fields.comments.length !== 0"
          class="text-start ms-3 pointer more-comments"
          style="font-size: 12px;"
        >
          <span @click="isFull = !isFull">더 보기..</span>
        </div>

      </div>
      <!-- 작성 시각 -->
      <div class="text-start mx-3 text-secondary" style="font-size: 8px">
        {{ article.fields.created_at | dateTimeParse }} 에 작성됨
      </div>
      <hr class="mx-1">
      <!-- 댓글 작성 -->
      <div class="px-2 pb-2 d-grid align-items-center" style="grid-template-columns: 20px 1fr 35px">
        <i class="far fa-smile"></i>
        <input 
          type="text" class="mx-2" 
          style="border: none; font-size: 12px;" 
          placeholder="댓글 달기..."
          @keyup.enter="createComment(article.pk)"
          v-model.trim="content"
          :id="`comment-${article.pk}`"
        >
        <button class="border-0 bg-transparent text-primary" style="font-size: 12px;" @click="createComment(article.pk)">게시</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleCard',
  data: function () {
    return {
      content: '',
      isFull: false,
      mode: true,
      originalMT: '',
      originalContent: '',
    }
  },
  props: {
    article: Object,
    idx: Number,
  },
  filters: {
    dateTimeParse: function (d) {
      // 2021-11-23T11:18:10.906216+09:00
      const tmp = d.split('T')
      const dateString = tmp[0].replaceAll('-', '.')
      const timeString = tmp[1].split('.')
      return `${dateString}. ${timeString[0]}`
    }
  },
  methods: {
    createComment: function (article_id) {
      // console.log(article_id)
      console.log('댓글 왜 두번??')
      if (this.content) {
        const commentItem = {
          content: this.content
        }
  
        const payload = {
          commentItem,
          article_id,
          idx: this.idx
        }
        this.$store.dispatch('createComment', payload)
        this.content = ''
      }
      else {
        alert('댓글을 입력해주세요 !')
      }
    },
    updateArticle: function (article_id) {
      if(confirm('정말 수정하시겠습니까?')){
        const articleItem = {
          movie_title: this.article.fields.movie_title,
          content: this.article.fields.content
        }
        this.$store.dispatch('updateArticle', { article_id, idx: this.idx, articleItem })
        this.mode = true;
      }
      else {
        // 원복
        this.cancelUpdate()
      }
    },
    deleteArticle: function (article_id) {
      if(confirm('댓글을 삭제하시겠습니까?')){
        // console.log(this.idx, '여기는 아티클카드')
        this.$store.dispatch('deleteArticle', { article_id, idx: this.idx })
      }
      else {
        return
      }
    },
    deleteComment: function (comment_pk, comment_idx, article_idx) {
      this.$store.dispatch('deleteComment', { comment_pk, comment_idx, article_idx })
    },
    autofocusing: function () {
      const commentInput = document.getElementById(`comment-${this.article.pk}`)
      // console.log(commentInput)
      commentInput.focus()
    },
    likeArticle: function (article_pk) {
      this.$store.dispatch('likeArticle',  { article_pk, idx: this.idx })
    },
    changeMode: function () {
        this.mode = false;
        this.originalMT = this.article.fields.movie_title
        this.originalContent = this.article.fields.content
    },
    cancelUpdate: function () {
        this.article.fields.movie_title = this.originalMT
        this.article.fields.content = this.originalContent
        this.mode = true;
    }
  },
  computed: {
    shortComments: function () {
      return this.article.fields.comments.slice(0, 3)
    }
  }
}
</script>

<style>
  .pointer {
   cursor: pointer;
  }

  .fa-times {
    color: #CCCCCC;
  }

  .fa-times:hover {
    color: #888888;
  }

  .more-comments {
    color: gray;
  }

  .more-comments:hover {
    color: #0000FF;
  }

  .fill {
    color: red;
  }
</style>