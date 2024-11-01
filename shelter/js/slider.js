function initSlider() {
    document.addEventListener('DOMContentLoaded', () => {

        let currentIndex = 0;

        let slidesToShow = 0; // Количество видимых слайдов
        let slidesToScroll = 0; // Количество слайдов для прокрутки

        const sliderTrack = document.querySelector('.pets__card-inner');
        let slides = document.querySelectorAll('.pets__card');
        let totalSlides = slides.length;
        const gap = parseFloat(getComputedStyle(sliderTrack).gap) || 0;

        function updateSliderParameters() {
            const width = window.innerWidth;

            if (width >= 1280) {
                slidesToShow = 3;
                slidesToScroll = 3;
            } else if (width >= 768) {
                slidesToShow = 2;
                slidesToScroll = 2;
            } else {
                slidesToShow = 1;
                slidesToScroll = 1;
            }

            // Обновляем количество слайдов и их ширину при изменении размера окна
            slides = document.querySelectorAll('.pets__card');
            totalSlides = slides.length;
            console.log('Total Slides:', totalSlides);
        }

        function updateSlider() {
            const slideWidth = (sliderTrack.clientWidth - gap * (slidesToShow - 1)) / slidesToShow;
            console.log('Slide Width:', slideWidth);
            const offset = -(currentIndex * (slideWidth + gap));
            console.log('Offset:', offset);
            sliderTrack.style.transform = `translateX(${offset}px)`;
        }

        function prevSlide() {
            if (currentIndex - slidesToScroll < 0) {
                currentIndex = totalSlides - (totalSlides % slidesToShow || slidesToShow);
            } else {
                currentIndex -= slidesToScroll;
            }
            console.log('Current Index (Prev):', currentIndex);
            updateSlider();
        }

        function nextSlide() {
            if (currentIndex + slidesToScroll >= totalSlides) {
                currentIndex = 0;
            } else {
                currentIndex += slidesToScroll;
            }
            console.log('Current Index (Next):', currentIndex);
            updateSlider();
        }

        document.querySelector('.button__arrow-prev').addEventListener('click', prevSlide);
        document.querySelector('.button__arrow-next').addEventListener('click', nextSlide);

        // Обновляем параметры и инициализируем слайдер
        updateSliderParameters();
        updateSlider();
 
        // Обновляем параметры при изменении размера окна
        window.addEventListener('resize', () => {
            updateSliderParameters();
            updateSlider();
        });
    });
}

export { initSlider };