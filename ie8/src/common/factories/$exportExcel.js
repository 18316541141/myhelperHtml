function $exportExcel(layer, $timeout) {
    return {
        /**
         * 导出excel的方法
         * @param {*} exportUrl 导出的url
         * @param {*} postData 筛选参数
         * @param {*} totalItemCount 数据总量
         */
        run: function (exportUrl, postData, totalItemCount, title) {
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
            if (totalItemCount <= 10000) {
                var id = new UUID().id;
                $('body').append('<form style="display:none;" id="' + id + '" target="_blank" action="' + exportUrl + '" method="post"></form>');
                var $form = $('#' + id);
                for (var key in postData) {
                    if (postData.hasOwnProperty(key)) {
                        $form.append($('<input type="hidden" name="' + key + '">').val(postData[key]));
                    }
                }
                $form.submit();
                $timeout(function () {
                    $form.remove();
                }, 0);
            } else {
                $scope.exportUrl = exportUrl;
                $scope.postData = postData;
                $scope.totalItemCount = totalItemCount;
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