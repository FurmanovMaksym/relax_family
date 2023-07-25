const carousel = document.querySelector(".carousel");
const arrowIcons = document.querySelectorAll(".gallery article div svg");
let firstImg = carousel.querySelectorAll(".carousel img")[0];

let isDragStart = false,
    isDragging = false,
    prevPageX,
    prevScrollLeft,
    positionDiff;

const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.visibility =
        Math.abs(carousel.scrollLeft) <= 10 ? "hidden" : "visible";
    arrowIcons[1].style.visibility =
        Math.abs(carousel.scrollLeft - scrollWidth) <= 10 ? "hidden" : "visible";
};

arrowIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14;
        carousel.scrollLeft += icon.id == "left-arrow" ? -firstImgWidth : firstImgWidth;

        setTimeout(() => showHideIcons(), 500);
    });
});

const autoSlide = () => {
    if (carousel.scrollLeft === carousel.scrollWidth - carousel.clientWidth) return;
    positionDiff = Math.abs(positionDiff);
    let firstImageWidth = firstImg.clientWidth + 14;
    console.log(firstImageWidth);

    let valDifference = firstImageWidth - positionDiff;

    if (carousel.scrollLeft > prevScrollLeft) {
        return (
            (carousel.scrollLeft += positionDiff > firstImageWidth / 3
                ? valDifference
                : -positionDiff)
        );
    }
    carousel.scrollLeft -= positionDiff > firstImageWidth / 3 ? valDifference : -positionDiff;
};

// Swipe detection
let startX, startY;

document.addEventListener("touchstart", (e) => {
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
});

const handleSwipe = (e) => {

    // Get the swipe direction
    const xDiff = e.changedTouches[0].pageX - startX;
    const yDiff = e.changedTouches[0].pageY - startY;
    const swipeDirection = Math.abs(xDiff) > Math.abs(yDiff) ? "horizontal" : "vertical";

    // If the swipe is horizontal, preventDefault to avoid page scroll
    if (swipeDirection !== "vertical") {
        dragging(e);
    }
};

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    setTimeout(() => showHideIcons(), 400);
};

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
    if (!isDragging) return;
    isDragging = false;
    autoSlide();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
document.addEventListener("touchmove", handleSwipe, { passive: false });

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);