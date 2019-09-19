<template>
    <div id="areaSelectTemplate">
        <el-form-item v-bind:label="type==='form'?'请选择省':''" v-if="deep>0">
            <el-select v-model="province_" placeholder="请选择省" filterable v-on:change="changeProvince">
                <el-option v-bind:key="index" v-for="(item,index) in provinces" v-bind:value="item.value" v-bind:label="item.name"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item v-bind:label="type==='form'?'请选择市':''" v-if="deep>1">
            <el-select v-model="city_" placeholder="请选择市" filterable v-on:change="changeCity">
                <el-option v-bind:key="index" v-for="(item,index) in cities" v-bind:value="item.value" v-bind:label="item.name"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item v-bind:label="type==='form'?'请选择区':''" v-if="deep>2">
            <el-select v-model="county_" placeholder="请选择区" filterable v-on:change="changeCounty">
                <el-option v-bind:key="index" v-for="(item,index) in counties" v-bind:value="item.value" v-bind:label="item.name"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item v-bind:label="type==='form'?'请选择镇':''" v-if="deep>3">
            <el-select v-model="town_" placeholder="请选择镇" filterable>
                <el-option v-bind:key="index" v-for="(item,index) in towns" v-bind:value="item.value" v-bind:label="item.name"></el-option>
            </el-select>
        </el-form-item>
    </div>
</template>
<script>
export default{
    name: 'areaSelectTemplate',
    props: ['type', 'deep','province','city','county','town'],
    data() {
        return { id: this.$UUID(),province_:'',city_:'',county_:'',town_:'',provinces: [], cities: [], counties: [], towns: [] };
    },
    methods: {
        setVal(province,city,county,town){
            if(this.data===undefined){
                this.province_=province;
                this.city_=city;
                this.county_=county;
                this.town_=town;
            }else{
                var thiz=this;
                if(province!==undefined){
                    this.province_=province;
                    this.$emit('update:province', province);
                    this.cities = this.data['cities'].filter(function (val) {
                        return val.parentValue == thiz.province_;
                    });
                }
                if(city!==undefined){
                    this.city_=city;
                    this.counties = this.data['counties'].filter(function (val) {
                        return val.parentValue == thiz.city_;
                    });
                }
                if(county!==undefined){
                    this.county_=county;
                    this.towns = this.data['towns'].filter(function (val) {
                        return val.parentValue == thiz.county_;
                    });
                }
                if(town!==undefined){
                    this.town_=town;
                }
            }
        },
        changeProvince() {
            var thiz=this;
            this.city_ = '';
            this.county_ = '';
            this.town_ = '';
            this.cities = this.data['cities'].filter(function (val) {
                return val.parentValue == thiz.province_;
            });
            this.counties = [];
            this.towns = [];
        },
        changeCity() {
            var thiz = this;
            this.county_ = '';
            this.town_ = '';
            this.counties = this.data['counties'].filter(function (val) {
                return val.parentValue == thiz.city_;
            });
            this.towns = [];
        },
        changeCounty() {
            var thiz = this;
            this.town_ = '';
            this.towns = this.data['towns'].filter(function (val) {
                return val.parentValue == thiz.county_;
            });
        }
    },
    mounted() {
        this.$get('/api/index/areaSelect',function (result) {
            this.data = result.data;
            this.provinces = this.data['provinces'];
            this.cities = [];
            this.counties = [];
            this.towns = [];
            this.setVal(this.province_,this.city_,this.county_,this.town_);
        });
    }
}
</script>