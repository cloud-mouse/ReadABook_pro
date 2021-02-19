<template>
  <div class="users-list main-content">
    <div class="screen-box">
      <div class="screen-item">
        <el-input
          v-model="keywords"
          size="small"
          placeholder="请输入关键词"
          clearable
          style="width:220px"
          @keyup.enter.native="fetchData"
        />
        <el-button size="small" icon="el-icon-search" type="primary" @click.native="fetchData">搜索</el-button>
      </div>
    </div>
    <div class="content">
      <el-table
        v-loading="load"
        :data="usersList"
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
          label="用户头像"
          align="center"
        >
          <template slot-scope="scope">
            <img :src="scope.row.avator" width="60" height="60" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="realname"
          label="真实姓名"
          align="center"
        />
        <el-table-column
          prop="username"
          label="账号"
          align="center"
        />
        <el-table-column
          prop="phone"
          label="手机号"
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
              type="danger"
              @click="handleDelete(scope.row._id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination-box">
        <el-pagination
          :total="total"
          :current-page="currentPage"
          :page-sizes="[5, 10, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!-- 管理者新增，详情，编辑弹框 -->
    <el-dialog center :title="dialogType=='add'? '新增用户': dialogType=='edit'? '编辑用户': '用户详情'" :visible.sync="dialogFormVisible" width="40%">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="right" size="small">
        <el-form-item label="头像" prop="avator">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="{'Authorization': `Basic ${token}`}"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.avator" :src="form.avator" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" style="width:100%" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" style="width:100%" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="form.realname" placeholder="请输入真实姓名" style="width:100%" />
        </el-form-item>
        <el-form-item v-if="dialogType==='add'" label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" type="password" style="width:100%" />
        </el-form-item>
        <el-form-item>
          <el-button v-if="dialogType!=='detail'" type="primary" @click="onSubmit('form')">保存</el-button>
          <el-button @click="dialogFormVisible = false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { addUsers, editUsers, getUsers, delUsers } from '@/api/users.js'
import { validPhone } from '@/utils/validate'
import { getToken } from '@/utils/auth'
import { formatTime } from '@/utils'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'danger',
        1: 'success'
      }
      return statusMap[status]
    },
    timeFormat(time) {
      return formatTime(new Date(time))
    }
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error('手机号不正确'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (this.dialogType === 'add' && this.form.password === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      load: true,
      keywords: '',
      baseUrl: process.env.VUE_APP_BASE_API,
      usersList: [],
      fileList: [{ name: 'image', url: '' }],
      token: getToken(),
      dialogFormVisible: false,
      form: {
        username: '',
        password: '',
        phone: '',
        realname: '',
        avator: ''
      },
      imageUrl: '',
      pageSize: 10,
      currentPage: 1,
      total: 0,
      rules: {
        username: [
          { required: true, message: '请填写用户姓名', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '请填写真实姓名', trigger: 'blur' }
        ],
        avator: [
          { required: true, message: '请上传头像', trigger: 'blur' }
        ],
        phone: [
          { required: true, trigger: 'blur', validator: validatePhone }
        ],
        password: [
          { trigger: 'blur', validator: validatePassword }
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
          username: '',
          realname: '',
          password: '',
          phone: '',
          avator: ''
        }
        this.imageUrl = ''
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // 获取管理者列表
      getUsers({
        keywords: this.keywords,
        pageSize: this.pageSize,
        currentPage: this.currentPage
      }).then(res => {
        this.load = false
        this.usersList = res.data.list
        this.total = res.data.count
      })
    },
    showDialog(type, form) {
      this.dialogType = type
      this.dialogFormVisible = true
      form ? this.form = JSON.parse(JSON.stringify(form)) : ''
    },
    onSubmit(formName) {
      const _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form._id) {
            editUsers(_this.form).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: res.msg || '修改成功!'
                })
                this.dialogFormVisible = false
                this.fetchData()
              } else {
                this.$message.error(res.msg || '添加失败!')
              }
            })
          } else {
            addUsers(_this.form).then(res => {
              if (res.code === 200) {
                this.$message({
                  type: 'success',
                  message: res.msg || '添加成功!'
                })
                this.dialogFormVisible = false
                this.fetchData()
              } else {
                this.$message.error(res.msg || '添加失败!')
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
      if (res.code === 1) {
        this.form.avator = res.path
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
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData()
    },
    handleDelete(id) {
      this.$confirm('是否删除该用户账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'danger'
      }).then(() => {
        delUsers({
          _id: id
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          if (this.usersList.length === 1) {
            this.currentPage = 1
          }
          this.fetchData()
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.users-list{
  .screen-box{
    .screen-item{
      text-align: left;
    }
  }
}
</style>

<style lang="scss">
.logo-uploader{
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409EFF;
  }
  .logo-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .logo {
    width: 150px;
    height: 150px;
    display: block;
  }
}

.changes-status.el-switch.is-disabled {
  opacity: 1;
  .el-switch__core {
    cursor: pointer;
  }
}
</style>
