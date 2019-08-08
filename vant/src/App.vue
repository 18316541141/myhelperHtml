<template>
  <transition v-bind:name="aniName">
    <router-view></router-view>
  </transition>
</template>
<script>
export default {
  data(){
    return {
      aniName:'pageLeft'
    };
  },
  watch: {
    $route(to, from) {
      if(from.fullPath==='/Login' && to.fullPath==='/Index'){
        this.aniName='pageLeft';
      }else if(from.fullPath==='/Index' && to.fullPath==='/Login'){
        this.aniName='pageRight';
      }else{
        if(to.fullPath.startsWith(from.fullPath)){
          this.aniName='pageLeft';
        }else{
          this.aniName='pageRight';
        }
      }
    }
  }
}
</script>
<style>
<<<<<<< HEAD
.page-left-enter-active,.page-left-leave-active,.page-right-enter-active,.page-right-leave-active{
=======
.pageLeft-enter-active,.pageLeft-leave-active,.pageRight-enter-active,.pageRight-leave-active{
>>>>>>> 69a0f448e270f62d557cd6a78466dd7d71f22250
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  transition:all .6 linear;
}
.pageLeft-enter,.pageRight-leave-to{
  transform: translateX(100%);
}
.pageLeft-enter-to,.pageLeft-leave,.pageRight-enter-to,.pageRight-leave{
  transform: translateX(0%);
}
.pageLeft-leave-to,.pageRight-enter{
  transform: translateX(-100%);
}
.scroll-top{
<<<<<<< HEAD
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
=======
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
>>>>>>> 69a0f448e270f62d557cd6a78466dd7d71f22250
}
</style>