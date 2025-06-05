fetch('https://api.los-bio.ru/info/group/slide')
  .then(response => response.json())
  .then(data => {
    const slidesData = data.map(slide => JSON.parse(slide.value));
    const slidesContainer = document.getElementById('slides-container');
    const dotsContainer = document.getElementById('slider-dots');
    let currentIndex = 0;

    // Создаем первую карточку
    let currentSlide = createSlide(slidesData[currentIndex]);
    slidesContainer.appendChild(currentSlide);

    // Создаем точки
    slidesData.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => changeSlide(index));
      dotsContainer.appendChild(dot);
    });

    function createSlide(data) {
      const slide = document.createElement('div');
      slide.classList.add('slide');
      slide.innerHTML = `
        <h2>${data.title}</h2>
        <p>${data.description}</p>
        <a " target="_blank" style="color:#1078D7"><button >Подробнее<button></a>
      `;
      return slide;
    }

    function changeSlide(newIndex) {
      if (newIndex === currentIndex) return;

      const oldSlide = currentSlide;
      oldSlide.classList.add('slide-out');

      // Создаем новый слайд заранее (съезжает справа)
      const nextSlide = createSlide(slidesData[newIndex]);
      nextSlide.classList.add('slide', 'slide-in');
      slidesContainer.appendChild(nextSlide);

      // Задержка для синхронизации анимации
      requestAnimationFrame(() => {
        nextSlide.classList.remove('slide-in');
      });

      // Удаляем старый после завершения анимации
      setTimeout(() => {
        slidesContainer.removeChild(oldSlide);
      }, 500);

      currentSlide = nextSlide;
      currentIndex = newIndex;
      updateDots();
    }

    function updateDots() {
      const dots = dotsContainer.querySelectorAll('.slider-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
  })
  .catch(error => console.error('Ошибка:', error));
