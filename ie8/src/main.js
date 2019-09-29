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
window.angular = angular;
import './common/utils/ng-layer.js';
window.layuiForm = window.layui.form;
window.layuiLayer = window.layui.layer;
window.layuiElement = window.layui.element;
window.layuiTree = window.layui.tree;
window.layuiTable = window.layui.table;
window.layuiLaypage = window.layui.laypage;
window.layuiLaydate = window.layui.laydate;

window.myApp=angular.module('my-app', ['ng-layer']);
window.myApp.controller('main-body',function($scope,$myHttp,$timeout){
    $myHttp.get('/api/index/loadLoginData').mySuccess(function (result) {
        var data=result.data;
        $scope.leftMenus = data.leftMenus;
        $.cookie('username', data.username);
        $timeout(function () {
            $('.layui-nav-bar').remove();
            layuiElement.render('nav');
        });
    });

    //根据菜单名称找出菜单
    $scope.findLeftMenuByName = function (name) {
        var leftMenus=$scope.leftMenus;
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
        debugger;
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