<template>
    <div>
        <el-form-item label="上传文件">
            <div v-bind:id="'uploadFiles'+id">选择文件</div>
        </el-form-item>
        <div v-if="files_.length>0">
            <el-table v-bind:data="files_" style="width: 100%" size="mini" max-height="300px">
                <el-table-column label="类型" width="50px">
                    <template slot-scope="scope">
                        <el-image style="width: 36px;" v-bind:src="scope.row.typeImg"></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="文件名称" v-bind:width="fileDescWidth">
                    <template slot-scope="scope">
                        <el-tooltip effect="dark" v-bind:content="scope.row.fileDesc" placement="top-start"><span v-text="scope.row.fileDesc"></span></el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column label="进度">
                    <template slot-scope="scope">
                        <el-progress v-bind:percentage="scope.row.percentage"></el-progress>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="100px">
                    <template slot-scope="scope">
                        <span style="color:#FF5722;" v-text="scope.row.isFinish?'（上传完毕）':scope.row.progress+'%'"></span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="130px">
                    <template slot-scope="scope">
                        <el-tooltip effect="dark" content="删除文件" placement="top-start">
                            <el-button type="danger" size="mini" icon="el-icon-delete" native-type="button" v-on:click="delFile(scope.row.fileName);"></el-button>
                        </el-tooltip>
                        <el-tooltip effect="dark" content="下载文件" placement="top-start">
                            <el-button type="primary" size="mini" icon="el-icon-download" native-type="button" v-on:click="downFile(scope.row);"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import {uploadCallback,typeImgByMime} from '../utils/common.js'
import UUID from '../utils/UUID.js'
import WebUploader from 'webuploader'
import 'webuploader/css/webuploader.css'
export default {
    name:'uploadFiles',
    props: ['fileDescWidth', 'path', 'files'],
    data() {
        return { id: new UUID().id, files_: []};
    },
    methods: {
        delFile(fileName) {
            var files = this.files_;
            for (var i = 0, len = files.length; i < len; i++) {
                if (files[i].fileName === fileName) {
                    files.splice(i, 1);
                    break;
                }
            }
            this.$emit('update:files',files);
        },
        downFile(row){
            postOpenWin('/index/downFile', {
                pathName: this.path,
                fileName: row.fileName,
                fileDesc: row.fileDesc
            });
        }
    },
    mounted() {
        //记录每一个文件的进度
        var fileMap = {};
        var thiz = this;
        new WebUploader.Uploader({
            swf: 'webuploader/dist/Uploader.swf',
            auto: true,
            duplicate: true,
            server: '/api/index/uploadFiles',
            pick: { id: '#uploadFiles' + this.id },
            fileVal: 'fileUploads',
            formData: {
                pathName: this.path //上传时的路径参数
            }
        }).on('uploadStart', function (file) {
            var files = thiz.files_;
            fileMap[file.id] = files.length;
            files.push({ fileDesc: file.name, typeImg: typeImgByMime(file.ext), progress: 0, isFinish: false, id: file.id });
        }).on('uploadProgress', function (file, percentage) {
            thiz.files_[fileMap[file.id]].percentage = parseInt(percentage * 100);
        }).on('uploadSuccess', function (file, response) {
            var fileObj = thiz.files_[fileMap[file.id]];
            fileObj.fileName = response.data;
            fileObj.isFinish = true;
        });
    }
}
</script>
