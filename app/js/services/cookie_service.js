'use strict';

module.exports = function(app) {
  app.factory('cookieService', ['$http', '$cookies', '$location', function($http, $cookies, $location) {
    return {
      checkAuth: function() {
        if(!$cookies.jwt || ($cookies.jwt.length < 1)) return $location.path('/users');
        $http.defaults.headers.common.jwt = $cookies.jwt;
      },
      signout: function() {
        $cookies.jwt = null;
        $http.defaults.headers.common.jwt = null;
        return $location.path('/users');
      }
    };
  }]);
};
