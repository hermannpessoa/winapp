var newApp = angular.module('app', ['ngRoute'])
        

newApp.config(function($routeProvider, $locationProvider){
$routeProvider
.when("/", {
    templateUrl: "view/home.html",
    controller: "winapp",
  })
.when("/youwin/", {
    templateUrl: "view/youwin.html",
    controller: "winapp",
  });
});

newApp.controller('winapp', function($scope, $location) {
	$scope.nome = localStorage.getItem('nome');
	$scope.cpf = localStorage.getItem('cpf');
	$scope.email = localStorage.getItem('email');
	$scope.empresa = localStorage.getItem('razaoSocial');
	$scope.logoEmpresa = localStorage.getItem('logoEmpresa');
	$scope.cor = localStorage.getItem('corEmpresa');
	status = localStorage.getItem('status');
	$scope.statusId = localStorage.getItem('status');
	if(status == 0){
		$scope.status = "Inativo";
	}else{
		$scope.status = "Ativo";
	}
});
