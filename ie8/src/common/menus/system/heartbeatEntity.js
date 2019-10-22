function heartbeatEntity($scope, supportPlaceholder, $myHttp) {
    $scope.PROXY = PROXY;
    $scope.supportPlaceholder = supportPlaceholder;
    $scope.url = $scope.PROXY + '/HeartbeatEntity/page';
    $scope.postData = {
        robotMacLike: '',
        remarkLike: '',
        extendFieldLike: '',
        lastHeartbeatTimeStart: '',
        lastHeartbeatTimeEnd: ''
    };
    $scope.cols = [
        { field: "extendField", title: '扩展内容' },
        { field: "lastHeartbeatTime", title: '最近一次的心跳时间', sort: true },
        { field: "robotMac", title: '机器人ip' },
        { field: "remark", title: '机器人备注' },
        {
            field: "statusDesc", title: '运行状态', templet: function (data) {
                return '<span style="color:' + (data.status === 0 ? '#FF5722' : '#009688') + ';">' + data.statusDesc + '</span>';
            }
        },
        {
            field: "id", title: '操作', templet: function (data) {
                return '<div class="layui-btn-container">' +
                    '<button class="layui-btn layui-btn-sm" lay-event="delete" type="button">删除</button>' +
                    '</div>';
            }
        }
    ];
    $scope.search = function () {
        $scope.$broadcast('searchPage');
    };
    $scope.refresh = function () {
        for (var key in $scope.postData) {
            if ($scope.postData.hasOwnProperty(key)) {
                $scope.postData[key] = null;
            }
        }
        $scope.$broadcast('searchPage');
    };
    $scope.$on('rowOper', function (event, type, data) {
        if (type === 'delete') {
            layuiLayer.prompt({ icon: 3, title: '请输入“确认删除”后删除。' }, function (text, index) {
                if ($.trim(text) === '确认删除') {
                    $myHttp.get($scope.PROXY + '/HeartbeatEntity/Del', { id: data.id }).mySuccess(function (result) {
                        if (result.code === 0) {
                            layuiLayer.close(index);
                            $scope.search();
                        }
                    });
                }
            });
        }
    });
}
module.exports = heartbeatEntity;