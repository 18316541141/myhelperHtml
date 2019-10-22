//注册自定义http请求处理器
function $myHttp($http) {
    return {
        //发送get请求，如果缓存内有该请求的资源，则使用缓存的
        getCache: function (url, params, ani) {
            if (params === undefined && ani === undefined) {
                params = {};
                ani = true;
            } else if ($.type(params) === 'boolean' && ani === undefined) {
                ani = params;
                params = {};
            } else if (params != undefined && ani === undefined) {
                ani = true;
            }
            var ret = $http({ method: 'GET', params: params, url: url });
            ret.mySuccess = function (callback) {
                if (callback === undefined) {
                    callback = function () { };
                }
                ret.success(myCallback(callback, ani));
            };
            return ret;
        },
        get: function (url, params, ani) {
            if (params === undefined && ani === undefined) {
                params = { v: Math.random() };
                ani = true;
            } else if ($.type(params) === 'boolean' && ani === undefined) {
                ani = params;
                params = { v: Math.random() };
            } else if (params != undefined && ani === undefined) {
                ani = true;
            }
            var ret = $http({ method: 'GET', params: params, url: url });
            ret.mySuccess = function (callback) {
                if (callback === undefined) {
                    callback = function () { };
                }
                ret.success(myCallback(callback, ani));
            };
            return ret;
        },
        post: function (url, params, ani) {
            if (params === undefined && ani === undefined) {
                params = { v: Math.random() };
                ani = true;
            } else if ($.type(params) === 'boolean' && ani === undefined) {
                ani = params;
                params = { v: Math.random() };
            } else if (params != undefined && ani === undefined) {
                ani = true;
            }
            var ret = $http({ method: 'POST', url: url, params: params });
            ret.mySuccess = function (callback) {
                if (callback === undefined) {
                    callback = function () { };
                }
                ret.success(myCallback(callback, ani));
            };
            return ret;
        },
        jsonp: function (url, params) {
            var ret = $http.jsonp(url + '?callback=JSON_CALLBACK&' + $.param(params));
            ret.mySuccess = function (callback) {
                if (callback === undefined) {
                    callback = function () { };
                }
                ret.success(callback);
            };
        }
    };
}

module.exports = $myHttp;

/**
 * 自定义回调函数
 * @param {*} callback 最终回调函数
 * @param {*} ani 是否显示加载动画，默认是显示
 */
function myCallback(callback, ani) {
    if (ani === undefined) {
        ani = true;
    }
    var index;
    if (ani === true) {
        index = window.layuiLayer.load(0);
    }
    return function (result, textStatus, req) {
        if (ani === true) {
            setTimeout(function () {
                window.layuiLayer.close(index);
            }, 300);
        }
        //登录超时，退出登录
        if (result.code === -10 || result.code === -11) {
            logoutCallback();
            if (result.code === -11) {
                window.layuiLayer.alert('强制下线，原因：当前登录用户在其它地方登录。', { icon: 5 });
            }
        }
        //用户无权限，无法操作，但需要后续处理
        else if (result.code === -9) {
            window.layuiLayer.msg('当前用户组无操作权限！', { icon: 5, anim: 6 });
            callback(result, textStatus, req);
        }
        //用户无权限，无法操作
        else if (result.code === -8) {
            window.layuiLayer.msg('当前用户组无操作权限！', { icon: 5, anim: 6 });
        }
        //常规错误，
        else if (result.code === -1) {
            window.layuiLayer.msg(result.msg, { icon: 5, anim: 6, time: 1000 });
            callback(result, textStatus, req);
        }
        //成功
        else if (result.code === 0) {
            if (result.msg !== null && result.msg !== '') {
                window.layuiLayer.msg(result.msg, { icon: 1 });
            }
            callback(result, textStatus, req);
        }
        callback = null;
    }
};