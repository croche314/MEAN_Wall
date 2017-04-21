var app = angular.module('app', ['ngRoute']);

// *********** ROUTES ***********
app.config(function($routeProvider) {
	$routeProvider
	.when('/wall', {
		templateUrl: '/partials/wall.html',
		controller: 'WallController'
	})
	.when('/login', {
		templateUrl: '/partials/login.html',
		controller: 'LoginController'
	})
	.otherwise('/index')
})