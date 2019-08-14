<template>
    <div>
        <van-search v-bind:placeholder="placeholder" v-model="value" show-action>
            <span slot="label" v-on:click="show=true" v-text="name">当天</span>
            <div slot="action" @click="onSearch">搜索</div>
        </van-search>
        <van-action-sheet title="请选择日期" v-on:search="onSearch" v-model="show" v-bind:actions="[{name:'当天'},{name:'一周内'},{name:'半个月内'},{name:'一个月内'},{name:'三个月内'},{name:'半年内'},{name:'一年内'},{name:'全部'}]" v-on:select="onSelect"/>
    </div>
</template>
<script>
export default {
    props:['dateStart','likeText','placeholder','current'],
    data(){
        return {
            name:'当天',
            value:null,
            show:false,
        };
    },
    watch:{
        value(val){
            this.$emit('update:likeText',val);
        }
    },
    methods:{
        onSearch(event){
            this.$emit('search',event);
        },
        onSelect(action,index){
            this.name=action.name;
            var d = new Date();
            if(index === 1){
                if(this.current===true){
                    d.setDate(d.getDate()-(d.getDay()-1));
                }else{
                    d.setDate(d.getDate()-7);
                }
            }else if(index === 2){
                var monBefore=d.getMonth();
                d.setDate(d.getDate()-15);
                var monAfter=d.getMonth();
                if(this.current===true && monAfter<monBefore){
                    d.setDate(1);
                    d.setMonth(d.getMonth()+1);
                }
            }else if(index === 3){
                if(this.current===true){
                    d.setDate(1);
                }else{
                    d.setMonth(d.getMonth()-1);
                }
            }else if(index === 4){
                if(this.current===true){
                    d.setMonth(d.getMonth()-2);
                }else{
                    d.setMonth(d.getMonth()-3);
                }
            }else if(index === 5){
                if(this.current===true){
                    d.setMonth(d.getMonth()-5);
                }else{
                    d.setMonth(d.getMonth()-6);
                }
            }else if(index === 6){
                if(this.current===true){
                    d.setMonth(1);
                    d.setDate(1);
                }else{
                    d.setFullYear(d.getFullYear()-1);
                }
            }else if(index === 6){
                this.$emit('update:dateStart',null);
                this.show=false;
                return;
            }
            this.show=false;
            this.$emit('update:dateStart',this.$moment(d).format('YYYY-MM-DD'));
        }
    },
    mounted(){
        this.$emit('update:dateStart',this.$moment(new Date()).format('YYYY-MM-DD'));
    }
}
</script>