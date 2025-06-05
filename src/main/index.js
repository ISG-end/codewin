fetch('https://api.los-bio.ru/info/group/slide')
  .then(response => response.json())
  .then(data => {
    const slidesContainer = document.getElementById('slides-container'); // Элемент, куда будут добавляться слайды

    data.forEach(slide => {
      const slideData = JSON.parse(slide.value); // Парсим строку JSON

      // Создаем элемент для слайда
      const slideElement = document.createElement('div');
      slideElement.classList.add('slide');

      // Добавляем содержимое слайда
      slideElement.innerHTML = `
        <h2>${slideData.title}</h2>
        <p>${slideData.description}</p>
        <a href="${slideData.link}" target="_blank">Подробнее</a>
        <img src="image/${slideData.image[0].name}" alt="${slideData.title}">
      `;

      // Добавляем слайд в контейнер
      slidesContainer.appendChild(slideElement);
    });
  })
  .catch(error => console.error('Ошибка:', error));
