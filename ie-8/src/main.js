import angular from 'angular';
import layui from 'layui-src/dist/layui.all.js';
import 'layui-src/dist/css/modules/laydate/default/laydate.css';
import 'layui-src/dist/css/modules/layer/default/layer.css';
import 'layui-src/dist/css/modules/code.css';
import 'layui-src/dist/css/layui.css'
import './css/login.css'
import $ from 'jquery';
import 'jquery.cookie';
import registerHttp from './common/utils/http.js';
import UUID from './common/utils/UUID.js';
import Hashes from "jshashes";
import webuploader from 'webuploader';
import Highcharts from 'highcharts';
import 'webuploader/css/webuploader.css'
import '@ztree/ztree_v3/js/jquery.ztree.core.min.js';
import '@ztree/ztree_v3/js/jquery.ztree.excheck.min.js';
import '@ztree/ztree_v3/css/metroStyle/metroStyle.css';
import './common/utils/ng-layer.js';
import ngRequired2 from './common/validate/ngRequired2.js';
import ngLength from './common/validate/ngLength.js';
import ngMinlength2 from './common/validate/ngMinlength2.js';
import ngMaxlength2 from './common/validate/ngMaxlength2.js';
import ngMinDouble from './common/validate/ngMinDouble.js';
import ngMaxDouble from './common/validate/ngMaxDouble.js';
import ngUrl from './common/validate/ngUrl.js';
import ngMobile from './common/validate/ngMobile.js';
import ngEqualTo from './common/validate/ngEqualTo.js';
import ngIsInt from './common/validate/ngIsInt.js';
import datetime from './common/components/datetime.ang.html';
import mySelect from './common/components/mySelect.ang.html';
import myCheckbox from './common/components/myCheckbox.ang.html';
import pageDataTable from './common/components/pageDataTable.ang.html';
import pieChart from './common/components/pieChart.ang.html';
import histogram from './common/components/histogram.ang.html';
import uploadFiles from './common/components/uploadFiles.ang.html';
import uploadExcel from './common/components/uploadExcel.ang.html';
import treeForm from './common/components/treeForm.ang.html';
import editLogEntity from './common/menus/system/editLogEntity.js';
import heartbeatEntity from './common/menus/system/heartbeatEntity.js';
import logEntity from './common/menus/system/logEntity.js';
import moment from 'moment';
import $realTime from './common/factory/$realTime.js';

window.Highcharts = Highcharts;
window.UUID = UUID;
window.moment = moment;
window.angular = angular;
window.layuiForm = window.layui.form;
window.layuiLayer = window.layui.layer;
window.layuiElement = window.layui.element;
window.layuiTree = window.layui.tree;
window.layuiTable = window.layui.table;
window.layuiLaypage = window.layui.laypage;
window.layuiLaydate = window.layui.laydate;
window.myApp = angular.module('my-app', ['ng-layer']);

/**
 * layui的datatable默认的配置
 */
window.layuiTable.set({
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

//注册通用组件
(function () {
    window.myApp.directive('datetime', datetime);
    window.myApp.directive('mySelect', mySelect);
    window.myApp.directive('myCheckbox', myCheckbox);
    window.myApp.directive('pageDataTable', pageDataTable);
    window.myApp.directive('pieChart', pieChart);
    window.myApp.directive('histogram', histogram);
    window.myApp.directive('uploadFiles', uploadFiles);
    window.myApp.directive('uploadExcel', uploadExcel);
    window.myApp.directive('treeForm', treeForm);
}());

//注册通用菜单
(function () {
    window.myApp.controller('editLogEntity', editLogEntity);
    window.myApp.controller('heartbeatEntity', heartbeatEntity);
    window.myApp.controller('logEntity', logEntity);
}());

//注册通用校验
(function () {
    window.myApp.directive('ngRequired2', ngRequired2);
    window.myApp.directive('ngLength', ngLength);
    window.myApp.directive('ngMinlength2', ngMinlength2);
    window.myApp.directive('ngMaxlength2', ngMaxlength2);
    window.myApp.directive('ngMinDouble', ngMinDouble);
    window.myApp.directive('ngMaxDouble', ngMaxDouble);
    window.myApp.directive('ngUrl', ngUrl);
    window.myApp.directive('ngMobile', ngMobile);
    window.myApp.directive('ngEqualTo', ngEqualTo);
    window.myApp.directive('ngIsInt', ngIsInt);
}());

//注册业务组件
(function(){
    window.myApp.factory('$realTime',$realTime);

}());

window.myApp.controller('main-body', function ($scope, $myHttp, $timeout) {
    $myHttp.get('/api/index/loadLoginData').mySuccess(function (result) {
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
        $myHttp.get('/api/session/logout').mySuccess(logoutCallback);
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
            $myHttp.post('/api/session/login', $scope.loginData).mySuccess(function (result) {
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

registerHttp();

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