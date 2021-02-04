<template>
  <div class="chapter-detail">
    <div class="book-info">
      <div class="info-left">
        <div class="book-name">
          <span class="name">{{ bookInfo.name }}</span> <span class="author">({{ bookInfo.author }})</span>
        </div>
        <div class="description" v-html="bookInfo.description" />
      </div>
      <img class="cover" :src="bookInfo.cover" alt="">
    </div>
    <div class="chapter-content">
      <div class="title">章节目录</div>
      <div class="content">
        <div class="chapter-list">
          <div v-for="item in chapterList" :key="item._id" class="chapter-item" @click="showContents(item)">
            {{ item.chapter_name }}
          </div>
        </div>
        <div v-if="!chapterList.length" class="no-data">
          <p>本书当前暂无章节，请添加章节</p>
          <el-button type="primary" size="small" @click="addChapter">添加章节</el-button>
        </div>
      </div>
    </div>
    <el-dialog
      :title="showItem.chapter_name"
      :visible.sync="showContent"
      width="30%"
      @close="showContent=false"
    >
      <div class="content-wrap" v-html="showItem.content" />
    </el-dialog>

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
      chapterList: [],
      showItem: {},
      showContent: false
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
        this.chapterList = res.data.list
      })
    },
    addChapter() {
      chapterApi.add_chapter({
        id: this.id
      }).then(res => {
        console.log(res)
        this.getChapter()
      })
    },
    showContents(item) {
      item.content = item.content.replace(/\n|\r\n/g, '<br>')
      this.showItem = item
      this.showContent = true
    }
  }
}
</script>

<style lang="scss" scoped>
.chapter-detail{
  padding: 10px;
  background: #f5f5f5;
  .book-info{
    background: #fff;
    border-radius: 6px;
    margin-bottom: 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .info-left{
      width: 100%;
      padding-right: 20px;
      .book-name{
        font-size: 18px;
        color: #333;
        font-weight: bold;
        .author{
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }
      }
      .description{
        font-size: 14px;
        padding: 10px 0;
        color: #999;
        line-height: 20px;
      }
    }
    .cover{
      height: 100px;
    }
  }
  .chapter-content{
    background: #fff;
    border-radius: 6px;
    margin-bottom: 10px;
    padding: 10px;
    .title{
      font-size: 18px;
      color: #333;
      font-weight: 500;
      padding-bottom: 10px;
      border-bottom: 1px solid #f3f3f3;
    }
    .content{
      .chapter-item{
        color: #666;
        padding: 10px 0;
        border-bottom: 1px solid #f3f3f3;
        cursor: pointer;
      }
      .no-data{
        text-align: center;
        padding: 20px;
      }
    }
  }
}
.content-wrap{
  font-size: 14px;
  max-height: 60vh;
  overflow: auto;
}
</style>
