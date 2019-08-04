import Vue from 'vue'
import Vuex from 'vuex'
import 'animate.css/animate.css'
import App from './App.vue'
import Login from './Login.vue'
import Vant from 'vant';
import axios from 'axios';
import VueRouter from 'vue-router'
import 'vant/lib/index.css';
import { uploadCallback, typeImgByMime, postOpenWin, validateForm } from './utils/common.js'
import { openLoading, closeLoading, get, post, regPool, realTimeGet, cancelPool, cancelAllPools, getUpdate, postUpdate } from './utils/http'
import veeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN';
import UUID from './utils/UUID.js'
import Hashes from "jshashes";
import VueI18n from 'vue-i18n';

Vue.config.productionTip = false;
Vue.prototype.$UUID = function () {
  return new UUID().id;
}
Vue.prototype.$openLoading = openLoading;
Vue.prototype.$closeLoading = closeLoading;
Vue.prototype.$WebUploader = WebUploader;
Vue.prototype.$Highcharts = Highcharts;
Vue.prototype.$Hashes = Hashes;
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$regPool = regPool;
Vue.prototype.$realTimeGet = realTimeGet;
Vue.prototype.$cancelPool = cancelPool;
Vue.prototype.$cancelAllPools = cancelAllPools;
Vue.prototype.$getUpdate = getUpdate;
Vue.prototype.$postUpdate = postUpdate;
Vue.prototype.$validateForm = validateForm;

const store = new Vuex.Store({
  state: { isLogin: true, loadingCount: 0, menus: [] }
});

Vue.use(Vant);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(veeValidate, {
  i18n: new VueI18n({
    locale: 'zh_CN',
  }),
  i18nRootKey: 'validation',
  fieldsBagName: 'fieldBags',
  dictionary: { zh_CN }
});

Vue.prototype.$post = post;
Vue.prototype.$get = get;

const routes = [
  { path: '/Login', component: Login },
]


new Vue({
  el:'#app',
  render: h => h(App),
  routes,
  store
});
