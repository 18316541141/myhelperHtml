//校验当前字段和另外一个字段是否一致
function ngEqualTo() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, el, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function () {
                if (ctrl.$modelValue === attrs.ngEqualTo) {
                    ctrl.$setValidity('equalTo', true);
                } else {
                    ctrl.$setValidity('equalTo', false);
                    if (ctrl.$messages === undefined) {
                        ctrl.$messages = { equalTo: attrs.ngEqualToMsg };
                    } else {
                        ctrl.$messages['equalTo'] = attrs.ngEqualToMsg;
                    }
                }
            });
        }
    };
}
module.exports = ngEqualTo;