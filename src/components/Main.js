
import { Card } from "./Card";
import { useContext } from "react";
import { Spinner } from "./Spinner";

import CurrentUserContext from "../context/CurrentUserContext";





function Main({ onAddPlaceClick, onEditProfileClick, onEditAvatarClick, onCardClick, cards, isLoading, onCardLike, onCardDelete }) {


    const userInfoContext = useContext(CurrentUserContext)


    return (

        <main className="main">

            <section className="profile">

                <div className="profile__photo" style={{ backgroundImage: `url(${userInfoContext.avatar})` }} >
                    <button className="profile__edit-img-button" onClick={onEditAvatarClick} disabled={isLoading} ></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{userInfoContext.name}</h1>
                    <button className="profile__edit-button" type="button" onClick={onEditProfileClick} disabled={isLoading}>
                    </button>
                    <p className="profile__description">{userInfoContext.about}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlaceClick} disabled={isLoading}>
                </button>
            </section>


            <section className="cards">
                {isLoading ? <Spinner /> :

                    cards.map((card) => {

                        return (

                            <Card
                                card={card}
                                onCardClick={onCardClick}
                                id={card._id}
                                key={card._id} link={card.link}
                                title={card.name}
                                likes={`${card.likes.length}`}
                                onCardLike={onCardLike}
                                onCardDelete={onCardDelete}



                            />

                        )


                    })
                }
            </section>





        </main >

    )
}
export { Main }