function initSlider() {
    document.addEventListener('DOMContentLoaded', () => {

        let currentIndex = 0;
        const slidesToShow = 3;
        const slidesToScroll = 3;
        const sliderTrack = document.querySelector('.pets__card-inner');
        const slides = document.querySelectorAll('.pets__card');
        const totalSlides = slides.length;

        const gap = parseFloat(getComputedStyle(sliderTrack).gap) || 0;

        function updateSlider() {
            const slideWidth = (sliderTrack.clientWidth - gap * (slidesToShow - 1)) / slidesToShow;
            const offset = -(currentIndex * (slideWidth + gap));
            sliderTrack.style.transform = `translateX(${offset}px)`;;
        }

        function prevSlide() {
            if (currentIndex - slidesToScroll < 0) {
                currentIndex = totalSlides - (totalSlides % slidesToShow || slidesToShow);
            } else {
                currentIndex -= slidesToScroll;
            }
            updateSlider();
        }

        function nextSlide() {
            if (currentIndex + slidesToScroll >= totalSlides) {
                currentIndex = 0;
            } else {
                currentIndex += slidesToScroll;
            }
            updateSlider();
        }

        document.querySelector('.button__arrow-prev')?.addEventListener('click', prevSlide);
        document.querySelector('.button__arrow-next')?.addEventListener('click', nextSlide);

        updateSlider();

    });
}

export { initSlider };