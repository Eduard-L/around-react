
import { Header } from './Header';
import { Main } from './Main';
import { PopupWithForm } from "./PopupWithForm";
import { ImagePopup } from "./ImagePopup";
import { Footer } from './Footer';
import '../index.css';
import { useState } from 'react';

function App() {

  const [isEditProfilePopupOpen, setStateForProfilePopup] = useState(false)
  const [isAddPlacePopupOpen, setStateAddPlacePopup] = useState(false)
  const [isEditAvatarPopupOpen, setStateEditAvatarPopup] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopupIsOpen, setStateImagePopup] = useState(false)


  function closeAllPopups() {
    setStateForProfilePopup(false)
    setStateAddPlacePopup(false)
    setStateEditAvatarPopup(false)
    setStateImagePopup(false)

  }



  function handleAddPlaceClick() {

    setStateAddPlacePopup(true)

  }

  function handleEditProfileClick() {

    setStateForProfilePopup(true)

  }

  function handleEditAvatarClick() {

    setStateEditAvatarPopup(true)

  }

  function handleCardClick(props) {

    setSelectedCard(props)
    setStateImagePopup(true)

  }


  return (

    <div className="page-wrapper">
      <Header />
      <Main

        onAddPlaceClick={handleAddPlaceClick}
        onEditProfileClick={handleEditProfileClick}
        onEditAvatarClick={handleEditAvatarClick}
        onCardClick={handleCardClick}

      />

      <ImagePopup selectedCard={selectedCard} isOpen={isImagePopupIsOpen} onClose={closeAllPopups} />
      <PopupWithForm

        isOpen={isEditProfilePopupOpen}
        name="edit-profile"
        title="Edit Profile"
        onClose={closeAllPopups}
        buttonText="Save"

      >



        <input
          type="text"
          id="input_type_name"
          className="popup__input popup__input_type_name"
          name="user_name"
          minLength="2"
          maxLength="40"
          placeholder="Enter Your Name"
          required
        />
        <span id="input_type_name-error" className="popup__error"></span>

        <input
          type="text"
          id="input_type_description"
          className="popup__input popup__input_type_description"
          name="job"
          minLength="2"
          maxLength="200"
          placeholder="Enter Your Job"
          required
        />
        <span id="input_type_description-error" className="popup__error"></span>


      </PopupWithForm>

      < PopupWithForm
        isOpen={isAddPlacePopupOpen}
        name="add-card"
        title="New Place"
        onClose={closeAllPopups}
        buttonText="Save">


        <input
          type="text"
          id="input_type_title"
          className="popup__input popup__input_type_title"
          name="title__card"
          placeholder="Title"
          minLength="1"
          maxLength="30"
          required
        />
        <span id="input_type_title-error" className="popup__error"></span>

        <input
          type="url"
          id="input_type_url"
          className="popup__input popup__input_type_url"
          name="image__url"
          placeholder="Image URL"
          required
        />
        <span id="input_type_url-error" className="popup__error"></span>



      </PopupWithForm>

      <PopupWithForm

        name="delete-card"
        title="Are you sure?"
        onClose={closeAllPopups}
        buttonText="Yes" >

      </PopupWithForm>

      <PopupWithForm

        isOpen={isEditAvatarPopupOpen}
        name="edit-profile-img"
        title="Change profile picture"
        onClose={closeAllPopups}
        buttonText="Save">

        <input
          type="url"
          id="input_type_url_photo"
          className="popup__input popup__input_type_url"
          name="profile-pic__url"
          placeholder="Enter your profile photo URL"
          required
        />
        <span id="input_type_url_photo-error" className="popup__error"></span>

      </PopupWithForm>

      <Footer />

    </div>


  )
}

export default App

