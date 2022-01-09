
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import '../index.css';
import { useState } from 'react';

function App() {

  const [isEditProfilePopupOpen, setStateForProfilePopup] = useState(false)
  const [isAddPlacePopupOpen, setStateAddPlacePopup] = useState(false)
  const [isEditAvatarPopupOpen, setStateEditAvatarPopup] = useState(false)
  const [selectedCard, setSelectedCard] = useState(false)
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
    <>
      <div className="page-wrapper">
        <Header />
        <Main
          onAddPlaceClick={handleAddPlaceClick}
          onEditProfileClick={handleEditProfileClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          isEditPopupOpen={isEditProfilePopupOpen}
          isAddCardOpen={isAddPlacePopupOpen}
          isEditProfilePicOpen={isEditAvatarPopupOpen}
          closeThePopups={closeAllPopups}
          selectedCard={selectedCard}
          isImagePopupIsOpen={isImagePopupIsOpen}


        />
        <Footer />

      </div>

    </>
  )
}

export default App

