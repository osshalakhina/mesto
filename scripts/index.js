//НАЙДЕМ ВСЕ ПОПАПЫ НА СТРАНИЦЕ

const popups = document.querySelectorAll('.popup')
const openPopupButtons = document.querySelectorAll('.popup__open');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const form = document.querySelector('.popup__form');
const profileNameInput = document.querySelector('#nameInput');
const profileJobInput = document.querySelector('#jobInput');
const popupImgView = document.querySelector('.popup_image');
const popupImg = document.querySelector('.popup_type_add-card');
const imgPopup = document.querySelector('.popup_image');
const titlePopup = popupImgView.querySelector('.popup__text');
const initialCardsElements = document.querySelector('.places__list');
const templateCard = document.querySelector('.template-card');
const popupActiveClass = 'popup_is-opened';

// ИНИЦИАЛИЗАЦИЯ НАЧАЛЬНЫХ ЗНАЧЕНИЙ Cards
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// ИНИЦИЛИЗАЦИЯ LISTENERS для card
function addCardListeners(card) {
  card.querySelector('.place__like-button').addEventListener('click', activeLikeBtn);
  card.querySelector('.place__delete-button').addEventListener('click', deleteCard);
  card.querySelector('.place__image').addEventListener('click', openPopupImg);
}

// СОЗДАНИЕ CARD
function addTemplateCard(item) {
  const cardClone = templateCard.content.cloneNode(true);
  const text = cardClone.querySelector('.place__text');
  const img = cardClone.querySelector('.place__image');
  text.textContent = item.name;
  img.src = item.link;
  img.alt = item.name;
  addCardListeners(cardClone)
  initialCardsElements.prepend(cardClone);
  return cardClone;
}

// ИНИЦИЛИЗАЦИЯ CARDS
initialCards.map(addTemplateCard);

// СДЕЛАЕМ ИТЕРАЦИЮ ПО ВСЕМ ПОПАПАМ И ПОВЕСИМ ОПРЕДЕЛЕННЫЕ СОБЫТИЯ НА ЭЛЕМЕНТЫ
popups.forEach(popup => {
//ДЛЯ КНОПКИ ЗАКРЫТЬ ДОБАВИМ КЛАСС hidePopup
  const btnClose = popup.querySelector('.popup__close-button');
  btnClose.addEventListener('click', () => hidePopup(popup))
})

//ФУНКЦИЯ ДЛЯ УДАЛЕНИЕ КЛАССА В ОТКРЫТЫХ ПОПАПАХ
function hidePopup(/** HTMLElement*/ popup) {
  popup.classList.remove(popupActiveClass)
}

openPopupButtons.forEach(button => {
  button.addEventListener('click', showPopup)
})

function showPopup(event) {
  const el = event.target;
  if (el.classList.contains('profile__add-button')) {
    popupAddCard.classList.add(popupActiveClass)
  } else if (el.classList.contains('profile__edit-button')) {
    popupEditProfile.classList.add(popupActiveClass)
  } else return;
}

// TOGGLE ПОПАП ПРОФИЛЯ
function togglePopup() {
  if (!popupEditProfile.classList.contains(popupActiveClass)) {
    profileName.textContent = profileNameInput.value;
    profileJob.textContent = profileJobInput.value;
  }
  popupEditProfile.classList.toggle('popup_is-opened');
}

// функция открытия фотографии для просмотра
function openPopupImg(event) {
  const elImg = imgPopup.querySelector('img')
  elImg.src = event.target.src;
  elImg.alt = event.currentTarget.alt;
  imgPopup.classList.add(popupActiveClass)
  titlePopup.textContent = event.currentTarget.alt;
}


form.addEventListener('submit', function (event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  togglePopup();
});


const addCardForm = popupAddCard.querySelector('.popup__form');
addCardForm.addEventListener('submit', addCard);

const cardsHtml = document.querySelector('.places__list');
const cardElement = document.querySelector('.template-card').content;


function createCard(data) {
  const newCard = cardElement.querySelector('.place').cloneNode(true);
  const elementImage = newCard.querySelector('.place__image');
  
  elementImage.src = data.link;
  elementImage.alt = data.name;
  
  newCard.querySelector('.place__image').src = data.link;
  newCard.querySelector('.place__text').textContent = data.name;
  addCardListeners(newCard);
  return newCard;
}

function addCard(event) {
  event.preventDefault();
  const cardName = event.target.querySelector('#typePlace').value;
  const cardLink = event.target.querySelector('#typeUrl').value;
  const newCard = createCard({name: cardName, link: cardLink});
  cardsHtml.prepend(newCard);
  event.target.reset();
  toggleModal(popupAddCard);
}

//УДАЛЕНИЕ КАРТОЧКИ

function deleteCard(event) {
  const card = event.target.closest('.place');
  card.remove();
}

function activeLikeBtn(event) {
  const btn = event.target
  btn.classList.toggle('place__like-button_active');
  
}





