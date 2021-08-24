let openPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let form = document.querySelector('.popup__form');
let profileNameInput = document.querySelector('.popup__form input[name="name"]');
let profileJobInput = document.querySelector('.popup__form input[name="job"]');

function togglePopup() {
    if (!popup.classList.contains('popup_is-opened')){
        profileName.textContent = profileNameInput.value;
        profileJob.textContent = profileJobInput.value;
    }

    popup.classList.toggle('popup_is-opened');
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




