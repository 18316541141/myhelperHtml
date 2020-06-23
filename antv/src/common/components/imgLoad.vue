<template>
  <div>
    <a-spin tip="加载图片..." :spinning="loading" :delay="200" v-if="_showType === 0">
      <div :style="containStyle">
        <a-tooltip v-if="_showBigPicAble" placement="topLeft" title="点击查看大图">
          <img
            v-show="show"
            :src="imgSrc"
            :style="{width:'100%',height:'100%',objectFit:objectFit}"
            @click="showBigPic"
          />
        </a-tooltip>
        <img
          v-else
          v-show="show"
          :src="imgSrc"
          :style="{width:'100%',height:'100%',objectFit:objectFit}"
        />
      </div>
    </a-spin>
    <a-button v-if="_showType === 1" :loading="loading" @click="showBigPic">{{_title}}</a-button>
    <span v-if="_showType === 2">
      <a-spin v-if="loading" :indicator="indicator" />
      <a v-else href="javascript:void(0);">{{_title}}</a>
    </span>
    <a-modal
      :width="modalWidth"
      :title="_title"
      :maskClosable="false"
      :destroyOnClose="true"
      :footer="null"
      :visible="visible && _showBigPicAble"
      :centered="true"
      @cancel="visible = false"
    >
      <div :style="{overflow:'auto',height:innerHeight+'px'}">
        <img :src="imgSrc" />
      </div>
    </a-modal>
  </div>
</template>
<script>
export default {
  /**
   * 组件参数
   * @param {*} src 图片的url
   * @param {*} containStyle 装载图片的容器样式
   * @param {*} objectFit 图片自适应设置
   * @param {*} title 图片标题，默认为 “查看大图”
   * @param {*} showType 展示方式，0：展示预览图，点击打开大图、1：展示按钮，点击打开大图、2：展示连接，点击打开大图；
   *  （默认为0）
   * @param {*} showBigPicAble 是否开启点击查看大图功能，true：开启、false：关闭，默认开启，
   */
  props: [
    "src",
    "containStyle",
    "objectFit",
    "title",
    "showType",
    "showBigPicAble"
  ],
  data() {
    return {
      imgSrc: undefined,
      loading: false,
      show: false,
      visible: false,
      img: new Image(),
      modalWidth: undefined,
      innerHeight: undefined
    };
  },
  computed: {
    _showType() {
      return this.showType === undefined || isNaN(this.showType)
        ? 0
        : parseInt(this.showType);
    },
    _title() {
      return this.title === undefined ? "查看大图" : this.title;
    },
    _showBigPicAble() {
      return this.showBigPicAble === undefined ? true : this.showBigPicAble;
    }
  },
  created() {
    this.loadImg(this.src);
  },
  watch: {
    src(value) {
      this.loadImg(value);
    }
  },
  methods: {
    showBigPic() {
      this.visible = true;
    },
    loadImg(src) {
      var vm = this;
      if (src === undefined || src === null || src === "") {
        vm.show = false;
        vm.imgSrc = undefined;
        return;
      }
      var img = vm.img;
      vm.loading = true;
      img.onload = function() {
        vm.loading = false;
        vm.show = true;
        vm.imgSrc = src;
        vm.modalWidth =
          img.width + 48 > document.body.clientWidth - 10
            ? document.body.clientWidth - 10
            : img.width + 48;
        vm.innerHeight =
          img.height + 133 > document.body.clientHeight
            ? document.body.clientHeight - 133
            : img.height;
      };
      img.onerror = function(event) {
        vm.loading = false;
        vm.show = false;
        vm.imgSrc = undefined;
      };
      img.src = src;
    }
  }
};
</script>