<template>
  <div class="order-table-list">
    <div class="order-item">
      <el-row class="order-header">
        <el-col :span="4" class="header-item">
          商品信息
        </el-col>
        <el-col :span="3" class="header-item">
          定制信息
        </el-col>
        <el-col :span="4" class="header-item">
          订单状态
        </el-col>
        <el-col :span="2" class="header-item">
          派单设计师
        </el-col>
        <el-col :span="2" class="header-item">
          平台报价
        </el-col>
        <el-col :span="3" class="header-item">
          买家信息
        </el-col>
        <el-col :span="3" class="header-item">
          买家留言
        </el-col>
        <el-col :span="3" class="header-item">
          操作
        </el-col>
      </el-row>

      <div class="order-item-content">
        <el-checkbox-group v-model="checkList">
          <div v-for="(item, index) in data" :key="`${item.id}-${index}`" class="item-box">
            <div class="item-header">
              <el-checkbox :label="item.id" />
              <span>订单号：{{ item.order_no }}</span>
              <!-- <span>{{ item.payType==1?'线下支付': '在线支付' }}</span> -->
              <span>{{ item._order_type }}</span>
              <span>{{ item.created_at }}</span>
              <!-- <div class="header-btn">
                <router-link :to="`/order/detail?order_no=${item.order_no}`">
                  <el-button
                    size="mini"
                    type="text"
                  >查看详情</el-button>
                </router-link>
              </div> -->
            </div>
            <el-row class="item-content" type="flex" align="middle">
              <el-col :span="4" class="td-item">
                <el-col :span="24" style="text-align:left" class="goods-info">
                  <el-row v-for="(good,i) in item.order_item" :key="`${i}-${good.sku_id}`" class="goods-item">
                    <el-col :span="24" style="text-align:left" class="goods-info">
                      <!-- <img :src="good.image" alt="" width="80" height="80"> -->
                      <el-image :key="good.image" :src="good.image" lazy />
                      <div class="right-info">
                        <span class="goods-name">{{ good.name }}</span>
                        <span class="goods-sku">{{ good.sku_name }}</span>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-col>
              <el-col :span="3" class="td-item">
                <el-button
                  size="mini"
                  type=""
                  @click="showDesignInfo(item.order_item[0])"
                >定制信息</el-button>
              </el-col>
              <el-col :span="4" class="td-item">
                <div>
                  <el-tag :type="item.status | statusFilter">
                    {{ item._users_status }}
                  </el-tag>
                </div>
              </el-col>
              <el-col :span="2" class="td-item"><div v-if="item.users">{{ item.users.users_name }}/{{ item.users.users_phone }}</div> <div v-else>{{ item._users_status }}</div></el-col>
              <el-col :span="2" class="td-item"><div v-if="item.users_price" style="color: orange">￥{{ item.users_price.toFixed(2) }}</div></el-col>
              <el-col :span="3" class="td-item">
                <div>
                  <img :src="item.user.headimgurl" alt="" width="30" height="30">
                  <p style="font-size:12px; margn: 5px 0">{{ item.user.nickname }}</p>
                </div>
              </el-col>
              <el-col :span="3" class="td-item"><div>{{ item.buyer_message?item.buyer_message: "买家未留言" }}</div></el-col>
              <el-col :span="3" class="td-item">
                <div v-if="item.users_status==1" class="operate-btn">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="recive(item.id)"
                  >接单</el-button>
                  <el-button
                    size="mini"
                    type="warning"
                    style="margin: 10px 0 0"
                    @click="refuse(item.id)"
                  >拒单</el-button>
                </div>
                <div v-if="item.users_status==2" class="operate-btn">
                  <el-button
                    size="mini"
                    type="primary"
                    @click="assignUsers(item.id)"
                  >指派设计师</el-button>
                </div>
                <div v-if="item.users_status==3" class="operate-btn">
                  <el-button
                    v-if="userInfo.users_id == item.users.users_id"
                    size="mini"
                    type="primary"
                    @click="uploadDesign(item.id)"
                  >设计完成</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-checkbox-group>
        <div v-if="data.length===0" class="no-data">暂无订单...</div>
      </div>
    </div>
    <!-- 定制信息弹框 -->
    <design-dialog v-model="infoDialog" :info-item="infoItem" @close="infoDialog=false" />
    <!-- 指派设计师 -->
    <el-dialog :visible.sync="assignDialog" width="30%" title="指派设计师">
      <el-form ref="assignForm" label-position="left" :model="assignForm" :rules="assignRules" size="small" label-width="80px">
        <el-form-item label="设计师" prop="users_id">
          <el-select v-model="assignForm.users_id" placeholder="请选择设计师" style="width: 100%">
            <el-option
              v-for="item in usersList"
              :key="item.users_id"
              :label="item.users_name"
              :value="item.users_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmAssign('assignForm')">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 完成设计弹框 上传 -->
    <upload-figure v-model="uploadDialog" :title="'完成设计'" @close="uploadDialog=false" @submit="onSubmit" />
  </div>
</template>

<script>
import { getUsers } from '@/api/users'
import { orderApi } from '@/api/order'
import { mapGetters } from 'vuex'
import DesignDialog from './DesignDialog'
import UploadFigure from '@/components/UploadFigure'
export default {
  components: {
    DesignDialog,
    UploadFigure
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'danger',
        2: 'success',
        3: 'success',
        4: 'success',
        5: 'danger',
        6: 'danger',
        '-2': 'info'
      }
      return statusMap[status]
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
      checkList: [], // 选中的订单id
      infoDialog: false, // 定制信息
      assignDialog: false, // 指派设计师
      uploadDialog: false, // 上传花样
      infoItem: {
        design: {
          prev_png_path: ''
        }
      },
      assignRules: {
        users_id: [
          { required: true, message: '请选择设计师', trigger: 'change' }
        ]
      },
      assignForm: {
        order_id: '',
        users_id: ''
      },
      uploaOrderId: '',
      usersList: [] // 设计师列表
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {

  },
  methods: {
    showDesignInfo(item) {
      this.infoDialog = true
      this.infoItem = item
    },
    uploadDesign(id) {
      this.uploaOrderId = id
      this.uploadDialog = true
    },
    assignUsers(id) {
      this.getUsersList()
      this.assignForm.order_id = id
      this.assignDialog = true
    },
    confirmAssign(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          orderApi.dispatchOrder({
            order_id: this.assignForm.order_id,
            users_id: this.assignForm.users_id
          }).then(res => {
            this.$message({
              type: 'success',
              message: res.msg
            })
          })
          this.assignDialog = false
          this.getOrderList()
        } else {
          return false
        }
      })
    },
    // 获取订单列表，子组件触发父组件方法
    getOrderList() {
      setTimeout(() => {
        this.$emit('getList')
      }, 500)
    },
    recive(id) {
      this.$confirm('是否接入该订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'danger'
      }).then(() => {
        orderApi.receiveOrder({ order_id: id }).then(res => {
          this.$message({
            type: 'success',
            message: '接单成功!'
          })
          this.getOrderList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消!'
        })
      })
    },
    refuse(id) {
      this.$confirm('是否拒接该订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        confirmButtonClass: 'danger'
      }).then(() => {
        orderApi.refuseOrder({ order_id: id }).then(res => {
          this.$message({
            type: 'success',
            message: '拒单成功!'
          })
          this.getOrderList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消!'
        })
      })
    },
    getUsersList() {
      getUsers({
        pagesize: 100
      }).then(res => {
        this.usersList = res.data.data
      })
    },
    onSubmit(fileList) {
      const formData = new FormData()
      formData.append('dst', fileList.dst.raw, fileList.dst.raw.name)
      formData.append('emb', fileList.emb.raw, fileList.emb.raw.name)
      formData.append('prev_png', fileList.prev_png.raw, fileList.prev_png.raw.name)
      formData.append('txt_png', fileList.txt_png.raw, fileList.txt_png.raw.name)
      formData.append('order_id', this.uploaOrderId)
      const loading = this.$loading({
        lock: true,
        text: '文件上传中',
        spinner: 'el-icon-loading',
        background: 'rgba(255,255, 255, 0.5)'
      })
      orderApi.uploadDesign(formData).then(res => {
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
          this.getOrderList()
          this.uploadDialog = false
          this.$refs.upload1.clearFiles()
          this.$refs.upload2.clearFiles()
          this.$refs.upload3.clearFiles()
          this.$refs.upload4.clearFiles()
        }
      }).catch(() => {
        loading.close()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.order-header{
  align-items: center;
  font-size: 14px;
  padding: 0 10px;
  box-shadow: 0px 10px 20px #ebeef5;
  margin-bottom: 20px;
  background: #fafafa;
  border: 1px solid #eee;
  border-radius: 5px;
  .header-item{
    text-align: center;
    border-right: 1px solid #eee;
    padding: 10px 5px;
    &:last-child{
      border-right: none;
    }
  }
}
.order-item-content{
  .item-box{
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #fafafa;
    box-shadow: 0px 10px 20px #ebeef5;
    vertical-align: middle;
    .item-header{
      padding: 10px;
      background: #f5f5f5;
      border-radius: 5px 5px 0 0;
      span{
        margin-left: 10px;
      }
      .header-btn{
        float: right;
        margin-top: -7px;
      }
    }
    .item-content{
      padding: 0 10px;
      &:hover{
        background: #fafafa;
      }
      .td-item{
        padding: 10px 5px;
        text-align: center;
        .goods-item{
          border-bottom: 1px solid #fafafa;
          padding: 10px;
          &:last-child{
            border: none;
          }
          .goods-info{
            display: flex;
            align-items: center;
            .el-image{
              width: 80px;
              height: 80px;
            }
            .right-info{
              flex: 1;
              padding-left: 10px;
              span{
                display: block;
              }
              span.goods-name{
                padding-bottom: 10px;
              }
              span.goods-sku{
                color: #999;
                font-size: 12px;
              }
            }
          }
        }
        &:last-child{
          border: none
        }
      }
    }
  }
}
.no-data{
  text-align: center;
}
.el-checkbox-group{
  font-size: 14px;
  .el-checkbox{
    span{
      font-size: 0;
    }
  }
}
</style>

<style lang="scss">
.order-table-list{
   padding: 0 10px;
  .el-checkbox__label{
    display: none
    ;
  }
}
</style>
