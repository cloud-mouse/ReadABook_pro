<template>
  <div class="wechat-setting">
    <el-tabs type="border-card">
      <el-tab-pane label="账号设置">
        <finance-setting />
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import FinanceSetting from './components/FinanceSetting'
export default {
  components: {
    FinanceSetting
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss">
.wechat-setting{
  padding: 10px;
  .form-content-item{
      margin-bottom: 20px;
      .block-content{
        padding: 10px 30px 20px;
        background: #fff;
        .el-input{
          width: 50%;
        }
      }
    }
}
</style>
