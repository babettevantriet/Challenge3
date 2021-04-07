//Api token
mapboxgl.accessToken = 'pk.eyJ1IjoiYmFiZXR0ZTEzMDYiLCJhIjoiY2tteXM5c3JwMDU2dzJxdDMxYnVoY2dxNCJ9.xsYKYbws9Uiqv5s1V2O1pw';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/babette1306/ckn05g4yc0t7317msz6vk872d',
  center: [4.8686, 52.0267],
  zoom: 13.00
});

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
});

map.addControl( geocoder, 'top-right');
map.on('load', function () {
	geocoder.on('result', function (ev) {
	  console.log(ev.result.center);
    getAPIdata(ev.result.center[0], ev.result.center[1]);
    advice();
	});
});



function getAPIdata(lon, lat) {

  var request = 'https://api.openweathermap.org/data/2.5/weather?appid=abb31e6fc5611da5e430b38fceba3b60&q=&lon='+lon+'&lat='+lat+'';
  fetch(request).then(function(response) {
    return response.json();
  })
  .then(function(response) {
    console.log(response);
    var cityName = document.getElementById('city');
    cityName.innerHTML = response.name;
    var weatherBox = document.getElementById('weather');
    weatherBox.innerHTML = (response.main.temp - 273.15).toFixed(1) + ' &#730;C';
    var weather = response.main.temp - 273.15;
  });

}
// code voor het advies om wel of niet te landen. Ivm met hitte
function advice(){
	if(weather > 5 && weather < 30){
		document.getElementById('posibility').innerHTML = 'Veilig om te landen';
		document.getElementById('posibility').style.color = 'green';
	}
		else{
			document.getElementById('posibility').innerHTML = 'onveilig om te landen';
			document.getElementById('posibility').style.color = 'red';
		}
}

// code voor de foto van de dag
function getPhotoOfTheDay(){
 var request = 'https://api.nasa.gov/planetary/apod?api_key=dcSdEMfjs8uegBifCQP47van9nv19XZA0ceyWJk5';
  fetch(request).then(function(response) {
    return response.json();
  })
  .then(function(response) {
  	console.log(response);
    var imageUrl = response.url;
    var explanation = response.explanation;
    var date = response.date;
    var title = response.title;
    var el = document.getElementById('imageOfTheDay');

    el.querySelector('img').src = imageUrl;
    el.querySelector('img').title = title;
    el.querySelector('figcaption').innerHTML = date + '<br>' + title;


  });
}

getPhotoOfTheDay();
