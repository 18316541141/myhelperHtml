import '@babel/polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import 'animate.css/animate.css'
import './common/css/common.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'viewerjs/dist/viewer.min.css'
import 'webuploader/css/webuploader.css'
import "jcrop/dist/jcrop.css"
import App from './App.vue'
import { openLoading, closeLoading, get, post, regPool, realTimeGet, cancelPool, cancelAllPools, getUpdate, postUpdate } from './common/utils/http'
import vueJcrop from 'vue-jcrop';
import defaultPage from './common/components/defaultPage.vue';
import logEntityList from "./common/menus/system/LogEntityList.vue";
import globalVariableList from "./common/menus/system/GlobalVariableList.vue";
import heartbeatEntityList from "./common/menus/system/HeartbeatEntityList.vue";
import { menuReg, componentReg, directiveReg } from './componentReg.js';
import areaSelect from './common/components/areaSelect.vue';
import treeForm from './common/components/treeForm.vue';
import imgViewer from './common/components/imgViewer.vue';
import pieChart from './common/components/pieChart.vue';
import histogram from './common/components/histogram.vue';
import uploadExcel from './common/components/uploadExcel.vue';
import uploadFiles from './common/components/uploadFiles.vue';
import uploadImage from './common/components/uploadImage.vue';
import UUID from './common/utils/UUID.js'
import Hashes from "jshashes";
import Highcharts from 'highcharts'
import WebUploader from 'webuploader'
import { uploadCallback, typeImgByMime, postOpenWin, validateForm } from './common/utils/common.js'
import Viewer from 'viewerjs'
import veeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN';
import VueI18n from 'vue-i18n';
import $ from 'jquery'
import courierNum from './common/validators/courierNum.js'
import Identity from './common/validators/Identity.js'
import length from './common/validators/length.js'
import mobile from './common/validators/mobile.js'
import must_num from './common/validators/must_num.js'
import phone from './common/validators/phone.js'
import plateNo from './common/validators/plateNo.js'
import rangeLength from './common/validators/rangeLength.js'
import noToChinese from './common/filters/noToChinese.js'
import numToChinese from './common/filters/numToChinese.js'
import numToMoney from './common/filters/numToMoney.js'
import clock from './common/directives/clock.js'
import countDown from './common/directives/countDown.js'
window.$ = $;
window.Viewer = Viewer;
window.uploadCallback = uploadCallback;
window.typeImgByMime = typeImgByMime;
window.postOpenWin = postOpenWin;

//通用插件注册
(function () {
  Vue.use(VueI18n);
  Vue.use(ElementUI);
  Vue.use(vueJcrop);
  // Vue.use(vueCropper);
  Vue.use(Vuex);
  Vue.use(veeValidate, {
    i18n: new VueI18n({
      locale: 'zh_CN',
    }),
    i18nRootKey: 'validation',
    fieldsBagName: 'fieldBags',
    dictionary: { zh_CN }
  });
}());

//自定义指令
(function () {
  directiveReg(Vue);
  //按钮倒数指令，按钮点击后会进入倒数状态（倒数时不能点击），倒数完毕后才可以点击。
  Vue.directive('countDown', countDown);
  //时钟指令，会使得元素的内容变成一个时钟，需要用户传入日期的显示格式，日期的格式规则参考moment.js
  Vue.directive('clock', clock);
}());

//通用组件注册
(function () {
  componentReg(Vue);
  // 默认首页
  Vue.component('default-page', defaultPage)
  // 树表单
  Vue.component('tree-form', treeForm)
  // 省市区镇地区选择器
  Vue.component('area-select', areaSelect)
  // 图片查看器
  Vue.component('img-viewer', imgViewer)
  // 饼状统计图
  Vue.component('pie-chart', pieChart)
  // 柱状统计图
  Vue.component('histogram', histogram)
  // excel上传组件
  Vue.component('upload-excel', uploadExcel)
  // 文件上传组件
  Vue.component('upload-files', uploadFiles)
  // 图片上传组件
  Vue.component('upload-image', uploadImage)
}());

//业务组件注册
(function () {
  menuReg(Vue);
  // 日志菜单组件
  Vue.component('logEntity', logEntityList);
  // 心跳菜单组件
  Vue.component('heartbeatEntity', heartbeatEntityList);
  // 全局变量菜单组件
  Vue.component('globalVariable', globalVariableList);
}());

Vue.config.productionTip = false
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
Vue.prototype.$moment = moment;
// Vue.prototype.$Jcrop=Jcrop;

const store = new Vuex.Store({
  state: {
    isLogin: true, //是否登录
    loadingCount: 0, //等待池中正在加载的请求数
    menus: [], //已打开的菜单列表
    PROXY: process.env.NODE_ENV === 'development' ? '/api' : '', //反向代理匹配的前缀
    username: '' //登录的用户名
  }
});

//自定义过滤器
(function () {
  //编号转中文，例如：123 => 一二三
  Vue.filter('noToChinese', noToChinese);
  //数字转中文，例如：123 => 一百二十三
  Vue.filter('numToChinese', numToChinese);
  //数字转金钱
  Vue.filter('numToMoney', numToMoney);
}());

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  mounted() {
    //自定义基于veeValidate的校验规则
    //字符串必须是数字的限制，must_num 字符串必须是数字
    this.$validator.extend('must_num', must_num);
    //字符长度限制，rangeLength:6,20 字符长度在6-20之间才能通过校验
    this.$validator.extend('rangeLength', rangeLength);
    //字符长度限制，length:32 字符长度只能是32才能通过校验
    this.$validator.extend('length', length);
    //移动电话号码校验，mobile 字符串是移动电话时才能通过校验
    this.$validator.extend('mobile', mobile);
    //固定电话号码校验，phone 字符串是固定电话时才能通过校验
    this.$validator.extend('phone', phone);
    //车牌号码校验，plateNo 字符串时车牌号码才能通过校验
    this.$validator.extend('plateNo', plateNo);
    //身份证校验，Identity 字符是身份证才能通过校验
    this.$validator.extend('Identity', Identity);
    //快递单号校验，courierNum 只有是快递单号才能通过校验
    this.$validator.extend('courierNum', courierNum);
  }
});