let tablinks = document.querySelectorAll('.tablinks');
let tabcontent = document.querySelectorAll('.tabcontent');

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