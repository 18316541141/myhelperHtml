<template>
    <div v-bind:id="'imgViewer'+id">
        <slot></slot>
    </div>
</template>
<script>
export default {
    data(){
        return {
            id:this.$UUID()
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
