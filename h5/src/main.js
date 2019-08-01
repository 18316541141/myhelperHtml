import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'viewerjs/dist/viewer.min.css'
import 'webuploader/css/webuploader.css'
import App from './App.vue'
import {openLoading, closeLoading, get, post, regPool, realTimeGet, cancelPool, cancelAllPools, getUpdate, postUpdate } from './utils/http'
import vueCropper from 'vue-cropper'
import defaultPage from './components/defaultPage.vue';
import m15 from "./menus/testMenus1/areaSelect.vue";
import m312 from "./menus/testMenus1/charts.vue";
import m12 from "./menus/testMenus1/uploadImage.vue";
import m14 from "./menus/testMenus1/uploadFiles.vue";
import m17 from "./menus/testMenus1/pageTable.vue";
import m101 from "./menus/testMenus1/aaa-treeForm.vue";
import m13 from "./menus/testMenus1/bigPic.vue";
import m18 from "./menus/testMenus1/uexcel.vue";
import n11 from "./menus/testMenus1/testnewalarm.vue";
import areaSelect from './components/areaSelect.vue';
import treeForm from './components/treeForm.vue';
import imgViewer from './components/imgViewer.vue';
import pieChart from './components/pieChart.vue';
import histogram from './components/histogram.vue';
import uploadExcel from './components/uploadExcel.vue';
import uploadFiles from './components/uploadFiles.vue';
import uploadImage from './components/uploadImage.vue';
import UUID from './utils/UUID.js'
import Hashes from "jshashes";
import Highcharts from 'highcharts'
import WebUploader from 'webuploader'
import {uploadCallback,typeImgByMime,postOpenWin,validateForm} from './utils/common.js'
import Viewer from 'viewerjs'
import veeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN';
import VueI18n from 'vue-i18n';

window.Viewer=Viewer;
window.uploadCallback=uploadCallback;
window.typeImgByMime=typeImgByMime;
window.postOpenWin=postOpenWin;

//通用插件注册
(function(){
  Vue.use(VueI18n);
  Vue.use(ElementUI);
  Vue.use(vueCropper);
  Vue.use(Vuex);
  Vue.use(veeValidate,{
    i18n:new VueI18n({
      locale: 'zh_CN',
    }),
    i18nRootKey: 'validation',
    fieldsBagName: 'fieldBags',
    dictionary: {zh_CN}
  });
}());

//通用组件注册
(function(){
  Vue.component('default-page', defaultPage)
  Vue.component('tree-form', treeForm)
  Vue.component('area-select', areaSelect)
  Vue.component('img-viewer', imgViewer)
  Vue.component('pie-chart', pieChart)
  Vue.component('histogram', histogram)
  Vue.component('default-page', defaultPage)
  Vue.component('upload-excel', uploadExcel)
  Vue.component('upload-files', uploadFiles)
  Vue.component('upload-image', uploadImage)
}());

//业务组件注册
(function(){
  Vue.component('m15', m15)
  Vue.component('m312', m312)
  Vue.component('m12', m12)
  Vue.component('m14', m14)
  Vue.component('m17', m17)
  Vue.component('m101', m101)
  Vue.component('m13', m13)
  Vue.component('m18', m18)
  Vue.component('n11', n11)
}());

Vue.config.productionTip = false
Vue.prototype.$UUID=function(){
  return new UUID().id;
}
Vue.prototype.$openLoading=openLoading;
Vue.prototype.$closeLoading=closeLoading;
Vue.prototype.$WebUploader=WebUploader;
Vue.prototype.$Highcharts=Highcharts;
Vue.prototype.$Hashes=Hashes;
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$regPool = regPool;
Vue.prototype.$realTimeGet = realTimeGet;
Vue.prototype.$cancelPool = cancelPool;
Vue.prototype.$cancelAllPools = cancelAllPools;
Vue.prototype.$getUpdate = getUpdate;
Vue.prototype.$postUpdate = postUpdate;
Vue.prototype.$validateForm=validateForm

const store = new Vuex.Store({
  state:{isLogin: true,loadingCount:0}
});
new Vue({
  el:'#app',
  store,
  render: h=>h(App)
});

//异步加载静态图片素材
(function () {
  var images = [
  //256x256的图标
  "/images/256x256/accdb-256.png",
  "/images/256x256/avi-256.png",
  "/images/256x256/bmp-256.png",
  "/images/256x256/css-256.png",
  "/images/256x256/docx-256.png",
  "/images/256x256/eml-256.png",
  "/images/256x256/eps-256.png",
  "/images/256x256/fla-256.png",
  "/images/256x256/gif-256.png",
  "/images/256x256/html-256.png",
  "/images/256x256/ind-256.png",
  "/images/256x256/ini-256.png",
  "/images/256x256/jpeg-256.png",
  "/images/256x256/jsf-256.png",
  "/images/256x256/mdi-256.png",
  "/images/256x256/mov-256.png",
  "/images/256x256/mp3-256.png",
  "/images/256x256/mpeg-256.png",
  "/images/256x256/pdf-256.png",
  "/images/256x256/png-256.png",
  "/images/256x256/pptx-256.png",
  "/images/256x256/proj-256.png",
  "/images/256x256/psd-256.png",
  "/images/256x256/pst-256.png",
  "/images/256x256/pub-256.png",
  "/images/256x256/rar-256.png",
  "/images/256x256/read-256.png",
  "/images/256x256/set-256.png",
  "/images/256x256/tiff-256.png",
  "/images/256x256/txt-256.png",
  "/images/256x256/url-256.png",
  "/images/256x256/vsd-256.png",
  "/images/256x256/wav-256.png",
  "/images/256x256/wma-256.png",
  "/images/256x256/wmv-256.png",
  "/images/256x256/xlsx-256.png",
  "/images/256x256/zip-256.png"
  ];
  for (var i = 0, len = images.length; i < len; i++) {
      new Image().src = images[i];
  }
}());