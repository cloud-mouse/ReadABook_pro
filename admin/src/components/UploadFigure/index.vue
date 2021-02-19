<template>
  <el-dialog center :title="title" :visible.sync="value" width="30%" :before-close="beforeClose">
    <el-form label-width="100px" label-position="left" size="small">
      <el-form-item label="选择文件">
        <el-form-item prop="dst">
          <el-upload
            ref="upload1"
            name="dst"
            class="upload-demo"
            action
            :on-remove="handleRemove"
            :on-change="dstChange"
            multiple
            :auto-upload="false"
            :with-credentials="true"
            :limit="1"
          >
            <el-button slot="trigger" size="small" type="primary">选取dst文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item prop="emb">
          <el-upload
            ref="upload2"
            name="emb"
            class="upload-demo"
            action
            :on-remove="handleRemove"
            :on-change="embchange"
            multiple
            :auto-upload="false"
            :with-credentials="true"
            :limit="1"
          >
            <el-button slot="trigger" size="small" type="primary">选取emb文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item prop="prev">
          <el-upload
            ref="upload3"
            name="prev_png"
            class="upload-demo"
            action
            :on-remove="handleRemove"
            :on-change="prevChange"
            multiple
            :auto-upload="false"
            :with-credentials="true"
            :limit="1"
            list-type="picture"
          >
            <el-button slot="trigger" size="small" type="primary">选取png预览图</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item prop="txt">
          <el-upload
            ref="upload4"
            name="txt_png"
            class="upload-demo"
            action
            :on-remove="handleRemove"
            :on-change="textChnage"
            multiple
            :auto-upload="false"
            :with-credentials="true"
            :limit="1"
            list-type="picture"
          >
            <el-button slot="trigger" size="small" type="primary">选取工艺单png图</el-button>
          </el-upload>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="beforeClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getSub } from '@/utils'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fileList: {
        dst: {},
        emb: {},
        prev_png: {},
        txt_png: {}
      }
    }
  },
  watch: {
    value(val) {
      if (val === false) {
        this.fileList = {
          dst: {},
          emb: {},
          prev_png: {},
          txt_png: {}
        }
      }
    }
  },
  methods: {
    beforeClose() {
      this.$emit('close')
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // dst文件选择
    dstChange(file, fileList) {
      const isTrue = getSub(file.name) === 'dst' || getSub(file.name) === 'DST'
      if (!isTrue) {
        this.$message.error('上传文件只能是 DST 格式!')
        fileList.pop()
        return false
      }
      const existFile = this.fileList.dst.name === file.name
      if (existFile) {
        this.$message.error('当前文件已经存在!')
        fileList.pop()
        return false
      }
      this.fileList.dst = file
    },
    // emb文件选择
    embchange(file, fileList) {
      const isTrue = getSub(file.name) === 'emb' || getSub(file.name) === 'EMB'
      if (!isTrue) {
        this.$message.error('上传文件只能是 EMB 格式!')
        fileList.pop()
        return false
      }
      const existFile = this.fileList.emb.name === file.name
      if (existFile) {
        this.$message.error('当前文件已经存在!')
        fileList.pop()
        return false
      }
      this.fileList.emb = file
    },
    // png文件选择
    prevChange(file, fileList) {
      const isJPG = file.raw.type === 'image/png'
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 PNG 格式!')
        fileList.pop()
        return false
      }
      const existFile = this.fileList.prev_png.name === file.name
      if (existFile) {
        this.$message.error('当前文件已经存在!')
        fileList.pop()
        return false
      }
      this.fileList.prev_png = file
    },
    // png文件选择
    textChnage(file, fileList) {
      const isJPG = file.raw.type === 'image/png'
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 PNG 格式!')
        fileList.pop()
      }
      const existFile = this.fileList.txt_png.name === file.name
      if (existFile) {
        this.$message.error('当前文件已经存在!')
        fileList.pop()
        return false
      }
      this.fileList.txt_png = file
    },
    onSubmit() {
      this.$emit('submit', this.fileList)
    }
  }
}
</script>

<style>

</style>
