// Данные для генерации контента
const appData = {
  events: [
    {
      title:"Горнолыжный курорт",
      date:"11.24",
      price:"от € 3.800",
      image:"src/pic1.png"
    },
    {
      title:"Арт-Базель, Швейцария",
      date:"06.24",
      price:"от € 3.800",
      image:"src/pic2.png"
    },
    {
      title:"2я ежегодная парусная регата Капитаны Будущего",
      date:"09.24",
      price:"от € 3.800",
      image:"src/pic3.png"
    }
  ],

  sliderImages: [
    "src/1.png",
    "src/2.png",
    "src/3.png"
  ],

  contacts: [
    "Алексей Мельник: +7 (900) 123-45-67",
    "Пётр Карасев: +7 (900) 234-56-78",
    "Елена Крылова: +7 (900) 345-67-89"
  ],

  footerLinks: [
    { text: "Политика конфиденциальности", href: "#" },
    { text: "Обработка данных", href: "#" },
    { text: "Карта сайта", href: "#" },
    { text: "Техподдержка", href: "#" }
  ]
};

// Вспомогательные функции для создания элементов
function createElement(tag, className, text = '') {
  const element = document.createElement(tag);
  if(className) element.className = className;
  if(text) element.textContent = text;
  return element;
}

function createImage(src, alt, className = '') {
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  if (className) img.className=className;
  return img;
}

function createLink(href,text,className='') {
  const link = document.createElement('a');
  link.href = href;
  link.textContent = text;
  if (className) link.className = className;
  return link;
}

// Функции для генерации контента
function createEventCard(event) {
  const card = createElement('div','event-card');
  
  const image = createImage(event.image, event.title);
  const content = createElement('div','event-content');
  
  const title = createElement('div','event-title', event.title);
  const date = createElement('div','event-date', event.date);
  const price = createElement('div','event-price', event.price);
  const button = createElement('button','event-button','Оставить заявку');
  
  // Добавляем обработчик для кнопки
  button.addEventListener('click', () => {
    openModal();
  });
  
  content.append(title, date, price, button);
  card.append(image, content);
  
  return card;
}

function generateEvents() {
  const container = document.getElementById('events');
  container.innerHTML = '';
  
  appData.events.forEach(event => {
    const card = createEventCard(event);
    container.appendChild(card);
  });
}

function generateSlider() {
  const container = document.getElementById('slider-wrapper');
  container.innerHTML = '';
  
  appData.sliderImages.forEach((imageSrc, index) => {
    const slide=createElement('div','swiper-slide');
    const image=createImage(imageSrc,`Слайд ${index + 1}`);
    slide.appendChild(image);
    container.appendChild(slide);
  });
}

function generateContacts() {
  const container=document.getElementById('contacts-container');
  container.innerHTML='';
  
  appData.contacts.forEach(contactText => {
    const paragraph=createElement('p','', contactText);
    container.appendChild(paragraph);
  });
}

function generateFooterLinks() {
  const container=document.getElementById('footer-links');
  container.innerHTML='';
  
  appData.footerLinks.forEach(linkData => {
    const link=createLink(linkData.href, linkData.text);
    container.appendChild(link);
  });
}

function setupModal() {
  const modal=document.getElementById('modal');
  const closeBtn=document.getElementById('modal-close');
  const form=document.getElementById('application-form');
  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target===modal) {
      closeModal();
    }
  });

  // Закрытие по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key==='Escape') {
      closeModal();
    }
  });

  // Обработка формы
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
    closeModal();
    form.reset();
  });
}

function openModal() {
  const modal=document.getElementById('modal');
  modal.style.display='block';
  document.body.style.overflow = 'hidden'; // Блокируем скролл
}

function closeModal() {
  const modal=document.getElementById('modal');
  modal.style.display='none';
  document.body.style.overflow='auto'; // Восстанавливаем скролл
}

// Управление бургер-меню
function setupBurgerMenu() {
  const burger=document.querySelector('.burger');
  const nav=document.querySelector('.nav');

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      nav.classList.remove('open');
    });
  });
}

// Инициализация слайдера
function initSlider() {
  return new Swiper('.slider', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      0: { slidesPerView:1,spaceBetween: 10 },
      600: { slidesPerView:2,spaceBetween: 15 },
      1024: { slidesPerView:3,spaceBetween: 20 }
    }
  });
}

function initApp() {
  generateEvents();
  generateSlider();
  generateContacts();
  generateFooterLinks();
  setupModal();
  setupBurgerMenu();
  initSlider();
}

document.addEventListener('DOMContentLoaded', initApp);