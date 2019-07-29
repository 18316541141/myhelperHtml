<template>
    <div v-bind:id="'imgViewer'+id">
        <slot></slot>
    </div>
</template>
<script>
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.min.css'
import UUID from '../utils/UUID.js'
export default {
    data(){
        return {
            id:new UUID().id
        };
    },
    methods:{
        render(){
            this.$nextTick(function(){
                var thiz=this;
                setTimeout(() => {
                    new Viewer(document.getElementById('imgViewer'+thiz.id), {
                        url: 'data-original'
                    });
                },500);
            });
        }
    }
}
</script>
