'use strict';

// Register the component to the module `resultList`
angular
  .module('resultList')
  .component('resultList', {
    templateUrl: 'result-list/result-list.template.html',
    controller: function ResultListController($http) {
      var self = this;

      self.search = function() {

        console.log(self.query);

        if (self.query) {
          $http({
            url: '/zhihu/autocomplete',
            method: 'GET',
            params: {
              token: self.query
            }
          }).then(function(resp) {
            console.log(resp);
            self.payloads = resp.data;
          });
        }
      };

    }
  });