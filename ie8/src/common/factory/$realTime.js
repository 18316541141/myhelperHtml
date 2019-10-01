export default function $realTime($http) {
    //注册的监听池
    var regPoolMap = {};
    return {
        /**
         * 注册一个实时监听池，当发生变化是会调用callback
         * @poolName 监听池名称
         * @callback 监听会调
         */
        regPool: function (poolName, callback) {
            if (regPoolMap[poolName] === undefined) {
                regPoolMap[poolName] = {
                    callback: callback,
                    version: undefined,
                    count: 1,
                    wait: false
                };
                this.get(poolName);
            } else {
                regPoolMap[poolName].count++;
                regPoolMap[poolName].version = undefined;
                if (regPoolMap[poolName].wait === false) {
                    this.get(poolName);
                }
            }
        },
        /**
         * 注销一个实时监听池
         * @poolName 监听池名称
         */
        cancel: function (poolName) {
            if (regPoolMap[poolName].count > 0) {
                regPoolMap[poolName].count--;
            }
        },
        cancelAll: function () {
            for (var key in regPoolMap) {
                if (regPoolMap.hasOwnProperty(key) && regPoolMap[key].count > 0) {
                    regPoolMap[key].count--;
                }
            }
        },
        //对请求参数添加随机的v参数，避免缓存
        randomV: function (params) {
            if (params === undefined) {
                params = { v: Math.random() };
            } else {
                params['v'] = Math.random();
            }
            return params;
        },
        //使用get请求实时获取最新数据
        get: function (poolName) {
            var thiz = this;
            regPoolMap[poolName].wait = true;
            $http({ method: 'GET', params: { v: Math.random(),realTimePool:poolName, realTimeVersion:regPoolMap[poolName].version }, url: '/api/index/realTime' })
                .success(function (response, status, headers, config) {
                    regPoolMap[poolName].wait = false;
                    regPoolMap[poolName].version = headers('Real-Time-Version');
                    if ($.type(regPoolMap[poolName]) === 'object') {
                        if (regPoolMap[poolName].count === 0) {
                            return;
                        }
                        if (response.code === -10 || response.code === -11) {
                            thiz.cancelAll();
                            logoutCallback();
                            if (response.code === -11) {
                                layuiLayer.alert('强制下线，原因：当前登录用户在其它地方登录。', { icon: 5 });
                            }
                            if (regPoolMap[poolName].count > 0) {
                                regPoolMap[poolName].count--;
                                thiz.get(poolName);
                            }
                        } else if (response.code === 1) {
                            thiz.get(poolName);
                        } else if (response.code === 0) {
                            thiz.get(poolName);
                            regPoolMap[poolName].callback();
                        }
                    }
                    thiz = null;
                });
        },
        /**
         * 更新版本号
         * @url 请求的url
         * @params 请求的参数。
         * @poolNames 等待池名称，必须是数组
         */
        getUpdate: function (url, params, poolNames) {
            if($.type(params)==='array' && poolNames===undefined){
                poolNames=params;
                params={v:Math.random()};
            }else if($.type(params)==='object' && poolNames===undefined){
                params['v']=Math.random();
                poolNames=[];
            }
            params['realTimePools']=poolNames.join(',');
            var ret = $http({ method: 'GET', params: params, url: url });
            ret.mySuccess = function (callback) {
                ret.success(myCallback(callback));
            }
            return ret;
        },
        postUpdate: function (url, params, poolNames) {
            if($.type(params)==='array' && poolNames===undefined){
                poolNames=params;
                params={v:Math.random()};
            }else if($.type(params)==='object' && poolNames===undefined){
                params['v']=Math.random();
                poolNames=[];
            }
            params['realTimePools']=poolNames.join(',');
            var ret = $http({ method: 'POST', url: url, params: params});
            ret.mySuccess = function (callback) {
                ret.success(myCallback(callback));
            };
            return ret;
        }
    };
}