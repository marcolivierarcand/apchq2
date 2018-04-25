const HOST_URI = "http://localhost:8888"

// Google Map -------------------------- //
 // default initMap;
export async function initMap() {

  var quebec = {lat: 46.829853, lng: -71.254028};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: quebec,
    mapTypeControl: false,
  });
	var bounds = new google.maps.LatLngBounds();
	var activeInfoWindow;



  try {
    var succursales = await $.get(
      `${HOST_URI}/wordpress_apchq/wp-json/apchq-api/succursales`
    )

    succursales.forEach((succursale, i) => {


      var latLng = new google.maps.LatLng(succursale.lat, succursale.lng);
			bounds.extend(latLng);

      var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: succursale.name,
      });
      marker.setMap(map);

      var content = `
        <div class=box-info>
          <div class="info">
            <h1 class="title med">${succursale.name}</h1>
						<p class="text fat xsm c-main_l">${succursale.address}</p>
            <p class="text xsm">${succursale.infos}</p>
          </div>
        </div>
      `

      // Create info window
      var infowindow = new google.maps.InfoWindow({content});

      marker.addListener('click', () => {
				if (activeInfoWindow) {
					activeInfoWindow.close();
				}
        infowindow.open(map, marker);
        activeInfoWindow = infowindow;
			});

			map.addListener('dragstart', () => {
				activeInfoWindow.close();
			});

			map.fitBounds(bounds);
    });



  } catch (err) {
    console.log(err)
  }
}
