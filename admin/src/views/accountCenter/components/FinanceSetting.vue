<template>
  <div class="">
    <el-form ref="form" :model="form" label-position="left" label-width="100px">
      <div class="form-content-item">
        <div class="block-title"><card-tag tag-name="基本信息" /></div>
        <div class="block-content">
          <el-form-item label="真实姓名">
            <el-input v-model="form.realname" clearable size="small" style="width: 50%" />
          </el-form-item>
          <el-form-item label="手机号(账号)">
            <el-input v-model="form.phone" disabled clearable size="small" style="width: 50%" />
          </el-form-item>
          <el-form-item label="设计师头像">
            <el-upload
              class="uploader"
              :action="`${baseUrl}/design/uploadImg`"
              name="image"
              :data="{'type': 'design'}"
              :headers="{'design_sign': token}"
              :file-list="fileList"
              :with-credentials="true"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="logo">
              <i v-else class="el-icon-plus uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker
              v-model="form.birthday"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>

        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { settingApi } from '@/api/setting'
import CardTag from '@/components/CardTag'
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  name: '',
  components: {
    CardTag
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
      token: getToken(),
      imageUrl: '',
      fileList: [{ name: 'cert', url: '' }],
      form: {
        avator: '',
        realname: '',
        birthday: '',
        designer_phone: '',
        sex: '',
        bank_card_number: '',
        wechat: '',
        alipay: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    // this.getConfig()
    this.form.avatar_url = this.userInfo.avatar_url
    this.imageUrl = this.userInfo.avatar_url
    this.form.designer_name = this.userInfo.designer_name
    this.form.designer_phone = this.userInfo.designer_phone
    this.form.birthday = this.userInfo.birthday
    this.form.sex = this.userInfo.sex
    this.form.bank_card_number = this.userInfo.bank_card_number
    this.form.wechat = this.userInfo.wechat
    this.form.alipay = this.userInfo.alipay
  },

  methods: {
    getConfig() {
      settingApi.getShopConfig().then(res => {
        this.form = res.data
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          settingApi.saveInfo(this.form).then(res => {
            this.$message({
              type: 'success',
              message: res.msg || '保存成功!'
            })
            // 更新用户信息
            store.dispatch('user/getInfo').then(res => {
              this.$store.commit('user/SET_USERINFO', res)
            })
          })
        } else {
          console.log('error submit!!')
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
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 鼠标单击的事件
    onClick(e, editor) {
      console.log('Element clicked')
    }
  }
}
</script>

<style scoped lang="sass">

</style>
