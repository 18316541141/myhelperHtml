<template>
    <div>
        <div v-bind:id="'uploadExcel'+id" v-if="type === 'line'">上传Excel</div>
        <el-form-item label="上传Excel" v-if="type === 'form'">
            <div v-bind:id="'uploadExcel'+id">选择Excel</div>
        </el-form-item>
        <el-form-item label="预览" v-if="isUploaded && type === 'form'">
            <el-tooltip effect="dark" v-bind:content="excelFileName" placement="right-start">
                <el-image src="/images/256x256/xlsx-256.png" style="width:96px;" class="thumbnail-img">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
            </el-tooltip>
        </el-form-item>
    </div>
</template>
<script>
import {uploadCallback} from '../utils/common.js'
import UUID from '../utils/UUID.js'
import WebUploader from 'webuploader'
import 'webuploader/css/webuploader.css'
export default {
    name:'uploadExcel',
    props: ['url', 'type', 'postData'],
    data() {
        return { id: new UUID().id, postData: {}, isUploaded :false};
    },
    methods:{
        submit() {
            this.uploader.upload();
        }
    },
    mounted() {
        var thiz = this;
        this.uploader = new WebUploader.Uploader({
            swf: 'webuploader/dist/Uploader.swf',
            auto: this.type === 'line',//选中文件后自动上传
            server: this.url,//处理上传excel的控制器
            fileVal: 'fileUpload',//服务端接收二进制文件的参数名称
            formData: this.postData,//每次上传时上传的数据
            duplicate: true,
            pick: {
                id: '#uploadExcel' + this.id,//生成上传插件的位置
                multiple: false //每次只能选一个文件
            },
            //允许上传的图片格式后缀
            accept: {
                title: 'excel',
                extensions: 'xls,xlsx',
                mimeTypes: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
        }).on('uploadStart', function (file) {
            
        }).on('uploadSuccess', uploadCallback(function (file, response) {

        })).on('error', function (type) {
            if (type === 'Q_TYPE_DENIED') {
                thiz.$message({ message: '该文件类型可能不是Excel文件。', type: 'warning' });
            }
        }).on('beforeFileQueued', function (file) {
            thiz.isUploaded = true;
            thiz.excelFileName = file.name;
        });
    }
}
</script>
