import Vue from 'vue'
import Vuex from 'vuex'
import 'animate.css/animate.css'
import App from './App.vue'
import Login from './Login.vue'
import Index from './Index.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import VueRouter from 'vue-router'
import { uploadCallback, typeImgByMime, postOpenWin, validateForm } from './utils/common.js'
import {upload, openLoading, closeLoading, get, post, regPool, realTimeGet, cancelPool, cancelAllPools, getUpdate, postUpdate } from './utils/http'
import veeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN';
import UUID from './utils/UUID.js'
import Hashes from "jshashes";
import VueI18n from 'vue-i18n';
import WebUploader from 'webuploader';
import Highcharts from 'highcharts'
import commonOutFrame from './components/outerFrame/commonOutFrame.vue'
import commonInput from './components/input/commonInput.vue'
import uploadImg from './components/upload/uploadImg.vue'
import moment from 'moment'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(Vuex);
Vue.use(Vant);
Vue.use(VueRouter);
// Vue.use(cropperjs);
Vue.use(veeValidate, {
  i18n: new VueI18n({
    locale: 'zh_CN',
  }),
  i18nRootKey: 'validation',
  fieldsBagName: 'fieldBags',
  dictionary: { zh_CN }
});

Vue.component('commonOutFrame',commonOutFrame);
Vue.component('commonInput',commonInput);
Vue.component('uploadImg',uploadImg);


Vue.prototype.$UUID = function () {
  return new UUID().id;
}

//使用了微信api的url列表，需要手动配置
Vue.prototype.$useWxApiUrls = [

];
Vue.prototype.$Cropper = Cropper;
Vue.prototype.$moment = moment;
Vue.prototype.$openLoading = openLoading;
Vue.prototype.$closeLoading = closeLoading;
Vue.prototype.$WebUploader = WebUploader;
Vue.prototype.$Highcharts = Highcharts;
Vue.prototype.$Hashes = Hashes;
Vue.prototype.$upload = upload;
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


const routes = [
  { path: '/Login', component: Login },
  { path: '/Index', component: Index },
]

const router = new VueRouter({
  routes 
});


new Vue({
  el:'#app',
  render: h => h(App),
  router,
  store
});