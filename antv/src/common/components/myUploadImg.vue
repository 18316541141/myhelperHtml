<template>
  <div>
    <a-upload
      :action="action"
      list-type="picture-card"
      :file-list="fileList"
      @preview="preview"
      @change="change"
      accept="image/*"
      :name="name"
      :remove="remove"
      :data="data"
      :beforeUpload="beforeUpload"
      method="post"
    >
      <div v-if="fileList.length < _len">
        <a-tooltip
          placement="topLeft"
          title="请上传图片文件"
          :visible="tipVisible"
          trigger="contextmenu"
          :destroyTooltipOnHide="true"
        >
          <a-icon type="plus" />
          <div class="ant-upload-text">上传图片</div>
        </a-tooltip>
      </div>
    </a-upload>
    <a-modal
      :width="modalWidth"
      :title="_title"
      :maskClosable="false"
      :destroyOnClose="true"
      :footer="null"
      :visible="visible"
      :centered="true"
      @cancel="visible = false"
    >
      <div :style="{overflow:'auto',height:innerHeight+'px',textAlign:'center'}">
        <img :src="imgSrc" />
      </div>
    </a-modal>
  </div>
</template>
<script>
export default {
  /**
   * 组件参数
   * @param {*} action 后台处理上传图片的url
   * @param {*} srcList 显示的图片列表，具体格式如下
   *  [{name:'图片名称（可空）',url:'图片预览图（必填）',preview:'图片实际大图（如果空，则查看预览图）'},{name:'xxx',url:'xxx',preview:'xxx'},....]
   * @param {*} len 列表最大的图片数，默认为1
   * @param {*} name 后台接收上传图片的参数名，默认是file
   * @param {*} data 上传所需参数或返回上传参数的方法，可空
   */
  props: ["action", "srcList", "len", "name", "data"],
  /**
   * 组件事件
   * loadBigPic事件，使用 @loadBigPic="回调函数(status)" 绑定后，每次点击图片查看大图时触发，status表示大图的加载情况，
   *  0:开始加载，1:加载完毕，-1：加载失败
   * doneCallback事件，使用 @doneCallback="回调函数(res)" 绑定后，上传完图片后触发。
   *  res:服务端响应内容
   * remove事件，使用 @remove="回调函数(file)" 绑定后，每次删除图片后触发
   */
  data() {
    return {
      fileList: [],
      maxUid: -1,
      visible: false,
      imgSrc: undefined,
      modalWidth: undefined,
      innerHeight: undefined,
      img: new Image(),
      reader: new FileReader(),
      title: undefined,
      tipVisible: false,
      //常见图片后缀
      imgSuffix: [
        "bmp",
        "dib",
        "rle",
        "emf",
        "gif",
        "jpg",
        "jpeg",
        " jpe",
        "jif",
        "pcx",
        "dcx",
        "pic",
        "png",
        "tga",
        "tif",
        "tiffxif",
        "wmf",
        "jfif",
        "pdf",
      ],
    };
  },
  mounted() {
    var vm = this;
    var img = vm.img;
    var reader = vm.reader;
    img.onload = function () {
      vm.modalWidth =
        img.width + 48 > document.body.clientWidth - 10
          ? document.body.clientWidth - 10
          : img.width + 48;
      vm.innerHeight =
        img.height + 133 > document.body.clientHeight
          ? document.body.clientHeight - 133
          : img.height;
      if (vm.modalWidth < 300) {
        vm.modalWidth = 300;
      }
      if (vm.innerHeight < 200) {
        vm.innerHeight = 200;
      }
      vm.imgSrc = img.src;
      vm.$emit("loadBigPic", 1);
      vm.visible = true;
    };
    img.onerror = function (event) {
      vm.$emit("loadBigPic", -1);
      vm.imgSrc = undefined;
    };
    reader.onload = function (event) {
      img.src = event.target.result;
    };
    reader.onerror = function (event) {};
  },
  computed: {
    _required() {
      return this.required === undefined ? true : this.required;
    },
    _len() {
      return this.len === undefined || isNaN(this.len) ? 1 : parseInt(this.len);
    },
    _title() {
      return this.title === undefined ? "查看大图" : this.title;
    },
  },
  methods: {
    beforeUpload(file) {
      var vm = this;
      var imgSuffix = vm.imgSuffix;
      var ret = false;
      for (var i = 0, len = imgSuffix.length; i < len; i++) {
        if (file.name.endsWith(imgSuffix[i])) {
          ret = true;
        }
      }
      vm.tipVisible = !ret;
      if (vm.tipVisible) {
        setTimeout(function () {
          vm.tipVisible = false;
        }, 5000);
      }
      return ret;
    },
    remove(file) {
      this.$emit("remove", file);
      return true;
    },
    change(res) {
      var file = res.file;
      if (this.beforeUpload(file)) {
        if (file.status === "done") {
          this.$emit("doneCallback", file.response);
        }
        this.fileList = res.fileList;
      }
    },
    preview(file) {
      this.title = file.name;
      this.$emit("loadBigPic", 0);
      if (file.preview === undefined) {
        if (file.url === undefined) {
          this.reader.readAsDataURL(file.originFileObj);
        } else {
          this.img.src = file.url;
        }
      } else {
        this.img.src = file.preview;
      }
    },
  },
  watch: {
    srcList(list) {
      for (var i = 0, len = list.length; i < len; i++) {
        if (list[i] === undefined || list[i] === null || list[i] === "") {
          list.splice(i, 1);
        }
      }
      if (list.length === 0) {
        return;
      }
      var fileList = [];
      for (i = 0, len = list.length; i < len; i++) {
        fileList.push({
          uid: this.maxUid + "",
          name: list[i].name,
          status: "done",
          url: list[i].url,
          preview: list[i].preview,
        });
        this.maxUid--;
      }
      this.$nextTick(function () {
        this.fileList = fileList;
      });
    },
  },
};
</script>