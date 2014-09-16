(function() {
    // Currently ng-app declared in order.html 
    // move it to vcs.html 
    var app = angular.module('vcs', []);
    app.controller('orderController', ['$scope',
        function($scope) {

            $scope.order = {};
            $scope.submit = function() {
                console.log($scope.order);
            };

            $scope.recalculate = function() {
                $scope.order.total = $scope.order.price + $scope.order.deliveryCharge;
                $scope.order.balance = $scope.order.total - $scope.order.advance;
            };
            
            $scope.clearValues = function() {
                $scope.order = {};
            };
        }
    ]);
})();