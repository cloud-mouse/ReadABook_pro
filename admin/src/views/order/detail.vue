<template>
  <div v-loading="loading" class="order-detail">
    <div class="title-info">
      <card-tag tag-name="订单状态" />
    </div>
    <div class="order-detail-content">
      <div class="order-info">
        <card-tag tag-name="基本信息" />
        <div class="order-info-content">
          <el-row class="info-tabel">
            <el-col class="info-th" :span="6">订单号：</el-col>
            <el-col class="info-th" :span="6">订单类型：</el-col>
            <el-col class="info-th" :span="6">买家信息：<el-button type="text" style="padding: 0" @click="useInfoDialog = true">信息</el-button></el-col>
            <el-col class="info-th" :span="6">下单时间：</el-col>
          </el-row>
          <el-row class="info-tabel">
            <el-col class="info-td" :span="6">{{ orderDetail.order_no }}</el-col>
            <el-col class="info-td" :span="6">{{ orderDetail._order_type }}</el-col>
            <el-col class="info-td" :span="6">{{ orderDetail.user.nickname?orderDetail.user.nickname:'' }}</el-col>
            <el-col class="info-td" :span="6">{{ orderDetail.created_at }}</el-col>
          </el-row>
          <el-row class="info-tabel">
            <el-col class="info-th" :span="6">订单状态：</el-col>
            <el-col class="info-th" :span="6">配送方式：</el-col>
            <el-col class="info-th" :span="6">付款时间：</el-col>
            <el-col class="info-th" :span="6">发货单号：</el-col>
          </el-row>
          <el-row class="info-tabel">
            <el-col class="info-td" :span="6">{{ orderDetail._status }}</el-col>
            <el-col class="info-td" :span="6">快递</el-col>
            <el-col class="info-td" :span="6">{{ orderDetail.pay_time?orderDetail.pay_time:'未付款' }}</el-col>
            <el-col class="info-td" :span="6">未发货</el-col>
          </el-row>
        </div>
      </div>
      <div class="order-info">
        <card-tag tag-name="收货人信息" />
        <div class="order-info-content">
          <el-row class="info-tabel">
            <el-col class="info-th" :span="6">收货人：</el-col>
            <el-col class="info-th" :span="6">手机号码：</el-col>
            <el-col class="info-th" :span="6">收货地址：</el-col>
          </el-row>
          <el-row class="info-tabel">
            <el-col class="info-td" :span="6">{{ orderDetail.receiver_name }}</el-col>
            <el-col class="info-td" :span="6">{{ orderDetail.receiver_phone }}</el-col>
            <el-col class="info-td" :span="6">{{ orderDetail.receiver_address }}</el-col>
          </el-row>
        </div>
      </div>
      <div class="order-info">
        <card-tag tag-name="商品信息" />
        <div class="order-info-content">
          <el-row class="info-tabel">
            <el-col class="info-th" :span="6">商品基本信息：</el-col>
            <el-col class="info-th" :span="6">单价/购买数量:</el-col>
            <el-col class="info-th" :span="6">规格信息：</el-col>
            <el-col class="info-th" :span="6">快递单号：</el-col>
          </el-row>
          <el-row v-for="(item,index) in orderDetail.order_item" :key="`${index}-${item.id}`" class="info-tabel goods" type="flex" align="middle">
            <el-col class="info-td" :span="6">
              <img :src="item.image" width="50" height="50" alt="">
              <p>{{ item.name }}</p>
            </el-col>
            <el-col class="info-td" :span="6">￥{{ item.current_price }}/{{ item.buy_num }}</el-col>
            <el-col class="info-td" :span="6">{{ item.sku_name }}</el-col>
            <el-col class="info-td" :span="6">
              {{ orderDetail.status==1?'未付款': item.express_number?item.express_number:'未发货' }}
              <el-button type="text" style="padding: 0" @click.stop="getOrderTrace(item.order_item_id)">查看</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-if="orderDetail.status!=-2" class="order-info">
        <card-tag tag-name="操作信息" />
        <div class="order-info-content">
          <div class="remark-box">
            <el-input
              v-model="remark"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
            />
          </div>
          <div class="operation-button">
            <el-button type="danger" size="mini">确认</el-button>
            <el-button type="danger" size="mini">取消</el-button>
            <el-button type="danger" size="mini">付款</el-button>
            <el-button type="danger" size="mini">无效</el-button>
            <el-button type="danger" size="mini">售后</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 买家信息弹框 -->
    <el-dialog
      title="买家信息"
      :visible.sync="useInfoDialog"
      width="30%"
      center
    >
      <p>id：{{ orderDetail.user.id }}</p>
      <p>昵称：{{ orderDetail.user.nickname?orderDetail.user.nickname:'' }}</p>
      <p>城市：{{ orderDetail.user.country }}{{ orderDetail.user.province }}{{ orderDetail.user.city }}</p>
    </el-dialog>
    <!-- 物流信息弹框 -->
    <el-dialog
      title="物流详情"
      :visible.sync="expressDialog"
      width="40%"
      class="express-dialog"
    >
      <div class="express-info">
        <p><span>{{ order_trace.express_name }} </span> <span> 快递单号：{{ order_trace.express_number }}</span></p>
        <div v-if="order_trace.traces">
          <el-timeline>
            <el-timeline-item
              v-for="(traces, index) in order_trace.traces"
              :key="index"
              :timestamp="traces.datetime"
            >
              {{ traces.content }}
            </el-timeline-item>
          </el-timeline>
        </div>
        <div v-else>
          暂无物流信息...
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import CardTag from '@/components/CardTag'
import { orderApi } from '@/api/order'
export default {
  components: {
    CardTag
  },
  data() {
    return {
      loading: true,
      remark: '',
      useInfoDialog: false,
      expressDialog: false,
      order_no: this.$route.query.order_no,
      orderDetail: {
        user: {}
      },
      order_trace: {}
    }
  },
  created() {
    this.getDetail(this.order_no)
  },
  methods: {
    getDetail(order_no) {
      this.loading = true
      orderApi.getOrderDetail({
        order_no: order_no
      }).then(res => {
        this.orderDetail = res.data
        this.loading = false
        const status = res.data.status
        this.active = status === 1 ? 0 : status === 2 ? 1 : status === 3 ? 2 : status === 4 ? 3 : status === 5 ? 4 : status === 6 ? 5 : 6
      })
    },
    getOrderTrace(id) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.7)'
      })
      orderApi.orderTrace({
        order_item_id: id
      }).then(res => {
        this.order_trace = res.data
        loading.close()
        this.expressDialog = true
      }).catch(() => {
        loading.close()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.order-detail{
  padding: 15px;
  .order-detail-content{
    .detail-header{
      padding: 10px;
      background: #ffffff;
      border-bottom: 10px solid #f5f5f5;
    }
    .order-info{
      margin-bottom: 10px;
      .order-info-content{
        background: #ffffff;
        .info-tabel{
          padding: 10px 20px;
          color: #000;
          font-size: 14px;
          border-bottom: 1px solid #f5f5f5;
          .info-th{
            color: #666;
          }
          &.goods{
            border-bottom: 10x solid #f5f5f5;
          }
        }

        .remark-box{
          padding: 20px;
        }
        .operation-button{
          padding: 0 20px 20px;
        }
      }
    }
  }

}
.express-info{
  p{
    border-bottom: 1px solid #f5f5f5;
    padding: 20px;
    span{
      padding-right: 10px;
    }
  }
}

</style>

<style lang="scss">
  .express-dialog{
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
      height: 60vh;
      overflow: hidden;
    }
    .el-dialog__body {
      overflow: auto;
    }

  }
</style>
