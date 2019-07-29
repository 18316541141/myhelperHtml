import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import { get, post, regPool, realTimeGet, cancelPool, cancelAllPools, getUpdate, postUpdate } from './utils/http'
import vueCropper from 'vue-cropper'
Vue.use(ElementUI)
Vue.use(vueCropper)
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$regPool = regPool;
Vue.prototype.$realTimeGet = realTimeGet;
Vue.prototype.$cancelPool = cancelPool;
Vue.prototype.$cancelAllPools = cancelAllPools;
Vue.prototype.$getUpdate = getUpdate;
Vue.prototype.$postUpdate = postUpdate;
const store = new Vuex.Store({
  state:{isLogin: true}
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