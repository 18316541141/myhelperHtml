<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>大图片浏览</el-breadcrumb-item>
        </el-breadcrumb>
        <img-viewer ref="imgViewer">
            <el-table v-bind:data="tableData" style="width: 100%" class="testabcaa">
                <el-table-column label="图片" width="180">
                    <template slot-scope="scope">
                        <el-image v-bind:src="$store.state.PROXY+scope.row.img" v-bind:data-original="$store.state.PROXY+scope.row.bigImg"></el-image>
                    </template>
                </el-table-column>
            </el-table>
        </img-viewer>
    </div>
</template>
<script>
export default {
    name:'m13',
    data(){
        return { tableData: [] };
    },
    mounted(){
        var thiz=this;
        setTimeout(function(){
            thiz.tableData = [
                { img: '/index/showImage?pathName=test&imgName=2cc06f1bffa45ad0fa9c22474081ed0d253a7d63', bigImg:'/index/showImage?pathName=test&imgName=5dbc68f5ab19c9bd74dc21b15fd360e86151c65a' },
                { img: '/index/showImage?pathName=test&imgName=2cc06f1bffa45ad0fa9c22474081ed0d253a7d63', bigImg:'/index/showImage?pathName=test&imgName=5dbc68f5ab19c9bd74dc21b15fd360e86151c65a' },
                { img: '/index/showImage?pathName=test&imgName=2cc06f1bffa45ad0fa9c22474081ed0d253a7d63', bigImg:'/index/showImage?pathName=test&imgName=5dbc68f5ab19c9bd74dc21b15fd360e86151c65a' },
                { img: '/index/showImage?pathName=test&imgName=2cc06f1bffa45ad0fa9c22474081ed0d253a7d63', bigImg:'/index/showImage?pathName=test&imgName=5dbc68f5ab19c9bd74dc21b15fd360e86151c65a' },
                { img: '/index/showImage?pathName=test&imgName=2cc06f1bffa45ad0fa9c22474081ed0d253a7d63', bigImg:'/index/showImage?pathName=test&imgName=5dbc68f5ab19c9bd74dc21b15fd360e86151c65a' },
                { img: '/index/showImage?pathName=test&imgName=2cc06f1bffa45ad0fa9c22474081ed0d253a7d63', bigImg:'/index/showImage?pathName=test&imgName=5dbc68f5ab19c9bd74dc21b15fd360e86151c65a' },
                { img: '/index/showImage?pathName=test&imgName=2cc06f1bffa45ad0fa9c22474081ed0d253a7d63', bigImg:'/index/showImage?pathName=test&imgName=5dbc68f5ab19c9bd74dc21b15fd360e86151c65a' }
            ];
            thiz.$refs.imgViewer.render();
        },1000);
    }
}
</script>
