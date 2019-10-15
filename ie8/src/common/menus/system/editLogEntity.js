function editLogEntity($scope, $myHttp) {
    $scope.PROXY=PROXY;
    $myHttp.get($scope.PROXY+'/LogEntity/load', { id: $scope.edit.data.id }).mySuccess(function (result) {
        $scope.edit.formData = result.data;
    });
}
module.exports = editLogEntity;