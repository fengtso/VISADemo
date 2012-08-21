
var isAllStoresMarked = false;
var selectedStoreLat;
var selectedStoreLng;


// process the confirmation dialog result
function onConfirm(button) {
    //alert('You selected button ' + button);
}

// Show a custom confirmation dialog
//
function showCallConfirm() {
    navigator.notification.confirm(
        'Do you want to call this store?',  // message
        onConfirm,              // callback to invoke with index of button pressed
        'AllSaints: (415) 856-5601',            // title
        'Call,Cancel'          // buttonLabels
    );
}

$('.store-list-li').live('click', function() {

  // This URL won't work on your localhost, so you need to change it
  // see http://en.wikipedia.org/wiki/Same_origin_policy

  //remove all markers
  $('#map_canvas').gmap('clear', 'markers');

  //currLocationLat = 37;
  //currLocationLng = -122;

  selectedStoreLat = $(this).attr('lat');
  selectedStoreLng = $(this).attr('lng');

  // add selected location
  $('#map_canvas').gmap('addMarker', { 
        'position': new google.maps.LatLng($(this).attr('lat'), $(this).attr('lng')), 
        'bounds': true 
    }).click(function() {
        $('#map_canvas').gmap('openInfoWindow', { 'content': $(this).attr('description') }, this);
  });

  // add current location
  $('#map_canvas').gmap('addMarker', { 
          'position': new google.maps.LatLng(currLocationLat, currLocationLng), 
          'bounds': true 
      }).click(function() {
          $('#map_canvas').gmap('openInfoWindow', { 'content': 'Current Location' }, this);
    });
   
  //showCallConfirm();
});

$('#allStoresBtn').live('click', function(){
  //alert('allStoresBtn pressed');
  if(isAllStoresMarked){
    console.log(isAllStoresMarked);
    //remove all markers
    $('#map_canvas').gmap('clear', 'markers');

  }
  else{
    console.log(isAllStoresMarked);

    //var storeList = $('#store-list-ul').children();
    //alert(storeList);

  }
  isAllStoresMarked = !isAllStoresMarked;

});


$('#directionsBtn').live('click', function(){
  //alert('directionsBtn pressed');
  console.log('directionsBtn pressed');
  if (!isAllStoresMarked) {
    $('#map_canvas').gmap({ 'center': new google.maps.LatLng(currLocationLat,currLocationLng), 'callback': function() {
        $('#map_canvas').gmap('displayDirections', { 'origin': new google.maps.LatLng(currLocationLat,currLocationLng), 'destination': new google.maps.LatLng(selectedStoreLat,selectedStoreLng), 'travelMode': google.maps.DirectionsTravelMode.DRIVING }, { 'panel': document.getElementById('directions')}, function(success, result) {
                if ( success )
                        alert('Results found!');
        });
    }});
  }

});