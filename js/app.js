angular.module('read', ['ngFileSaver']);

angular.module('read')
.controller('ReadCtrl', function($scope, FileSaver, Blob) {
    $scope.data;

    $scope.fn = {
      generate: generate
    };

    function generate(form) {
      var title = `# ${$scope.data.title} \n`;
      var subtitle = `## ${$scope.data.subtitle} \n`;
      var author = `## ${$scope.data.author} \n`;
      var amazon = `[Amazon](${$scope.data.amazon}) \n`;
      var data = new Blob([title, subtitle, author, amazon], { type: 'text/plain;charset=utf-8' });
      FileSaver.saveAs(data, 'README.md');
    }


});
