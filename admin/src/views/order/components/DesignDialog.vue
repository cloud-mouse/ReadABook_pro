<template>
  <el-dialog :visible.sync="value" width="30%" title="定制信息" :before-close="beforeClose">
    <el-form label-position="left" size="small">
      <el-form-item label="预览图">
        <img :src="infoItem.preview_image" width="100" alt="">
        <el-button
          size="mini"
          type="text"
          @click="downloadCodeImg(infoItem.preview_image,`${infoItem.order_id}-预览图`)"
        >下载</el-button>
      </el-form-item>
      <el-form-item v-if="infoItem.design" label="花样图片">
        <img :src="infoItem.design.prev_png_path" width="100" alt="">
        <el-button
          size="mini"
          type="text"
          @click="downloadCodeImg(infoItem.design.prev_png_path, `${infoItem.order_id}-花样图片`)"
        >下载</el-button>
      </el-form-item>
      <el-form-item v-if="infoItem.design_area_image" label="设计图片">
        <img :src="infoItem.design_area_image" width="100" alt="">
        <el-button
          size="mini"
          type="text"
          @click="downloadCodeImg(infoItem.design_area_image, `${infoItem.order_id}-设计图片`)"
        >下载</el-button>
      </el-form-item>
      <el-form-item v-if="infoItem.custom_image" label="自定义图片">
        <img :src="infoItem.custom_image" width="100" alt="">
        <el-button
          size="mini"
          type="text"
          @click="downloadCodeImg(infoItem.custom_image, `${infoItem.order_id}-自定义图片`)"
        >下载</el-button>
      </el-form-item>

      <el-form-item v-if="infoItem.design" label="花样价格" style="display: inline-block;width: 48%">
        <el-input v-model="infoItem.design.price" disabled>
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="infoItem.font_family" label="字体" style="display: inline-block;width: 48%">
        <el-input v-model="infoItem.font_family" disabled />
      </el-form-item>
      <el-form-item v-if="infoItem.top_font_content" label="顶部文字" style="display: inline-block;width: 48%">
        <el-input v-model="infoItem.top_font_content" disabled />
      </el-form-item>
      <el-form-item v-if="infoItem.bottom_font_content" label="底部文字" style="display: inline-block;width: 48%">
        <el-input v-model="infoItem.bottom_font_content" disabled />
      </el-form-item>
      <el-form-item v-if="infoItem.top_font_color" label="顶部文字颜色" style="display: inline-block;width: 48%">
        <el-input v-model="infoItem.top_font_color" disabled />
      </el-form-item>
      <el-form-item v-if="infoItem.bottom_font_color" label="底部文字颜色" style="display: inline-block;width: 48%">
        <el-input v-model="infoItem.bottom_font_color" disabled />
      </el-form-item>
      <el-form-item v-if="infoItem.top_font_size" label="顶部文字高度" style="display: inline-block;width: 48%">
        <el-input v-model="infoItem.top_font_size" disabled>
          <template slot="append">mm</template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="infoItem.bottom_font_size" label="底部文字高度" style="display: inline-block;width: 48%">
        <el-input v-model="infoItem.bottom_font_size" disabled>
          <template slot="append">mm</template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="infoItem.design_width" label="设计宽度" style="display: inline-block;width: 48%">
        <el-input v-model="infoItem.design_width" disabled>
          <template slot="append">mm</template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="infoItem.design_height" label="设计高度" style="display: inline-block;width: 48%">
        <el-input v-model="infoItem.design_height" disabled>
          <template slot="append">mm</template>
        </el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    infoItem: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API
    }
  },
  methods: {
    beforeClose() {
      this.$emit('close')
    },
    downloadCodeImg(imgsrc, name) {
      window.location.href = `${this.baseUrl}/design/downLoad?url=${imgsrc}&fileName=${name}`
    }
  }
}
</script>

<style>

</style>
