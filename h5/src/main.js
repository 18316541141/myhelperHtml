import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import { get, post } from './utils/http'
import vueCropper from 'vue-cropper'
Vue.use(ElementUI)
Vue.use(vueCropper)
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$post = post;
Vue.prototype.$get = get;
const store = new Vuex.Store({
  state:{isLogin: true}
});
new Vue({
  el:'#app',
  store,
  render: h=>h(App)
});