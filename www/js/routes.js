angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



      .state('menu.home', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('menu.UnionDeck', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/UnionDeck.html',
        controller: 'UnionDeckCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('menu.eastDeck2', {
    url: '/page4',
    views: {
      'side-menu21': {
        templateUrl: 'templates/eastDeck2.html',
        controller: 'eastDeck2Ctrl'
      }
    }
  })

  .state('menu.westDeck', {
    url: '/page5',
    views: {
      'side-menu21': {
        templateUrl: 'templates/westDeck.html',
        controller: 'westDeckCtrl'
      }
    }
  })

  .state('menu.coneDeck12', {
    url: '/page6',
    views: {
      'side-menu21': {
        templateUrl: 'templates/coneDeck12.html',
        controller: 'coneDeck12Ctrl'
      }
    }
  })

  .state('menu.eastDeck3', {
    url: '/page7',
    views: {
      'side-menu21': {
        templateUrl: 'templates/eastDeck3.html',
        controller: 'eastDeck3Ctrl'
      }
    }
  })

  .state('menu.parkingStatistics', {
    url: '/page8',
    views: {
      'side-menu21': {
        templateUrl: 'templates/parkingStatistics.html',
        controller: 'parkingStatisticsCtrl'
      }
    }
  })
  .state('menu.maps', {
    url: '/page9',
    views: {
      'side-menu21': {
        templateUrl: 'templates/map.html',
        controller: 'MapCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/page1')



});
