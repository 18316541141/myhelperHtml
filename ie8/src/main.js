var angular = require('angular');
require('layui-src/dist/layui.all');
require('layui-src/dist/css/modules/laydate/default/laydate.css');
require('layui-src/dist/css/modules/layer/default/layer.css');
require('layui-src/dist/css/modules/code.css');
require('layui-src/dist/css/layui.css');
require('./css/login.css');
require('webuploader/css/webuploader.css');
require('jquery.cookie');
require('./common/utils/ng-layer.js');
require('@ztree/ztree_v3/js/jquery.ztree.core.min.js');
require('@ztree/ztree_v3/js/jquery.ztree.exhide.min.js');
require('@ztree/ztree_v3/css/metroStyle/metroStyle.css');
window.UUID = require('./common/utils/UUID.js');
window.Hashes = require('jshashes');
// window.Moment = require('moment');//引入后ie8有问题。
window.webuploader = require('webuploader');
window.Highcharts = require('highcharts');
window.$ = $;
window.layui = layui;
window.layuiForm = layui.form;
window.layuiLayer = layui.layer;
window.layuiElement = layui.element;
window.layuiTree = layui.tree;
window.layuiTable = layui.table;
window.layuiLaypage = layui.laypage;
window.layuiLaydate = layui.laydate;

window.myApp = angular.module('my-app', ['ng-layer']);

//注册全局变量
(function(){
    window.myApp.value('PROXY',PROXY);
    window.myApp.value('supportPlaceholder','placeholder' in document.createElement('input'));
}());

//注册异步页面
(function(){
    require('../static/common/system/editLogEntity.html');
    require('../static/common/system/heartbeatEntity.html');
    require('../static/common/system/logEntity.html');
    require('./regHtmlPages.js')();
}());

//注册通用组件
(function () {
    window.myApp.directive('datetime', require('./common/components/datetime.ang.html'));
    window.myApp.directive('mySelect', require('./common/components/mySelect.ang.html'));
    window.myApp.directive('myCheckbox', require('./common/components/myCheckbox.ang.html'));
    window.myApp.directive('pageDataTable', require('./common/components/pageDataTable.ang.html'));
    window.myApp.directive('pieChart', require('./common/components/pieChart.ang.html'));
    window.myApp.directive('histogram', require('./common/components/histogram.ang.html'));
    window.myApp.directive('uploadFiles', require('./common/components/uploadFiles.ang.html'));
    window.myApp.directive('uploadExcel', require('./common/components/uploadExcel.ang.html'));
    window.myApp.directive('treeForm', require('./common/components/treeForm.ang.html'));
    require('./regComponents.js')(window.myApp);
}());

//注册通用菜单
(function () {
    window.myApp.controller('editLogEntity', require('./common/menus/system/editLogEntity.js'));
    window.myApp.controller('heartbeatEntity', require('./common/menus/system/heartbeatEntity.js'));
    window.myApp.controller('logEntity', require('./common/menus/system/logEntity.js'));
    require('./regMenus.js')(window.myApp);
}());

//注册通用校验
(function () {
    window.myApp.directive('ngRequired2', require('./common/validates/ngRequired2.js'));
    window.myApp.directive('ngLength', require('./common/validates/ngLength.js'));
    window.myApp.directive('ngMinlength2', require('./common/validates/ngMinlength2.js'));
    window.myApp.directive('ngMaxlength2', require('./common/validates/ngMaxlength2.js'));
    window.myApp.directive('ngMinDouble', require('./common/validates/ngMinDouble.js'));
    window.myApp.directive('ngMaxDouble', require('./common/validates/ngMaxDouble.js'));
    window.myApp.directive('ngUrl', require('./common/validates/ngUrl.js'));
    window.myApp.directive('ngMobile', require('./common/validates/ngMobile.js'));
    window.myApp.directive('ngEqualTo', require('./common/validates/ngEqualTo.js'));
    window.myApp.directive('ngIsInt', require('./common/validates/ngIsInt.js'));
    require('./regValidates.js')(window.myApp);
}());

//注册业务组件
(function () {
    window.myApp.factory('$myHttp', require('./common/factories/$myHttp.js'));
    window.myApp.factory('$realTime', require('./common/factories/$realTime.js'));
    window.myApp.factory('$moment', require('./common/factories/$moment.js'));
    require('./regFactories.js')(window.myApp);
}());

/**
 * layui的datatable默认的配置
 */
layuiTable.set({
    autoSort: false,
    page: {
        layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
    },
    limit: 20,
    limits: [20, 40, 60, 80, 100],
    method: 'post',
    loading: true,
    defaultToolbar: ['filter'],
    request: {
        pageName: 'currentPageIndex',
        limitName: 'pageSize'
    },
    parseData: function (result) {
        var data = result.data;
        var ret = {};
        if (result.code === -10 || result.code === -11) {
            logoutCallback();
            if (result.code === -11) {
                layuiLayer.alert('强制下线，原因：当前登录用户在其它地方登录。', { icon: 5 });
            }
            ret = { code: result.code, count: 0, data: [] };
        }
        //用户无权限，无法操作，但需要后续处理
        else if (result.code === -9) {
            ret = { code: result.code, msg: '当前用户组无操作权限！', count: 0, data: [] };
        }
        //用户无权限，无法操作
        else if (result.code === -8) {
            ret = { code: result.code, msg: '当前用户组无操作权限！', count: 0, data: [] };
        }
        //常规错误，
        else if (result.code === -1) {
            ret = { code: result.code, msg: response.msg, count: 0, data: [] };
        }
        //成功
        else if (result.code === 0) {
            ret = { code: result.code, count: data.totalItemCount, data: data.pageDataList };
        }
        return ret;
    }
});

window.myApp.controller('main-body', function ($scope, $myHttp, $timeout) {
    $myHttp.get($scope.PROXY+'/index/loadLoginData').mySuccess(function (result) {
        var data = result.data;
        $scope.leftMenus = data.leftMenus;
        $.cookie('username', data.username);
        $timeout(function () {
            $('.layui-nav-bar').remove();
            layuiElement.render('nav');
        });
    });

    //根据菜单名称找出菜单
    $scope.findLeftMenuByName = function (name) {
        var leftMenus = $scope.leftMenus;
        for (var i = 0, len = leftMenus.length; i < len; i++) {
            var childMenus = leftMenus[i].leftMenus;
            for (var j = 0, len = childMenus.length; j < len; j++) {
                if (childMenus[j].name === name) {
                    return childMenus[j];
                }
            }
        }
        return null;
    };
    $scope.menus = [];
    /**
	 * 打开指定菜单页
	 */
    $scope.openMenuPage = function (name) {
        var menus = $scope.menus;
        var exist = false;
        for (var i = 0, len = menus.length; i < len; i++) {
            if (menus[i].name == name) {
                exist = true;
                break;
            }
        }
        if (!exist) {
            var ret = $scope.findLeftMenuByName(name);
            $scope.menus[$scope.menus.length] = {
                title: ret.title,
                url: ret.url,
                name: name
            };
        }
        $timeout(function () {
            $('[data-menu-name="' + name + '"]').click();
        });
    };

    //关闭菜单选项卡
    $scope.close = function (name) {
        var menus = $scope.menus;
        for (var i = 0, len = menus.length; i < len; i++) {
            if (menus[i].name === name) {
                i++;
                break;
            }
        }
        for (; i < len; i++) {
            menus[i - 1] = menus[i];
        }
        menus.length--;
        if (menus.length == 0)
            return;
        $timeout(function () {
            var len = $('[lay-filter="docDemoTabBrief"] .layui-this').length;
            if (len === 0) {
                $('[data-menu-name="' + menus[0].name + '"]').click();
            } else if (len > 1) {
                $('[lay-filter="docDemoTabBrief"] .layui-this:eq(0)').click();
            }
        });
    };

    var username = $.cookie('username');
    var password = $.cookie('password');
    $scope.loginData = {
        username: username == 'null' ? '' : username,
        password: password == 'null' ? '' : password,
        vercode: "",
        rememberPassword: $.cookie('rememberPassword') === 'true',
        rNum : Math.random()
    };

    $scope.refreshVercode = function () {
        $scope.loginData.rNum = Math.random();
    };

    /**
     * 退出登陆的方法
     */
    $scope.logout = function () {
        $myHttp.get($scope.PROXY+'/session/logout').mySuccess(logoutCallback);
        // $realTime.cancelAll();
    };

    $scope.login = function () {
        $.cookie('username', $scope.loginData.username);
        if ($('#rememberPassword').prop('checked')) {
            $.cookie('password', $scope.loginData.password);
            $.cookie('rememberPassword', true);
        } else {
            $.cookie('password', null);
            $.cookie('rememberPassword', null);
        }
        if (validate($scope.loginForm)) {
            $scope.loginData.password = new Hashes.SHA1().hex($scope.loginData.password);
            $myHttp.post($scope.PROXY+'/session/login', $scope.loginData).mySuccess(function (result) {
                if (result.code === -1) {
                    $scope.loginData.rNum = Math.random();
                    $scope.loginData.password = '';
                    $scope.loginData.vercode = '';
                } else if (result.code == 0) {
                    $scope.menus = [];
                    $scope.leftMenus = result.data.leftMenus;
                    var username = $.cookie('username');
                    var password = $.cookie('password');
                    $scope.loginData = {
                        rNum: Math.random(),
                        username: username == 'null' ? '' : username,
                        password: password == 'null' ? '' : password,
                        vercode: "",
                        rememberPassword: $.cookie('rememberPassword') === 'true'
                    };
                    $timeout(function () {
                        $('.layui-nav-bar').remove();
                        layuiElement.render('nav');
                        $('#login-page').removeClass('logout');
                    });
                    $realTime.regPool('newsAlarm', function () {
                        $scope.newAlarm();
                        layuiTable.reload('20190703120431-checked', {});
                    });
                }
            });
        }
    };
});


/**
 * 表单校验
 * @formObj angularjs的表单对象
 * @return 返回true校验通过，否则校验不过
 */
function validate(formObj) {
    if (formObj.$invalid) {
        var formName = formObj.$name;
        for (var key1 in formObj) {
            if (formObj.hasOwnProperty(key1) && key1.indexOf('$') != 0) {
                if (formObj[key1].$invalid) {
                    var error = formObj[key1].$error;
                    var messages = formObj[key1].$messages;
                    for (var key2 in error) {
                        if (error.hasOwnProperty(key2) && error[key2] === true) {
                            var tipIndex = layuiLayer.tips(messages[key2], $('[name="' + formName + '"] [name="' + key1 + '"]'), {
                                tips: 1,
                                time: 3000
                            });
                            $('[name="' + formName + '"] [name="' + key1 + '"]').one('blur', function () {
                                layuiLayer.close(tipIndex);
                            });
                            return false;
                        }
                    }
                }
            }
        }
    }
    return true;
}

/**
 * 退出登录的回调方法
 */
function logoutCallback() {
    $('#login-page').addClass('logout');
    window.layuiLayer.closeAll();
}