<template>
    <div>
        <div v-if="isWx" class="van-uploader__upload" v-bind:style="{width:previewSize,height:previewSize}" v-on:click="wxUpload">
            <i v-if="wxUploadStatus==0" class="van-icon van-icon-plus van-uploader__upload-icon"></i>
            <div v-if="wxUploadStatus==1" v-bind:style="{width:previewSize,height:previewSize}">
                <img class="van-image__img" src="/api/index/showImage?pathName=test&imgName=a0963c5b45a6b1c911fbc0b7af9e993e52672739" style="object-fit: cover;"/>
                <i class="van-icon van-icon-delete van-uploader__preview-delete" v-on:click="delImg"></i>
            </div>
        </div>
        <van-uploader v-else v-model="fileList" v-bind:max-count="1" v-bind:after-read="afterRead" v-bind:preview-size="previewSize"/>
        <div v-show="cutRect" style="position:absolute;left:0;right:0;top:0;bottom:0;background:#323233;">
            <div v-bind:id="imgContainId" v-bind:style="{width:imgWidth+'px',height:imgHeight+'px',top:imgTop+'px',bottom:imgBottom+'px',position:'absolute'}"></div>
            <div style="position:absolute;bottom:0px;left:0;right:0;padding:10px;">
                <van-button type="primary" block v-on:click="crop()">裁剪</van-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['previewSize','cut','pathName','imgName','thumbnailName'],
    data(){
        return {
            isWx:/MicroMessenger/.test(window.navigator.userAgent),
	        wxUploadStatus:0,//微信版上传图片控件的状态，0：未上传、1：已上传、可删除
            imgWidth:0,
            imgHeight:0,
            imgTop:0,
            imgBottom:0,
            imgContainId:this.$UUID(),
            fileList:[],
            cutRect:false,
            cropperObj:null,
            imgName_:null,
        };
    },
    methods:{
        delImg(){
            this.wxUploadStatus=0;
        },
        wxUpload(){
            var thiz=this;
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success(res) {
                    wx.uploadImage({
                        localId: res.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success(res) {
                            thiz.$post('/api/Index/uploadSingleWxImage',{pathName:this.pathName,serverId:res.serverId},function(result){
                                if(result.code===0){
                                    if(thiz.cut===true){
                                        var data=result.data;
                                        this.imgWidth=window.screen.width;
                                        this.imgHeight=this.imgWidth*data.imgHeight/data.imgWidth;
                                        this.imgTop=(window.screen.height-this.imgHeight-64)/2;
                                        this.imgBottom=this.imgTop;
                                        this.imgName_=data.imgName;
                                        var image = new Image();
                                        image.setAttribute('style','width:'+this.imgWidth+'px;height:'+this.imgHeight+'px;');
                                        var Cropper=this.$Cropper;
                                        var thiz=this;
                                        thiz.cutRect=true;
                                        image.onload=function(){
                                            document.getElementById(thiz.imgContainId).appendChild(image);
                                            thiz.cropperObj=new Cropper(image,{
                                            aspectRatio:16/9,
                                            guides:false,
                                            movable:false,
                                            });
                                            thiz.cropperObj.setDragMode('crop');
                                        };
                                        image.src='/api/index/showImage?pathName='+this.pathName+'&imgName='+data.imgName;	
                                    }
                                }
                            });
                        }
                    });
                }
            });
        },
        afterRead(file) {
            this.$upload('/api/Index/uploadSingleImage',{
                pathName:this.pathName,
                fileUpload:file.file
            },function(result){
                if(result.code===0){
                    if(this.cut===true){
                        var data=result.data;
                        this.imgWidth=window.screen.width;
                        this.imgHeight=this.imgWidth*data.imgHeight/data.imgWidth;
                        this.imgTop=(window.screen.height-this.imgHeight-64)/2;
                        this.imgBottom=this.imgTop;
                        this.imgName_=data.imgName;
                        var image = new Image();
                        image.setAttribute('style','width:'+this.imgWidth+'px;height:'+this.imgHeight+'px;');
                        var Cropper=this.$Cropper;
                        var thiz=this;
                        thiz.cutRect=true;
                        image.onload=function(){
                            document.getElementById(thiz.imgContainId).appendChild(image);
                            thiz.cropperObj=new Cropper(image,{
                                aspectRatio:16/9,
                                guides:false,
                                movable:false,
                            });
                            thiz.cropperObj.setDragMode('crop');
                        };
                        image.src='/api/index/showImage?pathName='+this.pathName+'&imgName='+data.imgName;
                    }
                }
            });
        },
        crop(){
            if(this.cropperObj!==null){
                var cropBoxData=this.cropperObj.getCropBoxData();
                this.$post("/api/index/singleImageCrop",{
                    pathName: this.pathName,
                    imgName: this.imgName_,
                    imgWidth: parseInt(this.imgWidth),
                    imgHeight: parseInt(this.imgHeight),
                    x: parseInt(cropBoxData.left),
                    y: parseInt(cropBoxData.top),
                    w: parseInt(cropBoxData.width),
                    h: parseInt(cropBoxData.height)
                },function(result) {
                    var data = result.data;
                    this.imgName_=data.imgName;
                    this.$emit("update:imgName", data.imgName);
                    this.$emit("update:thumbnailName", data.thumbnailName);
                    this.cutRect=false;
                    this.cropperObj.destroy();
                    document.getElementById(this.imgContainId).innerHTML='';
                    this.fileList.splice(0);
                    this.fileList.push({isImageFile: true,url:"/api/index/showImage?type=.jpg&pathName=" + this.pathName + "&imgName=" + data.imgName});
                });
            }
        }
    },
    mounted(){
    }
}
</script>
<style>
.cropper-point.point-se{
    width: 5px !important;
    height: 5px !important;
}
</style>