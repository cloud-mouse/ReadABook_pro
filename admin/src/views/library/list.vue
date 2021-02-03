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
        <el-button size="small" icon="el-icon-plus" type="primary" @click="showDialog('add')">新增花样</el-button>
      </div>
    </div>
    <div class="content">
      <el-table
        v-loading="loading"
        :data="list"
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
          label="所属分类"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.classId.class_name }}</span>
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
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click.native="seeDetail(scope.row)"
            >查看章节</el-button>
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
          <el-input v-model="form.cover " :disabled="dialogType=='detail'" />
        </el-form-item>
        <el-form-item label="书本名称" prop="name">
          <el-input v-model="form.name" :disabled="dialogType=='detail'" />
        </el-form-item>
        <el-form-item label="书本作者" prop="author">
          <el-input v-model="form.author" :disabled="dialogType=='detail'" />
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
          <el-input v-model="form.description" :disabled="dialogType=='detail'" />
        </el-form-item>
        <el-form-item>
          <el-button v-if="dialogType!=='detail'" type="primary" @click="onSubmit('form')">保存</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { libraryApi, libraryClassApi } from '@/api/library'
import { formatTime } from '@/utils'
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
      loading: true,
      keywords: '',
      classId: '',
      status: 1,
      list: [], // 列表
      libraryClass: [], // 分类列表
      pageSize: 14,
      currentPage: 1,
      total: 0,
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
      // 获取花样列表
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
      form ? this.form = form : ''
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
