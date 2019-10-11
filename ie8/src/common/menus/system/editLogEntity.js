function editLogEntity($scope, $myHttp) {
    $myHttp.get($scope.PROXY+'/LogEntity/load', { id: $scope.edit.data.id }).mySuccess(function (result) {
        $scope.edit.formData = result.data;
    });
}
module.exports = editLogEntity;