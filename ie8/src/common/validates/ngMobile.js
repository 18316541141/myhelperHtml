//移动电话校验
function ngMobile() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, el, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function () {
                if ($.type(ctrl.$modelValue) === 'string' && ctrl.$modelValue.length > 0) {
                    if (/^1[3|4|5|8][0-9]\d{4,8}$/.test(ctrl.$modelValue)) {
                        ctrl.$setValidity('mobile', true);
                    } else {
                        ctrl.$setValidity('mobile', false);
                        if (ctrl.$messages === undefined) {
                            ctrl.$messages = { mobile: attrs.ngMobileMsg === undefined ? '字段格式错误，必须是合法的移动电话号码' : attrs.ngMobileMsg };
                        } else {
                            ctrl.$messages['mobile'] = attrs.ngMobileMsg === undefined ? '字段格式错误，必须是合法的移动电话号码' : attrs.ngMobileMsg;
                        }
                    }
                } else {
                    ctrl.$setValidity('mobile', true);
                }
            });
        }
    };
}
module.exports = ngMobile;