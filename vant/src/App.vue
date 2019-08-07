<template>
  <transition v-bind:name="aniName">
    <router-view></router-view>
  </transition>
</template>
<script>
export default {
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
    }
  }
}
</script>
<style>
.page-left-enter-active,.page-left-leave-active,.page-right-enter-active,.page-right-leave-active{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  transition:all .3 linear;
}
.page-left-enter,.page-right-leave-to{
  transform: translateX(100%);
}
.page-left-enter-to,.page-left-leave,.page-right-enter-to,.page-right-leave{
  transform: translateX(0%);
}
.page-left-leave-to,.page-right-enter{
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
}
.scroll-bottom{
position: absolute;
left: 0;
right: 0;
bottom: 0;
}
</style>