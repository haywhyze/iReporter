let tablinks = document.querySelectorAll('.tablinks');
let tabcontent = document.querySelectorAll('.tabcontent');
const nav_ul = document.querySelector('.site-nav-ul');
const logo = document.querySelector('.site-nav__logo');
const site_nav = document.querySelector('.site-nav');

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