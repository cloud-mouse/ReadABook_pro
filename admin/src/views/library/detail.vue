<template>
  <div class="chapter-detail">
    <div class="book-info">
      <img class="cover" :src="bookInfo.cover" alt="">
      <div class="right-info" />
    </div>
  </div>
</template>

<script>
import { libraryApi } from '@/api/library'
import { chapterApi } from '@/api/chapter'
export default {
  name: 'LibraryDetail',
  data() {
    return {
      id: this.$route.query.id,
      bookInfo: {},
      chapterList: []
    }
  },
  created() {
    // 获取书本详情
    this.getDetail()
    // 获取章节列表
    this.getChapter()
  },
  methods: {
    getDetail() {
      const that = this
      libraryApi.get_library({
        _id: that.id
      }).then(res => {
        that.bookInfo = res.data
      })
    },
    getChapter() {
      chapterApi.get_chapter({
        id: this.id
      }).then(res => {

      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chapter-detail{
  padding: 15px;
  background: #f5f5f5;
  .book-info{
    background: #fff;
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 15px;
    .cover{
      height: 80px;
    }
  }
}
</style>
