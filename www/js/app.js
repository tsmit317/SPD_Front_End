// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services','uiGmapgoogle-maps','googlemaps.init','firebase'])

.config(function($ionicConfigProvider){

})
.config(function(){
var config = {
    apiKey: "AIzaSyCTY0Q178mf-rNPp7n1x5mpzh81BAHM60s",
    authDomain: "rpc-app-603da.firebaseapp.com",
    databaseURL: "https://rpc-app-603da.firebaseio.com",
    storageBucket: "rpc-app-603da.appspot.com",
    messagingSenderId: "907080235956"
   };
   firebase.initializeApp(config);
   })

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
