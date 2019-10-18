function excelUploadWin($scope) {
    // $scope.exportUrl = exportUrl;
    // $scope.postData = postData;
    // $scope.totalItemCount = totalItemCount;
    // $scope.title
    $scope.excelList = [];
    var pageCount = ($scope.totalItemCount - ($scope.totalItemCount % 10000)) / 10000 + 1;
    for (var i = 1; i < pageCount; i++) {
        $scope.excelList[i] = {
            title:'“'+$scope.title+'”第'+((i-1)*10000+1)+'到'+Math.min(i*10000,$scope.totalItemCount)+'条数据',
            currentPageIndex: i,
        };
    }
    $scope.
}
module.exports = excelUploadWin;