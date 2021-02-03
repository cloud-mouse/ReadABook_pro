<template>
  <el-dialog title="申请提现" :visible.sync="value" width="30%" :before-close="beforeClose">
    <el-form ref="form" :model="form" :rules="rules" size="small">
      <el-form-item label="可提现金额">
        <el-input v-model="price" disabled placeholder="请输入内容">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="提现金额" prop="apply">
        <el-input v-model="form.apply" placeholder="请输入内容">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit('form')">确定</el-button>
        <el-button @click="beforeClose">取消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>
</template>

<script>
export default {
  name: '',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    withdrawable: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    var applyMoney = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入提现金额'))
      } else if (value > parseFloat(this.withdrawable)) {
        callback(new Error('超过可提现金额'))
      } else {
        callback()
      }
    }
    return {
      form: {
        apply: ''
      },
      rules: {
        apply: [
          { validator: applyMoney, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    price() {
      return this.withdrawable ? this.withdrawable.toFixed(2) : 0
    }
  },
  watch: {
    value: {
      deep: true,
      handler(newValue, old) {
        if (newValue === false) {
          this.form.apply = ''
        }
      }
    }
  },
  created() {

  },

  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('submit', this.form.apply)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    beforeClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="sass">

</style>
