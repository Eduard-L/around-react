import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, id, link, title, likes, onCardLike, onCardDelete }) {
    const userInfoContext = useContext(CurrentUserContext)



    // Checking if the current user is the owner of the current card
    const isOwn = card.owner._id === userInfoContext._id;

    const isLiked = card.likes.some(like => like._id === userInfoContext._id);
    const cardDeleteButtonClassName = (`${isOwn ? 'card__delete-button' : 'card__delete-button_hidden '}`)
    const cardLikeButtonClassName = (`${isLiked ? 'card__button card__button_black' : 'card__button'}`);



    const nubmerOfLikesClassName = (`${parseInt(likes) === 0 ? 'card__delete-button_hidden ' : 'card__num-likes'}`)

    function handleDeleteButton() {
        onCardDelete(card)
    }


    function handleLikeClick() {
        onCardLike(card);
    }


    function handleClick() {

        onCardClick(card);

    }
    return (


        <article className="card">
            <div className="image-wrapper">
                <img onClick={handleClick} src={link} alt={card.name} className="card__image" />
                <button
                    className={cardDeleteButtonClassName}
                    type="button"
                    name="delete-button"
                    onClick={handleDeleteButton}
                ></button>
            </div>
            <div className="card__content">
                <h2 className="card__title">{title}</h2>
                <div className="like-wrapper">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"> </button>
                    <span className={nubmerOfLikesClassName}>{likes}</span>
                </div>
            </div>

        </article >





    )

}
export { Card }