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
          <el-button type="primary" size="small" icon="el-icon-document-add" @click="addChapter">添加章节</el-button>
          <el-button size="small" @click="showGeshi = true">查看导入格式</el-button>
        </div>
        <div v-if="chapterList.length" class="pagination-box">
          <el-pagination
            :total="total"
            :current-page="currentPage"
            :page-sizes="[5, 10, 14,28]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <!-- 导入的文件数据格式 -->
    <el-dialog
      title="章节Json格式"
      :visible.sync="showGeshi"
      width="30%"
      @close="showGeshi = false"
    >
      <div>
        <json-viewer
          :value="jsonData"
          :expand-depth="5"
          copyable
          boxed
          sort
        />
      </div>
      <span slot="footer">
        <el-button type="primary" @click="showGeshi = false">我知道了</el-button>
      </span>
    </el-dialog>

    <!-- 添加章节 -->
    <!-- 文件导入弹窗 -->
    <el-dialog
      title="文件导入"
      :visible.sync="showFileDialog"
      width="30%"
      @close="showFileDialog = false"
    >
      <div class="import-form">
        <el-form
          ref="form"
          :model="form"
          label-position="top"
          size="small"
        >
          <el-form-item label="选择章节文件">
            <el-upload
              ref="upload"
              name="design"
              class="upload-demo"
              action
              :on-remove="handleRemove"
              :on-change="fileChange"
              multiple
              :auto-upload="false"
              :with-credentials="true"
              :limit="1"
            >
              <el-button slot="trigger" size="small" type="primary">选取章节文件</el-button>
            </el-upload>
          </el-form-item>

        </el-form>
        <span slot="footer">
          <el-button type="primary" @click="onSubmit('form')">保存</el-button>
          <el-button @click="showFileDialog = false">取消</el-button>
        </span>
      </div>
    </el-dialog>

    <!-- 章节内容查看 -->
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
import { getToken } from '@/utils/auth'

export default {
  name: 'LibraryDetail',
  data() {
    return {
      id: this.$route.query.id,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      bookInfo: {},
      chapterList: [],
      showItem: {},
      showContent: false,
      showFileDialog: false,
      showGeshi: false,
      uplaodUrl: 'http://localhost:3000/admin-api/chapter/imporChapter?id=' + this.$route.query.id,
      fileList: [],
      token: getToken(),
      form: {
        chapter: {}
      },
      jsonData: [{ 'chapter_index': '章节索引', 'chapter_name': '章节名称', 'content': '章节内容' }]

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
        id: that.id
      }).then(res => {
        that.bookInfo = res.data
      })
    },
    getChapter() {
      chapterApi.get_chapter({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        id: this.id
      }).then(res => {
        this.chapterList = res.data.list
        this.total = res.data.count
        this.list = res.data.list
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 花样文件选择
    fileChange(file, fileList) {
      const isJson = file.raw.type === 'application/json'
      if (!isJson) {
        this.$message.error('上传文件只能是 Json 格式!')
        fileList.pop()
        return false
      }
      const existFile = this.form.chapter.name === file.name
      if (existFile) {
        this.$message.error('当前文件已经存在!')
        fileList.pop()
        return false
      }
      this.form.chapter = file
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getChapter()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getChapter()
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const formData = new FormData()
          formData.append('file', this.form.chapter.raw, this.form.chapter.raw.name)
          formData.append('id', this.id)
          const loading = this.$loading({
            lock: true,
            text: '文件上传中',
            spinner: 'el-icon-loading',
            background: 'rgba(255,255, 255, 0.5)'
          })
          console.log(formData)
          chapterApi.importChapter(formData).then(res => {
            if (res.code !== 200) {
              this.$message({
                message: res.msg,
                type: 'error'
              })
            } else {
              this.$message({
                message: '导入成功',
                type: 'success'
              })
              loading.close()
              this.getChapter()
              this.showFileDialog = false
            }
          }).catch(() => {
            loading.close()
          })
        } else {
          return false
        }
      })
    },
    addChapter() {
      this.showFileDialog = true
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
      .pagination-box{
        text-align: center;
        padding-top: 15px;
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
