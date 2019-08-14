<template>
  <div>
    <van-field v-model="chooseText" placeholder="请输入车牌号码" v-on:focus="showAreaKeyboard=false;showTextKeyboard=true;" readonly label-width="45px">
      <div slot="label" v-on:click="showTextKeyboard=false;showAreaKeyboard=true;">
        <span v-text="chooseArea"></span>&nbsp;
        <van-icon name="arrow-down" />
      </div>
      <van-checkbox slot="button" v-model="isNewEnergy">新能源汽车</van-checkbox>
    </van-field>
    <div class="area-keyboard" v-bind:class="{'keyboard-up':showAreaKeyboard}">
      <div class="keyboard-head"><span class="keyboard-finish" v-on:click="showAreaKeyboard=false">完成</span></div>
      <div class="keyboard-body">
          <i class="car-no-key" v-on:click="chooseArea='京';">京</i>
          <i class="car-no-key" v-on:click="chooseArea='沪';">沪</i>
          <i class="car-no-key" v-on:click="chooseArea='浙';">浙</i>
          <i class="car-no-key" v-on:click="chooseArea='苏';">苏</i>
          <i class="car-no-key" v-on:click="chooseArea='粤';">粤</i>
          <i class="car-no-key" v-on:click="chooseArea='鲁';">鲁</i>
          <i class="car-no-key" v-on:click="chooseArea='晋';">晋</i>
          <i class="car-no-key" v-on:click="chooseArea='冀';">冀</i>
          <i class="car-no-key" v-on:click="chooseArea='豫';">豫</i>
          <i class="car-no-key" v-on:click="chooseArea='川';">川</i>
          <i class="car-no-key" v-on:click="chooseArea='渝';">渝</i>
          <i class="car-no-key" v-on:click="chooseArea='辽';">辽</i>
          <i class="car-no-key" v-on:click="chooseArea='吉';">吉</i>
          <i class="car-no-key" v-on:click="chooseArea='黑';">黑</i>
          <i class="car-no-key" v-on:click="chooseArea='皖';">皖</i>
          <i class="car-no-key" v-on:click="chooseArea='鄂';">鄂</i>
          <i class="car-no-key" v-on:click="chooseArea='湘';">湘</i>
          <i class="car-no-key" v-on:click="chooseArea='赣';">赣</i>
          <i class="car-no-key" v-on:click="chooseArea='闽';">闽</i>
          <i class="car-no-key" v-on:click="chooseArea='陕';">陕</i>
          <i class="car-no-key" v-on:click="chooseArea='甘';">甘</i>
          <i class="car-no-key" v-on:click="chooseArea='宁';">宁</i>
          <i class="car-no-key" v-on:click="chooseArea='蒙';">蒙</i>
          <i class="car-no-key" v-on:click="chooseArea='津';">津</i>
          <i class="car-no-key" v-on:click="chooseArea='贵';">贵</i>
          <i class="car-no-key" v-on:click="chooseArea='云';">云</i>
          <i class="car-no-key" v-on:click="chooseArea='桂';">桂</i>
          <i class="car-no-key" v-on:click="chooseArea='琼';">琼</i>
          <i class="car-no-key" v-on:click="chooseArea='青';">青</i>
          <i class="car-no-key" v-on:click="chooseArea='新';">新</i>
          <i class="car-no-key" v-on:click="chooseArea='藏';">藏</i>
          <i class="car-no-key" v-on:click="chooseArea='台';">台</i>
      </div>
    </div>
    <div class="text-keyboard" v-bind:class="{'keyboard-up':showTextKeyboard}">
      <div class="keyboard-head"><span class="keyboard-finish" v-on:click="showTextKeyboard=false">完成</span></div>
      <div class="keyboard-body">
        <i class="car-no-key" v-on:click="writeText('1')">1</i>
        <i class="car-no-key" v-on:click="writeText('2')">2</i>
        <i class="car-no-key" v-on:click="writeText('3')">3</i>
        <i class="car-no-key" v-on:click="writeText('4')">4</i>
        <i class="car-no-key" v-on:click="writeText('5')">5</i>
        <i class="car-no-key" v-on:click="writeText('6')">6</i>
        <i class="car-no-key" v-on:click="writeText('7')">7</i>
        <i class="car-no-key" v-on:click="writeText('8')">8</i>
        <i class="car-no-key" v-on:click="writeText('9')">9</i>
        <i class="car-no-key" v-on:click="writeText('0')">0</i>
        <i class="car-no-key" v-on:click="writeText('Q')">Q</i>
        <i class="car-no-key" v-on:click="writeText('W')">W</i>
        <i class="car-no-key" v-on:click="writeText('E')">E</i>
        <i class="car-no-key" v-on:click="writeText('R')">R</i>
        <i class="car-no-key" v-on:click="writeText('T')">T</i>
        <i class="car-no-key" v-on:click="writeText('Y')">Y</i>
        <i class="car-no-key" v-on:click="writeText('U')">U</i>
        <i class="car-no-key" v-on:click="writeText('P')">P</i>
        <i class="car-no-key" v-on:click="writeText('港')">港</i>
        <i class="car-no-key" v-on:click="writeText('澳')">澳</i>
        <i class="car-no-key" v-on:click="writeText('A')">A</i>
        <i class="car-no-key" v-on:click="writeText('S')">S</i>
        <i class="car-no-key" v-on:click="writeText('D')">D</i>
        <i class="car-no-key" v-on:click="writeText('F')">F</i>
        <i class="car-no-key" v-on:click="writeText('G')">G</i>
        <i class="car-no-key" v-on:click="writeText('H')">H</i>
        <i class="car-no-key" v-on:click="writeText('J')">J</i>
        <i class="car-no-key" v-on:click="writeText('K')">K</i>
        <i class="car-no-key" v-on:click="writeText('L')">L</i>
        <i class="car-no-key" v-on:click="writeText('学')">学</i>
        <i class="car-no-key van-key--gray" style="width:15%;"></i>
        <i class="car-no-key" v-on:click="writeText('Z')">Z</i>
        <i class="car-no-key" v-on:click="writeText('X')">X</i>
        <i class="car-no-key" v-on:click="writeText('C')">C</i>
        <i class="car-no-key" v-on:click="writeText('V')">V</i>
        <i class="car-no-key" v-on:click="writeText('B')">B</i>
        <i class="car-no-key" v-on:click="writeText('N')">N</i>
        <i class="car-no-key" v-on:click="writeText('M')">M</i>
        <i class="car-no-key van-key--gray" style="width:15%;" v-on:click="writeText('del')"><van-icon style="line-height:54px;" name="delete" /></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      showAreaKeyboard:false,
      showTextKeyboard:false,
      isNewEnergy:false,
      chooseArea:'粤',
      chooseText:'',
    };
  },
  watch:{
    isNewEnergy(val){
      if(val===false && this.chooseText.length>6){
        this.chooseText=this.chooseText.substring(0,6);
        this.$emit('finish',this.chooseText);
      }
    }
  },
  methods:{
    writeText(input){
      if(this.chooseText==='' && input!=='del' && /[\d\u4e00-\u9fa5]/g.test(input)){
        this.$notify({message:'车牌第一位必须是字母！',background:'#f44'});
        return;
      }
      if(input==='del'){
        if(this.chooseText.length>0){
          this.chooseText=this.chooseText.substring(0,this.chooseText.length-1);
        }
      }else{
        if((this.isNewEnergy===false && this.chooseText.length===6) || (this.isNewEnergy===true && this.chooseText.length===7)){
          this.$notify({message:'车牌号码不能超过6位，新能源车牌号码不能超过7位！',background:'#f44'});
          return;
        }
        this.chooseText=this.chooseText+input;
        if((this.isNewEnergy===false && this.chooseText.length===6) || (this.isNewEnergy===true && this.chooseText.length===7)){
          this.$emit('finish',this.chooseText);
        }
      }
    }
  }
};
</script>
<style scoped>
.area-keyboard,.text-keyboard{
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  transition: bottom .3s linear;
  bottom: -414px;
}
.keyboard-finish{
  position: absolute;
  right: 0;
  padding: 0 16px;
  color: #1989fa;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
}
.keyboard-head{
  height: 30px;
}
.keyboard-up{
  bottom: 0;
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
    background-color: rgba(242,243,245, 0);
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    -ms-user-select: none;
}
.car-no-key:active,.keyboard-finish:active{
  background-color: rgba(242,243,245, 1)
}
</style>