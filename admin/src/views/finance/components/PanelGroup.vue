<template>

  <el-row :gutter="40" class="panel-group">
    <el-row>
      <el-col>
        <span class="data-title">佣金统计</span>
      </el-col>
    </el-row>
    <el-col :xs="12" :sm="8" :lg="4" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-withdrawals">
          <svg-icon icon-class="withdrawals" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            已提现
          </div>
          <count-to :start-val="0" :end-val="panelData.withdrawals_commission" :decimals="2" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="4" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-audit">
          <svg-icon icon-class="audit" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            提现中
          </div>
          <count-to :start-val="0" :end-val="panelData.audit_commission" :decimals="2" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="4" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-withdrawable">
          <svg-icon icon-class="withdrawable" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            可提现
          </div>
          <count-to :start-val="0" :end-val="panelData.withdrawable_commission" :decimals="2" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="4" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-unfinishe">
          <svg-icon icon-class="unfinishe" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            未完成
          </div>
          <count-to :start-val="0" :end-val="panelData.unfinishe_commission" :decimals="2" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="4" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-finished">
          <svg-icon icon-class="finished" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            已完成
          </div>
          <count-to :start-val="0" :end-val="panelData.finished_commission" :decimals="2" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="8" :lg="4" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-total">
          <svg-icon icon-class="total_commission" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            总佣金
          </div>
          <count-to :start-val="0" :end-val="panelData.total_commission" :decimals="2" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  props: {
    panelData: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  background: #fff;
  margin: 0 !important;
  border-radius: 20px !important;
  margin-bottom: 20px !important;
  .data-title{
    padding: 16px;
    font-size: 18px;
    font-weight: bold;
    display: inline-block;
  }
  .card-panel-col {
    margin-bottom: 20px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    border-radius: 20px;

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-withdrawals {
        background: #40c9c6;
        box-shadow: 0px 5px 20px rgba(64, 201, 199, 0.6)
      }

      .icon-audit {
        background: #36a3f7;
        box-shadow: 0px 5px 20px rgba(54, 163, 247, 0.6)
      }

      .icon-money {
        background: #f4516c;
        box-shadow: 0px 5px 20px rgba(244, 81, 108, 0.6);
      }
      .icon-total {
        background: #f4516c;
        box-shadow: 0px 5px 20px rgba(244, 81, 108, 0.6);
      }
      .icon-unfinishe {
        background: #ff9800;
        box-shadow: 0px 5px 20px rgba(255, 152, 0, 0.6);
      }

      .icon-finished {
        background: #67c23a;
        box-shadow: 0px 5px 20px rgba(103, 194, 58, 0.6);
      }

      .icon-withdrawable {
        background: #34bfa3;
        box-shadow: 0px 5px 20px rgba(52, 191, 163, 0.6)
      }
    }

    .icon-withdrawals {
      color: #40c9c6;
    }

    .icon-audit {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }
    .icon-finished {
      color: #67c23a;
    }
    .icon-unfinishe {
      color: #ff9800;
    }

    .icon-total {
      color: #f4516c;
    }
    .icon-withdrawable {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 27px 0 0 10px;
      padding: 8px;
      transition: all 0.38s ease-out;
      border-radius: 10px;
    }

    .card-panel-icon {
      float: left;
      font-size: 36px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
