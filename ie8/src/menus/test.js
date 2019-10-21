function test($scope,$exportExcel) {
    $scope.PROXY = PROXY;
    $scope.url = $scope.PROXY + '/Test/loadTreeNode';
    $scope.provinces = [{ value: '', text: '请选择' }];
    $scope.cities = [{ value: '', text: '请选择' }];
    $scope.counties = [{ value: '', text: '请选择' }];
    $scope.towns = [{ value: '', text: '请选择' }];
    $scope.delNode = function () {
        $scope.$broadcast('delNode', 1);
    };
    $scope.restoreNode = function () {
        $scope.$broadcast('restoreNode');
    };
    $scope.exportExcel = function () {
        $exportExcel.run($scope.PROXY+'/Test/ExportExcelTest',{},43,10000,'测试excel');
    };
}
module.exports = test;