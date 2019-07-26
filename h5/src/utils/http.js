import axios from 'axios';
//使用缓存的url，部分url数据是需要使用缓存的，统一在这里配置
const cacheUrls = [
    "/index/areaSelect" //加载省、市、区、镇列表，基本不怎么变化，所以使用缓存
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
export function post(url,postData,callback){
    if(callback===undefined){
        axios.post(url).then(createCallback(postData,this));
    }else{
        axios.post(url,postData).then(createCallback(callback,this));
    }
}

export function get(url,getData,callback){
    if(callback===undefined){
        axios.get(url).then(createCallback(getData,this));
    }else{
        axios.get(url,{params:getData}).then(createCallback(callback,this));
    }
}

function createCallback(callback,myApp){
    return function(response){
        var data = response.data;
        //登录超时，退出登录
        if (data.code === -10 || data.code === -11) {
            myApp.$data.isLogin = false;
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
            callback(data);
        }
        //成功
        else if (data.code === 0) {
            if (data.msg != null && data.msg != "") {
                myApp.$message({ message: data.msg, type: "success" });
            }
            callback(data);
        }
    }
}

//响应拦截器
// axios.interceptors.response.use(
//     function(response) {
    //loading.close();
    // var data = response.data;
    //登录超时，退出登录
    // if (data.code === -10 || data.code === -11) {
    //     myApp.$data.isLogin = false;
    //     if (data.code === -11) {
    //     myApp.$message({
    //         message: "强制下线，原因：当前登录用户在其它地方登录。",
    //         type: "warning"
    //     });
    //     }
    // }
    // //用户无权限，无法操作，但需要后续处理
    // else if (data.code === -9) {
    //     myApp.$message({
    //     message: "当前用户组无操作权限！",
    //     type: "warning"
    //     });
    // }
    // //用户无权限，无法操作
    // else if (data.code === -8) {
    //     myApp.$message({
    //     message: "当前用户组无操作权限！",
    //     type: "warning"
    //     });
    // }
    // //常规错误，
    // else if (data.code === -1) {
    //     myApp.$message({ message: data.msg, type: "error" });
    // }
    // //成功
    // else if (data.code === 0) {
    //     if (data.msg != null && data.msg != "") {
    //         myApp.$message({ message: data.msg, type: "success" });
    //     }
    // }
    // return response;
    // },
    // function(error) {
    //     return Promise.reject(error);
    // }
// );