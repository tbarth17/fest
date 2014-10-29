Fest.ApplicationController = Ember.Controller.extend({
  needs: ['session'],
  currentUser: Ember.computed.alias('model'),

  actions: {
    addMap: function(){
      var map;
          openInfowindow = null;
          newPoints = [];

      function initialize () {
          var mapOptions = {
              center: new google.maps.LatLng(34.86811622745945, -82.38741874694824),
              zoom: 13,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              streetViewControl: false
          };
          map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
          addPoints();
      }

      function addPoints () {
          newPoints[0] = [34.842944, -82.405371, 'Smileys', 'Smileys Acoustic Cafe'];
          newPoints[1] = [34.852573, -82.358908, 'Gottrocks', 'Gottrocks'];
          newPoints[2] = [34.886534, -82.390397, 'Radio Room', 'Radio Room'];
          newPoints[3] = [34.867923, -82.404426, 'Independent Ale House', 'Independent Ale House'];
          newPoints[4] = [34.847036, -82.428652, 'Mac Arnold&#39;s', 'Mac Arnold&#39;s'];
          for (var i = 0; i < newPoints.length; i++) {
              var position = new google.maps.LatLng(newPoints[i][0], newPoints[i][1]);
              var marker = new google.maps.Marker({
                  position: position,
                  map: map
              });
              createMarker(marker, i);
          }
      }

      function createMarker (marker, i) {
          var infowindow = new google.maps.InfoWindow({
              content: '<div class="popup">' + newPoints[i][3] + '</div>',
          });
          google.maps.event.addListener(marker, 'click', function () {
              if (openInfowindow) {
                  openInfowindow.close();
              }
              infowindow.open(marker.getMap('map_canvas'), marker);
              openInfowindow = infowindow;
          });
      }

      google.maps.event.addDomListener(window, 'load', initialize);

    }
  }
});
