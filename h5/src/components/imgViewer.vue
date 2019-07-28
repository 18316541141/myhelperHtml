<template>
    <div v-bind:id="'imgViewer'+id">
        <slot></slot>
    </div>
</template>
<script>
import Viewer from 'viewerjs'
import UUID from '../utils/UUID.js'
export default {
    data(){
        return {
            id:new UUID().id
        };
    },
    methods:{
        render(){
            new Viewer(document.getElementById(this.id), {
                url(image) {
                    debugger;
                    return image.datas.src.replace('?size=160', '');
                }
            });
        }
    }
}
</script>
