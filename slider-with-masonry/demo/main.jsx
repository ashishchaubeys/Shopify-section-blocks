
    // === DOM ELEMENT REFERENCES ===
    const masonryGrid = document.getElementById('masonry-grid');
    const sliderContainer = document.getElementById('slider-container');
    const slidesContainer = document.querySelector('.slides');
    const applySliderMobile = document.getElementById('apply-slider-mobile');
    const applySliderDesktop = document.getElementById('apply-slider-desktop');
    const applySliderBoth = document.getElementById('apply-slider-both');
    const removeSlider = document.getElementById('remove-slider');
    const autoplayButton = document.getElementById('autoplay-button');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    let currentIndex = 0;
    let isAutoplay = false;
    let autoplayTimer;

    // === FUNCTION: Copy all images from grid to slider ===
    function cloneImagesToSlider() {
      slidesContainer.innerHTML = '';
      masonryGrid.querySelectorAll('img').forEach(img => {
        const clone = img.cloneNode(true);
        slidesContainer.appendChild(clone);
      });
    }
    cloneImagesToSlider();
    const totalSlides = slidesContainer.children.length;

    // === FUNCTION: Update current slide (transform animation) ===
    function updateSlide() {
      slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // === FUNCTION: Toggle view based on device type ===
    function toggleSlider(device) {
      const isMobile = window.innerWidth <= 768;
      if ((device === 'mobile' && isMobile) || (device === 'desktop' && !isMobile) || device === 'both') {
        masonryGrid.style.display = 'none';
        sliderContainer.style.display = 'block';
        sliderContainer.style.animation = 'fadeInSlider 0.8s ease forwards';
      } else {
        masonryGrid.style.display = 'block';
        sliderContainer.style.display = 'none';
      }
    }

    // === BUTTON EVENTS ===
    applySliderMobile.addEventListener('click', () => toggleSlider('mobile'));
    applySliderDesktop.addEventListener('click', () => toggleSlider('desktop'));
    applySliderBoth.addEventListener('click', () => toggleSlider('both'));
    removeSlider.addEventListener('click', () => {
      masonryGrid.style.display = 'block';
      sliderContainer.style.display = 'none';
      masonryGrid.style.animation = 'fadeInGrid 0.8s ease forwards';
    });

    // === SLIDE NAVIGATION EVENTS ===
    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlide();
    });
    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlide();
    });

    // === AUTOPLAY TOGGLE ===
    autoplayButton.addEventListener('click', () => {
      isAutoplay = !isAutoplay;
      autoplayButton.textContent = isAutoplay ? 'Disable Autoplay' : 'Enable Autoplay';
      if (isAutoplay) startAutoplay();
      else clearTimeout(autoplayTimer);
    });

    // === AUTOPLAY FUNCTION ===
    function startAutoplay() {
      clearTimeout(autoplayTimer);
      if (isAutoplay) {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlide();
        autoplayTimer = setTimeout(startAutoplay, 3000);
      }
    }

    // === RESPONSIVE RESIZE HANDLER ===
    window.addEventListener('resize', () => {
      const isMobile = window.innerWidth <= 768;
      if (masonryGrid.style.display !== 'none') return;
      toggleSlider(isMobile ? 'mobile' : 'desktop');
    });
