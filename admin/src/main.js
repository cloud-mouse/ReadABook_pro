import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import JsonViewer from 'vue-json-viewer'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)
Vue.use(JsonViewer)

Vue.config.productionTip = false
// 全局图片上传地址
Vue.mixin({
  computed: {
    uploadUrl() {
      return `${process.env.VUE_APP_BASE_API}/admin-api/file/uploadOss`
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
