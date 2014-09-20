(function() {
    // Currently ng-app declared in order.html 
    // move it to vcs.html 
    var app = angular.module('vcs', []);
    app.controller('navController', function() {
        this.currentMenu = "Home";

        this.setMenu = function(menuItem) {
            this.currentMenu = menuItem;
        };

        this.isCurrentMenu = function(menuItem) {
            var b = (this.currentMenu === menuItem);
            console.log(b);
            return b;
        };
    });

    app.directive('orderPage', function() {
        return {
            restrict: "E",
            templateUrl: "views/order.html",
            scope: {},
            link: function($scope, $element , attr ) {
                $scope.order = {};

                $('.date').datepicker({
                    autoclose: true,
                    format: "dd/mm/yy"
                }).on("changeDate", function(e) {
                    console.log(e);
                    console.log($(this).val());
                    $(this).trigger('input');
                });

                $scope.submit = function() {
                    console.log($scope.order);
                    console.log($scope.order.deliveryDate);
                };

                $scope.recalculate = function() {
                    $scope.order.total = $scope.order.price + $scope.order.deliveryCharge;
                    $scope.order.balance = $scope.order.total - $scope.order.advance;
                };

                $scope.clearValues = function() {
                    $scope.order = {};
                };
            }
        };
    });
})();