<template>
    <div>
        <el-form-item label="上传图片">
            <div v-bind:id="'uploadImage'+id">选择图片</div>
        </el-form-item>
        <el-form-item label="预览" v-if="isUploaded">
            <el-image v-bind:src="src" v-bind:style="{maxWidth:'100%'}" class="thumbnail-img">
                <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                </div>
            </el-image>
        </el-form-item>
        <el-progress v-if="showProgress" v-bind:percentage="percentage" v-on:format="format"></el-progress>
        <el-dialog v-bind:width="contentWidth" title="裁剪图片" v-bind:visible.sync="cropDialog" top="25px" v-bind:modal-append-to-body="true" v-bind:append-to-body="true" v-on:close="crop();">
            <div v-bind:style="{width:'100%',height:contentHeight,overflowY:'auto'}">
                <vue-cropper ref="cropper" v-bind:img="src" v-bind:can-scale="true" v-bind:auto-crop="true" v-bind:auto-crop-width="cropWidth" 
                    v-bind:auto-crop-height="cropHeight" v-bind:fixed="true" v-bind:fixed-number="widthOverHeight"
                    v-bind:original="true" v-bind:center-box="true">
                </vue-cropper>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" v-on:click="crop();">裁剪</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {uploadCallback} from '../utils/common.js'
import UUID from '../utils/UUID.js'
import WebUploader from 'webuploader'
import 'webuploader/css/webuploader.css'
export default {
    name:'uploadImage',
    props: ['path', 'cut', 'widthOverHeight', 'imgName', 'thumbnailName'],
    data() {
        return { id: new UUID().id, _imgName:'', percentage: 0, src: '', contentHeight: 0, contentWidth: '0',imgWidth:0,imgHeight:0,cropDialog: false, isUploaded: false, showProgress: false,cropWidth:0,cropHeight:0 };
    },
    methods: {
        format(percentage) {
            return percentage +'%'
        },
        crop() {
            var imgAxis=this.$refs.cropper.getImgAxis();
            var cropAxis=this.$refs.cropper.getCropAxis();
            var thiz = this;
            this.$post('/api/index/singleImageCrop', {
                pathName: this.path,
                imgName: this._imgName,
                imgWidth: imgAxis.x2-imgAxis.x1,
                imgHeight: imgAxis.y2-imgAxis.y1,
                x: cropAxis.x1-imgAxis.x1,
                y: cropAxis.y1-imgAxis.y1,
                w: cropAxis.x2-cropAxis.x1,
                h: cropAxis.y2-cropAxis.y1
            },function (result) {
                thiz.cropDialog = false;
                var data = result.data;
                thiz._imgName = data.imgName;
                thiz.$emit('update:imgName', data.imgName);
                thiz.$emit('update:thumbnailName', data.thumbnailName);
                thiz.src = '/api/index/showImage?pathName=' + thiz.path + '&imgName=' + thiz._imgName;
            });
        }
    },
    mounted() {
        var thiz = this;
        new WebUploader.Uploader({
            swf: 'webuploader/dist/Uploader.swf',//当浏览器不支持XMLHttpWebRequest时，使用flash插件上传。
            auto: true,//选中文件后自动上传
            server: '/api/index/uploadSingleImage',//处理上传文件的统一控制器
            fileVal: 'fileUpload',//服务端接收二进制文件的参数名称
            formData: { pathName: thiz.path },//每次上传时要提供一个上传目录，让服务端确认保存位置
            duplicate: true,
            pick: {
                id: '#uploadImage' + thiz.id,//生成上传插件的位置
                multiple: false //每次只能选一个文件
            },
            //允许上传的图片格式后缀
            accept: {
                title: 'image',
                extensions: 'gif,webp,jpg,jpeg,bmp,png,tif,emf,ico,flic,wmf,raw,hdri,ai,eps,ufo,dxf,pcd,cdr,psd,svg,fpx,exif,tga,pcx,GIF,JPG,JPEG,BMP,PNG,WEBP,PCX,TIF,TGA,EXIF,FPX,SVG,PSD,CDR,PCD,DXF,UFO,EPS,AI,HDRI,RAW,WMF,FLIC,EMF,ICO',
                mimeTypes: 'image/*',
            }
        }).on('uploadStart', function () {
            thiz.showProgress = true;
        }).on('uploadProgress', function (file, percentage) {
            thiz.percentage = parseInt(percentage * 100);
        }).on('uploadSuccess', uploadCallback(this,function (file, response) {
            if (response.code === 0) {
                var data = response.data;
                thiz._imgName = data.imgName;
                thiz.$emit('update:imgName', data.imgName);
                thiz.$emit('update:thumbnailName', data.thumbnailName);
                thiz.src = '/api/index/showImage?pathName=' + thiz.path + '&imgName=' + thiz._imgName;
                if (thiz.cut === true) {
                    var maxWidth = window.screen.width - 60;
                    var maxHeight = window.screen.height - 340;
                    if (data.imgWidth >= maxWidth) {
                        thiz.contentWidth = (window.screen.width - 20) + 'px';
                    } else if (data.imgWidth <= 400) {
                        thiz.contentWidth = 420 + 'px';
                    } else {
                        thiz.contentWidth = data.imgWidth + 'px';
                    }
                    if (data.imgHeight >= maxHeight) {
                        thiz.contentHeight = (window.screen.height - 340) + 'px';
                    } else if (data.imgHeight <= 300) {
                        thiz.contentHeight = 300 + 'px';
                    } else {
                        thiz.contentHeight = data.imgHeight + 'px';
                    }
                    thiz.imgWidth = data.imgWidth + 'px';
                    thiz.imgHeight = data.imgHeight + 'px';
                    thiz.cropDialog = true;
                    thiz.cropWidth=data.imgWidth/2;
                    thiz.cropHeight=thiz.cropWidth/(thiz.widthOverHeight[0]/thiz.widthOverHeight[1]);
                }
                thiz.isUploaded = true;
            } else if (response.code === -1) {
                thiz.isUploaded = false;
            }
            thiz.showProgress = false;
        })).on('error', function (type) {
            if (type === 'Q_TYPE_DENIED') {
                thiz.$message({ message: '该文件类型可能不是图片文件。', type: 'warning' });
            }
        });
    }
}
</script>
