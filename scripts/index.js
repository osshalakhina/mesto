let openPopupButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let form = document.querySelector('.popup__form');
let profileNameInput = document.querySelector('.popup__form input[name="name"]');
let profileJobInput = document.querySelector('.popup__form input[name="job"]');
let formSubmitButton = document.querySelector('.popup__save-button');
let activeLikeButtons = document.querySelectorAll('.place__like-button');

function togglePopup() {
    if (!popup.classList.contains('popup_is-opened')){
        profileName.textContent = openPopupButton.textContent;
        profileName.value = openPopupButton.textContent;
    }

    popup.classList.toggle('popup_is-opened');
    profileNameInput.focus();
}

//togglePopup();

openPopupButton.addEventListener('click', togglePopup);

//открывается попап

closePopupButton.addEventListener('click', togglePopup);

//закрывается попап

document.querySelector('.popup__content').addEventListener(
    'click', 
    function (event) {
    event.stopPropagation();
});

// попап закрывается только тогда когда кликаем на него

form.addEventListener(
    'submit',
    function (event) {
        event.preventDefault();

        profileName.textContent = profileNameInput.value;
        profileJob.textContent = profileJobInput.value;

        togglePopup();
    }
);

//происходит отправка формы

for (let btn of activeLikeButtons) {
    btn.addEventListener('click', function(event){
        btn.classList.toggle('place__like-button_active');
    });
};


