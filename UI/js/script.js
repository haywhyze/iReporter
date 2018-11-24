let hero = document.querySelector('.hero');
let header = document.querySelector('header');
let nav_ul = document.querySelector('.site-nav-ul');
let logo = document.querySelector('.site-nav__logo');
let site_nav = document.querySelector('.site-nav');

let tablinks = document.querySelectorAll('.tablinks');
let tabcontent = document.querySelectorAll('.tabcontent');

let b_urls = [`
    linear-gradient( 
        to left bottom, 
        rgba(16, 42, 110, .6), 
        rgba(242, 48, 62, .6)),
        url('img/uganda.jpg')`,
    `linear-gradient( 
        to right bottom, 
        rgba(16, 42, 110, .6), 
        rgba(242, 48, 62, .6)),
        url('img/images.jpeg')`,
    `linear-gradient( 
        to left top, 
        rgba(16, 42, 110, .6), 
        rgba(242, 48, 62, .6)), 
        url('img/Bad-Roads.jpg')
    `, `linear-gradient( 
        to left top, 
        rgba(16, 42, 110, .6), 
        rgba(242, 48, 62, .6)), 
        url('img/corruption.jpg')`
]
let initial = 0;
let changeBackground = () => {
    hero.style.backgroundImage = b_urls[initial = ++initial % b_urls.length];
    hero.style.transition = 'background 1s ease-in-out';
}
if (hero) setInterval(changeBackground, 5000);

window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        nav_ul.style.padding = '0';
        logo.setAttribute('src', 'img/logo-ireporter2.svg');
        logo.style.height = '3em';
        site_nav.style.backgroundColor = 'rgb(32, 32, 32)';
    } else {
        nav_ul.style.padding = '0.5em';
        logo.setAttribute('src', 'img/logo.svg');
        logo.style.height = '4em';
        site_nav.style.backgroundColor = 'rgba(32, 32, 32, .8)';
    }
});

tabcontent = Array.from(tabcontent);
tablinks = Array.from(tablinks);
let openTab = () => {
    tablinks.map((e) => {
        // if (e.classList.contains('active')) e.classList.remove('active');
        e.addEventListener('click', () => {
            tablinks.map((x) => {
                if (x.classList.contains('active')) x.classList.remove('active');
            })
            e.classList.add('active');
            tabcontent.map((e) => e.style.display = 'none');
            document.querySelector(`#${e.dataset.tab}`).style.display = 'block';
        })
    })
}


tablinks.map((e) => e.addEventListener('click', openTab()));

//Google Maps

var markers = [];

// Removes the markers from the map, but keeps them in the array.
const clearMarkers = () => {
    if (markers[0])
        markers.map((e) => e.setMap(null));
}

const placeMarkerAndPanTo = (latLng, map) => {
    const marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
    map.panTo(latLng);
    markers.push(marker);
}

function initMap() {

    var map = new google.maps.Map(document.querySelector('#map'), {
        zoom: 13,
        center: {
            lat: 6.605874,
            lng: 3.349149
        }
    });


    let location = document.querySelector('#location');
    let address = document.querySelector('#address');
    map.addListener('click', (e) => {
        clearMarkers();
        placeMarkerAndPanTo(e.latLng, map);
        geocodeLatLng(e.latLng);
        location.value = `${e.latLng}`;
    });
}



function geocodeLatLng(latLng) {
    const geocoder = new google.maps.Geocoder;
    var latlngStr = String(latLng).split(',', 2);

    var latlng = { lat: parseFloat(latlngStr[0].substr(1)), lng: parseFloat(latlngStr[1]) };

    geocoder.geocode({ 'location': latlng }, function(results, status) {
        if (status === 'OK') {
            if (results[0]) {
                address.innerHTML = results[0].formatted_address;
            } else {
                address.innerHTML = 'Location Address not Available';
            }
        } else {
            console.log('Place not found');
        }
    });
}