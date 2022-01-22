import { PopupWithForm } from "./PopupWithForm"
import { useRef } from "react";

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const inputRef = useRef()

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: inputRef.current.value
        });

        inputRef.current.value = ''

    }

    return (
        <PopupWithForm

            isOpen={isOpen}
            name="edit-profile-img"
            title="Change profile picture"
            onClose={onClose}
            buttonText="Save"
            onSubmit={handleSubmit}>

            <input
                type="url"
                id="input_type_url_photo"
                className="popup__input popup__input_type_url"
                name="profile-pic__url"
                placeholder="Enter your profile photo URL"
                ref={inputRef}
                defaultValue={''}
                required
            />
            <span id="input_type_url_photo-error" className="popup__error"></span>

        </PopupWithForm>
    )

}
