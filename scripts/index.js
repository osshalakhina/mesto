//НАЙДЕМ ВСЕ ПОПАПЫ НА СТРАНИЦЕ

const popups = document.querySelectorAll('.popup')
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const form = document.querySelector('.popup__form');
const profileNameInput = document.querySelector('#nameInput');
const profileJobInput = document.querySelector('#jobInput');
const typeAddCard = document.querySelector('.popup_type_add-card');
const imgPopup = document.querySelector('.popup_image');
const titlePopup = imgPopup.querySelector('.popup__text');
const initialCardsElements = document.querySelector('.places__list');
const templateCard = document.querySelector('.template-card');
const popupActiveClass = 'popup_is-opened';

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

// ФУНКЦИЯ ОТКРЫТИЯ ПОПАПА ПРОФИЛЯ
function fillProfileInputs() {
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  showPopup(popupEditProfile);
}

// ФУНКЦИЯ ДЛЯ УДАЛЕНИЕ И ДОБАВЛЕНИЯ КЛАССА В ОТКРЫТЫХ ПОПАПАХ
function hidePopup(/** HTMLElement*/ popup) {
  popup.classList.remove(popupActiveClass);
}

function showPopup(/** HTMLElement*/ popup) {
   popup.classList.add(popupActiveClass);
  }

const addCardButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const imgButton = document.querySelector('.place__image');

addCardButton.addEventListener('click', () => showPopup(popupAddCard));
editButton.addEventListener('click', fillProfileInputs);

// ДОБАВЛЕНИЕ CARD
function addTemplateCard(data) {
  const cardClone = createCard(data)
  initialCardsElements.prepend(cardClone);
}  

function addCard(event) {
  event.preventDefault();
  const cardName = event.target.querySelector('#typePlace').value;
  const cardLink = event.target.querySelector('#typeUrl').value;
  const newCard = addTemplateCard({name: cardName, link: cardLink});
  event.target.reset();  
  hidePopup(popupAddCard);
}

// ИНИЦИЛИЗАЦИЯ CARDS
initialCards.map(addTemplateCard);

// СДЕЛАЕМ ИТЕРАЦИЮ ПО ВСЕМ ПОПАПАМ И ПОВЕСИМ ОПРЕДЕЛЕННЫЕ СОБЫТИЯ НА ЕЛЕМЕНТЫ
popups.forEach(popup => {
// ДЛЯ КНОПКИ ЗАКРЫТЬ ДОБАВИМ КЛАСС hidePopup
  const btnClose = popup.querySelector('.popup__close-button');
  btnClose.addEventListener('click', () => hidePopup(popup))
  
})

// ФУНКЦИЯ ОТКРЫТИЯ ФОТОГРАФИИ ДЛЯ ПРОСМОТРА
function openPopupImg(popup) {
  const elImg = imgPopup.querySelector('img');
  elImg.src = popup.target.src;
  titlePopup.textContent = popup.currentTarget.alt;
  showPopup(imgPopup);
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  fillProfileInputs();
  hidePopup(popupEditProfile);
});

// УДАЛЕНИЕ КАРТОЧКИ
function deleteCard(event) {
  const card = event.target.closest('.place');
  card.remove();
}

function activeLikeBtn(event) {
  const btn = event.target
  btn.classList.toggle('place__like-button_active');
}
