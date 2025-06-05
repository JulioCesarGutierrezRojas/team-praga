 let currentSlide = 0;
        const totalSlides = 4;
        const track = document.getElementById('carouselTrack');
        const dots = document.querySelectorAll('.nav-dot');

        function updateCarousel() {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateCarousel();
        }

        // Auto-avanzar el carrusel cada 5 segundos
        let autoSlideInterval = setInterval(nextSlide, 5000);

        // Pausar auto-avance cuando el mouse está sobre el carrusel
        const carouselContainer = document.querySelector('.carousel-container');

        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        carouselContainer.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(nextSlide, 5000);
        });

        // Soporte para gestos táctiles en móviles
        let startX = 0;
        let endX = 0;

        carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.changedTouches[0].screenX;
        });

        carouselContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (startX - endX > 50) {
                nextSlide();
            } else if (endX - startX > 50) {
                prevSlide();
            }
        }