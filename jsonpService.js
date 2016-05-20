void function () {
    // jsonp请求的服务
    var mlJsonp = angular.module('ml.services.jsonp', []);
    mlJsonp.factory('mlJsonp', function ($rootScope) {
        var count = 0;


        return function (url, callback) {
            //1. 创建一个script标签
            var scriptElem = document.createElement('script');

            //2. 把地址传进去：原地址+ "?.......&callback=fn"
            var callbackName = "__callback__" + count++;
            var jsonpUrl = url.replace('JSONP_CALLBACK', callbackName);
            scriptElem.src = jsonpUrl;

            //3. 创建一个fn函数，用于接收返回的数据
            window[callbackName] = function(data){
                //把数据传给想要用的人
                callback(data);
                $rootScope.$apply(); //无论是哪个$scope的$apply()，更新的都是所有作用域绑定的指令。
                //把我们创建的script标签删掉
                window.document.body.removeChild(scriptElem);
            };

            //4.把标签放到body，把请求发出去
            window.document.body.appendChild(scriptElem);
        }
    })
}();