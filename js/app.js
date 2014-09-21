(function() {
    // Currently ng-app declared in order.html 
    // move it to vcs.html 
    var app = angular.module('vcs', []);
    vcs.indexedDB.open();
    app.controller('navController', function() {
        this.currentMenu = "newOrder";

        this.setMenu = function(menuItem) {
            this.currentMenu = menuItem;
        };

        this.isCurrentMenu = function(menuItem) {
            var b = (this.currentMenu === menuItem);
            //console.log(b);
            return b;
        };
    });

    app.directive('orderPage', function() {
        return {
            restrict: "E",
            templateUrl: "views/order.html",
            scope: {},
            link: function($scope, $element, attr) {

                $scope.order = {};
                //Sample data
//                $scope.order = {
//                    "name": "Sample Name",
//                    "address": "6 vivekanandar street \ndubai street,dubai main road",
//                    "quantity": 20,
//                    "total": 1320,
//                    "balance": 820,
//                    "menu": "Lunch",
//                    "menuType": "A",
//                    "price": 60,
//                    "deliveryCharge": 120,
//                    "advance": 500,
//                    "timeStamp": 1411292690473,
//                    "deliveryDate": new Date("11/09/14")
//                };

                // Datepicker reference : http://bootstrap-datepicker.readthedocs.org/en/release/
                $('.date').datepicker({
                    autoclose: true,
                    format: "dd/mm/yy"
                }).on("changeDate", function(e) {
                    //console.log(e);
                    $scope.$apply(function() {
                        // perform any model changes or method invocations here on angular app.
                        //console.log(e.date);
                        $scope.order.deliveryDate = e.date;
                    });
                });

                $scope.submit = function() {
                    console.log($scope.order);
                    console.log($scope.order.deliveryDate);
                    vcs.indexedDB.addOrder($scope.order);
                    $scope.order = {};
                    $scope.orderForm.$setPristine();
                };

                $scope.recalculate = function() {
                    $scope.order.total = ($scope.order.price * $scope.order.quantity) + ($scope.order.deliveryCharge || 0);
                    $scope.order.balance = $scope.order.total - $scope.order.advance;
                };

                $scope.clearValues = function() {
                    $scope.order = {};
                };
            }
        };
    });
    app.directive('itemList', function() {
        return {
            restrict: "E",
            templateUrl: "views/items.html",
            scope: false,
            link: function($scope, $element, attr) {
                console.log("itemList : inheriting from menu parent - " + JSON.stringify($scope.order));
            }

        };
    });
})();