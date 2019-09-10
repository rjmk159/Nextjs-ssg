var locations = {}; 
$(document).on('ready',function(){
	let _latitude = document.getElementById('map-canvas').getAttribute("data-latitude") || '13.4050';
	let _longitude = document.getElementById('map-canvas').getAttribute("data-longitude") || '52.5200';
function markerIcons(status){
    let icons = [
        radObj.pluginUrl+'images/available.png',radObj.pluginUrl+'images/not-available.png'
    ];
  if(status == 0 || status == 1){
    return  markerIcon = {
      url:icons[status],
    };
  }
}
var map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 16,
    maxZoom: 21,
    minZoom: 1,
    center: new google.maps.LatLng(_latitude,_longitude),
//     center: new google.maps.LatLng(19.017615,72.8561644),
});

function setMarkers(locObj) {
    $.each(locObj, function(key, loc) {
        if ((!locations[key]) && loc.lat !== undefined && loc.lng !== undefined) {
            loc.marker = new google.maps.Marker({
                position: new google.maps.LatLng(loc.lat, loc.lng),
                map: map,
                icon: markerIcons(loc.status),
            });
            var infowindow = new google.maps.InfoWindow();
            google.maps.event.addListener(loc.marker, 'click', (function(key) {
                return function() {
                    infowindow.setContent(`
                    <div id="content" style="text-align:center;min-width:150px;height:250px">
                        <div style="width:100px;height:100px;border-radius:100px;overflow:hidden;margin: 0 auto;">
                            <img style="width: 100%;height: 100%;object-fit:cover" src="${loc.image}" />
                        </div>
                      <h4 style="margin:5px" id="firstHeading" class="firstHeading">${loc.biker}</h4>
                      <p>status :<br/> <span style="color:${loc.status == 0 ? 'green':'red'};font-weight:500">${loc.status == 1?'Available  on tour':'Available'}</span></p>
                      ${loc.phone?`<p>Phone : <a target="_blank" href="tel:${loc.phone}">${loc.phone}</a></p>`:''}  
                      ${loc.email?`<p>Email : <a target="_blank" href="tel:${loc.email}">${loc.email}</a></p>`:''}  
                      </div>`);
                    infowindow.open(map, locations[key].marker);
                }
            })(key));
            locations[key] = loc;
        } else if (locations[key] &&  locations[key].status != loc.status && loc.status != 2  ) {
            if (locations[key].marker) {
                locations[key].marker.setMap(null);
                locations[key].marker.setIcon(markerIcons(loc.status));
            }
            delete locations[key];
        }  else if(locations[key] &&  loc.status == 2 ) {
            locations[key].marker.setMap(null);
        } 
        else if (locations[key]) {
            $.extend(locations[key], loc);
            if (loc.lat !== undefined && loc.lng !== undefined) {
                locations[key].marker.setPosition(
                    new google.maps.LatLng(loc.lat , loc.lng ));
             }
        }
    });

}
let delay = radObj && radObj.delay ? radObj.delay : 800 ;
var ajaxObj = { 
    options: {
        url: "http://appdev.psdtohubspot.com//wp-json/wp/v2/biker", 
        dataType: "json" 
    },
    delay: delay , 
    errorCount: 0,
    errorThreshold: 5, 
    ticker: null,
    get: function() { 
        if (ajaxObj.errorCount < ajaxObj.errorThreshold) {
            ajaxObj.ticker = setTimeout(getMarkerData, ajaxObj.delay);
        }
    },
    fail: function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
        ajaxObj.errorCount++;
    },
};

//Ajax master routine
function getMarkerData() {
    $.ajax(ajaxObj.options)
        .done(resetMarkers)
        .fail(ajaxObj.fail) 
        .always(ajaxObj.get); 
}
    ajaxObj.get(); 
    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

 function  resetMarkers(data){
  let _newLocs =  {};
   data.map((value,index) => {
    _newLocs[value.id] = {
      lat:value.user_details && value.user_details.user_latitude ? Number(value.user_details.user_latitude[0]) : '',
      lng:value.user_details && value.user_details.user_longitude ?  Number(value.user_details.user_longitude[0]) : '',
      biker:value.user_details && value.user_details.user_name ? value.user_details.user_name[0] : '',
      email:value.user_details && value.user_details.user_email ? value.user_details.user_email[0] : '',
      status:value.user_details && value.user_details.user_status ? value.user_details.user_status[0] : 0,
      image:value.user_details && value.user_details.user_image ? value.user_details.user_image[0] : 'http://0.gravatar.com/avatar/03cc3de77fee2bb56b5200fbe82ae3a4?s=96&d=mm&r=g',
      phone:value.user_details && value.user_details.user_phone ? value.user_details.user_phone[0] : ''
    }
  })
  if(!isEmpty(_newLocs)){
    setMarkers(_newLocs);
  }
}
})