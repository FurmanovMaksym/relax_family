window.onscroll = function () {
    myFunction()
};

var header = document.getElementById("header-id");

var sticky = header.offsetTop;

function myFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}


const tel_num_svg = document.getElementById("tel_num_svg");

tel_num_svg.addEventListener("click", () => {
    const tel_num = document.getElementById("tel_num");
    if (tel_num.style.display === "none") {
        tel_num.style.display = "block";
    } else {
        tel_num.style.display = "none";
    }
});
