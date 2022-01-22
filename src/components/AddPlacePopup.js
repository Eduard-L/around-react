import { useState } from "react";
import { PopupWithForm } from "./PopupWithForm"
export function AddPlacePopup({ isOpen, onClose, onUpdateCards }) {

    const [cardName, setCardName] = useState('')
    const [cardLink, setCardLink] = useState('')

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateCards(cardName, cardLink)
        setCardName('')
        setCardLink('')

    }
    return (
        < PopupWithForm
            isOpen={isOpen}
            name="add-card"
            title="New Place"
            onClose={onClose}
            onSubmit={handleSubmit}
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
                value={cardName || ''}
                onChange={(e) => setCardName(e.target.value)}
            />
            <span id="input_type_title-error" className="popup__error"></span>

            <input
                type="url"
                id="input_type_url"
                className="popup__input popup__input_type_url"
                name="image__url"
                placeholder="Image URL"
                required
                value={cardLink || ''}
                onChange={(e) => setCardLink(e.target.value)}
            />
            <span id="input_type_url-error" className="popup__error"></span>



        </PopupWithForm>
    )

}