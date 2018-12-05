/* eslint-disable */

const hero = document.querySelector('.hero');
// const header = document.querySelector('header');
const nav_ul = document.querySelector('.site-nav-ul');
const logo = document.querySelector('.site-nav__logo');
const site_nav = document.querySelector('.site-nav');

let tablinks = document.querySelectorAll('.tablinks');
let tabcontent = document.querySelectorAll('.tabcontent');

// To change backround image on home screen
const backgroundUrl = [`
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
        url('img/corruption.jpg')`,
];
let initial = 0;
const changeBackground = () => {
  hero.style.backgroundImage = backgroundUrl[initial += 1 % backgroundUrl.length];
  hero.style.transition = 'background 1s ease-in-out';
};
if (hero) setInterval(changeBackground, 5000);


// TO animate page header on scroll
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

// For Tab functionality
tabcontent = Array.from(tabcontent);
tablinks = Array.from(tablinks);
let openTab = () => {
  tablinks.map((e) => {
    // if (e.classList.contains('active')) e.classList.remove('active');
    e.addEventListener('click', () => {
      tablinks.map((x) => {
        if (x.classList.contains('active')) x.classList.remove('active');
      });
      e.classList.add('active');
      tabcontent.map(e => e.style.display = 'none');
      document.querySelector(`#${e.dataset.tab}`).style.display = 'block';
    });
  });
};


tablinks.map(e => e.addEventListener('click', openTab()));

// Google Maps
// For the functions on the map
const markers = [];

const clearMarkers = () => {
  if (markers[0]) {
    markers.map(e => e.setMap(null));
  }
};

const placeMarkerAndPanTo = (latLng, map) => {
  const marker = new google.maps.Marker({
    position: latLng,
    map,
  });
  map.panTo(latLng);
  markers.push(marker);
};

function initMap() {
  let map = document.querySelectorAll('.map');
  map = Array.from(map);
  let a;
  map = map.map((e) => {
    e = new google.maps.Map(e, {
      zoom: 13,
      center: {
        lat: 6.605874,
        lng: 3.349149,
      },
    });

    e.addListener('click', (x) => {
      clearMarkers();
      placeMarkerAndPanTo(x.latLng, e);
      geocodeLatLng(e.latLng);
    })
  });

  const location = document.querySelector('#location');
  const address = document.querySelector('#address');
  map.map((x) => {
    // console.log(x)
    // x.addListener('click', (e) => {
    //   console.log(e)
    //   
    //   // placeMarkerAndPanTo(e.latLng, x);
    //   // geocodeLatLng(e.latLng);
    //   // location.value = `${e.latLng}`;
    // });
  })
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


// Update record Modal
let updateBtn = document.querySelectorAll('.update-button');
let modal = document.querySelectorAll('.modal');
modal = Array.from(modal);
modal.map((e) => {
  e.style.display = 'none';
})
let modalDiv;
updateBtn = Array.from(updateBtn);
updateBtn.map((e) => {
  e.addEventListener('click', (x) => {
      x.preventDefault();
      e.parentElement.nextElementSibling.style.display = 'block';
      modalDiv = e.parentElement.nextElementSibling;
  })
})

// When the user clicks on <span> (x), close the modal
var span = document.getElementsByClassName("close");
span = Array.from(span)
span.map((e) => {
  e.onclick = function() {
      modalDiv.style.display = "none";
  }

})