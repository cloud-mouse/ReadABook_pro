<template>
  <div class="finance-list main-content">
    <div class="finance-statistics">
      <panel-group :panel-data="panelData" />
    </div>
    <div class="screen-box">
      <div class="screen-item">

        <el-select v-model="status" clearable size="small" placeholder="提现状态">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button size="small" icon="el-icon-search" type="primary" @click.native="fetchData">查询</el-button>
      </div>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-s-finance"
        @click="showApply = true"
      >申请提现</el-button>
    </div>
    <div class="content">
      <Finance-Table :data="financeList" :loading="loading" @showDetail="showDialog" />
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
    <!-- 申请提现 -->
    <finance-apply
      v-model="showApply"
      :withdrawable="panelData.withdrawable_commission"
      @submit="submitApply"
      @close="showApply = false"
    />
  </div>
</template>

<script>
import { financeApi } from '@/api/finance'
import PanelGroup from './components/PanelGroup'
import FinanceTable from './components/FinanceTable'
import FinanceApply from './components/FinanceApply'
export default {
  components: {
    PanelGroup,
    FinanceTable,
    FinanceApply
  },

  data() {
    return {
      panelData: {},
      financeList: [],
      statusOptions: [
        { label: '提现中', value: 1 },
        { label: '已驳回', value: 2 },
        { label: '已提现', value: 3 }
      ],
      status: '',
      loading: false,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      showApply: false
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {

  },
  methods: {
    fetchData() {
      financeApi.getCommission().then(res => {
        this.panelData = res.data
      })
      // 请求列表
      financeApi.getCashList({
        status: this.status,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.financeList = res.data.data
        this.total = res.data.count
      })
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
    // 显示提现弹框
    showDialog(row) {
      this.rowItem = row
      this.itemDialog = true
    },
    // 提交提现
    submitApply(value) {
      financeApi.withdrawal({
        cash_amount: value
      }).then(res => {
        this.$message({
          type: 'success',
          message: res.msg
        })
        this.showApply = false
        this.fetchData()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.finance-list{
  .screen-box{
    .screen-item{
      text-align: left;
      display: inline-block;
    }
  }
  .finance-statistics{
    background: #fff;
    position: relative;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    border-radius: 5px;
    margin-bottom: 10px;
  }
}
</style>
