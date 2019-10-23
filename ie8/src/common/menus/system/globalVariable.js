function globalVariable($scope, $myHttp,$timeout) {
    $scope.PROXY = PROXY;
    $scope.globalVariableList = [{ varName: '', varValue: '', varRemark: '' }];
    $scope.formMaxHeight = $(window).height()-285;
    $scope.scrollId = new UUID().id;
    $myHttp.get($scope.PROXY + '/GlobalVariable/showAllGlobalVariable').mySuccess(function (result) {
        if (result.code === 0) {
            if (result.data.length === 0) {
                $scope.globalVariableList = [{ varName: '', varValue: '', varRemark: '' }];
            } else {
                $scope.globalVariableList = result.data;
            }
        }
    });
    $scope.add = function () {
        $scope.globalVariableList[$scope.globalVariableList.length] = {
            varName: '', varValue: '', varRemark: ''
        };
        $timeout(function(){
            var scrollHeight = $('#'+$scope.scrollId).prop('scrollHeight');
            $('#'+$scope.scrollId).animate({scrollTop:scrollHeight}, 400);
        },0);
    };
    $scope.del = function (index) {
        var globalVariableList = $scope.globalVariableList;
        if (index > globalVariableList.length - 1) {
            return;
        }
        for (var i = index + 1, len = globalVariableList.length; i < len; i++) {
            globalVariableList[i - 1] = globalVariableList[i];
        }
        globalVariableList.length--;
    };
    $scope.save = function () {
        if (validate($scope.globalVariableForm)) {
            var postData = {};
            var globalVariableList = $scope.globalVariableList;
            for (var i = 0, len = globalVariableList.length; i < len; i++) {
                postData['globalVariableList[' + i + '].varName'] = globalVariableList[i].varName;
                postData['globalVariableList[' + i + '].varValue'] = globalVariableList[i].varValue;
                postData['globalVariableList[' + i + '].varRemark'] = globalVariableList[i].varRemark;
            }
            $myHttp.post($scope.PROXY + '/GlobalVariable/saveAllGlobalVariable', postData).mySuccess();
        }
    };
}
module.exports = globalVariable;