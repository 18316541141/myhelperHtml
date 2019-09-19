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
import { openLoading, closeLoading, get, post, regPool, realTimeGet, cancelPool, cancelAllPools, getUpdate, postUpdate } from './utils/http'
import vueJcrop from 'vue-jcrop';
import defaultPage from './components/defaultPage.vue';
import logEntityList from "./common/menus/system/LogEntityList.vue";
import heartbeatEntityList from "./common/menus/system/HeartbeatEntityList.vue";
import { menuReg, componentReg, directiveReg } from './componentReg.js';
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
import { uploadCallback, typeImgByMime, postOpenWin, validateForm } from './utils/common.js'
import Viewer from 'viewerjs'
import veeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN';
import VueI18n from 'vue-i18n';
import $ from 'jquery'

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
  Vue.directive('countDown', {
    inserted(el, binding) {
      el.addEventListener("click", function () {
        var seconds = parseInt(binding.value);
        var beforeText = el.innerText;
        this.setAttribute('disabled', true);
        this.innerText = seconds;
        var interval = setInterval(function () {
          if (seconds > 0) {
            el.innerText = --seconds;
          }
        }, 1000);
        setTimeout(function () {
          clearInterval(interval);
          el.innerText = beforeText;
          el.setAttribute('disabled', false);
        }, seconds * 1000);
      }, false);
    }
  });
  //时钟指令，会使得元素的内容变成一个时钟，需要用户传入日期的显示格式，日期的格式规则参考moment.js
  Vue.directive('clock', {
    inserted(el, binding) {
      el.innerText = moment().format(binding.value);
      setInterval(function () {
        el.innerText = moment().format(binding.value);
      }, 1000);
    }
  });
}());

//通用组件注册
(function () {
  componentReg(Vue);
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
(function () {
  menuReg(Vue);
  Vue.component('logEntity', logEntityList);
  Vue.component('heartbeatEntity', heartbeatEntityList);
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
  state: { isLogin: true, loadingCount: 0, menus: [] }
});

(function () {
  /**
   * 输入框值必然会转化为数字,
   * @param {*} value 输入框的值
   * @param {*} min 数字最小值限制
   * @param {*} max 数字最大值限制
   * @param {*} fixed 保留小数位
   */
  Vue.filter('mustNum', function (value, min, max, fixed) {
    if (value === "" || value === null || value === undefined) {
      return value;
    } else {
      if (isNaN(value)) {
        return Math.max(0, min);
      } else {
        var num = parseFloat(value);
        if (num < min) {
          return min;
        } else if (num >= max) {
          return max;
        } else if (num.toFixed(fixed) < num) {
          return num.toFixed(fixed);
        } else {
          return value;
        }
      }
    }
  });

  /**
   * 输入框值必然不能超过特定长度
   * @param {*} val 输入框的值
   * @param {*} maxLen 输入框值的最大长度
   */
  Vue.filter('lenLessThan', function (value, maxLen) {
    if (value !== null && value !== undefined && value !== '') {
      value += '';
      if (value.length > maxLen) {
        return value.substring(0, maxLen);
      }
    }
    return value;
  });
}());


new Vue({
  el: '#app',
  store,
  render: h => h(App),
  mounted() {
    //自定义基于veeValidate的校验规则
    //字符长度限制，rangeLength:6,20 字符长度在6-20之间才能通过校验
    this.$validator.extend('rangeLength', {
      validate(value, params) {
        return value === null || value === '' || value.length >= parseInt(params[0]) && value.length <= parseInt(params[1]);
      }
    });
    //字符长度限制，length:32 字符长度只能是32才能通过校验
    this.$validator.extend('length', {
      validate(value, params) {
        return value === null || value === '' || value.length == parseInt(params[0]);
      }
    });
    //移动电话号码校验，mobile 字符串是移动电话时才能通过校验
    this.$validator.extend('mobile', {
      validate(value) {
        return value === null || value === '' || /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[1-9])[0-9]{8}$/.test(value);
      }
    });
    //固定电话号码校验，phone 字符串是固定电话时才能通过校验
    this.$validator.extend('phone', {
      validate(value) {
        return value === null || value === '' || /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)/.test(value);
      }
    });
    //车牌号码校验，plateNo 字符串时车牌号码才能通过校验
    this.$validator.extend('plateNo', {
      validate(value) {
        return value === null || value === '' || /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A - Z](([0 - 9]{ 5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/.test(value);
      }
    });
    //身份证校验，Identity 字符是身份证才能通过校验
    this.$validator.extend('Identity', {
      validate(value) {
        if (value === null || value === '') {
          return true;
        }
        //身份证号合法性验证
        //支持15位和18位身份证号
        //支持地址编码、出生日期、校验位验证
        var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
        var ret = true;
        if (!value || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(value)) {
          ret = false;
        } else if (!city[value.substr(0, 2)]) {
          ret = false;
        } else {
          //18位身份证需要验证最后一位校验位
          if (value.length == 18) {
            value = value.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
              ai = value[i];
              wi = factor[i];
              sum += ai * wi;
            }
            if (parity[sum % 11] != value[17].toUpperCase()) {
              ret = false;
            }
          }
        }
        return ret;
      }
    });
    //快递单号校验，courierNum 只有是快递单号才能通过校验
    this.$validator.extend('courierNum', {
      validate(value) {
        if (value === null || value === '') {
          return true;
        }
        //各大快递公司的单号正则规则
        var checkObj = [{
          "code": "ZJS",
          "id": "103",
          "name": "宅急送",
          "reg_mail_no": "^[a-zA-Z0-9]{10}$|^(42|16)[0-9]{8}$|^A[0-9]{12}"
        },
        {
          "code": "SF",
          "id": "505",
          "name": "顺丰速运",
          "reg_mail_no": "^[A-Za-z0-9-]{4,35}$"
        },
        {
          "code": "STO",
          "id": "100",
          "name": "申通快递",
          "reg_mail_no": "^(888|588|688|468|568|668|768|868|968)[0-9]{9}$|^(11|22)[0-9]{10}$|^(STO)[0-9]{10}$|^(37|33|11|22|44|55|66|77|88|99)[0-9]{11}$|^(4)[0-9]{11}$"
        },
        {
          "code": "EMS",
          "id": "2",
          "name": "EMS",
          "reg_mail_no": "^[A-Z]{2}[0-9]{9}[A-Z]{2}$|^(10|11)[0-9]{11}$|^(50|51)[0-9]{11}$|^(95|97)[0-9]{11}$"
        },
        {
          "code": "YUNDA",
          "id": "102",
          "name": "韵达快递",
          "reg_mail_no": "^(10|11|12|13|14|15|16|17|19|18|50|55|58|80|88|66|31|77|39)[0-9]{11}$|^[0-9]{13}$"
        },
        {
          "code": "ZTO",
          "id": "500",
          "name": "中通快递",
          "reg_mail_no": "^((768|765|778|828|618|680|518|528|688|010|880|660|805|988|628|205|717|718|728|761|762|763|701|757|719|751|358|100|200|118|128|689|738|359|779|852)[0-9]{9})$|^((5711|2008|7380|1180|2009|2013|2010|1000|1010)[0-9]{8})$|^((8010|8021|8831|8013)[0-9]{6})$|^((1111|90|36|11|50|53|37|39|91|93|94|95|96|98)[0-9]{10})$|^((a|b|h)[0-9]{13})$|^((90|80|60)[0-9]{7})$|^((80|81)[0-9]{6})$|^((21|23|24|25|93|94|95|96|97|110|111|112|113|114|115|116|117|118|119|121|122|123|124|125|126|127|128|129|130|131)[0-9]{8})$|^(100|101|102|103|104|105|106|107|503|504|505|506|507)[0-9]{10}$|^(4)[0-9]{11}$|^(120)[0-9]{9}$|^(780)[0-9]{9}$|^(881)[0-9]{9}$|^(882|885)[0-9]{9}$|^(91|92)[0-9]{10}$|^(54|55|56)[0-9]{10}$|^(63)[0-9]{10}$|^(7)[0-9]{9}$|^(64)[0-9]{10}$|^(72)[0-9]{10}$|^(220|221|223|224|225|226|227|228|229)[0-9]{7}$|^(21|22|23|24|25|26|27|28|29)[0-9]{10}$|^3[0-9]{9}$|^2710[0-9]{11}$|^731[0-9]{11}$|^751[0-9]{11}$|^7320[0-9]{10}$"
        },
        {
          "code": "HTKY",
          "id": "502",
          "name": "百世快递",
          "reg_mail_no": "^((A|B|D|E)[0-9]{12})$|^(BXA[0-9]{10})$|^(K8[0-9]{11})$|^(02[0-9]{11})$|^(000[0-9]{10})$|^(C0000[0-9]{8})$|^((21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|61|63)[0-9]{10})$|^((50|51)[0-9]{12})$|^7[0-9]{13}$|^6[0-9]{13}$|^58[0-9]{14}$"
        },
        {
          "code": "YTO",
          "id": "101",
          "name": "圆通速递",
          "reg_mail_no": "^[A-Za-z0-9]{2}[0-9]{10}$|^[A-Za-z0-9]{2}[0-9]{8}$|^[6-9][0-9]{17}$|^[DD]{2}[8-9][0-9]{15}$|^[Y][0-9]{12}$"
        },
        {
          "code": "QFKD",
          "id": "1216",
          "name": "全峰快递",
          "reg_mail_no": "^[0-6|9][0-9]{11}$|^[7][0-8][0-9]{10}$|^[0-9]{15}$|^[S][0-9]{9,11}(-|)P[0-9]{1,2}$|^[0-9]{13}$|^[8][0,2-9][0,2-9][0-9]{9}$|^[8][1][0,2-9][0-9]{9}$|^[8][0,2-9][0-9]{10}$|^[8][1][1][0][8][9][0-9]{6}$"
        },
        {
          "code": "TTKDEX",
          "id": "504",
          "name": "天天快递",
          "reg_mail_no": "^[0-9]{12}$"
        },
        {
          "code": "EYB",
          "id": "3",
          "name": "EMS经济快递",
          "reg_mail_no": "^[A-Z]{2}[0-9]{9}[A-Z]{2}$|^(10|11)[0-9]{11}$|^(50|51)[0-9]{11}$|^(95|97)[0-9]{11}$"
        },
        {
          "code": "UC",
          "id": "1207",
          "name": "优速快递",
          "reg_mail_no": "^VIP[0-9]{9}|V[0-9]{11}|[0-9]{12}$|^LBX[0-9]{15}-[2-9AZ]{1}-[1-9A-Z]{1}$|^(9001)[0-9]{8}$"
        },
        {
          "code": "DBKD",
          "id": "5000000110730",
          "name": "德邦快递",
          "reg_mail_no": "^[5789]\\d{9}$"
        },
        {
          "code": "GTO",
          "id": "200143",
          "name": "国通快递",
          "reg_mail_no": "^(3(([0-6]|[8-9])\\d{8})|((2|4|5|6)\\d{9})|(7(?![0|1|2|3|4|5|7|8|9])\\d{9})|(8(?![2-9])\\d{9})|(2|4)\\d{11})$"
        },
        {
          "code": "SURE",
          "id": "201174",
          "name": "速尔快递",
          "reg_mail_no": "^(SUR)[0-9]{12}$|^[0-9]{12}$"
        },
        {
          "code": "FEDEX",
          "id": "106",
          "name": "联邦快递",
          "reg_mail_no": "^[0-9]{12}$"
        },
        {
          "code": "SHQ",
          "id": "108",
          "name": "华强物流",
          "reg_mail_no": "^[A-Za-z0-9]*[0|2|4|6|8]$"
        },
        {
          "code": "UAPEX",
          "id": "1259",
          "name": "全一快递",
          "reg_mail_no": "^\\d{12}|\\d{11}$"
        },
        {
          "code": "HOAU",
          "id": "1191",
          "name": "天地华宇",
          "reg_mail_no": "^[A-Za-z0-9]{8,9}$"
        },
        {
          "code": "BEST",
          "id": "105",
          "name": "百世物流",
          "reg_mail_no": "^[0-9]{11,12}$"
        },
        {
          "code": "LB",
          "id": "1195",
          "name": "龙邦速递",
          "reg_mail_no": "^[0-9]{12}$|^LBX[0-9]{15}-[2-9AZ]{1}-[1-9A-Z]{1}$|^[0-9]{15}$|^[0-9]{15}-[1-9A-Z]{1}-[1-9A-Z]{1}$"
        },
        {
          "code": "XB",
          "id": "1186",
          "name": "新邦物流",
          "reg_mail_no": "^[0-9]{8}$|^[0-9]{10}$"
        },
        {
          "code": "FAST",
          "id": "1204",
          "name": "快捷快递",
          "reg_mail_no": "^(?!440)(?!510)(?!520)(?!5231)([0-9]{9,13})$|^(P330[0-9]{8})$|^(D[0-9]{11})$|^(319)[0-9]{11}$|^(56)[0-9]{10}$|^(536)[0-9]{9}$"
        },
        {
          "code": "POSTB",
          "id": "200734",
          "name": "邮政快递包裹",
          "reg_mail_no": "^([GA]|[KQ]|[PH]){2}[0-9]{9}([2-5][0-9]|[1][1-9]|[6][0-5])$|^[99]{2}[0-9]{11}$|^[96]{2}[0-9]{11}$|^[98]{2}[0-9]{11}$"
        },
        {
          "code": "NEDA",
          "id": "1192",
          "name": "能达速递",
          "reg_mail_no": "^((88|)[0-9]{10})$|^((1|2|3|5|)[0-9]{9})$|^(90000[0-9]{7})$"
        },
        {
          "code": "BJRFD-001",
          "id": "100034107",
          "name": "如风达配送",
          "reg_mail_no": "^[\\x21-\\x7e]{1,100}$"
        },
        {
          "code": "DBL",
          "id": "107",
          "name": "德邦物流",
          "reg_mail_no": "^[5789]\\d{9}$"
        },
        {
          "code": "YCT",
          "id": "1185",
          "name": "黑猫宅急便",
          "reg_mail_no": "^[0-9]{12}$"
        },
        {
          "code": "LTS",
          "id": "1214",
          "name": "联昊通",
          "reg_mail_no": "^[0-9]{9,12}$"
        },
        {
          "code": "CNEX",
          "id": "1056",
          "name": "佳吉快递",
          "reg_mail_no": "^[7,1,9][0-9]{9}$"
        },
        {
          "code": "HZABC",
          "id": "1121",
          "name": "飞远(爱彼西)配送",
          "reg_mail_no": "^[0-9]{10,11}$|^T[0-9]{10}$|^FYPS[0-9]{12}$|^LBX[0-9]{15}-[2-9AZ]{1}-[1-9A-Z]{1}$"
        },
        {
          "code": "XFWL",
          "id": "202855",
          "name": "信丰物流",
          "reg_mail_no": "^130[0-9]{9}|13[7-9]{1}[0-9]{9}|18[8-9]{1}[0-9]{9}$"
        },
        {
          "code": "ESB",
          "id": "200740",
          "name": "E速宝",
          "reg_mail_no": "[0-9a-zA-Z-]{5,20}"
        },
        {
          "code": "GDEMS",
          "id": "1269",
          "name": "广东EMS",
          "reg_mail_no": "^[a-zA-Z]{2}[0-9]{9}[a-zA-Z]{2}$"
        },
        {
          "code": "QRT",
          "id": "1208",
          "name": "增益速递",
          "reg_mail_no": "^[0-9]{12,13}$"
        }];
        var ret = false;
        for (var i = 0; i < checkObj.length; i++) {
          if (new RegExp(checkObj[i]["reg_mail_no"]).test(value)) {
            ret = true;
            break;
          }
        }
        return ret;
      }
    });

  }
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