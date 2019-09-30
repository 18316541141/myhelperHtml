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
import datetime from './common/components/datetime.ang.html';
import mySelect from './common/components/mySelect.ang.html';
import pageDataTable from './common/components/pageDataTable.ang.html';
import editLogEntity from './common/menus/system/editLogEntity.js';
import heartbeatEntity from './common/menus/system/heartbeatEntity.js';
import logEntity from './common/menus/system/logEntity.js';
import moment from 'moment';

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
    window.myApp.directive('pageDataTable', pageDataTable);
}());

//注册通用菜单
(function () {
    window.myApp.controller('editLogEntity', editLogEntity);
    window.myApp.controller('heartbeatEntity', heartbeatEntity);
    window.myApp.controller('logEntity', logEntity);
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

    /**
     * 退出登陆的方法
     */
    $scope.logout = function () {
        $myHttp.get('/api/session/logout').mySuccess(logoutCallback);
        $realTime.cancelAll();
    };
});

registerHttp();



/**
 * 退出登录的回调方法
 */
function logoutCallback() {
    $('#login-page').addClass('logout');
    window.layuiLayer.closeAll();
}