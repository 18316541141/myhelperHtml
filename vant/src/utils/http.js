import axios from 'axios';
//使用缓存的url，部分url数据是需要使用缓存的，统一在这里配置
const cacheUrls = [
    "/api/index/areaSelect", //加载省、市、区、镇列表，基本不怎么变化，所以使用缓存
];

// var loading;
//请求拦截器
axios.interceptors.request.use(
    function(config) {
        var cacheUrls2 = cacheUrls.filter(function(currentValue, index, arr) {
            return currentValue.indexOf(config.url) > -1;
        });
        if (cacheUrls2.length === 0) {
            if (config.params === undefined) {
                config.params = {};
            }
            config.params["r"] = Math.random(); //避免ie浏览器使用缓存
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

/**
 * 上传文件，浏览器必须支持XMLHttpWebRequest对象
 * @param {*} url 提交的url
 * @param {*} postData 提交的内容，可以含有二进制文件
 * @param {*} callback 回调函数
 * @param {*} progress 进度更新回调函数
 */
export function upload(url,postData,callback,progress){
    var thiz=this;
    var formData=new FormData();
    for (var it in postData) {
        if(postData.hasOwnProperty(it)){
            formData.append(it,postData[it]);
        }
    }
    axios.post(url,formData,{
        onUploadProgress(progressEvent) {
            if(progress!==undefined){
                progress.call(thiz,progressEvent);
            }
        },
        headers: {'Content-Type':'multipart/form-data'}
    }).then(createCallback(callback,this));
}

export function post(url,postData,callback){
    this.$openLoading();
    if(callback===undefined){
        axios.post(url).then(createCallback(postData,this));
    }else{
        axios({
            url: url,
            method: 'post',
            data:postData,
            transformRequest: [function (data) {
                let ret = ''
                var connChar='';
                for (let it in data) {
                    if(data.hasOwnProperty(it)){
                        ret += connChar+encodeURIComponent(it) + '=' + encodeURIComponent(data[it]);
                        connChar='&';
                    }
                }
                return ret
            }],
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(createCallback(callback,this));
    }
}

/**
 * 涉及到更新等待池版本号的get请求
 * @param {*} url 请求的url
 * @param {*} getData get请求的数据
 * @param {*} callback 回调函数
 * @param {*} poolNames 等待池名称
 */
export function getUpdate(url,getData,callback,poolNames){
    this.$openLoading();
    axios.get(url,{
        params:getData,
        headers:{'Real-Time-Pool': poolNames.join(',')}
    }).then(createCallback(callback,this));
}

/**
 * 涉及到更新等待池版本号的get请求
 * @param {*} url 请求的url
 * @param {*} postData post请求的数据
 * @param {*} callback 回调函数
 * @param {*} poolNames 等待池名称
 */
export function postUpdate(url,postData,callback,poolNames){
    this.$openLoading();
    axios({
        url: url,
        method: 'post',
        data:postData,
        transformRequest: [function (data) {
            let ret = ''
            var connChar='';
            for (let it in data) {
                if(data.hasOwnProperty(it)){
                    ret += connChar+encodeURIComponent(it) + '=' + encodeURIComponent(data[it]);
                    connChar='&';
                }
            }
            return ret
        }],
        headers: {'Content-Type': 'application/x-www-form-urlencoded','Real-Time-Pool': poolNames.join(',')}
    }).then(createCallback(callback,this));
}

export function get(url,getData,callback){
    this.$openLoading();
    if(callback===undefined){
        axios.get(url).then(createCallback(getData,this));
    }else{
        axios.get(url,{params:getData}).then(createCallback(callback,this));
    }
}

/**
 * 开启加载动画
 */
export function openLoading(){
    if(this.$store.state.loadingCount===0){
        this.$store.state.loadingRet = this.$toast.loading({
            duration: 0,       // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            loadingType: 'spinner'
        });
    }
    this.$store.state.loadingCount++;
}

/**
 * 关闭加载动画
 */
export function closeLoading(){
    if(this.$store.state.loadingCount-1===0){
        setTimeout(() => {
            if(this.$store.state.loadingCount-1===0){
                this.$store.state.loadingRet.clear();
            }
            this.$store.state.loadingCount--;
        },400);
    }else{
        this.$store.state.loadingCount--;
    }
}

function createCallback(callback,myApp){
    return function(response){
        myApp.$closeLoading();
        var data = response.data;
        //登录超时，退出登录
        if (data.code === -10 || data.code === -11) {
            myApp.$store.state.isLogin = false;
            if (data.code === -11) {
                myApp.$notify({message:'强制下线，原因：当前登录用户在其它地方登录。',background:'#f44'});
            }
        }
        //用户无权限，无法操作，但需要后续处理
        else if (data.code === -9) {
            myApp.$notify({message:'当前用户组无操作权限！',background:'#f44'});
        }
        //用户无权限，无法操作
        else if (data.code === -8) {
            myApp.$notify({message:'当前用户组无操作权限！',background:'#f44'});
        }
        //常规错误，
        else if (data.code === -1) {
            myApp.$notify({message:data.msg,background:'#f44'});
            callback.call(myApp,data);
        }
        //成功
        else if (data.code === 0) {
            if (data.msg != null && data.msg != "") {
                myApp.$notify({message:data.msg,background:'#07c160'});
            }
            callback.call(myApp,data);
        }
    }
}

//监听池的map
const regPoolMap={};
/**
 * 注册监听池
 * @param {*} poolName 监听池名称
 * @param {*} callback 当版本发生变化时触发的回调函数
 */
export function regPool(poolName,callback){
    if (regPoolMap[poolName] === undefined) {
        regPoolMap[poolName] = {
            callback: callback,
            version: undefined,
            count: 1,
            wait:false
        };
        this.$realTimeGet(poolName);
    } else {
        regPoolMap[poolName].count++;
        regPoolMap[poolName].version = undefined;
        if (regPoolMap[poolName].wait === false) {
            this.$realTimeGet(poolName);
        }
    }
}

/**
 * 实时get请求获取最新数据
 * @param {*} poolName 
 */
export function realTimeGet(poolName){
    regPoolMap[poolName].wait = true;
    var thiz=this;
    axios.get('/api/index/realTime',{
        headers:{
            'Real-Time-Pool': poolName, 
            'Real-Time-Version': regPoolMap[poolName].version
        }
    }).then(function(response){
        regPoolMap[poolName].wait = false;
        regPoolMap[poolName].version = response.headers['real-time-version'];
        if(regPoolMap[poolName]!==null && regPoolMap[poolName]!==undefined){
            if (regPoolMap[poolName].count === 0) {
                return;
            }
            var data=response.data;
            if (data.code === -10 || data.code === -11) {
                thiz.$cancelAllPools();
                thiz.$store.state.isLogin = false;
                if (data.code === -11) {
                    thiz.$message({
                        message: "强制下线，原因：当前登录用户在其它地方登录。",
                        type: "warning"
                    });
                }
                if (regPoolMap[poolName].count > 0) {
                    regPoolMap[poolName].count--;
                    thiz.$realTimeGet(poolName);
                }
            } else if (data.code === 1) {
                thiz.$realTimeGet(poolName);
            } else if (data.code === 0) {
                thiz.$realTimeGet(poolName);
                regPoolMap[poolName].callback();
            }
        }
    });
}

/**
 * 注销一个实时监听池
 * @param {*} poolName 
 */
export function cancelPool(poolName){
    if (regPoolMap[poolName].count > 0) {
        regPoolMap[poolName].count--;
    }
}

/**
 * 注销所有的实时监听池
 */
export function cancelAllPools(){
    for (var key in regPoolMap) {
        if (regPoolMap.hasOwnProperty(key) && regPoolMap[key].count>0) {
            regPoolMap[key].count--;
        }
    }
}
