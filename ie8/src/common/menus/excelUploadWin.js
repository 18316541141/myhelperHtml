function excelUploadWin($scope) {
    var pageSize=$scope.pageSize;
    $scope.excelList = [];
    var pageCount = ($scope.totalItemCount - ($scope.totalItemCount % pageSize)) / pageSize + 1;
    for (var i = 1; i < pageCount; i++) {
        $scope.excelList[i] = {
            title:'“'+$scope.title+'”第'+((i-1)*pageSize+1)+'到'+Math.min(i*pageSize,$scope.totalItemCount)+'条数据',
            currentPageIndex: i,
        };
    }
    $scope.exportExcel=function(currentPageIndex){
        var id = new UUID().id;
        var postData = $scope.postData;
        $('body').append('<form style="display:none;" id="' + id + '" target="_blank" action="' + $scope.exportUrl + '" method="post"></form>');
        var $form = $('#' + id);
        for (var key in postData) {
            if (postData.hasOwnProperty(key)) {
                $form.append($('<input type="hidden" name="' + key + '">').val(postData[key]));
            }
        }
        $form.append($('<input type="hidden" name="currentPageIndex">').val(currentPageIndex));
        $form.append($('<input type="hidden" name="pageSize">').val(pageSize));
        $form.submit();
        $timeout(function () {
            $form.remove();
        }, 0);
    }
}
module.exports = excelUploadWin;