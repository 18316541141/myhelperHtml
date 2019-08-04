<template>
    <div>
        <div class="scroll-top" v-bind:style="{height:topHeight+'px'}">
            <slot name="top"></slot>
        </div>
        <div class="scroll-center" v-bind:style="{top:topHeight+'px',bottom:bottomHeight+'px'}">
            <slot name="center"></slot>
        </div>
        <div class="scroll-bottom" v-bind:style="{height:bottomHeight+'px'}">
            <slot name="bottom"></slot>
        </div>
    </div>
</template>
<script>
export default {
    props:['topHeight','bottomHeight']
}
</script>
<style scoped>
    .scroll-top{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }
    .scroll-center{
        position: absolute;
        left: 0;
        right: 0;
    }
    .scroll-bottom{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>