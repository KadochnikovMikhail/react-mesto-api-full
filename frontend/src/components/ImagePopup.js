import closeBtn from '../images/CloseIcon.svg';

function ImagePopup({card, onClose}){
    return (
        <div className={card ? `popup popup_type_bigimage popup_opened` : `popup popup_image`} id="image_popup"
             onClick={onClose}>
            <div className="popup__overlay" id="overlay__img"></div>
            <div className="popup__container-image">
                <button className="popup__closebutton" id="img-close" type="button">
                    <img className="popup__closebutton-image" alt="закрыть" src={closeBtn}/>
                </button>
                <div>
                    <img className="popup__bigimage" src={card?.link} alt={card?.name}/>
                </div>
                <h2 className="popup__imagetitle">{card?.name}</h2>
            </div>
        </div>
    );
}

export default ImagePopup;