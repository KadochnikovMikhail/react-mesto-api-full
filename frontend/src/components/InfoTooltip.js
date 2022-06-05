import React from "react";
import closeBtn from "../images/CloseIcon.svg";

function InfoTooltip({isOpen, onClose, caption, img}) {
    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button className="popup__closebutton" onClick={onClose} type="button" aria-label="Close"><img
                    className="popup__closebutton-image" alt="закрыть" src={closeBtn}/></button>
                <img src={img} className='popup__image' alt="Регистрация"/>
                <h2 className="popup__title ">{caption}</h2>
            </div>
        </div>
    );
}

export default InfoTooltip;