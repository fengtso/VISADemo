var pictureSource;   // picture source
var destinationType; // sets the format of returned value 
var capturedImageData;


$("#searchBoxForm").live("submit", function(){
    $.mobile.changePage($('#product-details-page'),{ transition: "slide"});
      // you're logic here
});

$('#cameraIcon-div').live("click", function(evt){
    capturePhoto();
});

$('#find-btn').live("click", function(evt) {
    // build #woot here and insert into DOM...
    // if ($('#largeImage').attr('src') == "") {
    //     alert("Please take a picture of the item first.");
    //     return;
    // };

    var productImage = document.getElementById('product-image');
    productImage.src = "data:image/jpeg;base64," + capturedImageData;  

    $('#largeImage').attr('src', "");

    $.mobile.changePage($('#product-details-page'),{ transition: "slide"});
 
});

$('#setting-btn').live("click", function(evt) {
   

    var currLocationLat = 37;
    var currLocationLng = -122;

    var queryString = "{" + "\"" + "location" + "\"" + ":" + "\"" + currLocationLat + "," + currLocationLng + "\"" + "}";
    console.log(queryString);

    $.post("http://" + IP + "/api", queryString,
      function(data) {
        
        var data = jQuery.parseJSON(data);

        alert(data.results);
      }
    );
 
});

// Wait for Cordova to connect with the device
//
document.addEventListener("deviceready",onDeviceReady,false);

// Cordova is ready to be used!
//
function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
    $("#cameraIcon-div").hide();
    // Uncomment to view the base64 encoded image data
    // console.log(imageData);
    capturedImageData = imageData;
    // Get image handle
    //
    var largeImage = document.getElementById('largeImage');
    
    // Unhide image elements
    //
    largeImage.style.display = 'block';
    
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    largeImage.src = "data:image/jpeg;base64," + imageData;
    

}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
    // Uncomment to view the image file URI 
    // console.log(imageURI);
    
    // Get image handle
    //
    var largeImage = document.getElementById('largeImage');
    
    // Unhide image elements
    //
    largeImage.style.display = 'block';
    
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    //
    largeImage.src = imageURI;
}

// A button will call this function
//
function capturePhoto() {

    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
                                destinationType: destinationType.DATA_URL,
                                correctOrientation:true,
                                targetWidth:415,
                                targetHeight:415});
}

// A button will call this function
//
function capturePhotoEdit() {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
                                destinationType: destinationType.DATA_URL });
}

// A button will call this function
//
function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
                                destinationType: destinationType.FILE_URI,
                                sourceType: source });
}

// Called if something bad happens.
// 
function onFail(message) {
    //alert('Failed because: ' + message);
}

function findProduct() {
    
    //$.mobile.changePage($('#content-reader-page'), { transition: "slide"} );

}
