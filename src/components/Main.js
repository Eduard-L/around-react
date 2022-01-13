
import { Card } from "./Card";
import { useEffect, useState } from "react";
import { api } from "../utils/Api.js";
import { Spinner } from "./Spinner";
import profilePicSrcByDefault from '../images/spartna__image.jpg'





function Main(props) {
    const [userName, setUserName] = useState('Spartan')
    const [userDescription, setUserDescription] = useState("Warrior")
    const [userAvatar, setUserAvatar] = useState(profilePicSrcByDefault)
    const [cards, setCards] = useState([])
    const [isLoading, setisLoading] = useState(false)

    useEffect(() => {

        (async function () { // dont make the call back async , react methods are sync 
            setisLoading(true)
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
            finally {
                setisLoading(false);
            }

        })();


    }, [])

    return (

        <main className="main">

            <section className="profile">

                <div className="profile__photo" style={{ backgroundImage: `url(${userAvatar})` }} >
                    <button className="profile__edit-img-button" onClick={props.onEditAvatarClick} disabled={isLoading} ></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button className="profile__edit-button" type="button" onClick={props.onEditProfileClick} disabled={isLoading}>
                    </button>
                    <p className="profile__description">{userDescription}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlaceClick} disabled={isLoading}>
                </button>
            </section>


            <section className="cards">
                {isLoading ? <Spinner /> :

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





        </main >

    )
}
export { Main }