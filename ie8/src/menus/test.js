function test($scope){
    $scope.PROXY=PROXY;
    $scope.url=$scope.PROXY+'/Test/loadTreeNode';
    $scope.delNode=function(){
        $scope.$broadcast('delNode', 1);
    };
    $scope.restoreNode=function(){
        $scope.$broadcast('restoreNode');
    };
}
module.exports = test;