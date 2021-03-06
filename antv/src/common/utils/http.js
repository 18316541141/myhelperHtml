import axios from 'axios';
//使用缓存的url，部分url数据是需要使用缓存的，统一在这里配置
const cacheUrls = [
    "/index/areaSelect" //加载省、市、区、镇列表，基本不怎么变化，所以使用缓存
];

//请求拦截器
axios.interceptors.request.use(
    function(config) {
        var cacheUrls2 = cacheUrls.filter(function(currentValue) {
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
	//如果符合，表示使用重载方法：post(url, getData, callback)
	else if($.type(getData)==='object' && $.type(callback)==='function' && loadAni===undefined){
		loadAni=true;
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
	//如果符合，表示使用重载方法：post(url, postData, callback)
	else if($.type(postData)==='object' && $.type(callback)==='function' && loadAni===undefined){
		loadAni=true;
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
                    if(Object.prototype.hasOwnProperty.call(data,it)){
						ret += connChar + encodeURIComponent(it) + '=' + encodeURIComponent(data[it] === null || data[it] === undefined ? '' : data[it]);
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
    //相当于重载：getUpdate(url,poolNames)
    if($.type(getData)==='array' && callback===undefined && poolNames===undefined){
        getData={'realTimePools':getData.join(',')};
    }
    //相当于重载：getUpdate(url,getData,poolNames)
    else if($.type(getData)==='object' && $.type(callback)==='array' && poolNames===undefined){
        getData['realTimePools']=callback.join(',');
        callback=undefined;
    }
    //相当于重载：getUpdate(url,getData,callback,poolNames)
    else if($.type(getData)==='object' && $.type(callback)==='function' && $.type(poolNames)==='array'){
        getData['realTimePools']=poolNames.join(',');
    }
    this.$openLoading();
    axios.get(url,{
        params:getData
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
    //相当于重载：postUpdate(url,poolNames)
    if($.type(postData)==='array' && callback===undefined && poolNames===undefined){
        if(url.indexOf('?')>=0){
            url+='&realTimePools='+postData.join(',');
        }else{
            url+='?realTimePools='+postData.join(',');
        }
    }
    //相当于重载：postUpdate(url,postUpdate,poolNames)
    else if($.type(postData)==='object' && $.type(callback)==='array' && poolNames===undefined){
        if(url.indexOf('?')>=0){
            url+='&realTimePools='+callback.join(',');
        }else{
            url+='?realTimePools='+callback.join(',');
        }
        callback=undefined;
    }
    //相当于重载：postUpdate(url,getData,callback,poolNames)
    else if($.type(postUpdate)==='object' && $.type(callback)==='function' && $.type(poolNames)==='array'){
        if(url.indexOf('?')>=0){
            url+='&realTimePools='+poolNames.join(',');
        }else{
            url+='?realTimePools='+poolNames.join(',');
        }
    }
    this.$openLoading();
    axios({
        url: url,
        method: 'post',
        data:postData,
        transformRequest: [function (data) {
            let ret = ''
            var connChar='';
            for (let it in data) {
                if(Object.prototype.hasOwnProperty.call(data,it)){
					ret += connChar + encodeURIComponent(it) + '=' + encodeURIComponent(data[it] === null || data[it] === undefined ? '' : data[it]);
                    connChar='&';
                }
            }
            return ret
        }]
    }).then(createCallback(this,callback));
}

/**
 * 开启加载动画
 */
export function openLoading(){
    if(this.$store.state.loadingCount===0){
        this.$store.state.loadingStatus=true;
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
                var thiz=this;
                setTimeout(() => {
                    thiz.$store.state.loadingStatus=false;
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
                myApp.$message.warning("强制下线，原因：当前登录用户在其它地方登录。");
            }
        }
        //用户无权限，无法操作，但需要后续处理
        else if (data.code === -9) {
            myApp.$message.warning("当前用户组无操作权限！");
			if(callback!==undefined){
                callback.call(myApp,data);
            }
        }
        //用户无权限，无法操作
        else if (data.code === -8) {
            myApp.$message.warning("当前用户组无操作权限！");
        }
        //常规错误，
        else if (data.code === -1) {
            myApp.$message.error(data.msg);
            if(callback!==undefined){
                callback.call(myApp,data);
            }
        }
        //成功
        else if (data.code === 0) {
            if (data.msg != null && data.msg != "") {
                myApp.$message.success(data.msg);
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
    axios.get(this.$store.state.PROXY+'/index/realTime',{
        params:{
            'realTimePool': poolName, 
            'realTimeVersion': regPoolMap[poolName].version
        }
    }).then(function(response){
        var data=response.data;
        if(regPoolMap[poolName]!==null && regPoolMap[poolName]!==undefined){
            if (regPoolMap[poolName].count === 0) {
                return;
            }
            if (data.code === -10 || data.code === -11) {
                thiz.$cancelAllPools();
                thiz.$store.state.isLogin = false;
                if (data.code === -11) {
                    this.$message.warning('强制下线，原因：当前登录用户在其它地方登录。');
                }
                if (regPoolMap[poolName].count > 0) {
                    regPoolMap[poolName].count--;
                    thiz.$realTimeGet(poolName);
                }
            } else if (data.code === 1 || data.code === 0) {
                regPoolMap[poolName].wait = false;
                regPoolMap[poolName].version = data.data['realTimeVersion'];
                thiz.$realTimeGet(poolName);
                if (data.code === 0) {
                    regPoolMap[poolName].callback.call(thiz);
                }
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
        if (Object.prototype.hasOwnProperty.call(regPoolMap,key) && regPoolMap[key].count>0) {
            regPoolMap[key].count--;
        }
    }
}