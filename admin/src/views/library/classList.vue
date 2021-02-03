<template>
  <div class="figure-list main-content">
    <div class="screen-box">
      <div class="operate">
        <el-button size="small" icon="el-icon-plus" type="primary" @click="showDialog('add')">新增分类</el-button>
      </div>
    </div>
    <div class="content">
      <el-table
        v-loading="loading"
        :data="classList"
        style="width: 100%"
        fit
        highlight-current-row
        tooltip-effect="dark"
      >
        <el-table-column
          label="序号"
          align="center"
          width="100"
          type="index"
        />
        <el-table-column
          label="分类图标"
          align="center"
        >
          <template slot-scope="scope">
            <img :src="scope.row.icon" width="30" height="30" alt="" style="display: inline-block;vertical-align: middle;">
          </template>
        </el-table-column>
        <el-table-column
          prop="class_name"
          label="分类名称"
          align="center"
        />
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
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click.native="showDialog('edit', scope.row)"
            >修改</el-button>
            <el-button
              size="mini"
              @click.native="showDialog('detail', scope.row)"
            >查看</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row._id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    <el-dialog center :title="'新增分类'" :visible.sync="dialogFormVisible" width="25%">
      <el-form ref="figureForm" :model="form" :rules="rules" label-width="100px" label-position="left" size="small">
        <el-form-item label="分类名称" prop="class_name">
          <el-input v-model="form.class_name " :disabled="dialogType=='detail'" />
        </el-form-item>
        <el-form-item label="分类图标" prop="icon">
          <el-input v-model="form.icon" clearable="" :disabled="dialogType=='detail'" />
          <!-- <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.icon" :src="form.icon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload> -->
        </el-form-item>
        <el-form-item>
          <el-button v-if="dialogType!=='detail'" type="primary" @click="onSubmit('figureForm')">保存</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import { libraryClassApi } from '@/api/library'
import { formatTime } from '@/utils'
export default {
  filters: {
    timeFormat(time) {
      return formatTime(new Date(time))
    }
  },
  data() {
    return {
      loading: true,
      users_id: '',
      classList: [], // 分类列表
      dialogFormVisible: false, // 新增花样弹窗
      form: {
        class_name: '',
        icon: 'https://s3.ax1x.com/2021/02/02/yuwGjS.jpg'
      }, // 上传花样form
      editForm: {},
      pageSize: 10,
      currentPage: 1,
      total: 0,
      rules: {
        class_name: [
          { required: true, message: '请填写分类名称', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请填写分类图标', trigger: 'blur' }
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
          class_name: '',
          icon: 'https://s3.ax1x.com/2021/02/02/yuwGjS.jpg'
        }
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // 获取花样列表
      libraryClassApi.getList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.loading = false
        this.total = res.data.count
        this.classList = res.data.list
      })
    },
    showDialog(type, form) {
      this.dialogType = type
      this.dialogFormVisible = true
      form ? this.form = form : ''
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form._id) {
            libraryClassApi.update_library_class({
              _id: this.form._id,
              class_name: this.form.class_name,
              pid: 0,
              icon: this.form.icon
            }).then(res => {
              if (res.code !== 200) {
                this.$message({
                  message: res.msg,
                  type: 'error'
                })
              } else {
                this.$message({
                  message: res.msg,
                  type: 'success'
                })
                this.fetchData()
                this.$nextTick(() => {
                  this.$refs.figureForm.resetFields()
                })
                this.dialogFormVisible = false
              }
            })
          } else {
            libraryClassApi.add_library_class({
              class_name: this.form.class_name,
              pid: 0,
              icon: this.form.icon
            }).then(res => {
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
                  this.$refs.figureForm.resetFields()
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
    // 上传图片
    handleAvatarSuccess(res, file) {
      this.form.icon = URL.createObjectURL(file.raw)
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
    // 当前页改变
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    // 分页大小改变
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData()
    },
    // 删除
    handleDelete(id) {
      this.$confirm('是否要删除该分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'danger'
      }).then(() => {
        libraryClassApi.delete_library_class({
          class_id: id
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
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
    .operate{
      text-align: right
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
<style lang="scss">
.figure-dialog{
  .el-dialog{
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 !important;
    transform: translate(-50%, -50%);
    max-height: calc(100% - 30px);
    max-width: calc(100% - 30px);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .el-dialog__body {
      overflow: auto;
    }
  }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
