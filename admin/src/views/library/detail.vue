<template>
  <div class="">
    章节详情
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

<style>

</style>
