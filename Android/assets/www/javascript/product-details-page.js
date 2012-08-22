var currLocationLat;
var currLocationLng;
//var IP = "ec2-23-20-185-148.compute-1.amazonaws.com:8888";
// var IP = "10.0.11.129:8888";
var IP = "10.0.11.129:8888";

function getNearbyStores(){
  // submit current location 
  navigator.geolocation.getCurrentPosition(onSuccessToLoadPlaces, onError);
  
  // add store list
}

var onSuccessToLoadPlaces = function(position) {
    // alert('Latitude: '          + position.coords.latitude          + '\n' +
    //       'Longitude: '         + position.coords.longitude         + '\n' +
    //       'Altitude: '          + position.coords.altitude          + '\n' +
    //       'Accuracy: '          + position.coords.accuracy          + '\n' +
    //       'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
    //       'Heading: '           + position.coords.heading           + '\n' +
    //       'Speed: '             + position.coords.speed             + '\n' +
    //       'Timestamp: '         + new Date(position.timestamp)      + '\n');

    currLocationLat = position.coords.latitude;
    currLocationLng = position.coords.longitude;
    
    //$.post("http://" + IP + "/api", { location: currLocationLat + "," + currLocationLng, image: "" } );
    var queryString = "{" + "\"" + "location" + "\"" + ":" + "\"" + currLocationLat + "," + currLocationLng + "\"" + "}";
    console.log(queryString);

    $.post("http://" + IP + "/api", queryString,
      function(data) {

      var data = jQuery.parseJSON(data);
      var root_ul = $('#store-list-ul');
      
      alert(data.results);
      
      root_ul.children().remove();

     $.each(data.results, function(i)
      {
        var li = $('<li/>')
          .addClass('ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c ui-li-static ui-body-d ui-btn-up-d store-list-li list-elm-to-POI')
          .attr('data-theme', 'd')
          .attr('lat', data.results[i].geometry.location.lat)
          .attr('lng', data.results[i].geometry.location.lng)
          .attr('storeName', data.results[i].name)
          .attr('storeAddress', data.results[i].vicinity)
          .attr('description', 'closed to ' + data.results[i].vicinity)
          .appendTo(root_ul);

        var div1 = $('<div/>')
          .addClass('ui-btn-inner ui-li ui-li-static ui-body-d')
          .css('width', '260px')
          .attr('aria-hidden', 'true')
          .appendTo(li);

        var div2 = $('<div/>')
          .addClass('ui-btn-text')
          .css('height', '15px')
          .appendTo(div1);

        var storeName = data.results[i].name;
        var a1 = $('<a/>')
          .addClass('ui-link-inherit')
          .css({'font-size':'16px', 'padding-top':'0px', 'margin-left':'-32px'})
          .attr('storeName', storeName)
          .text(storeName)
          .appendTo(div2);
        
        var span1 = $('<span/>')
          .addClass('ui-icon ui-icon-arrow-r ui-icon-shadow')
          .css({'height':'20px', 'width':'20px', 'margin-top':'-8px'})
          .appendTo(div1);

      });

    });

    // add current location
    $('#map_canvas').gmap('addMarker', { 
          'position': new google.maps.LatLng(position.coords.latitude, position.coords.longitude), 
          'bounds': true 
      }).click(function() {
          $('#map_canvas').gmap('openInfoWindow', { 'content': 'Current Location' }, this);
    });
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

function findSimilarProducts(){

  var root_div = $('#similar-product-list-div');
  root_div.children().remove();


  for(var i = 0; i < 9; i++){
    var div1 = $('<div/>')
    .addClass('similar-product-img-div')
    .appendTo(root_div);

    var img = $('<img/>')
    .addClass('similar-product-img')
    .attr('src', "./images/ballet_shoe" + i.toString() + ".png")
    .attr('data-rel', "external")
    .appendTo(div1);

    //alert("./images/ballet_shoe" + i.toString() + ".png");
  }
  
}
