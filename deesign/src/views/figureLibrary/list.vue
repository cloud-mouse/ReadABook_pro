<template>
  <div class="figure-list main-content">
    <div class="screen-box">
      <div class="screen-item">
        <el-input
          v-model.trim="keywords"
          size="small"
          placeholder="请输入花样名称"
          clearable
          style="width:220px"
        />
        <el-select v-if="roles==1" v-model="users_id" size="small" clearable placeholder="请选择设计师">
          <el-option
            v-for="item in usersOptions"
            :key="item.users_id"
            :label="item.users_name"
            :value="item.users_id"
          />
        </el-select>
        <el-button size="small" icon="el-icon-search" type="primary" @click="doSearch()">搜索</el-button>
      </div>
      <div class="operation">
        <el-button size="small" icon="el-icon-upload" type="primary" @click="showDialog('add')">新增花样</el-button>
      </div>

    </div>
    <div class="content">
      <el-tabs v-model="activeName" v-loading="loading" type="card" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in figureCount"
          :key="index"
          :label="`${item._status}(${item.count})`"
          :name="`${item.status}`"
        />
        <div class="tab-content">
          <el-row class="figure-data" type="flex">
            <el-col v-for="item in figureList" :key="item.design_id" class="list-item">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <!-- <img v-lazy="item.prev_png_path" :src="item.prev_png_path" class="image"> -->
                <el-image :key="item.design_id" class="image" :src="item.prev_png_path" lazy />
                <div style="padding: 14px; font-szie: 12px">
                  <span>{{ item.design_name }}</span>
                  <div class="bottom clearfix">
                    <span style="color: #F56C6C">￥{{ item.price.toFixed(2) }}</span>
                  </div>
                  <div class="bottom clearfix">
                    <time class="time">{{ item.created_at }}</time>
                  </div>
                  <div class="bottom clearfix">
                    <el-button v-if="item.status!=3 && roles===1" type="text" class="button" @click.stop="editItem(item)">修改</el-button>
                    <el-button v-if="item.status!=3 && roles===1" type="text" class="button" @click.stop="bindPrice(item)">标价</el-button>
                    <el-button v-if="item.status!=3" type="text" style="color:#F56C6C" class="button" @click.stop="handleDelete(item.design_id)">删除</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-tabs>
      <!-- 分页 -->
      <div class="pagination-box">
        <el-pagination
          :total="total"
          :current-page="currentPage"
          :page-sizes="[10, 14,28]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!-- 新增花样弹框 -->
    <el-dialog center :title="'新增花样'" :visible.sync="dialogFormVisible" width="25%">
      <el-form ref="figureForm" :model="figureForm" :rules="rules" label-width="100px" label-position="left" size="small">
        <el-form-item label="花样名称" prop="design_name">
          <el-input v-model="figureForm.design_name " :disabled="dialogType=='detail'" />
        </el-form-item>
        <el-form-item label="选择文件" prop="design">
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
            <el-button slot="trigger" size="small" type="primary">选取花样文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button v-if="dialogType!=='detail'" type="primary" @click="onSubmit('figureForm')">保存</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 修改花样 -->
    <upload-figure v-model="editDialog" :default="editForm" title="修改花样" @close="editDialog=false" @submit="editSubmit" />

    <!-- 花样标价弹框 -->
    <el-dialog center title="花样标价" :visible.sync="figureDetailDialog" class="figure-dialog" width="30%">
      <el-form ref="setPriceForm" :model="setPriceForm" :rules="priceRules" label-width="100px" label-position="left" size="small">
        <el-form-item label="花样名称">
          <el-input v-model="figureDetail.design_name" disabled />
        </el-form-item>
        <el-form-item label="花样标价" prop="price">
          <el-input v-model="setPriceForm.price" :disabled="dialogType=='detail'" />
        </el-form-item>
        <el-form-item>
          <el-button v-if="dialogType!=='detail'" type="primary" @click="setPrice('setPriceForm')">保存</el-button>
          <el-button @click="figureDetailDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import UploadFigure from '@/components/UploadFigure/editFigure'
import { figureApi } from '@/api/figure'
import { getUsers } from '@/api/users'
import { getSub } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  components: {
    'upload-figure': UploadFigure
  },
  data() {
    return {
      loading: true,
      keywords: '',
      users_id: '',
      status: 0,
      activeName: '0',
      figureList: [], // 花样列表
      figureCount: [], // tab统计
      usersOptions: [],
      dialogFormVisible: false, // 新增花样弹窗
      figureDetailDialog: false, // 设置标价弹窗
      figureForm: {
        design_name: '',
        design: {
          name: ''
        }
      }, // 上传花样form
      editForm: {},
      setPriceForm: {
        price: ''
      }, // 设置标价form
      pageSize: 14,
      currentPage: 1,
      total: 0,
      figureDetail: {},
      rules: {
        design_name: [
          { required: true, message: '请填写花样名称', trigger: 'blur' }
        ],
        design: [
          { required: true, message: '请选择花样文件', trigger: 'change' }
        ]
      },
      editDialog: false,
      priceRules: {
        price: [
          { required: true, message: '请填写花样标价', trigger: 'blur' }
        ]
      },
      dialogType: 'add'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  watch: {
    dialogFormVisible(val) {
      if (val === false) {
        this.$refs['figureForm'].resetFields()
        this.figureForm = {
          design_name: '',
          design: {}
        }
      }
    },
    editDialog(val) {
      if (val === false) {
        this.editForm = {}
      }
    }
  },
  created() {
    this.fetchData()
    if (this.roles === 1) {
      this.getUsers()
    }
  },
  methods: {
    fetchData() {
      // 获取花样列表
      figureApi.getList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        design_name: this.keywords,
        users_id: this.users_id,
        status: this.status
      }).then(res => {
        this.loading = false
        this.total = res.data.count
        this.figureList = res.data.data
      })
      this.getdesignCount()
    },
    getUsers() {
      getUsers().then(res => {
        this.usersOptions = res.data.data
      })
    },
    // 统计
    getdesignCount() {
      figureApi.designCount({
        design_name: this.keywords,
        users_id: this.users_id
      }).then(res => {
        this.figureCount = res.data
      })
    },
    showDialog(type, form) {
      this.dialogType = type
      this.dialogFormVisible = true
    },
    showDetail(row) {
      this.figureDetail = row
      this.figureDetailDialog = true
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const formData = new FormData()
          formData.append('design', this.figureForm.design.raw, this.figureForm.design.raw.name)
          formData.append('design_name', this.figureForm.design_name)
          const loading = this.$loading({
            lock: true,
            text: '文件上传中',
            spinner: 'el-icon-loading',
            background: 'rgba(255,255, 255, 0.5)'
          })
          figureApi.addFigure(formData).then(res => {
            if (res.code !== 0) {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            } else {
              this.$message({
                message: '上传成功',
                type: 'success'
              })
              loading.close()
              this.fetchData()
              this.$nextTick(() => {
                this.$refs.figureForm.resetFields()
                this.$refs.upload.clearFiles() // 清除已上传的文件
              })
              this.dialogFormVisible = false
            }
          }).catch(() => {
            loading.close()
          })
        } else {
          return false
        }
      })
    },
    // 点击修改按钮
    editItem(item) {
      this.editForm = item
      this.editDialog = true
    },
    // 保存编辑
    editSubmit(fileList) {
      figureApi.editFigure({
        design_id: this.editForm.design_id,
        dst_path: fileList.dstfileList[0].url ? fileList.dstfileList[0].url : '',
        emb_path: fileList.embfileList[0].url ? fileList.embfileList[0].url : '',
        prev_png_path: fileList.pngfileList[0].url ? fileList.pngfileList[0].url : '',
        txt_png_path: fileList.textfileList[0].url ? fileList.textfileList[0].url : ''
      }).then(res => {
        if (res.code !== 0) {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        } else {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.editDialog = false
        }
      }).catch(() => {
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
    handleDelete(id) {
      this.$confirm('是否从花样库删除该花样?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'danger'
      }).then(() => {
        figureApi.deleteFigure({ design_id: id }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetchData()
        })
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 花样文件选择
    fileChange(file, fileList) {
      const isZIP = file.raw.type === 'application/x-zip-compressed' || getSub(file.name) === 'rar'
      if (!isZIP) {
        this.$message.error('上传文件只能是 ZIP 格式!')
        fileList.pop()
        return false
      }
      const existFile = this.figureForm.design.name === file.name
      if (existFile) {
        this.$message.error('当前文件已经存在!')
        fileList.pop()
        return false
      }
      this.figureForm.design = file
    },

    // 选项卡点击
    handleClick(tab, event) {
      this.currentPage = 1
      this.status = tab.name
      this.loading = true
      this.fetchData()
    },
    doSearch() {
      this.currentPage = 1
      this.loading = true
      this.fetchData()
    },
    changeStatus(item) {
      this.$confirm(`是否${item.status === 2 ? '上架' : '下架'}该花样?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'danger'
      }).then(() => {
        figureApi.setStatus({
          design_id: item.design_id,
          status: item.status === 2 ? 3 : 2
        }).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.fetchData()
        })
      })
    },
    bindPrice(item) {
      this.figureDetail = item
      if (item.price > 0) {
        this.setPriceForm.price = item.price
      } else {
        this.setPriceForm.price = ''
      }
      this.figureDetailDialog = true
    },
    setPrice(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          figureApi.setPrice({
            design_id: this.figureDetail.design_id,
            price: this.setPriceForm.price
          }).then(res => {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.figureDetailDialog = false
            this.fetchData()
            this.$nextTick(() => {
              this.$refs[formName].resetFields()
            })
            this.setPriceForm.price = ''
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '标价失败！'
            })
          })
        } else {
          return false
        }
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
</style>
