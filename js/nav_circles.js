window.addEventListener('scroll', function () {

    const adress = document.getElementById('adress');
    const contacts = document.getElementById('contacts');

    const rect2 = adress.getBoundingClientRect();
    const rect3 = contacts.getBoundingClientRect();

    const nav_about = document.getElementById('nav-about');
    const nav_adress = document.getElementById('nav-adress');
    const nav_contacts = document.getElementById('nav-contacts');

    if(rect2.bottom > window.innerHeight && rect3.bottom > window.innerHeight){
        nav_about.classList.add('active');
    } else {
        nav_about.classList.remove('active');
    }

    if (rect2.top >= 0 && rect2.bottom <= window.innerHeight) {
        nav_adress.classList.add('active');
    } else {
        nav_adress.classList.remove('active');
    }

    if (rect3.top >= 0 && rect3.bottom <= window.innerHeight) {
        if(nav_adress.classList.contains('active'))nav_adress.classList.remove('active');
        nav_contacts.classList.add('active');
    } else {
        nav_contacts.classList.remove('active');
    }
})