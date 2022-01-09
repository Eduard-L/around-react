function PopupWithForm(props) {
    // debugger

    return (
        <>

            <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_visible' : ""}`} >
                <div className="popup__content">
                    <h2 className="popup__title">{props.title}</h2>
                    <form className="popup__form" name={props.name}>
                        {props.children}
                    </form>
                    <button className="popup__close-button" type="button" onClick={props.onClose}>
                    </button>
                </div>
            </div>
        </>


    )

}
export { PopupWithForm }

