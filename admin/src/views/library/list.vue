<template>
  <div class="figure-list main-content">
    <div class="screen-box">
      <div class="screen-item">
        <el-input
          v-model.trim="keywords"
          size="small"
          placeholder="请输入书本名称"
          clearable
          style="width:220px"
        />
        <!-- <el-select v-model="classId" size="small" clearable placeholder="请选择书本分类">
          <el-option
            v-for="item in libraryClass"
            :key="item._id"
            :label="item.class_name"
            :value="item._id"
          />
        </el-select> -->
        <el-button size="small" icon="el-icon-search" type="primary" @click="doSearch()">搜索</el-button>
      </div>
      <div class="operation">
        <el-button size="small" icon="el-icon-plus" type="primary" @click="showDialog('add')">新增</el-button>
        <el-button size="small" icon="el-icon-document-add" @click="showFileDialog = true">导入</el-button>
      </div>
    </div>
    <div class="content">
      <el-table
        v-loading="loading"
        :data="list"
        fit
        highlight-current-row
        tooltip-effect="dark"
      >
        <el-table-column
          label="序号"
          align="center"
          type="index"
        />
        <el-table-column
          label="封面图"
          align="center"
        >
          <template slot-scope="scope">
            <img :src="scope.row.cover" width="50" alt="" style="display: inline-block;vertical-align: middle;">
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="书名"
          align="center"
        />
        <el-table-column
          prop="author"
          label="作者"
          align="center"
        />
        <el-table-column
          label="所属分类"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.classId">{{ scope.row.classId.class_name }}</span>
            <span v-else>未设置</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          align="center"
        />
        <el-table-column
          prop="pv"
          label="浏览量"
          align="center"
        />
        <el-table-column
          label="书本状态"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status | statusFilter"
            >
              {{ scope.row.status==1?'已上架': scope.row.status==2?'已下架': '待审核' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.createTime | timeFormat }}
          </template>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.updateTime | timeFormat }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="章节操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click.native="seeDetail(scope.row)"
            >查看</el-button>
            <!-- <el-button
              type="text"
              size="mini"
              @click.native="removeChapter(scope.row)"
            >清空</el-button> -->
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="220"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click.native="showDialog('edit', scope.row)"
            >修改</el-button>
            <el-button
              v-if="scope.row.status==1"
              type="danger"
              size="mini"
              @click.native="changeStatus(scope.row,2)"
            >下架</el-button>
            <el-button
              v-if="scope.row.status==2"
              type="success"
              size="mini"
              @click.native="changeStatus(scope.row,1)"
            >上架</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination-box">
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
    <!-- 新增花样弹框 -->
    <el-dialog center :title="'新增书本'" :visible.sync="dialogFormVisible" width="40%">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        label-position="left"
        size="small"
      >
        <el-form-item label="封面" prop="cover">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="{'Authorization': `Basic ${token}`}"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.cover" :src="form.cover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="书本名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="书本作者" prop="author">
          <el-input v-model="form.author" />
        </el-form-item>
        <el-form-item label="书本分类" prop="classId">
          <el-select
            v-model="form.classId"
            placeholder="请选择分类"
            clearable
          >
            <el-option
              v-for="item in libraryClass"
              :key="item._id"
              :label="item.class_name"
              :value="item._id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="书本描述" prop="description">
          <el-input v-model="form.description" />
        </el-form-item>
        <el-form-item label="书本排序">
          <el-input v-model="form.sort" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">保存</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 文件导入弹窗 -->
    <el-dialog
      title="文件导入"
      :visible.sync="showFileDialog"
      width="30%"
      @close="showFileDialog = false"
    >
      <div class="import-form">
        <el-form
          ref="bookForm"
          :model="bookForm"
          label-position="top"
          size="small"
        >
          <el-form-item label="选择小说文件">
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
              <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
            </el-upload>
          </el-form-item>

        </el-form>
        <span slot="footer">
          <el-button type="primary" @click="importBook('bookForm')">保存</el-button>
          <el-button @click="showFileDialog = false">取消</el-button>
        </span>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { libraryApi, libraryClassApi } from '@/api/library'
import { chapterApi } from '@/api/chapter'
import { formatTime } from '@/utils'
import { getToken } from '@/utils/auth'
export default {
  filters: {
    timeFormat(time) {
      return formatTime(new Date(time))
    },
    statusFilter(status) {
      const statusList = {
        1: 'success',
        2: 'danger',
        3: 'warning'
      }
      return statusList[status]
    }
  },
  data() {
    return {
      token: getToken(),
      loading: true,
      keywords: '',
      classId: '',
      status: 1,
      list: [], // 列表
      libraryClass: [], // 分类列表
      pageSize: 14,
      currentPage: 1,
      total: 0,
      showFileDialog: false, // 导入弹窗
      dialogFormVisible: false, // 新增弹窗
      form: {
        name: '',
        author: '',
        cover: '',
        sort: 0,
        pv: 0,
        description: '',
        classId: '',
        status: 1
      },
      bookForm: {
        book: {}
      },
      rules: {
        name: [
          { required: true, message: '请填写书名', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请填写作者', trigger: 'blur' }
        ],
        cover: [
          { required: true, message: '请上传封面', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请填写描述', trigger: 'blur' }
        ],
        classId: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ]
      },
      dialogType: 'add'
    }
  },
  watch: {
    dialogFormVisible(val) {
      if (val === false) {
        this.$refs['form'].resetFields()
        this.form = {
          name: '',
          author: '',
          cover: '',
          sort: 0,
          pv: 0,
          description: '',
          classId: '',
          status: 1
        }
      }
    }
  },
  created() {
    this.fetchData()
    this.getClassList()
  },
  methods: {
    fetchData() {
      // 获取列表
      libraryApi.get_library({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        keywords: this.keywords
        // classId: this.classId,
        // status: this.status
      }).then(res => {
        this.loading = false
        this.total = res.data.count
        this.list = res.data.list
      })
    },
    // 获取分类列表
    getClassList() {
      libraryClassApi.getList({
        currentPage: 1,
        pageSize: 100
      }).then(res => {
        this.libraryClass = res.data.list
      })
    },
    seeDetail(row) {
      this.$router.push({ path: '/library/detail', query: { id: row._id }})
    },
    showDialog(type, form) {
      this.dialogType = type
      this.dialogFormVisible = true
      form ? this.form = JSON.parse(JSON.stringify(form)) : ''
      form ? this.form.classId = JSON.parse(JSON.stringify(form.classId._id)) : ''
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.bookForm = {
        book: {}
      }
    },
    // 文件选择
    fileChange(file, fileList) {
      const isJson = file.raw.type === 'application/json'
      if (!isJson) {
        this.$message.error('上传文件只能是 Json 格式!')
        fileList.pop()
        return false
      }
      const existFile = this.bookForm.book.name === file.name
      if (existFile) {
        this.$message.error('当前文件已经存在!')
        fileList.pop()
        return false
      }
      this.bookForm.book = file
    },
    // 导入文件
    importBook(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const formData = new FormData()
          formData.append('file', this.bookForm.book.raw, this.bookForm.book.raw.name)
          const loading = this.$loading({
            lock: true,
            text: '文件上传中',
            spinner: 'el-icon-loading',
            background: 'rgba(255,255, 255, 0.5)'
          })
          console.log(formData)
          libraryApi.importBook(formData).then(res => {
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
              this.fetchData()
              this.showFileDialog = false
              this.bookForm = {
                book: {}
              }
            }
          }).catch(() => {
            loading.close()
          })
        } else {
          return false
        }
      })
    },
    removeChapter(row) {
      this.$confirm(`此操作将清空${row.name}的全部章节，是否确认清楚?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'danger'
      }).then(() => {
        chapterApi.delete_chapter({
          libraryId: row._id
        }).then(res => {
          this.$message({
            message: '清除成功',
            type: 'success'
          })
        })
      })
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
      if (res.code === 1) {
        this.form.cover = res.path
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form._id) {
            libraryApi.update_library(this.form).then(res => {
              if (res.code !== 200) {
                this.$message({
                  message: res.msg,
                  type: 'error'
                })
              } else {
                this.$message({
                  message: '更新成功',
                  type: 'success'
                })
                this.fetchData()
                this.$nextTick(() => {
                  this.$refs.form.resetFields()
                })
                this.dialogFormVisible = false
              }
            })
          } else {
            libraryApi.add_library(this.form).then(res => {
              if (res.code !== 200) {
                this.$message({
                  message: res.msg,
                  type: 'error'
                })
              } else {
                this.$message({
                  message: '新增成功',
                  type: 'success'
                })
                this.fetchData()
                this.$nextTick(() => {
                  this.$refs.form.resetFields()
                })
                this.dialogFormVisible = false
              }
            })
          }
        } else {
          return false
        }
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData()
    },
    handleDelete(row) {
      this.$confirm(`是否删除${row.name}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'danger'
      }).then(() => {
        libraryApi.delete_library({ id: row._id }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetchData()
        })
      })
    },
    doSearch() {
      this.currentPage = 1
      this.loading = true
      this.fetchData()
    },
    changeStatus(item, status) {
      this.$confirm(`是否${item.status === 2 ? '上架' : '下架'}该书?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'danger'
      }).then(() => {
        libraryApi.change_status({
          _id: item._id,
          status: status
        }).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.fetchData()
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.figure-list{
  .screen-box{
    .screen-item{
      text-align: left;
    }
    .operation{
      position: absolute;
      top:10px;
      right: 10px;
    }
  }
  .content{
    padding: 20px;
    .figure-data{
      flex-flow: wrap;
      .list-item{
        width: 12.5%;
        margin-right: 2%;
        margin-bottom: 20px;
        .time {
          font-size: 13px;
          color: #999;
        }

        .bottom {
          margin-top: 13px;
          line-height: 12px;
        }

        .button {
          padding: 0;
        }

        .image {
          width: 100%;
          height: 200px;
          display: block;
        }
      }
      .list-item:nth-child(7n+7) {
        margin-right: 0;
      }
    }
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
  .figure-box{
    display: flex;
    flex-flow: wrap;
    align-items: center;
    .figure-item{
      width: 20%;
      margin-bottom: 20px;
    }
  }
}

</style>
