

function Card(props) {
    function handleClick() {

        props.onCardClick(props.card);

    }
    return (


        <article className="card">
            <div className="image-wrapper">
                <img onClick={handleClick} src={props.link} alt={props.name} className="card__image" />
                <button
                    className="card__delete-button"
                    type="button"
                    name="delete-button"
                ></button>
            </div>
            <div className="card__content">
                <h2 className="card__title">{props.title}</h2>
                <div className="like-wrapper">
                    <button className="card__button" type="button"> </button>
                    <span className="card__num-likes">{props.likes}</span>
                </div>
            </div>

        </article>





    )

}
export { Card }