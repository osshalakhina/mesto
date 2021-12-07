//НАЙДЕМ ВСЕ ПОПАПЫ НА СТРАНИЦЕ

const popups = document.querySelectorAll('.popup')
const openPopupButtons = document.querySelectorAll('.popup-open');
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

// ИНИЦИАЛИЗАЦИЯ НАЧАЛЬНЫХ ЗНАЧЕНИЙ CARDS
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

// ИНИЦИЛИЗАЦИЯ LISTENERS ДЛЯ CARD
function addCardListeners(card) {
  card.querySelector('.place__like-button').addEventListener('click', activeLikeBtn);
  card.querySelector('.place__delete-button').addEventListener('click', deleteCard);
  card.querySelector('.place__image').addEventListener('click', openPopupImg);
}

const addCardForm = popupAddCard.querySelector('.popup__form');
addCardForm.addEventListener('submit', addCard);

const cardsHtml = document.querySelector('.places__list');
const cardElement = document.querySelector('.template-card').content;

// СОЗДАНИЕ CARD
function createCard(data) {
  const newCard = cardElement.querySelector('.place').cloneNode(true);
  const elementImage = newCard.querySelector('.place__image');
  
  elementImage.src = data.link;
  elementImage.alt = data.name;
  
  newCard.querySelector('.place__text').textContent = data.name;
  addCardListeners(newCard);
  return newCard;
}

// ФУНКЦИЯ ДЛЯ УДАЛЕНИЕ И ДОБАВЛЕНИЯ КЛАССА В ОТКРЫТЫХ ПОПАПАХ
function hidePopup(/** HTMLElement*/ popup) {
  popup.classList.remove(popupActiveClass);
}

openPopupButtons.forEach(button => {
  button.addEventListener('click', showPopup);
})

function showPopup(/** HTMLElement*/ popup) {
  popup.classList.add(popupActiveClass);
}

function showPopup(popup) {
  const el = popup.target; 

  if (el.classList.contains('profile__add-button')) {
    popupAddCard.classList.add(popupActiveClass); 
  } else if (el.classList.contains('profile__edit-button')) { 
    popupEditProfile.classList.add(popupActiveClass); 
  } else if (el.classList.contains('place__image')){ 
    imgPopup.classList.add(popupActiveClass);
    titlePopup.textContent = popup.currentTarget.alt;
  } else return; 
} 

// ДОБАВЛЕНИЕ CARD
function addTemplateCard(data) {
  const cardClone = createCard(data)
  initialCardsElements.prepend(cardClone);
}  

function addCard(popup) {
  popup.preventDefault();
  const cardName = popup.target.querySelector('#typePlace').value;
  const cardLink = popup.target.querySelector('#typeUrl').value;
  const newCard = createCard({name: cardName, link: cardLink});
  cardsHtml.prepend(newCard);
  popup.target.reset();  
  hidePopup(popup);
}

// ИНИЦИЛИЗАЦИЯ CARDS
initialCards.map(addTemplateCard);

// СДЕЛАЕМ ИТЕРАЦИЮ ПО ВСЕМ ПОПАПАМ И ПОВЕСИМ ОПРЕДЕЛЕННЫЕ СОБЫТИЯ НА ЕЛЕМЕНТЫ
popups.forEach(popup => {
// ДЛЯ КНОПКИ ЗАКРЫТЬ ДОБАВИМ КЛАСС hidePopup
  const btnClose = popup.querySelector('.popup__close-button');
  btnClose.addEventListener('click', () => hidePopup(popup))
})

// ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА ПРОФИЛЯ
function fillProfileInputs() {
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
}

// ФУНКЦИЯ ОТКРЫТИЯ ФОТОГРАФИИ ДЛЯ ПРОСМОТРА
function openPopupImg(popup) {
  const elImg = imgPopup.querySelector('img');
  elImg.src = popup.target.src;
  elImg.alt = popup.currentTarget.alt;
  showPopup(popup);
}

form.addEventListener('submit', function (popup) {
  popup.preventDefault();
  fillProfileInputs();
  hidePopup(popupEditProfile);
});

// УДАЛЕНИЕ КАРТОЧКИ
function deleteCard(popup) {
  const card = popup.target.closest('.place');
  card.remove(popup);
}

function activeLikeBtn(popup) {
  const btn = popup.target
  btn.classList.toggle('place__like-button_active');
}
