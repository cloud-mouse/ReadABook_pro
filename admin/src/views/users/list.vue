<template>
  <div class="-list main-content">
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
      <div class="operation">
        <el-button size="small" icon="el-icon-plus" type="primary" @click="showDialog('add')">新增</el-button>
      </div>
    </div>
    <div class="content">
      <el-table
        v-loading="load"
        :data="List"
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
          label="设计师头像/姓名"
          align="lefts"
        >
          <template slot-scope="scope">
            <img :src="scope.row.avatar_url" width="60" height="60" alt="" style="display: inline-block;vertical-align: middle;">
            <span style="display: inline-block;vertical-align: middle;margin-left: 10px">{{ scope.row._name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="_phone"
          label="手机号"
          align="center"
        />
        <el-table-column
          label="设计师状态"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status==0?'已禁用':'已启用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="设计师账号"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.is_active | statusFilter">{{ scope.row.is_active==0?'未激活':'已激活' }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          label="是否启用"
          align="center"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              class="changes-status"
              :active-value="1"
              :inactive-value="0"
              disabled
              @click.native="switchTab(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
          align="center"
        />
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
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
    <el-dialog center :title="dialogType=='add'? '新增设计师': dialogType=='edit'? '编辑设计师': '设计师详情'" :visible.sync="dialogFormVisible" width="40%">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="right" size="small">
        <el-form-item label="设计师姓名" prop="users_name">
          <el-input v-model="form.users_name" :disabled="dialogType=='detail'" style="width:100%" />
        </el-form-item>
        <el-form-item label="设计师手机号" prop="users_phone">
          <el-input v-model="form.users_phone" :disabled="dialogType=='detail'" style="width:100%" />
        </el-form-item>
        <el-form-item label="设计师头像" prop="logo">
          <el-upload
            class="logo-uploader"
            :action="`${baseUrl}/design/uploadImg`"
            name="image"
            :headers="{'design_sign': token}"
            :file-list="fileList"
            :with-credentials="true"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :disabled="dialogType=='detail'"
          >
            <img v-if="imageUrl" :src="imageUrl" class="logo">
            <i v-else class="el-icon-plus logo-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button v-if="dialogType!=='detail'" type="primary" @click="onSubmit('form')">保存</el-button>
          <el-button @click="dialogFormVisible = false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog center title="创建成功" :visible.sync="resaultDialog" width="40%" :close-on-click-modal="false">
      <el-card class="box-card" shadow="never">
        <p>登录账号：{{ reasultData.users_phone }}</p>
        <p>登录密码：{{ reasultData.default_password }}</p>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import { addUsers, setEnabled, getUsers, delUsers } from '@/api/users.js'
import { validPhone } from '@/utils/validate'
import { getToken } from '@/utils/auth'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'danger',
        1: 'success'
      }
      return statusMap[status]
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
      multipleSelection: [],
      dialogFormVisible: false,
      resaultDialog: false,
      form: {
        users_name: '',
        users_phone: '',
        avatar_url: '',
        status: 0
      },
      imageUrl: '',
      reasultData: {},
      pageSize: 10,
      currentPage: 1,
      total: 0,
      rules: {
        users_team_name: [
          { required: true, message: '请填写团队名称', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        users_name: [
          { required: true, message: '请填写设计师姓名', trigger: 'blur' }
        ],
        users_phone: [
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
          users_name: '',
          users_phone: '',
          avatar_url: ''
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
        pageSize: this.pageSize,
        currentPage: this.currentPage
      }).then(res => {
        this.load = false
        this.usersList = res.data.data
        this.total = res.data.count
      })
    },
    showDialog(type, form) {
      this.dialogType = type
      this.dialogFormVisible = true
      if (form && form.users_id) {
        this.form.users_id = form.users_id
        this.form.users_name = form.users_name
        this.form.users_phone = form.users_phone
        this.form.status = form.status
        this.form.avatar_url = form.avatar_url
        this.imageUrl = form.avatar_url
      }
    },
    onSubmit(formName) {
      const _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          addUsers(_this.form).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: res.msg || '添加成功!'
              })
              // 重置表单
              this.$nextTick(() => {
                this.$refs[formName].resetFields()
                this.$refs[formName].clearFiles()
              })

              this.reasultData = res.data

              this.dialogFormVisible = false
              this.resaultDialog = true
              this.fetchData()
            } else {
              this.$message.success(res.msg || '添加失败!')
            }
          })
        } else {
          return false
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.form.avatar_url = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
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
    switchTab(row) {
      this.$confirm(`是否${row.status === 0 ? '启用' : '禁用'}该设计师账号?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'danger'
      }).then(() => {
        setEnabled({ users_id: row.users_id, status: row.status === 0 ? '1' : '0' }).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
          row.status === 0 ? row.status = 1 : row.status = 0
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消!'
        })
      })
    },
    handleDelete(id) {
      this.$confirm('是否删除该设计师账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'danger'
      }).then(() => {
        delUsers({ users_id: id }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetchData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
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
