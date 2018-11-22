let hero = document.querySelector('.hero');
let header = document.querySelector('header');
let nav_ul = document.querySelector('.site-nav-ul');
let logo = document.querySelector('.site-nav__logo');
let site_nav = document.querySelector('.site-nav');

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
setInterval(changeBackground, 5000);

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
})