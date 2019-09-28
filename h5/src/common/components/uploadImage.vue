<template>
  <div>
    <el-form-item label="上传图片">
      <div v-bind:id="'uploadImage'+id">选择图片</div>
    </el-form-item>
    <el-form-item label="预览" v-if="isUploaded">
      <el-image v-bind:src="src" v-bind:style="{maxWidth:showImgMaxWidth+'px'}" class="thumbnail-img">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </el-form-item>
    <el-progress v-if="showProgress" v-bind:percentage="percentage" v-on:format="format"></el-progress>
    <el-dialog
      v-bind:width="contentWidth"
      title="裁剪图片"
      v-bind:visible.sync="cropDialog"
      top="25px"
      v-bind:modal-append-to-body="true"
      v-bind:append-to-body="true"
      v-on:close="crop();"
    >
      <div
        v-bind:style="{width:'100%',height:contentHeight,overflowY:'auto',position:'relative',zIndex:1}"
      >
        <jcrop
          ref="jcrop"
          v-bind:src="src"
          v-bind:rect="rect"
          v-bind:options="{multi:false,aspectRatio:widthOverHeight[0]/widthOverHeight[1]}"
          v-on:change="change"
        ></jcrop>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" v-on:click="cropDialog = false">裁剪</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "uploadImage",
  props: ["cut", "widthOverHeight", "imgName", "thumbnailName",'showImgMaxWidth'],
  data() {
    return {
      rect: [0, 0, 0, 0],
      id: this.$UUID(),
      imgName_: "",
      percentage: 0,
      src: "",
      contentHeight: 0,
      contentWidth: "0",
      imgWidth: 0,
      imgHeight: 0,
      cropDialog: false,
      isUploaded: false,
      showProgress: false,
      pos: [0, 0, 0, 0]
    };
  },
  methods: {
    change(widget) {
      this.pos = widget.pos;
    },
    format(percentage) {
      return percentage + "%";
    },
    crop() {
      var thiz = this;
      this.$post(
        this.$store.state.proxyApi+"/index/singleImageCrop",
        {
          imgName: this.imgName_,
          imgWidth: this.imgWidth,
          imgHeight: this.imgHeight,
          x: this.pos.x,
          y: this.pos.y,
          w: this.pos.w,
          h: this.pos.h
        },
        function(result) {
          var data = result.data;
          thiz.imgName_ = data.imgName;
          thiz.$emit("update:imgName", data.imgName);
          thiz.$emit("update:thumbnailName", data.thumbnailName);
          thiz.src =
            thiz.$store.state.proxyApi+"/index/showImage?imgName=" +
            thiz.imgName_;
        }
      );
    }
  },
  mounted() {
    var thiz = this;
    new this.$WebUploader.Uploader({
      swf: "/Uploader.swf", //当浏览器不支持XMLHttpWebRequest时，使用flash插件上传。
      auto: true, //选中文件后自动上传
      server: thiz.$store.state.proxyApi+"/index/uploadSingleImage", //处理上传文件的统一控制器
      fileVal: "fileUpload", //服务端接收二进制文件的参数名称
      duplicate: true,
      pick: {
        id: "#uploadImage" + thiz.id, //生成上传插件的位置
        multiple: false //每次只能选一个文件
      },
      //允许上传的图片格式后缀
      accept: {
        title: "image",
        extensions:
          "gif,webp,jpg,jpeg,bmp,png,tif,emf,ico,flic,wmf,raw,hdri,ai,eps,ufo,dxf,pcd,cdr,psd,svg,fpx,exif,tga,pcx,GIF,JPG,JPEG,BMP,PNG,WEBP,PCX,TIF,TGA,EXIF,FPX,SVG,PSD,CDR,PCD,DXF,UFO,EPS,AI,HDRI,RAW,WMF,FLIC,EMF,ICO",
        mimeTypes: "image/*"
      }
    })
      .on("uploadStart", function() {
        thiz.showProgress = true;
      })
      .on("uploadProgress", function(file, percentage) {
        thiz.percentage = parseInt(percentage * 100);
      })
      .on(
        "uploadSuccess",
        uploadCallback(this, function(file, response) {
          if (response.code === 0) {
            var data = response.data;
            thiz.imgName_ = data.imgName;
            thiz.$emit("update:imgName", data.imgName);
            thiz.$emit("update:thumbnailName", data.thumbnailName);
            thiz.src = thiz.$store.state.proxyApi+"/index/showImage?imgName=" + thiz.imgName_;
            if (thiz.cut === true) {
              thiz.$openLoading();
              thiz.cropDialog = true;
              var maxWidth = window.screen.width - 60;
              var maxHeight = window.screen.height - 340;
              if (data.imgWidth >= maxWidth) {
                thiz.contentWidth = window.screen.width - 20 + "px";
              } else if (data.imgWidth <= 400) {
                thiz.contentWidth = 420 + "px";
              } else {
                thiz.contentWidth = data.imgWidth + "px";
              }
              if (data.imgHeight >= maxHeight) {
                thiz.contentHeight = window.screen.height - 340 + "px";
              } else if (data.imgHeight <= 300) {
                thiz.contentHeight = 300 + "px";
              } else {
                thiz.contentHeight = data.imgHeight + "px";
              }
              thiz.imgWidth = data.imgWidth;
              thiz.imgHeight = data.imgHeight;
              var cropWidth = data.imgWidth / 2;
              var cropHeight = cropWidth / (thiz.widthOverHeight[0] / thiz.widthOverHeight[1]);
              thiz.rect = [0, 0, cropWidth, cropHeight];
              thiz.$closeLoading();
            }
            thiz.isUploaded = true;
          } else if (response.code === -1) {
            thiz.isUploaded = false;
          }
          thiz.showProgress = false;
        })
      )
      .on("error", function(type) {
        if (type === "Q_TYPE_DENIED") {
          thiz.$message({
            message: "该文件类型可能不是图片文件。",
            type: "warning"
          });
        }
      });
  }
};
</script>