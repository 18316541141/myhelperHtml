function $exportExcel(layer, $timeout) {
    return {
        /**
         * 导出excel的方法
         * @param {*} exportUrl 导出的url
         * @param {*} postData 筛选参数
         * @param {*} totalItemCount 数据总量
         * @param {*} pageSize 每页显示数据量
         * @param {*} title excel标题
         */
        run: function (exportUrl, postData, totalItemCount, pageSize, title) {
            pageSize = parseInt(pageSize);
            if (exportUrl === undefined) {
                throw new Error("请传入exportUrl");
            }
            if (postData === undefined) {
                throw new Error("请传入postData");
            }
            if (totalItemCount === undefined) {
                throw new Error("请传入totalItemCount");
            }
            if (title === undefined) {
                throw new Error("请传入title");
            }
            if (totalItemCount <= pageSize) {
                var id = new UUID().id;
                $('body').append('<form style="display:none;" id="' + id + '" target="_blank" action="' + exportUrl + '" method="post"></form>');
                var $form = $('#' + id);
                for (var key in postData) {
                    if (postData.hasOwnProperty(key)) {
                        $form.append($('<input type="hidden" name="' + key + '">').val(postData[key]));
                    }
                }
                $form.append($('<input type="hidden" name="currentPageIndex">').val(1));
                $form.append($('<input type="hidden" name="pageSize">').val(pageSize));
                $form.submit();
                $timeout(function () {
                    $form.remove();
                }, 0);
            } else {
                $scope.exportUrl = exportUrl;
                $scope.postData = postData;
                $scope.totalItemCount = totalItemCount;
                $scope.pageSize = pageSize;
                $scope.title = title;
                layer.ngOpen({
                    type: 1,
                    area: ['630px', '700px'],
                    contentUrl: '/static/common/execelList.html',
                    scope: $scope,
                    title: '导出excel'
                });
            }
        }
    };
}
module.exports = $exportExcel;