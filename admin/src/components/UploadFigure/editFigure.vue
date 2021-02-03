<template>
  <el-dialog center :title="title" :visible.sync="value" width="30%" :before-close="beforeClose">
    <el-form label-width="100px" label-position="left" size="small">
      <el-form-item label="选择文件">
        <el-form-item prop="dst">
          <el-upload
            ref="upload1"
            name="image"
            class="upload-demo"
            :data="{'type': 'design'}"
            :headers="{'design_sign': design_sign}"
            :action="baseUrl+'/design/uploadImg'"
            :on-remove="dstRemove"
            :before-upload="dstChange"
            :on-exceed="handleExceed"
            :file-list="fileList.dstfileList"
            :on-success="dstSuccess"
            :with-credentials="true"
            :limit="1"
          >
            <el-button slot="trigger" size="small" type="primary">选取dst文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item prop="emb">
          <el-upload
            ref="upload2"
            name="image"
            class="upload-demo"
            :data="{'type': 'design'}"
            :headers="{'design_sign': design_sign}"
            :action="baseUrl+'/design/uploadImg'"
            :on-exceed="handleExceed"
            :on-remove="embRemove"
            :before-upload="embchange"
            :file-list="fileList.embfileList"
            :with-credentials="true"
            :on-success="embSuccess"
            :limit="1"
          >
            <el-button slot="trigger" size="small" type="primary">选取emb文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item prop="prev">
          <el-upload
            ref="upload3"
            name="image"
            class="upload-demo"
            :data="{'type': 'design'}"
            :headers="{'design_sign': design_sign}"
            :action="baseUrl+'/design/uploadImg'"
            :on-exceed="handleExceed"
            :on-remove="pngRemove"
            :before-upload="prevChange"
            :file-list="fileList.pngfileList"
            :with-credentials="true"
            :on-success="pngSuccess"
            :limit="1"
            list-type="picture"
          >
            <el-button slot="trigger" size="small" type="primary">选取png预览图</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item prop="txt">
          <el-upload
            ref="upload4"
            name="image"
            class="upload-demo"
            :data="{'type': 'design'}"
            :headers="{'design_sign': design_sign}"
            :action="baseUrl+'/design/uploadImg'"
            :on-exceed="handleExceed"
            :on-remove="txtPngRemove"
            :before-upload="textChnage"
            :file-list="fileList.textfileList"
            :with-credentials="true"
            :on-success="textSuccess"
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
import { getToken } from '@/utils/auth'
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    default: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
      fileList: {
        dstfileList: [],
        embfileList: [],
        pngfileList: [],
        textfileList: []
      },
      design_sign: getToken()
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val === false) {
          this.fileList = {
            dstfileList: [],
            embfileList: [],
            pngfileList: [],
            textfileList: []
          }
        }
      }
    },
    default: {
      handler(val) {
        if (val.design_id) {
          this.fileList.dstfileList.push({
            url: val.dst_path,
            name: val.dst_path
          })
          this.fileList.embfileList.push({
            url: val.emb_path,
            name: val.emb_path
          })
          this.fileList.pngfileList.push({
            url: val.prev_png_path,
            name: val.prev_png_path
          })
          this.fileList.textfileList.push({
            url: val.txt_png_path,
            name: val.txt_png_path
          })
        }
      }
    }
  },
  methods: {
    beforeClose() {
      this.$emit('close')
    },
    dstRemove(file, fileList) {
      this.fileList.dstfileList = []
    },
    embRemove(file, fileList) {
      this.fileList.embfileList = []
    },
    pngRemove(file, fileList) {
      this.fileList.pngfileList = []
    },
    txtPngRemove(file, fileList) {
      this.fileList.textfileList = []
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    dstSuccess(res, file) {
      this.fileList.dstfileList.push({
        url: res.data,
        name: res.data
      })
    },
    embSuccess(res, file) {
      this.fileList.embfileList.push({
        url: res.data,
        name: res.data
      })
    }, pngSuccess(res, file) {
      this.fileList.pngfileList.push({
        url: res.data,
        name: res.data
      })
    }, textSuccess(res, file) {
      this.fileList.textfileList.push({
        url: res.data,
        name: res.data
      })
    },
    // dst文件选择
    dstChange(file, fileList) {
      const isTrue = getSub(file.name) === 'dst' || getSub(file.name) === 'DST'
      if (!isTrue) {
        this.$message.error('上传文件只能是 DST 格式!')
      }
      return isTrue
    },
    // emb文件选择
    embchange(file, fileList) {
      const isTrue = getSub(file.name) === 'emb' || getSub(file.name) === 'EMB'
      if (!isTrue) {
        this.$message.error('上传文件只能是 EMB 格式!')
      }
      return isTrue
    },
    // png文件选择
    prevChange(file, fileList) {
      const isPNG = file.type === 'image/png'
      if (!isPNG) {
        this.$message.error('上传头像图片只能是 PNG 格式!')
      }
      return isPNG
    },
    // png文件选择
    textChnage(file, fileList) {
      const isPNG = file.type === 'image/png'
      if (!isPNG) {
        this.$message.error('上传头像图片只能是 PNG 格式!')
      }
      return isPNG
    },
    onSubmit() {
      this.$emit('submit', this.fileList)
    }
  }
}
</script>

<style>

</style>
