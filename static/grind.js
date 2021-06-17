

mapboxgl.accessToken = 'pk.eyJ1IjoicGl5dXNocHVuaXlhIiwiYSI6ImNrb213YnN3NjB5M2Yyb282NDIyMmJpa2cifQ.PmEvKhNL4QR_DXlefGCmVg';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [100, 37.8], // starting position
    zoom: 15 // starting zoom
});


// Add geolocate control to the map.
// map.addControl(
//     new mapboxgl.GeolocateControl({
//         positionOptions: {
//             enableHighAccuracy: true
//         },
//         zoom: 7,
//         trackUserLocation: true
//     }),
// );

var x = document.getElementById("long");
var y = document.getElementById("lat");
var coordinates = [0, 0];//remove data from it during run time
var dist = [];

var marker1 = new mapboxgl.Marker()        


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}


function showPosition(position) {
    x.innerHTML = position.coords.longitude;
    y.innerHTML = position.coords.latitude;

    coordinates.unshift(position.coords.longitude, position.coords.latitude);
    marker1.setLngLat([position.coords.longitude, position.coords.latitude]).addTo(map);
    // marker1.setLngLat([position.coords.longitude, position.coords.latitude])

    
    // console.log(coordinates)
    

}


var distanceContainer = document.getElementById('distance');

var value = document.createElement('pre');
value.id = "distancecovered";

distanceContainer.appendChild(value);

var apiname = document.getElementById('apiname');


var exdone = document.createElement('button');
exdone.id = "exdone";
exdone.textContent = 'DONE FOR NOW'
exdone.style.margin = "10px";
exdone.onclick = function(){
    if(apiname.value){
    $.post("/grind", { n: value.innerHTML.substr(22, ) , username : apiname.value} );
    window.location.href = "/";
    }else{
        alert("Enter username to submit");
    }

}


distanceContainer.appendChild(exdone);



//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow() {
    if (coordinates[2] != null & coordinates[3] != null) {
        var lon1 = coordinates[2];
        var lat1 = coordinates[3];
        console.log("assigned");
    } else {
        var lon1 = coordinates[0];
        var lat1 = coordinates[1];
        console.log("not-assigned");

    }
    var lon2 = coordinates[0];
    var lat2 = coordinates[1];
    console.log(coordinates);
    console.log("feed" , lon2,lat2,lon1,lat1)
    map.flyTo({
        center: [
            lon2,
            lat2
        ],
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
    });
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
  ;
    console.log("distance covered",d)
    if(d>0.5){
        d=0.1;
        
        // coordinates[0] = coordinates[2];
        // coordinates[1] = coordinates[3];
        console.log("D > 0.5 hence d = 0.1 also coordinates changed to prevoius ones");
    }
    dist.push(d);
    const arrSum = dist.reduce((a, b) => a + b, 0);
    value.textContent =
        'Total distance in km: ' +
        arrSum ;

    // alert(arrSum);
    return d;

}

// Converts numeric degrees to radians
function toRad(Value) {
    return Value * Math.PI / 180;
}

var first_function = function () {
    console.log("Entered first function");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve(getLocation());
            console.log("Returned first promise");
        }, 2000);
    });
};


//This function executes returns promise after 4 seconds

var second_function = function () {
    console.log("Entered second function");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve(calcCrow());
            console.log("Returned secound promise");

        }, 4000);
    });
};

var third_function = function () {
    console.log("Entered third function");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve(myalert());
            console.log("Returned third promise");

        }, 4000);
    });
};

function myalert() {
    // document.querySelector('.mapboxgl-ctrl-geolocate').click();
    // document.querySelector('.mapboxgl-ctrl-geolocate').click();

    // alert("clicked");
    async_function();




}

var async_function = async function () {
    console.log('async function called');

    const first_promise = await first_function();
    console.log("After awaiting for 2 seconds," +
        "the promise returned from first function is:");

    const second_promise = await second_function();
    console.log("After awaiting for 4 seconds, the" +
        "promise returned from second function is:");


    await third_function();



}

async_function();


