<template>
  <div>
    <div class="area-keyboard">
      <div class="keyboard-head"><span class="keyboard-finish">完成</span></div>
      <div class="keyboard-body">
          <i class="car-no-key">京</i>
          <i class="car-no-key">沪</i>
          <i class="car-no-key">浙</i>
          <i class="car-no-key">苏</i>
          <i class="car-no-key">粤</i>
          <i class="car-no-key">鲁</i>
          <i class="car-no-key">晋</i>
          <i class="car-no-key">冀</i>
          <i class="car-no-key">豫</i>
          <i class="car-no-key">川</i>
          <i class="car-no-key">渝</i>
          <i class="car-no-key">辽</i>
          <i class="car-no-key">吉</i>
          <i class="car-no-key">黑</i>
          <i class="car-no-key">皖</i>
          <i class="car-no-key">鄂</i>
          <i class="car-no-key">湘</i>
          <i class="car-no-key">赣</i>
          <i class="car-no-key">闽</i>
          <i class="car-no-key">陕</i>
          <i class="car-no-key">甘</i>
          <i class="car-no-key">宁</i>
          <i class="car-no-key">蒙</i>
          <i class="car-no-key">津</i>
          <i class="car-no-key">贵</i>
          <i class="car-no-key">云</i>
          <i class="car-no-key">桂</i>
          <i class="car-no-key">琼</i>
          <i class="car-no-key">青</i>
          <i class="car-no-key">新</i>
          <i class="car-no-key">藏</i>
          <i class="car-no-key">台</i>
      </div>
    </div>

    <div class="text-keyboard">
      <div class="keyboard-head"><span class="keyboard-finish">完成</span></div>
      <div class="keyboard-body">
        <i class="car-no-key">1</i>
        <i class="car-no-key">2</i>
        <i class="car-no-key">3</i>
        <i class="car-no-key">4</i>
        <i class="car-no-key">5</i>
        <i class="car-no-key">6</i>
        <i class="car-no-key">7</i>
        <i class="car-no-key">8</i>
        <i class="car-no-key">9</i>
        <i class="car-no-key">0</i>
        <i class="car-no-key">Q</i>
        <i class="car-no-key">W</i>
        <i class="car-no-key">E</i>
        <i class="car-no-key">R</i>
        <i class="car-no-key">T</i>
        <i class="car-no-key">Y</i>
        <i class="car-no-key">U</i>
        <i class="car-no-key">P</i>
        <i class="car-no-key">港</i>
        <i class="car-no-key">澳</i>
        <i class="car-no-key">A</i>
        <i class="car-no-key">S</i>
        <i class="car-no-key">D</i>
        <i class="car-no-key">F</i>
        <i class="car-no-key">G</i>
        <i class="car-no-key">H</i>
        <i class="car-no-key">J</i>
        <i class="car-no-key">K</i>
        <i class="car-no-key">L</i>
        <i class="car-no-key">学</i>
        <i class="car-no-key van-key--gray" style="width:15%;"></i>
        <i class="car-no-key">Z</i>
        <i class="car-no-key">X</i>
        <i class="car-no-key">C</i>
        <i class="car-no-key">V</i>
        <i class="car-no-key">B</i>
        <i class="car-no-key">N</i>
        <i class="car-no-key">M</i>
        <i class="car-no-key van-key--gray" style="width:15%;"><van-icon style="line-height:54px;" name="delete" /></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.area-keyboard,.text-keyboard{
  background-color: #fff;
}
.area-keyboard .car-no-key {
  width: 12.5%;
}
.text-keyboard .car-no-key {
  width: 10%;
}
.car-no-key {
    display: inline-block;
    height: 54px;
    font-size: 24px;
    font-style: normal;
    line-height: 54px;
    text-align: center;
    vertical-align: middle;
    border: 0 solid #ebedf0;
    border-width: 1px 1px 0 0;
    box-sizing: border-box;
}
</style>