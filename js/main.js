import { useDynamicAdapt } from "./dynamicAdapt.js";
import { popups } from "./popups.js";
import { cards } from "./cards.js";
//==== динамический адаптив ==============================//
useDynamicAdapt();

function init() {
  addPopupServices();
  mobileMenu();
  popupClockCall();
  popupServices();
  openBenefit();
  sliderAbout();
  addActionCard();
  sliderTeam();
  sliderRewiews();
  popupReceipt();
}
//после загрузки сайта запускаем init()
document.addEventListener("DOMContentLoaded", init());

//==== кнопка mobile__menu ===============================//
function mobileMenu() {
  const btn = document.querySelector(".header__menu-mobile");
  const menuBtn = document.querySelector(".menu");
  const menuList = document.querySelector(".header__menu-list");
  const body = document.querySelector("body");
  const menuLink = document.querySelectorAll(".header__menu-link");
  //открываем и закрываем меню при клике на кнопку
  btn.addEventListener("click", function () {
    menuBtn.classList.toggle("active");
    menuList.classList.toggle("active");
    body.classList.toggle("no-scroll");
  });
  //закрываем меню при выборе пункта меню
  menuLink.forEach((item) => {
    item.addEventListener("click", function () {
      menuBtn.classList.toggle("active");
      menuList.classList.toggle("active");
      body.classList.toggle("no-scroll");
    });
  });
}

//==== POPUP заказть звонок ===============================//
function popupClockCall() {
  const openCall = document.getElementById("openCall");
  const closeCall = document.getElementById("closeCall");
  const popupCall = document.getElementById("call");
  const form = document.querySelector(".popup-call__form");
  const done = document.querySelector(".popup-call__done");
  const body = document.querySelector("body");
  //функция добавляяет класс актив popup-call и отключает скрол экрана
  function addClass() {
    popupCall.classList.add("active");
    body.classList.add("no-scroll");
  }
  //функция убирает класс актив popup и включает скрол экрана
  function removeClass() {
    popupCall.classList.remove("active");
    body.classList.remove("no-scroll");
  }
  //===== включаем popup
  // кнопкой 'Заказать звонок'
  openCall.addEventListener("click", () => addClass());
  //====== выключаем popup
  //кнопкой "closeCall"
  closeCall.addEventListener("click", function (e) {
    e.preventDefault();
    //закрываем форму с инпутами
    form.classList.remove("active");
    //открываем тексе - заявка принята
    done.classList.add("active");
    //через 2 сек закрываем возвращаем форму, скрываем текст и закрываем попап
    setTimeout(() => {
      done.classList.remove("active");
      form.classList.add("active");
      removeClass();
    }, 2000);
  });
  //нажатием на кнопку "Escape"
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") removeClass();
  });
  //кликом на экран вокруг модального окна
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup__container")) removeClass();
  });
}

//=== POPUP services ======================================//
function popupServices() {
  const openPopup = document.querySelector(".services__items");
  const popups = document.querySelectorAll(".popup-services");
  const body = document.querySelector("body");

  function addClassPopup(id) {
    popups.forEach((item) => {
      if (item.id === `popup-` + id) {
        item.classList.add("active");
        body.classList.add("no-scroll");
      }
    });
  }

  function removeClassPopup() {
    popups.forEach((item) => {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
        body.classList.remove("no-scroll");
      }
    });
  }
  //===== включаем popup
  openPopup.addEventListener("click", function (e) {
    if (e.target.classList.contains("services__img")) {
      const id = e.target.id;
      addClassPopup(id);
    }
  });
  //====== выключаем popup
  popups.forEach((element) => {
    //console.log(element);
    element.addEventListener("click", function (e) {
      e.preventDefault();
      if (e.target.classList.contains("popup__close")) {
        removeClassPopup();
      }
      if (e.target.classList.contains("popup__btn")) {
        element.querySelector(".popup__form").classList.remove("active");
        element.querySelector(".popup__done").classList.add("active");
        setTimeout(() => {
          element.querySelector(".popup__form").classList.add("active");
          element.querySelector(".popup__done").classList.remove("active");
          removeClassPopup();
        }, 2000);
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") removeClassPopup();
  });
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup-services")) removeClassPopup();
  });
}

//=== верстка POPUP services ==============================//
function addPopupServices() {
  //находим контейнер для popup
  const popupContainer = document.getElementById("popups-container");
  //обходим массив popups, создаем элементы popup
  //console.log(popups);
  popups.forEach((item) => {
    const popup = document.createElement("div");
    popup.classList.add("popup-services");
    popup.classList.add("popup");
    popup.id = item.id;
    const subtitleOneStyle = item.subtitleOne === "" ? "display: none;" : "";
    const subtitleTwoStyle = item.subtitleTwo === "" ? "display: none;" : "";
    //console.log(item.img);
    popup.innerHTML = `
      <div class="popup__container container">
        <div class="popup__body">
          <div class="popup__close"></div>
          <div class="popup__title">
            <h3 class="title">${item.title}</h3>
            <img class="popup__bg" src="./img/modal/bg.png" alt="bg">
          </div>
          <div class="popup__content ${item.revers}">
            <div class="popup__column popup__column_left">
              <div class="popup__wrap-img">
                ${
                  item.img !== ""
                    ? `<img class="popup__img" src="${item.img}" alt="photo">`
                    : ""
                }
              </div> 
              <p class="popup__text popup__text_left">${item.textLeft}</p> 
              <ul class="popup__items popup__items_left">
                ${item.listLeft
                  .map(function (li) {
                    return `<li class="popup__item popup__item_left">${li}</li>`;
                  })
                  .join("")}
              </ul>
            </div>
            <div class="popup__column popup__column_right">  
              <div class="popup__subtitle" style="${subtitleOneStyle}">
                <h4 class="subtitle">${item.subtitleOne}</h4>
              </div>
              <p class="popup__text">${item.textRight}</p>
              <h4 class="subtitle" style="${subtitleTwoStyle}">${
      item.subtitleTwo
    }</h4>
              <ul class="popup__items">
                ${item.listRight
                  .map(function (li) {
                    return `<li class="popup__item">${li}</li>`;
                  })
                  .join("")}
              </ul>
            </div>
          </div>
          <form class="popup__form active">
            <div class="popup__wrap">
              <label class="popup__name" for="name">Имя</label>
              <input class="popup__input" type="text" id="name" placeholder="Имя" autocomplete="on"></input>
            </div>
            <div class="popup__wrap">
              <label class="popup__name" for="tel">телефон</label>
              <input class="popup__input" type="tel" id="tel" placeholder="+7 919 000 0000" autocomplete="on"></input>
            </div>
            <button class="popup__btn-bord button-bord" type="submit">
              <div class="popup__btn button">записаться на прием</div>
            </button>
          </form>
          <div class="popup__done ">
            <p class="popup__text">
              Спасибо за вашу заявку! <br>
              В ближайшее время с вами свяжется наш администратор.
            </p>
          </div>
        </div>
      </div>
    `;
    popupContainer.appendChild(popup);
  });
}

//===== раскрывающийся список Benefit =====================//
function openBenefit() {
  const openBtn = document.querySelector(".about__btn_expand");
  const closeBtn = document.querySelector(".about__btn_collapse");
  const aboutBox = document.querySelector(".about__box");
  openBtn.addEventListener("click", () => {
    aboutBox.classList.add("open");
  });
  closeBtn.addEventListener("click", () => {
    aboutBox.classList.remove("open");
  });
}

//===== slider About =====================================//
function sliderAbout() {
  new Swiper(".about__slider", {
    direction: "horizontal",
    //количество слайдов для показа
    slidesPerView: 1,
    clickable: true,
    //autoHeight: true,
    navigation: {
      nextEl: ".about__next",
      prevEl: ".about__prev ",
    },
  });
}

//===== slider Action =====================================//
//объявляем переменную слайдера swiperAction
let swiperAction;
//функция инициализация слайдера swiperAction
function initSwiper() {
  swiperAction = new Swiper(".action__slider", {
    direction: "horizontal",
    slidesPerView: 1,
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}
//функциия запуска autoplay
function startAutoplay() {
  if (swiperAction) {
    swiperAction.autoplay.start();
  }
}
//функйия остановки autoplay
function stopAutoplay() {
  if (swiperAction) {
    swiperAction.autoplay.stop();
  }
}
//функция отслеживания видимости слайдера и запуска-отключения autoplay
function sliderAction() {
  //запускаем слайдер
  initSwiper();
  //создаем экземпляр IntersectionObserver который проверяет, находится ли слайдер в видимой части экрана
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      //если слайдер в области видимости
      if (entry.isIntersecting) {
        startAutoplay();
        //если слайдер уходит из области видимости
      } else {
        stopAutoplay();
      }
    });
  });
  //определяем элемент - который отслеживаем
  const sliderElement = document.querySelector(".action__slider");
  //начинаем отслеживание
  observer.observe(sliderElement);
}
sliderAction();
//==========================================================//

//==== верстка карточек для слайдера Action ================//
function addActionCard() {
  //массив cards имрортируем из файла "./cards.js"
  //находим контейнер для карточек
  const slideContainer = document.getElementById("action-card");
  //обходим массив, создаем элементы
  cards.forEach((card) => {
    const actionCard = document.createElement("div");
    actionCard.classList.add("action__card", "card", "swiper-slide");
    actionCard.innerHTML = `
        <img class="card__icon" src=${card.icon} alt="">
        <h4 class="card__title">${card.title}</h4>
        <p class="card__text">${card.text}</p>
        <div class="card__prices">
          <ul class="card__items">
            <li class="card__item">
            ${
              card.name1 !== ""
                ? `<span class="card__item-after">${card.name1}</span>`
                : ""
            }
            ${
              card.price1 !== "" ? `${card.price1.toLocaleString()} рублей` : ""
            }
            </li>
            <li class="card__item">
            ${
              card.name2 !== ""
                ? `<span class="card__item-after">${card.name2}</span>`
                : ""
            }
            ${
              card.price2 !== "" ? `${card.price2.toLocaleString()} рублей` : ""
            }
            </li>
            <li class="card__item">
            ${
              card.name3 !== ""
                ? `<span class="card__item-after">${card.name3}</span>`
                : ""
            }
            ${
              card.price3 !== "" ? `${card.price3.toLocaleString()} рублей` : ""
            }
            </li>
          </ul>
          ${
            card.price !== ""
              ? `<div class="card__price">${card.price.toLocaleString()} рублей</div>`
              : ""
          }
        </div>
        <div class="card__img-wrap">
          <img class="card__img" src=${card.img} alt="img">
        </div>
        <div class="card__condition">
          Условия: отсутствие показаний к пародотологическому лечению
        </div>
    `;
    //console.log(actionCard);
    slideContainer.appendChild(actionCard);
  });
}

//==== slider Team =========================================//
function sliderTeam() {
  const swiperConfig = {
    direction: "horizontal",
    slidesPerView: 1,
    navigation: {
      nextEl: ".slider-big__next",
      prevEl: ".slider-big__prev ",
    },
  };
  //минислайдер (превью)
  if (window.innerWidth > 480) {
    swiperConfig.thumbs = {
      swiper: {
        el: ".slider-small",
        direction: "horizontal",
        slidesPerView: 3,
        slidesPerGroup: 1,
        breakpoints: {
          768: {
            spaceBetween: 40,
          },
          0: {
            spaceBetween: 20,
          },
        },
      },
    };
  }
  new Swiper(".slider-big", swiperConfig);
}


//==== POPUP записаться на прием ===========================//
function popupReceipt() {
  const openCall = document.getElementById("openPop");
  const closeCall = document.getElementById("close");
  const popupCall = document.getElementById("receipt");
  const form = document.querySelector(".receipt__form");
  const done = document.querySelector(".receipt__done");
  const body = document.querySelector("body");
  //функция добавляяет класс актив popup-call и отключает скрол экрана
  function addClass() {
    popupCall.classList.add("active");
    body.classList.add("no-scroll");
  }
  //функция убирает класс актив popup и включает скрол экрана
  function removeClass() {
    popupCall.classList.remove("active");
    body.classList.remove("no-scroll");
  }
  //===== включаем popup
  // кнопкой 'Заказать звонок'
  openCall.addEventListener("click", () => addClass());
  //====== выключаем popup
  //кнопкой "closeCall"
  closeCall.addEventListener("click", function (e) {
    e.preventDefault();
    //закрываем форму с инпутами
    form.classList.remove("active");
    //открываем текст - заявка принята
    done.classList.add("active");
    //через 2 сек закрываем возвращаем форму, скрываем текст и закрываем попап
    setTimeout(() => {
      done.classList.remove("active");
      form.classList.add("active");
      removeClass();
    }, 2000);
  });
  //нажатием на кнопку "Escape"
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") removeClass();
  });
  //кликом на экран вокруг модального окна
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup__container")) removeClass();
  });
}


//==== slider Rewiews ======================================//
function sliderRewiews() {
  new Swiper(".reviews__slider", {
    direction: "horizontal",
    //количество слайдов для показа
    slidesPerView: 1,
    clickable: true,
    autoHeight: true,
    navigation: {
      nextEl: ".reviews__next",
      prevEl: ".reviews__prev ",
    },
  });
}

//==== верстка карточек slider Rewiews =====================//
const reviews = document.querySelector(".reviews__wrapper"); 
if (reviews) {
  loadReviewsItems();
}

async function loadReviewsItems() {
  const response = await fetch ("src/reviews.json",{
    method:"GET"
  });
  if (response.ok) {
    const responseResult = await response.json();
    initReviews(responseResult)
  }else{alert('Error!')};
}

function initReviews(data) {
  data.items.forEach((item) => {
    buildReviewsItem(item);
  })
}

function buildReviewsItem(item) {
  // let reviewsItemTemplate = ``;

  let reviewsItemTemplate = `
    <div class="reviews__slide swiper-slide">
      <div class="reviews__body">
        <span></span>
        <div class="reviews__photo">
          <img class="reviews__img" src="${item.img}" alt="photo-reviews">
        </div>
        <div class="reviews__content">
          <h4 class="reviews__name title">${item.title}</h4>
          <p class="reviews__text">${item.text}</p>
        </div>
      </div>
    </div>             
  `;
  reviews.insertAdjacentHTML('beforeend', reviewsItemTemplate);
}
