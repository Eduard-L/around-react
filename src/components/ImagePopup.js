function ImagePopup(props) {
    return (

        <div className={`popup popup_type_zoom-image ${props.isOpen ? 'popup_visible' : ""}`}>
            <div className="popup__content-wrapper">
                <img src={props.selectedCard.link} alt="image preview" className="popup__image" />
                <figure className="popup__figure">{`${props.selectedCard.name}`}</figure>

                <button
                    className="popup__close-button popup__close-button_type_zoom-image"
                    type="button"
                    onClick={props.onClose}
                >
                </button>
            </div>
        </div>



    )

}
export { ImagePopup }