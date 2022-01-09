import { PopupWithForm } from "./PopupWithForm";
import { ImagePopup } from "./ImagePopup";
import { Card } from "./Card";
import { useEffect, useState } from "react";
import Api from "./Api.js";
import profilePicSrcByDefault from '../images/spartna__image.jpg'


const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    token: "61a577b5-41b8-4f4a-b2cc-045694a09d23"
});


function Main(props) {
    const [userName, setUserName] = useState('Spartan')
    const [userDescription, setUserDescription] = useState("Warrior")
    const [userAvatar, setUserAvatar] = useState(profilePicSrcByDefault)
    const [cards, setCards] = useState([])

    useEffect(async () => {
        try {
            const [cardsData, userInfo] = await Promise.all([api.getInitialCards(), api.getUserData()])
            if (userInfo, cardsData) {

                setUserName(userInfo.name);
                setUserDescription(userInfo.about);
                setUserAvatar(userInfo.avatar)
                setCards(cardsData)

            }
        }
        catch (error) {

            console.log('check your error', error);
            alert("something went wrong")


        }
    }, [])

    return (

        <main className="main">

            <section className="profile">

                <div className="profile__photo" style={{ backgroundImage: `url(${userAvatar})` }} >
                    <button className="profile__edit-img-button" onClick={props.onEditAvatarClick}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button className="profile__edit-button" type="button" onClick={props.onEditProfileClick}>
                    </button>
                    <p className="profile__description">{userDescription}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlaceClick}>
                </button>
            </section>

            <section className="cards">
                {

                    cards.map((card) => {

                        return (

                            <Card
                                card={card}
                                onCardClick={props.onCardClick}
                                key={card._id} link={card.link}
                                title={card.name}
                                likes={`${card.likes.length}`}

                            />

                        )


                    })
                }
            </section>


            <ImagePopup selectedCard={props.selectedCard} isOpen={props.isImagePopupIsOpen} onClose={props.closeThePopups} />
            <PopupWithForm
                isOpen={props.isEditPopupOpen}
                name="edit-profile"
                title="Edit Profile"
                onClose={props.closeThePopups}>


                {/* <label for="input_type_name" className="popup__label"></label> */}
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
                {/* <label for="input_type_description" className="popup__label"></label> */}
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
                <button className="popup__save-button" type="submit">Save</button>

            </PopupWithForm>
            < PopupWithForm isOpen={props.isAddCardOpen} name="add-card" title="New Place" onClose={props.closeThePopups}>

                {/* <label for="input_type_title" className="popup__label"></label> */}
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
                {/* <label for="input_type_url" className="popup__label"></label> */}
                <input
                    type="url"
                    id="input_type_url"
                    className="popup__input popup__input_type_url"
                    name="image__url"
                    placeholder="Image URL"
                    required
                />
                <span id="input_type_url-error" className="popup__error"></span>
                <button className="popup__save-button" type="submit">Save</button>


            </PopupWithForm>
            <PopupWithForm name="delete-card" title="Are you sure?" onClose={props.closeThePopups}>

                <button className="popup__close-button" type="button">
                </button>
                <button className="popup__save-button popup__save-button_type_delete-card" type="submit">Yes</button>

            </PopupWithForm>
            <PopupWithForm isOpen={props.isEditProfilePicOpen} name="edit-profile-img" title="Change profile picture" onClose={props.closeThePopups}>

                <input
                    type="url"
                    id="input_type_url_photo"
                    className="popup__input popup__input_type_url"
                    name="profile-pic__url"
                    placeholder="Enter your profile photo URL"
                    required
                />
                <span id="input_type_url_photo-error" className="popup__error"></span>
                <button className="popup__close-button" type="button">
                </button>
                <button className="popup__save-button" type="submit">Save</button>

            </PopupWithForm>




            {/* <div className="popup popup_type_zoom-image">
                <div className="popup__content-wrapper">
                    <img src="#" alt="image preview" className="popup__image" />
                    <figure className="popup__figure"></figure>

                    <button
                        className="popup__close-button popup__close-button_type_zoom-image"
                        type="button"
                    >
                    </button>
                </div>
            </div> */}

            {/* <template id="template">
                <article className="card">
                    <div className="image-wrapper">
                        <img src="#" alt="image" className="card__image" />
                        <button
                            className="card__delete-button"
                            type="button"
                            name="delete-button"
                        ></button>
                    </div>
                    <div className="card__content">
                        <h2 className="card__title"></h2>
                        <div className="like-wrapper">
                            <button className="card__button" type="button"> </button>
                            <span className="card__num-likes"></span>
                        </div>
                    </div>

                </article>
            </template> */}
        </main >

    )
}
export { Main }