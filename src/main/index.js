fetch('https://api.los-bio.ru/info/group/slide')
  .then(response => response.json())
  .then(data => {
    const slidesData = data.map(slide => JSON.parse(slide.value));

slidesData.sort((a, b) => {
  const getOrder = title => {
    const t = title.toLowerCase();
    if (t.includes('мбр')) return 0;
    if (t.includes('лос')) return 1;
    if (t.includes('емк')) return 2;
    return 999;
  };
  return getOrder(a.title) - getOrder(b.title);
});

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
  
  // Выбираем картинку по заголовку
  let imageName = '';
  if (data.title.includes('ЛОС')) {
    imageName = 'los.webp';
  } else if (data.title.includes('МБР')) {
    imageName = 'mbr.webp';
  } else if (data.title.includes('емкост')) {
    imageName = 'emk.webp';
  }

  slide.innerHTML = `
    <div class="slider_cont_wrapper">
      <div class="slider_cont">
        <h2>${data.title}</h2>
        <p>${data.description}</p>
        <button class="slider__btn">Подробнее</button>
      </div>
      <img class="slider_image" src="image/${imageName}" alt="Изображение">
    </div>
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
