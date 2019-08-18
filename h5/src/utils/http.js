import axios from 'axios';
//使用缓存的url，部分url数据是需要使用缓存的，统一在这里配置
const cacheUrls = [
    "/api/index/areaSelect" //加载省、市、区、镇列表，基本不怎么变化，所以使用缓存
];

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
 * 提交get请求
 * @param {*} url 请求的url
 * @param {*} getData 请求参数
 * @param {*} callback 回调函数
 * @param {*} loadAni 是否显示加载动画，默认是true
 */
export function get(url,getData,callback,loadAni){
    //如果符合，表示使用重载方法：post(url)
    if(getData===undefined){
        loadAni=true;
    }
    //如果符合，表示使用重载方法：post(url, loadAni)
    else if($.type(getData)==='boolean' && callback===undefined){
        getData=undefined;
        loadAni=getData;
    }
    //如果符合，表示使用重载方法：post(url, getData)
    else if($.type(getData)==='object' && callback===undefined){
        loadAni=true;
    }
    //如果符合，表示使用重载方法：post(url, callback)
    else if($.type(getData)==='function' && callback===undefined){
        callback=getData;
        getData=undefined;
        loadAni=true;
    }
    //如果符合，表示使用重载方法：post(url, getData, loadAni)
    else if($.type(getData)==='object' && $.type(callback)==='boolean' && loadAni===undefined){
        loadAni=callback;
        callback=undefined;
    }
    //如果符合，表示使用重载方法：post(url, callback, loadAni)
    else if($.type(getData)==='function' && $.type(callback)==='boolean' && loadAni===undefined){
        loadAni=callback;
        callback=getData;
    }
    if(loadAni===true){
        this.$openLoading();
    }
    axios.get(url,{params:getData}).then(createCallback(this,callback,loadAni));
}

/**
 * 提交post请求
 * @param {*} url 请求的url
 * @param {*} postData 请求参数
 * @param {*} callback 回调函数
 * @param {*} loadAni 是否显示加载动画，默认是true
 */
export function post(url,postData,callback,loadAni){
    //如果符合，表示使用重载方法：post(url)
    if(postData===undefined){
        loadAni=true;
    }
    //如果符合，表示使用重载方法：post(url, loadAni)
    else if($.type(postData)==='boolean' && callback===undefined){
        postData=undefined;
        loadAni=postData;
    }
    //如果符合，表示使用重载方法：post(url, postData)
    else if($.type(postData)==='object' && callback===undefined){
        loadAni=true;
    }
    //如果符合，表示使用重载方法：post(url, callback)
    else if($.type(postData)==='function' && callback===undefined){
        callback=postData;
        postData=undefined;
        loadAni=true;
    }
    //如果符合，表示使用重载方法：post(url, postData, loadAni)
    else if($.type(postData)==='object' && $.type(callback)==='boolean' && loadAni===undefined){
        loadAni=callback;
        callback=undefined;
    }
    //如果符合，表示使用重载方法：post(url, callback, loadAni)
    else if($.type(postData)==='function' && $.type(callback)==='boolean' && loadAni===undefined){
        loadAni=callback;
        callback=postData;
    }
    if(loadAni===true){
        this.$openLoading();
    }
    axios({
        url: url,
        method: 'post',
        data:postData,
        transformRequest: [function (data) {
            if($.type(data)==='object'){
                let ret = ''
                var connChar='';
                for (let it in data) {
                    if(data.hasOwnProperty(it)){
                        ret += connChar+encodeURIComponent(it) + '=' + encodeURIComponent(data[it]);
                        connChar='&';
                    }
                }
                return ret
            }
        }],
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(createCallback(this,callback,loadAni));
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
    }).then(createCallback(this,callback));
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
    }).then(createCallback(this,callback));
}

/**
 * 开启加载动画
 */
export function openLoading(){
    if(this.$store.state.loadingCount===0){
        document.getElementById('loading-container').setAttribute('style','display:block;');
        this.$store.state.loadingRet = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
            fullscreen :true,
            target:document.getElementById('loading-area')
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
                this.$store.state.loadingRet.close();
                setTimeout(() => {
                    document.getElementById('loading-container').setAttribute('style','display:none;');
                }, 300);
                this.$store.state.loadingCount--;
            }else if(this.$store.state.loadingCount>0){
                this.$store.state.loadingCount--;
            }
        },350);
    }else if(this.$store.state.loadingCount>0){
        this.$store.state.loadingCount--;
    }
}

/**
 * 创建ajax异步请求的回调函数。
 * @param {*} myApp vue对象
 * @param {*} callback 回调函数
 * @param {*} loadAni 是否启用加载动画，默认是true
 */
function createCallback(myApp,callback,loadAni){
    //相当于调用重载方法：createCallback(myApp)
    if(callback===undefined){
        loadAni=true;
    //相当于调用重载方法：createCallback(myApp,loadAni)
    }else if($.type(callback)==='boolean' && loadAni===undefined){
        loadAni=callback;
        callback=undefined;
    //相当于调用重载方法：createCallback(myApp,callback)
    }else if($.type(callback)==='function' && loadAni===undefined){
        loadAni=true;
    }
    return function(response){
        if(loadAni===true){
            myApp.$closeLoading();
        }
        var data = response.data;
        //登录超时，退出登录
        if (data.code === -10 || data.code === -11) {
            myApp.$store.state.isLogin = false;
            if (data.code === -11) {
                myApp.$message({
                    message: "强制下线，原因：当前登录用户在其它地方登录。",
                    type: "warning"
                });
            }
        }
        //用户无权限，无法操作，但需要后续处理
        else if (data.code === -9) {
            myApp.$message({
                message: "当前用户组无操作权限！",
                type: "warning"
            });
			if(callback!==undefined){
                callback.call(myApp,data);
            }
        }
        //用户无权限，无法操作
        else if (data.code === -8) {
            myApp.$message({
                message: "当前用户组无操作权限！",
                type: "warning"
            });
        }
        //常规错误，
        else if (data.code === -1) {
            myApp.$message({ message: data.msg, type: "error" });
            if(callback!==undefined){
                callback.call(myApp,data);
            }
        }
        //成功
        else if (data.code === 0) {
            if (data.msg != null && data.msg != "") {
                myApp.$message({ message: data.msg, type: "success" });
            }
            if(callback!==undefined){
                callback.call(myApp,data);
            }
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
                regPoolMap[poolName].callback.call(thiz);
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