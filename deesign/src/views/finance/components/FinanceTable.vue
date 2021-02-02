<template>
  <div class="">
    <el-table
      v-loading="loading"
      :data="data"
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
        label="提现金额"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.cash_amount }}元
        </template>
      </el-table-column>
      <el-table-column
        label="结算方式"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.cash_type==1?'手动打款': '线上' }}
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">
            {{ scope.row._status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        prop="created_at"
        label="申请日期"
        align="center"
      />
      <el-table-column
        prop="verify_time"
        label="发放/驳回时间"
        align="center"
      />
      <el-table-column
        prop="remark"
        label="说明"
        align="center"
      />
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status ==3 "
            size="mini"
            @click.native="showPreview(scope.row)"
          >打款证明</el-button>
          <!-- <el-button
              size="mini"
              @click.native="showDialog('edit', scope.row)"
            >编辑</el-button> -->
          <!-- <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.shop_id)"
            >删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 打款证明 -->
    <el-dialog :visible.sync="preview" title="打款证明">
      <img width="100%" :src="certImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'warning',
        2: '',
        3: 'success',
        4: 'success'
      }
      return statusMap[status]
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      preview: false,
      certImageUrl: ''
    }
  },
  created() {

  },

  methods: {
    showDialog(row) {
      this.$emit('showDetail', row)
    },
    showPreview(row) {
      this.preview = true
      this.certImageUrl = row.cert
    }
  }
}
</script>

<style scoped lang="sass">

</style>
