import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import { get, post } from './utils/http'
import vueCropper from 'vue-cropper'
Vue.use(ElementUI)
Vue.use(vueCropper)
Vue.config.productionTip = false
Vue.prototype.$post = post;
Vue.prototype.$get = get;

new Vue({
  el:'#app',
  render: h=>h(App)
});