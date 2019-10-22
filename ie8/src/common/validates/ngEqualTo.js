//校验当前字段和另外一个字段是否一致
function ngEqualTo() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, el, attrs, ctrl) {
            var validateId = el.attr('data-validate-id');
            if (validateId === undefined) {
                var tempId = new UUID().id;
                ctrl.$validateId = tempId;
                el.attr('data-validate-id', tempId);
            } else {
                ctrl.$validateId = validateId;
            }
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