
import { Header } from './Header';
import { Main } from './Main';
import { PopupWithForm } from "./PopupWithForm";
import { ImagePopup } from "./ImagePopup";
import { Footer } from './Footer';
import '../index.css';
import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext.js'
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup'
import { AddPlacePopup } from './AddPlacePopup'

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopupIsOpen, setIsImagePopupIsOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [isLoading, setisLoading] = useState(false)

  async function handleDeleteCard(card) {
    const deletedCard = card;
    try {
      const deleteCardResponse = await api.deleteCard(card._id)
      if (deleteCardResponse) {

        setCards((cards) => cards.filter((c) => c._id !== deletedCard._id))

      }
    }
    catch (e) {
      console.log('check your error', e);
      alert("something went wrong")
    }


  }

  async function handleCardLike(card) {

    // Check one more time if this card was already liked
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Send a request to the API and getting the updated card data
    try {
      const updatedCard = await api.changeLikeCardStatus(card._id, !isLiked);
      if (updatedCard) {

        setCards((cards) => cards.map((oldCard) => oldCard._id === card._id ? updatedCard : oldCard))

      }

    }
    catch (e) {
      console.log('check your error', e);
      alert("something went wrong")
    }


  }


  useEffect(() => {

    (async function () { //  the call back shouldnt be async --> react methods are sync 
      setisLoading(true)
      try {
        const cardsData = await api.getInitialCards();
        if (cardsData) {

          setCards(cardsData)

        }
      }
      catch (error) {

        console.log('check your error', error);
        alert("something went wrong")


      }
      finally {
        setisLoading(false);
      }

    })();


  }, [])
  useEffect(() => {
    (async function () {
      try {

        const userInfo = await api.getUserData();
        if (userInfo) {
          setCurrentUser(userInfo)

        }

      }
      catch (e) {
        console.log('error when updating userInfo', e);
        alert("something went wrong with updating user info")
      }

    })();


  }, [])

  async function handleUpdateUser({ name, description }) {

    try {

      const updatedUserInfo = await api.updatingProfileInfo(name, description)

      if (updatedUserInfo) {

        setCurrentUser(updatedUserInfo)

        closeAllPopups();
      }

    }
    catch (e) {
      console.log('something went wrong with updating user info', e);
      alert('something went wrong with updating user info')
    }




  }

  async function handleUpadeAvatar({ avatar }) {
    try {
      const updateAvatar = await api.updatingProfileImg(avatar)
      if (updateAvatar) {
        setCurrentUser({ ...currentUser, avatar })
        closeAllPopups();

      }
    }
    catch (e) {
      console.log('something went wrong with your avatar updating', e)
      alert('something went wrong with your avatar updating');
    }


  }
  async function handleAddPlaceSubmit(name, link) {
    try {
      const newCard = await api.uploadCard(name, link)
      if (newCard) {
        setCards([newCard, ...cards])
        console.log('newCard was added')
        closeAllPopups();

      }
    }
    catch (e) {
      console.log('something went wrong with adding a card', e)
      alert('something went wrong with adding a card')
    }


  }


  function closeAllPopups() {

    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImagePopupIsOpen(false)
    setTimeout(() => { setSelectedCard({}) }, 1000) //prevent the updating the state before the popup is hidden (caused by time of the transition)

  }



  function handleAddPlaceClick() {

    setIsAddPlacePopupOpen(true)

  }

  function handleEditProfileClick() {

    setIsEditProfilePopupOpen(true)

  }

  function handleEditAvatarClick() {

    setIsEditAvatarPopupOpen(true)

  }

  function handleCardClick(props) {

    setSelectedCard(props)
    setIsImagePopupIsOpen(true)

  }


  return (

    <div className="page-wrapper">

      <Header />

      <CurrentUserContext.Provider value={currentUser}>

        <Main

          onAddPlaceClick={handleAddPlaceClick}
          onEditProfileClick={handleEditProfileClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          isLoading={isLoading}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCard}

        />

        <ImagePopup selectedCard={selectedCard} isOpen={isImagePopupIsOpen} onClose={closeAllPopups} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpadeAvatar} />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCards={handleAddPlaceSubmit}
        />

        <PopupWithForm

          name="delete-card"
          title="Are you sure?"
          onClose={closeAllPopups}
          buttonText="Yes" >

        </PopupWithForm>

      </CurrentUserContext.Provider>

      <Footer />


    </div>


  )
}

export default App

