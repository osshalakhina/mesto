const openPopupButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const closePopupButton = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const form = document.querySelector('.popup__form');
const profileNameInput = document.querySelector('#nameInput');
const profileJobInput = document.querySelector('#jobInput');
const popupImg = document.querySelector(".popup_type_add-card");
const popupImgCloseBtn = popupImg.querySelector(".popup__close-button");

//ПОПАП ПРОФИЛЯ
function togglePopup() {
    if (!popupEditProfile.classList.contains('popup_is-opened')){
        profileName.textContent = profileNameInput.value;
        profileJob.textContent = profileJobInput.value;
    }

    popupEditProfile.classList.toggle('popup_is-opened');
} //togglePopup();

openPopupButton.addEventListener('click', togglePopup);
//открывается попап

closePopupButton.addEventListener('click', togglePopup);
//закрывается попап

form.addEventListener('submit', function (event) {
        event.preventDefault();

        profileName.textContent = profileNameInput.value;
        profileJob.textContent = profileJobInput.value;

        togglePopup();
    }
);

//происходит отправка формы

// ГЕНЕРИРУЕМ 6 КАРТОЯЕК
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

const initialCardsElements = document.querySelector('.places__list');
const templateCard = document.querySelector('.template-card');

function addTemplateCard(item) {
  const addElement = templateCard.content.cloneNode(true);
  addElement.querySelector('.place__text').textContent = item.name;
  addElement.querySelector('.place__image').src = item.link;
  addElement.querySelector(".place__text").alt = item.name;
  addElement.querySelector('.place__delete-button').addEventListener("click", deleteCard);

  initialCardsElements.prepend(addElement);

  return addElement;
}

initialCards.map(addTemplateCard);

//ПРИ КЛИКЕ СЕРДЕЧКО СТАНОВИТСЯ ЧЕРНЫМ
const activeLikeButtonss = document.querySelectorAll('.place__like-button');
for (let btn of activeLikeButtonss) {
    btn.addEventListener('click', function(event){
        btn.classList.toggle('place__like-button_active');
    });
};

//ФОРМА ДОБАВЛЕНИЯ КАРТОЧЕК

const popupCards = document.querySelector('.popup_type_add-card'); 
const popupAddOpen = document.querySelector('.profile__add-button'); 
const popupAddClous = popupCards.querySelector('.popup__close-button'); 

//Открытие формы
function openPopupAdd() {
  popupCards.classList.add('popup_is-opened');
  }

// Закрытие формы
function closePopupAdd() {
  popupCards.classList.remove('popup_is-opened');
}

popupAddOpen.addEventListener('click', openPopupAdd); 
popupAddClous.addEventListener('click', closePopupAdd); 

//ДОБАВЛЕНИЕ КАРТОЧКИ

function toggleModal(modal) {
    modal.classList.toggle("popup_is-opened");
  }

//openPopupButton.addEventListener("click", () => toggleModal(popupAddCard));
//closePopupButton.addEventListener("click", () => toggleModal(popupAddCard));
//popupImgCloseBtn.addEventListener("click", () => toggleModal(popupImg));


const addCardForm = popupAddCard.querySelector(".popup__form");
addCardForm.addEventListener("submit", addCard);

const cardsHtml = document.querySelector(".places__list");
const cardElement = document.querySelector(".template-card").content;


function createCard(data) {
    const newCard = cardElement.querySelector(".place").cloneNode(true);
    newCard.querySelector(".place__image").src = data.link;
    newCard.querySelector(".place__text").textContent = data.name;
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
    const card = event.target.closest(".place");
    card.remove();
  }
  
function addCards(cards) {
    const newCards = cards.map(createCard);
    cardsHtml.append(...newCards);
  }

function activeLikeBtn(event) {
    const activeLikeButtons = document.querySelectorAll('.place__like-button');
    for (let btn of activeLikeButtons) {
        btn.addEventListener('click', function(event){
            btn.classList.toggle('place__like-button_active');
        });
};
  }

function addCardListeners(card) {
    card.querySelector(".place__like-button").addEventListener("click", activeLikeBtn);
    card.querySelector(".place__delete-button").addEventListener("click", deleteCard);
    card.querySelector(".place__image").addEventListener("click", () => {
      showImg();
      toggleModal(popupImg);
    });
  }

//function showImg(event) {
//    image = event.target.currentSrc;
//    title = event.currentTarget.nextElementSibling.innerText;
//    popupImg.querySelector(".place__image").src = image;
//    popupImg.querySelector(".popup__photo-name").innerText = title;
//  }

  

