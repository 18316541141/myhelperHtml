<template>
  <div>
    <transition v-bind:name="aniName">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name:'App',
  data(){
    return {
      aniName:'page-left'
    };
  },
  watch: {
    $route(to, from) {
      if(from.fullPath==='/Login' && to.fullPath==='/Index'){
        this.aniName='page-left';
      }else if(from.fullPath==='/Index' && to.fullPath==='/Login'){
        this.aniName='page-right';
      }else{
        if(to.fullPath.startsWith(from.fullPath)){
          this.aniName='page-left';
        }else{
          this.aniName='page-right';
        }
      }
      
      //当目标浏览器是个微信浏览器时，调用微信api认证配置。
      if(/MicroMessenger/.test(window.navigator.userAgent) && this.$useWxApiUrls.indexOf(to.fullPath)>-1){
        this.$get('/api/Index/wxCfg',{routerPath:to.fullPath},function(result){
          wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: '', // 必填，公众号的唯一标识
            timestamp: 0, // 必填，生成签名的时间戳
            nonceStr: '', // 必填，生成签名的随机串
            signature: '',// 必填，签名
            jsApiList: [
              'updateAppMessageShareData',
              'updateTimelineShareData',
              'onMenuShareWeibo',
              'onMenuShareQZone',
              'startRecord',
              'stopRecord',
              'onVoiceRecordEnd',
              'playVoice',
              'pauseVoice',
              'stopVoice',
              'onVoicePlayEnd',
              'uploadVoice',
              'downloadVoice',
              'chooseImage',
              'previewImage',
              'uploadImage',
              'downloadImage',
              'translateVoice',
              'getNetworkType',
              'openLocation',
              'getLocation',
              'hideOptionMenu',
              'showOptionMenu',
              'hideMenuItems',
              'showMenuItems',
              'hideAllNonBaseMenuItem',
              'showAllNonBaseMenuItem',
              'closeWindow',
              'scanQRCode',
              'chooseWXPay',
              'openProductSpecificView',
              'addCard',
              'chooseCard',
              'openCard'
            ] // 必填，需要使用的JS接口列表
          });
        });
      }
    }
  }
}
</script>
<style>
.page-left-enter-active,
.page-left-leave-active,
.page-right-leave-active,
.page-right-enter-active {
  position: fixed !important;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transition: transform 0.4s linear;
}

.page-left-enter,
.page-right-leave-to {
  transform: translateX(100%);
}

.page-left-enter-to,
.page-left-leave,
.page-right-enter-to,
.page-right-leave {
  transform: translateX(0%);
}

.page-left-leave-to,
.page-right-enter {
  transform: translateX(-100%);
}
.scroll-top{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}
.scroll-center{
    position: absolute;
    left: 0;
    right: 0;
    overflow-y: auto;
}
.scroll-bottom{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
}
/* 编辑或新增表单的样式 */
.form-body{
  position: absolute;
  top:84px;
  left: 20px;
  right: 20px;
  bottom: 71px;
  overflow-y: auto;
}
.form-bottom{
  position: absolute;
  bottom:30px;
  left: 20px;
  right: 20px;
  background:white;
}
</style>