angular.module('app.controllers', [])

.controller('homeCtrl', ["$scope", "$firebaseObject", function($scope, $firebaseObject) {
      var ref = firebase.database().ref();
      var lots = ref.child("lots");
      var lot1 = lots.child("lot1");
      var lot2 = lots.child("lot2");
      var lot3 = lots.child("lot3");
      var lot4 = lots.child("lot4");
      var lot5 = lots.child("lot5");

      var lot1_obj = $firebaseObject(lot1);
      var lot2_obj = $firebaseObject(lot2);
      var lot3_obj = $firebaseObject(lot3);
      var lot4_obj = $firebaseObject(lot4);
      var lot5_obj = $firebaseObject(lot5);

      lot1_obj.$loaded().then(function() {
        console.log("loaded record:", lot1_obj.$id, lot1_obj.someOtherKeyInData);
      });

      lot2_obj.$loaded().then(function() {
        console.log("loaded record:", lot2_obj.$id, lot2_obj.someOtherKeyInData);
      });

      lot3_obj.$loaded().then(function() {
        console.log("loaded record:", lot3_obj.$id, lot3_obj.someOtherKeyInData);
      });

      lot4_obj.$loaded().then(function()
      {
        console.log("loaded record:", lot4_obj.$id, lot4_obj.someOtherKeyInData);
      });

      lot5_obj.$loaded().then(function() {
        console.log("loaded record:", lot5_obj.$id, lot5_obj.someOtherKeyInData);

//        To iterate the key/value pairs of the object, use angular.forEach()
//         angular.forEach(lot5_obj, function(value, key) {
//           console.log(key, value);
//         });
      });

      $scope.westDeck = lot1_obj;
      $scope.eastDeck = lot2_obj;
      $scope.eastDeck2 = lot3_obj;
      $scope.unionDeck = lot4_obj;
      $scope.coneDecks = lot5_obj;




}]) // End homeCtrl
/*



                 UNION DECK CONTROLLER




*/
.controller('UnionDeckCtrl', ["$scope", "$firebaseObject",'$ionicLoading', function($scope, $firebaseObject, $ionicLoading) {
      var ref = firebase.database().ref();
      var lots = ref.child("lots");
      var lot4 = lots.child("lot4");
      var lot4_obj = $firebaseObject(lot4);


      lot4_obj.$loaded().then(function() {
        console.log("loaded record:", lot4_obj.$id, lot4_obj.someOtherKeyInData);
        $scope.unionDeck = lot4_obj;

        var unionDecks = [
                              {
                                deck : 'Union Deck',
                                totalSpaces: 'Total Spaces: ' + '<b>' + $scope.unionDeck.capacity+ '</b>',
                                desc : 'Available Parking Spaces: '+ '<b>' + $scope.unionDeck.available+ '</b>',
                                lat : 35.309299,
                                long : -80.735251,
                                spaces: $scope.unionDeck.available
                              }
                            ];
      $scope.initialiseU = function()
      {
        var mylatLongU = new google.maps.LatLng(35.309299,-80.735251);
        directionsService = new google.maps.DirectionsService();
        //Used in coneDirections(), initialized when cone decks page is clicked
        directionsDisplay = new google.maps.DirectionsRenderer();
        var mapOptionsU = {
                            center: mylatLongU,
                            zoom: 16,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                           };
        var mapvU = new google.maps.Map(document.getElementById("mapvU"), mapOptionsU);
        directionsDisplay.setMap(mapvU);
        $scope.mapvU = mapvU;

         //Custom Marker Icons//
    ///////////////////////////////////////////////////////////////////////////////////////////

        var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|00703C|DBDBBE|DBDBBE",
                       new google.maps.Size(21, 34),
                       new google.maps.Point(0,0),
                       new google.maps.Point(10, 34));
        var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
                        new google.maps.Size(40, 37),
                        new google.maps.Point(0, 0),
                        new google.maps.Point(12, 35));
    ///////////////////////////////////////////////////////////////////////////////////////////


        $scope.markersU = [];
        var infoWindowU = new google.maps.InfoWindow();
        var createMarkerU = function (info)
        {
            var markerU = new google.maps.Marker(
            {
                position: new google.maps.LatLng(info.lat, info.long),
                map: $scope.mapvU,
                animation: google.maps.Animation.DROP,
                title: info.deck,
                icon:pinImage
            });// End Marker

            markerU.content = '<div class="infoWindowContent">' + info.desc + '</div>'  + '<divclass="infoWindowContent">'+ info.totalSpaces +'</div>';
            google.maps.event.addListener(markerU, 'click', function()
            {
              infoWindowU.setContent('<h4>' + markerU.title + '</h4>' + markerU.content);
              infoWindowU.open($scope.mapvU, markerU);
            });// End event listener

            $scope.markersU.push(markerU);
         }// End Create Marker function

          createMarkerU(unionDecks[0]);
       }; // End Initialize

        google.maps.event.addDomListener(document.getElementById("mapvU"), 'load', $scope.initialiseU());
     });//End LOADED

    $scope.positions3 = [{
                          lat: 43.07493,
                          lng: -89.381388
                        }];


  $scope.uDirections= function()
  {
       // Setup the loader
      $ionicLoading.show(
      {
        template: '<p>Calculating Route</p><ion-spinner></ion-spinner>'
      });


       navigator.geolocation.getCurrentPosition(function(position)
       {
          var pos3 = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          $scope.positions3.push({lat: pos3.k,lng: pos3.B});


          var start = pos3;
          var end = new google.maps.LatLng(35.309299,-80.735251);
          var request = {
                          origin: start,
                          destination: end,
                          travelMode: 'DRIVING'

                        };
          directionsService.route(request, function(result, status)
          {
            if (status == 'OK')
            {
              $ionicLoading.hide();
              directionsDisplay.setDirections(result);
            }//End if statement
          });//End directionservice
       });//End getCurrentPos
  }; //End e1Directions()

  //Clears and resets map when back button is clicked.
  $scope.uClearMap = function()
  {
    directionsDisplay.setMap(null);
     google.maps.event.addDomListener(document.getElementById("mapvU"), 'load', $scope.initialiseU());

  };


}]) //End Union Controller
/*



                  MENU CONTROLLER




*/
.controller('menuCtrl', ['$scope', '$stateParams',function ($scope, $stateParams) {

}]) // End menuCtrl

/*



                  WEST DECK CONTROLLER




*/
.controller('westDeckCtrl', ["$scope", "$firebaseObject",'$ionicLoading', function($scope, $firebaseObject,$ionicLoading) {
      var directionsDisplay;
      var directionsService;

      var ref = firebase.database().ref();
      var lots = ref.child("lots");
      var lot1 = lots.child("lot1");
      var lot1_obj = $firebaseObject(lot1);


      lot1_obj.$loaded().then(function() {
        console.log("loaded record:", lot1_obj.$id, lot1_obj.someOtherKeyInData);
        $scope.westDeck = lot1_obj;

        var westDeckArr = [
                            {
                              deck : 'West Deck',
                              totalSpaces: 'Total Spaces: ' + '<b>' + $scope.westDeck.capacity + '</b>',
                              desc : 'Available Parking Spaces: '+ '<b>' + $scope.westDeck.available+ '</b>' ,
                              lat : 35.305316,
                              long : -80.736507,
                              spaces: $scope.westDeck.available
                            }
                          ];

      $scope.initialiseW = function()
      {
        var mylatLongW = new google.maps.LatLng(35.305316,-80.736507);
        directionsService = new google.maps.DirectionsService();
        //Used in coneDirections(), initialized when cone decks page is clicked
        directionsDisplay = new google.maps.DirectionsRenderer();
        var mapOptionsW = {
                            center: mylatLongW,
                            zoom: 16,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                           };
        var mapvW = new google.maps.Map(document.getElementById("mapvW"), mapOptionsW);
        directionsDisplay.setMap(mapvW);
        $scope.mapvW = mapvW;

         //Custom Marker Icons//
    ///////////////////////////////////////////////////////////////////////////////////////////
        var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|00703C|DBDBBE|DBDBBE",
                       new google.maps.Size(21, 34),
                       new google.maps.Point(0,0),
                       new google.maps.Point(10, 34));
        var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
                        new google.maps.Size(40, 37),
                        new google.maps.Point(0, 0),
                        new google.maps.Point(12, 35));
    ///////////////////////////////////////////////////////////////////////////////////////////


        $scope.markersW = [];
        var infoWindowW = new google.maps.InfoWindow();
        var createMarkerW = function (info)
        {
            var markerW = new google.maps.Marker(
            {
                position: new google.maps.LatLng(info.lat, info.long),
                map: $scope.mapvW,
                animation: google.maps.Animation.DROP,
                title: info.deck,
                icon:pinImage
           });// End Marker

          markerW.content = '<div class="infoWindowContent">' + info.desc + '</div>'  + '<divclass="infoWindowContent">'+ info.totalSpaces +'</div>';
          google.maps.event.addListener(markerW, 'click', function()
          {
            infoWindowW.setContent('<h4>' + markerW.title + '</h4>' + markerW.content);
            infoWindowW.open($scope.mapvW, markerW);
          });// End event listener

          $scope.markersW.push(markerW);
        }// End Create Marker function

        createMarkerW(westDeckArr[0]);
      }; // End Initialize

      google.maps.event.addDomListener(document.getElementById("mapvW"), 'load', $scope.initialiseW());
    });

    $scope.positions4 = [{
                          lat: 43.07493,
                          lng: -89.381388
                        }];
  $scope.wDirections= function()
   {
           // Setup the loader
      $ionicLoading.show({
        template: '<p>Calculating Route</p><ion-spinner></ion-spinner>'
      });

    navigator.geolocation.getCurrentPosition(
        function(position) {
            var pos4 = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            $scope.positions4.push({lat: pos4.k,lng: pos4.B});

            var start = pos4;
            var end = new google.maps.LatLng(35.305316,-80.736507);
            var request = {
                            origin: start,
                            destination: end,
                            travelMode: 'DRIVING'

                          };
            directionsService.route(request, function(result, status)
            {
              if (status == 'OK')
              {
                $ionicLoading.hide();
                directionsDisplay.setDirections(result);
              }//End if statement
            });//End directionservice
        },
        function errorCallback(error) {
            //do error handling
        },
        {
            maximumAge:Infinity,
            timeout:5000,
            enableHighAccuracy:true
        });



    }; //End e1Directions()

  //Clears and resets map when back button is clicked.
  $scope.wClearMap = function()
  {
    directionsDisplay.setMap(null);
    google.maps.event.addDomListener(document.getElementById("mapvW"), 'load', $scope.initialiseW());

  };

}]) // End westDeckCtrl

/*




                EAST DECK 2 CONTROLLER





*/
.controller('eastDeck2Ctrl', ["$scope", "$firebaseObject",'$ionicLoading', function($scope, $firebaseObject,$ionicLoading) {

      var directionsDisplay;
      var directionsService;


      var ref = firebase.database().ref();
      var lots = ref.child("lots");
      var lot2 = lots.child("lot2");
      var lot2_obj = $firebaseObject(lot2);


  lot2_obj.$loaded().then(function()
  {
        console.log("loaded record:", lot2_obj.$id, lot2_obj.someOtherKeyInData);

    $scope.eastDeck = lot2_obj;
    var eastDeck1 = [
                      {
                        deck : 'East Deck 2',
                        totalSpaces: 'Total Spaces: ' + '<b>' + $scope.eastDeck.capacity+ '</b>',
                        desc : 'Available Parking Spaces:' + '<b>' + $scope.eastDeck.available+ '</b>',
                        lat: 35.305376,
                        long : -80.726829,
                        spaces: $scope.eastDeck.available
                      }
                    ];

       // Map Settings //

      $scope.initialiseE1 = function()
      {
        var mylatLongE1 = new google.maps.LatLng(35.305376,-80.726829);
        directionsService = new google.maps.DirectionsService();
        //Used in coneDirections(), initialized when cone decks page is clicked
        directionsDisplay = new google.maps.DirectionsRenderer();
        var mapOptionsE1 = {
                            center: mylatLongE1,
                            zoom: 16,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                           };
        var mapvE1 = new google.maps.Map(document.getElementById("mapvE1"), mapOptionsE1);
        directionsDisplay.setMap(mapvE1);
        $scope.mapvEast = mapvE1;

         //Custom Marker Icons//
    ///////////////////////////////////////////////////////////////////////////////////////////
        var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|00703C|DBDBBE|DBDBBE",
                       new google.maps.Size(21, 34),
                       new google.maps.Point(0,0),
                       new google.maps.Point(10, 34));
        var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
                        new google.maps.Size(40, 37),
                        new google.maps.Point(0, 0),
                        new google.maps.Point(12, 35));
    ///////////////////////////////////////////////////////////////////////////////////////////


        $scope.markersE1 = [];
        var infoWindowE1 = new google.maps.InfoWindow();
        var createMarkerE1 = function (info)
        {
            var markerE1 = new google.maps.Marker(
            {
                position: new google.maps.LatLng(info.lat, info.long),
                map: $scope.mapvEast,
                animation: google.maps.Animation.DROP,
                title: info.deck,
                icon:pinImage
           });// End Marker

          markerE1.content = '<div class="infoWindowContent">' + info.desc + '</div>'  + '<divclass="infoWindowContent">'+ info.totalSpaces +'</div>';
          google.maps.event.addListener(markerE1, 'click', function()
          {
            infoWindowE1.setContent('<h4>' + markerE1.title + '</h4>' + markerE1.content);
            infoWindowE1.open($scope.mapvEast, markerE1);
          });// End event listener

          $scope.markersE1.push(markerE1);
        }// End Create Marker function

        createMarkerE1(eastDeck1[0]);
      }; // End Initialize

      google.maps.event.addDomListener(document.getElementById("mapvE1"), 'load', $scope.initialiseE1());
    });// End $loaded function


    $scope.positions5 = [{
                          lat: 43.07493,
                          lng: -89.381388
                        }];
   $scope.e1Directions= function()
   {
           // Setup the loader
      $ionicLoading.show({
        template: '<p>Calculating Route</p><ion-spinner></ion-spinner>'
      });


         navigator.geolocation.getCurrentPosition(function(position)
         {
            var pos5 = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            $scope.positions5.push({lat: pos5.k,lng: pos5.B});

            var start = pos5;
            var end = new google.maps.LatLng(35.305376,-80.726829);
            var request = {
                            origin: start,
                            destination: end,
                            travelMode: 'DRIVING'

                          };
            directionsService.route(request, function(result, status)
            {
              if (status == 'OK')
              {
                $ionicLoading.hide();
                directionsDisplay.setDirections(result);
              }//End if statement
            });//End directionservice
         });//End getCurrentPos
    }; //End e1Directions()

    //Clears and resets map when back button is clicked.
  $scope.E1ClearMap = function()
  {
    directionsDisplay.setMap(null);
     google.maps.event.addDomListener(document.getElementById("mapvE1"), 'load', $scope.initialiseE1());

  };

}]) // End eastDeck2Ctrl

/*



                  CONE DECK 1/2 CONTROLLER




*/
.controller('coneDeck12Ctrl', ["$scope", "$firebaseObject",'$ionicLoading', function($scope, $firebaseObject, $ionicLoading) {
      var directionsDisplay;
      var directionsService;

      var ref = firebase.database().ref();
      var lots = ref.child("lots");
      var lot5 = lots.child("lot5");
      var lot5_obj = $firebaseObject(lot5);


      lot5_obj.$loaded().then(function() {
        console.log("loaded record:", lot5_obj.$id, lot5_obj.someOtherKeyInData);

        $scope.coneDecks = lot5_obj;

        var coneDeck = [
          {
            deck : 'Cone Deck 1 &amp 2',
            totalSpaces: 'Total Spaces: ' + '<b>' + $scope.coneDecks.capacity+ '</b>',
            desc : 'Available Parking Spaces: ' + '<b>' + $scope.coneDecks.available+ '</b>',
            lat : 35.304510,
            long : -80.734554,
            spaces: $scope.coneDecks.available
          }
        ];

      // Map Settings //

      $scope.initialiseC = function() {
      var mylatLong1 = new google.maps.LatLng(35.304510,-80.734554);

      directionsService = new google.maps.DirectionsService();
      //Used in coneDirections(), initialized when cone decks page is clicked
      directionsDisplay = new google.maps.DirectionsRenderer();

      var mapOptions1 = {
                        center: mylatLong1,
                        zoom: 16,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                       };
      var mapvC = new google.maps.Map(document.getElementById("mapvC"), mapOptions1);
      directionsDisplay.setMap(mapvC);
      $scope.mapvCone = mapvC;



                          //Custom Marker Icons//
  ///////////////////////////////////////////////////////////////////////////////////////////
      var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|00703C|DBDBBE|DBDBBE",
                     new google.maps.Size(21, 34),
                     new google.maps.Point(0,0),
                     new google.maps.Point(10, 34));
      var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
                      new google.maps.Size(40, 37),
                      new google.maps.Point(0, 0),
                      new google.maps.Point(12, 35));
  ///////////////////////////////////////////////////////////////////////////////////////////


      $scope.markersC = [];
      var infoWindow1 = new google.maps.InfoWindow();
      var createMarker1 = function (info)
      {
          var markerC = new google.maps.Marker(
          {
              position: new google.maps.LatLng(info.lat, info.long),
              map: $scope.mapvCone,
              animation: google.maps.Animation.DROP,
              title: info.deck,
              icon:pinImage


         });// End Marker
      console.log("Inside var marker", "");
          markerC.content = '<div class="infoWindowContent">' + info.desc + '</div>'  + '<divclass="infoWindowContent">'+ info.totalSpaces +'</div>';
          google.maps.event.addListener(markerC, 'click', function()
          {
            infoWindow1.setContent('<h4>' + markerC.title + '</h4>' + markerC.content);
            infoWindow1.open($scope.mapvCone, markerC);
          });// End event listener

          $scope.markersC.push(markerC);
        }// End Create Marker function


            createMarker1(coneDeck[0]);

      }; // End Initialize
      google.maps.event.addDomListener(document.getElementById("mapvC"), 'load', $scope.initialiseC());

    });// End $loaded function


    $scope.positions = [{
        lat: 43.07493,
        lng: -89.381388
      }];

  $scope.coneDirections= function()
  {
       // Setup the loader
  $ionicLoading.show({
    template: '<p>Calculating Route</p><ion-spinner></ion-spinner>'
  });


     navigator.geolocation.getCurrentPosition(function(position)
     {
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        $scope.positions.push({lat: pos.k,lng: pos.B});
        console.log("New Positions2:", $scope.positions[1] + " " + $scope.positions[1]);
        console.log("New Positions3:", pos.k + " "+ pos.B);
        console.log("New Positions4:", position.coords.latitude+" "+ position.coords.longitude);

        var start = pos;
        var end = new google.maps.LatLng(35.304510,-80.734554);
        var request = {
                        origin: start,
                        destination: end,
                        travelMode: 'DRIVING'

                      };
        directionsService.route(request, function(result, status)
        {
          if (status == 'OK')
          {
            $ionicLoading.hide();
            directionsDisplay.setDirections(result);
          }//End if statement
        });//End directionservice

     });//End getCurrentPos

  };
  //Clears and resets map when back button is clicked.
  $scope.CClearMap = function()
  {
    directionsDisplay.setMap(null);
    google.maps.event.addDomListener(document.getElementById("mapvC"), 'load', $scope.initialiseC());

  };
}]) // End coneDeck12Ctrl


/*



                  EAST DECK 3 CONTROLLER




*/

.controller('eastDeck3Ctrl', ["$scope", "$firebaseObject",'$ionicLoading', function($scope, $firebaseObject, $ionicLoading) {
      var ref = firebase.database().ref();
      var lots = ref.child("lots");
      var lot3 = lots.child("lot3");
      var lot3_obj = $firebaseObject(lot3);


    lot3_obj.$loaded().then(function()
    {
        console.log("loaded record:", lot3_obj.$id, lot3_obj.someOtherKeyInData);
        $scope.eastDeck2 = lot3_obj;

        var eastDeck2Arr =
                            [
                              {
                                deck : 'East Deck 3',
                                totalSpaces: 'Total Spaces: ' + '<b>' + $scope.eastDeck2.capacity+ '</b>',
                                desc : 'Available Parking Spaces: ' + '<b>' + $scope.eastDeck2.available+ '</b>',
                                lat : 35.306015,
                                long :  -80.726067,
                                spaces: $scope.eastDeck2.available
                              }
                            ];
        // Map Settings //

        $scope.initialiseE2 = function() {
        var mylatLongE2 = new google.maps.LatLng(35.306015,-80.726067);

        directionsService = new google.maps.DirectionsService();
        //Used in coneDirections(), initialized when cone decks page is clicked
        directionsDisplay = new google.maps.DirectionsRenderer();

        var mapOptionsE2 = {
                          center: mylatLongE2,
                          zoom: 16,
                          mapTypeId: google.maps.MapTypeId.ROADMAP
                         };
        var mapvE2 = new google.maps.Map(document.getElementById("mapvE2"), mapOptionsE2);
        directionsDisplay.setMap(mapvE2);
        $scope.mapvE2 = mapvE2;



                          //Custom Marker Icons//
  ///////////////////////////////////////////////////////////////////////////////////////////
      var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|00703C|DBDBBE|DBDBBE",
                     new google.maps.Size(21, 34),
                     new google.maps.Point(0,0),
                     new google.maps.Point(10, 34));
      var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
                      new google.maps.Size(40, 37),
                      new google.maps.Point(0, 0),
                      new google.maps.Point(12, 35));
  ///////////////////////////////////////////////////////////////////////////////////////////


      $scope.markersE2 = [];
      var infoWindowE2 = new google.maps.InfoWindow();
      var createMarkerE2 = function (info)
      {
          var markerE2 = new google.maps.Marker(
          {
              position: new google.maps.LatLng(info.lat, info.long),
              map: $scope.mapvE2,
              animation: google.maps.Animation.DROP,
              title: info.deck,
              icon:pinImage


         });// End Marker

          markerE2.content = '<div class="infoWindowContent">' + info.desc + '</div>'  + '<divclass="infoWindowContent">'+ info.totalSpaces +'</div>';
          google.maps.event.addListener(markerE2, 'click', function()
          {
            infoWindowE2.setContent('<h4>' + markerE2.title + '</h4>' + markerE2.content);
            infoWindowE2.open($scope.mapvE2, markerE2);
          });// End event listener

          $scope.markersE2.push(markerE2);
        }// End Create Marker function


            createMarkerE2(eastDeck2Arr[0]);

      }; // End Initialize
      google.maps.event.addDomListener(document.getElementById("mapvE2"), 'load', $scope.initialiseE2());

    });// End $loaded function


    $scope.positions6 = [{
        lat: 43.07493,
        lng: -89.381388
      }];

  $scope.e2Directions= function()
  {
           // Setup the loader
      $ionicLoading.show({
        template: '<p>Calculating Route</p><ion-spinner></ion-spinner>'
      });


         navigator.geolocation.getCurrentPosition(function(position)
         {
            var pos6 = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            $scope.positions6.push({lat: pos6.k,lng: pos6.B});

            var start = pos6;
            var end = new google.maps.LatLng(35.306015,-80.726067);
            var request = {
                            origin: start,
                            destination: end,
                            travelMode: 'DRIVING'

                          };
            directionsService.route(request, function(result, status)
            {
              if (status == 'OK')
              {
                $ionicLoading.hide();
                directionsDisplay.setDirections(result);
              }//End if statement
            });//End directionservice

         });//End getCurrentPos
  }; //End e2Directions

  //Clears and resets map when back button is clicked.
  $scope.E2ClearMap = function()
  {
    directionsDisplay.setMap(null);
    google.maps.event.addDomListener(document.getElementById("mapvE2"), 'load', $scope.initialiseE2());

  };


}]) // End eastDeck3Ctrl

/*



                  STATS CONTROLLER




*/
.controller('parkingStatisticsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

/*



                  MAP CONTROLLER




*/
.controller('MapCtrl', ["$scope", "$firebaseObject", function($scope, $firebaseObject, $ionicLoading) {

      var parkingdecks = [];

      var ref = firebase.database().ref();
      var lots = ref.child("lots");
      var lot1 = lots.child("lot1");
      var lot2 = lots.child("lot2");
      var lot3 = lots.child("lot3");
      var lot4 = lots.child("lot4");
      var lot5 = lots.child("lot5");

      var lot1_obj = $firebaseObject(lot1);
      var lot2_obj = $firebaseObject(lot2);
      var lot3_obj = $firebaseObject(lot3);
      var lot4_obj = $firebaseObject(lot4);
      var lot5_obj = $firebaseObject(lot5);

      lot1_obj.$loaded().then(function() {
        console.log("loaded record:", lot1_obj.$id, lot1_obj.someOtherKeyInData);
      });

      lot2_obj.$loaded().then(function() {
        console.log("loaded record:", lot2_obj.$id, lot2_obj.someOtherKeyInData);
      });

      lot3_obj.$loaded().then(function() {
        console.log("loaded record:", lot3_obj.$id, lot3_obj.someOtherKeyInData);
      });

      lot4_obj.$loaded().then(function() {
        console.log("loaded record:", lot4_obj.$id, lot4_obj.someOtherKeyInData);
      });

      lot5_obj.$loaded().then(function() {
        console.log("loaded record:", lot5_obj.$id, lot5_obj.someOtherKeyInData);
      });

      $scope.westDeck = lot1_obj;
      $scope.eastDeck = lot2_obj;
      $scope.eastDeck2 = lot3_obj;
      $scope.unionDeck = lot4_obj;
      $scope.coneDecks = lot5_obj;

      $scope.coneDecks.$loaded().then(function () {
      parkingdecks = [
        {
          deck : 'West Deck',
          totalSpaces: 'Total Spaces: ' + '<b>' + $scope.westDeck.capacity + '</b>',
          desc : 'Available Parking Spaces: '+ '<b>' + $scope.westDeck.available+ '</b>' ,
          lat : 35.305316,
          long : -80.736507,
          spaces: $scope.westDeck.available
        },
        {
          deck : 'Cone Deck',
          totalSpaces: 'Total Spaces: ' + '<b>' + $scope.coneDecks.capacity+ '</b>',
          desc : 'Available Parking Spaces: ' + '<b>' + $scope.coneDecks.available+ '</b>',
          lat : 35.304510,
          long : -80.734554,
          spaces: $scope.coneDecks.available
        },
        {
          deck : 'Union Deck',
          totalSpaces: 'Total Spaces: ' + '<b>' + $scope.unionDeck.capacity+ '</b>',
          desc : 'Available Parking Spaces: '+ '<b>' + $scope.unionDeck.available+ '</b>',
          lat : 35.309299,
          long : -80.735251,
          spaces: $scope.unionDeck.available
        },
        {
          deck : 'East Deck 2',
          totalSpaces: 'Total Spaces: ' + '<b>' + $scope.eastDeck.capacity+ '</b>',
          desc : 'Available Parking Spaces: ' + '<b>' + $scope.eastDeck.available+ '</b>',
          lat : 35.305376,
          long : -80.726829,
          spaces: $scope.eastDeck.available
        },
        {
          deck : 'East Deck 3',
          totalSpaces: 'Total Spaces: ' + '<b>' + $scope.eastDeck2.capacity+ '</b>',
          desc : 'Available Parking Spaces: ' + '<b>' + $scope.eastDeck2.available+ '</b>',
          lat : 35.306015,
          long :  -80.726067,
          spaces: $scope.eastDeck2.available
        }
      ];

    // Map Settings //
    $scope.initialise = function()
    {
      var mylatLong = new google.maps.LatLng(35.3066693,-80.731668);
      var mapOptions = {
                        center: mylatLong,
                        zoom: 15,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                       };
      var mapv2 = new google.maps.Map(document.getElementById("mapv03"), mapOptions);
      $scope.mapv02 = mapv2;


                          //Custom Marker Icons//
  ///////////////////////////////////////////////////////////////////////////////////////////
      var pinColor = "00703C";
      var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
                     new google.maps.Size(21, 34),
                     new google.maps.Point(0,0),
                     new google.maps.Point(10, 34));
      var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
                      new google.maps.Size(40, 37),
                      new google.maps.Point(0, 0),
                      new google.maps.Point(12, 35));

      var image = {
                    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                    // This marker is 20 pixels wide by 32 pixels high.
                    size: new google.maps.Size(20, 32),
                    // The origin for this image is (0, 0).
                    origin: new google.maps.Point(0, 0),
                    // The anchor for this image is the base of the flagpole at (0, 32).
                    anchor: new google.maps.Point(0, 32)
                  };
  ///////////////////////////////////////////////////////////////////////////////////////////

      $scope.markers = [];

      for (i = 0; i < parkingdecks.length; i++)
      {
          createMarker(parkingdecks[i]);
      }
    }; // End Initialize
    google.maps.event.addDomListener(document.getElementById("mapv03"), 'load', $scope.initialise());
  });// End $loaded function

  var infoWindow = new google.maps.InfoWindow();
  var createMarker = function (info)
  {
    var marker = new google.maps.Marker(
    {
        position: new google.maps.LatLng(info.lat, info.long),
        map: $scope.mapv02,
        animation: google.maps.Animation.DROP,
        title: info.deck,
        icon:{
              size: new google.maps.Size(30, 45),
              scaledSize: new google.maps.Size(30, 45),
              url:'http://www.googlemapsmarkers.com/v1/'+ info.spaces +'/00703C/DBDBBE/00703C/'
             }

    });// End Marker

    marker.content = '<div class="infoWindowContent">' + info.desc + '</div>'  + '<divclass="infoWindowContent">'+ info.totalSpaces +'</div>';
    google.maps.event.addListener(marker, 'click', function()
    {
      infoWindow.setContent('<h4>' + marker.title + '</h4>' + marker.content);
      infoWindow.open($scope.mapv02, marker);
    });// End event listener

      $scope.markers.push(marker);
  }// End Create Marker function


  /*
   * Child Listener for 'lots' reference. When lots is changed, sends snapshot.
   * Used to update maps page markers and window info.
   * NOTE: Need to set it up so it only updates specific key and marker.
   */
  lots.on('child_changed', function(data)
  {

    /*
     * Uses switch statement to identify the updated parking deck. Removes the marker and updates parkingdecks array
     * then creates a new marker.
     */
    switch(data.key){
      case "lot1":
            lot1_obj.$loaded().then(function()
            {
              $scope.westDeck = lot1_obj;
              $scope.markers[0].setMap(null);
              parkingdecks[0] = {
                                  deck : 'West Deck',
                                  totalSpaces: 'Total Spaces: ' + '<b>' + $scope.westDeck.capacity + '</b>',
                                  desc : 'Available Parking Spaces: '+ '<b>' + $scope.westDeck.available+ '</b>' ,
                                  lat : 35.305316,
                                  long : -80.736507,
                                  spaces: $scope.westDeck.available
                                };
             createMarker(parkingdecks[0]);
             });
             break;

      case "lot2":
            lot2_obj.$loaded().then(function()
            {
              $scope.eastDeck = lot2_obj;
              $scope.markers[3].setMap(null);
              parkingdecks[3] = {
                                  deck : 'East Deck 2',
                                  totalSpaces: 'Total Spaces: ' + '<b>' + $scope.eastDeck.capacity+ '</b>',
                                  desc : 'Available Parking Spaces: ' + '<b>' + $scope.eastDeck.available+ '</b>',
                                  lat : 35.305376,
                                  long : -80.726829,
                                  spaces: $scope.eastDeck.available
                                };
             createMarker(parkingdecks[3]);
             });
             break;

      case "lot3":
            lot3_obj.$loaded().then(function()
            {
              $scope.eastDeck2 = lot3_obj;
              $scope.markers[4].setMap(null);
              parkingdecks[4] = {
                                  deck : 'East Deck 3',
                                  totalSpaces: 'Total Spaces: ' + '<b>' + $scope.eastDeck2.capacity+ '</b>',
                                  desc : 'Available Parking Spaces: ' + '<b>' + $scope.eastDeck2.available+ '</b>',
                                  lat : 35.306015,
                                  long :  -80.726067,
                                  spaces: $scope.eastDeck2.available
                                };
             createMarker(parkingdecks[4]);
             });
             break;

      case "lot4":
            lot4_obj.$loaded().then(function()
            {
              $scope.unionDeck = lot4_obj;
              $scope.markers[2].setMap(null);
              parkingdecks[2] = {
                                  deck : 'Union Deck',
                                  totalSpaces: 'Total Spaces: ' + '<b>' + $scope.unionDeck.capacity+ '</b>',
                                  desc : 'Available Parking Spaces: '+ '<b>' + $scope.unionDeck.available+ '</b>',
                                  lat : 35.309299,
                                  long : -80.735251,
                                  spaces: $scope.unionDeck.available
                                };
             createMarker(parkingdecks[2]);
             });
             break;

      case "lot5":
            lot5_obj.$loaded().then(function()
            {
              $scope.coneDecks = lot5_obj;
              $scope.markers[1].setMap(null);
              parkingdecks[1] = {
                                  deck : 'Cone Deck',
                                  totalSpaces: 'Total Spaces: ' + '<b>' + $scope.coneDecks.capacity+ '</b>',
                                  desc : 'Available Parking Spaces: ' + '<b>' + $scope.coneDecks.available+ '</b>',
                                  lat : 35.304510,
                                  long : -80.734554,
                                  spaces: $scope.coneDecks.available
                                };
             createMarker(parkingdecks[1]);
             });
             break;
    }

  }); // End Child Changed
}]); // End MapCtrl

