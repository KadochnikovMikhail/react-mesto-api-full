import React,{ useState, useEffect }  from "react";
import PopupWithForm from './PopupWithForm.js'

function EditPlacePopup({isOpen, onClose, onAddPlace}) {
    const handleClose = () => onClose();

    const [cardName, setCardName] = useState('');
    const [cardPhotoLink, setCardPhotoLink] = useState('');

    function handleCardNameChange(e) {
        setCardName(e.target.value);
    }
    function handleCardPhotoLinkChange(e) {
        setCardPhotoLink(e.target.value);
    }

    useEffect(() => {
        setCardName('');
        setCardPhotoLink('');
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: cardName,
            link: cardPhotoLink,
        });
    }

    return (
        <PopupWithForm

            name="new-card"
            title="Новое место"
            isOpen={isOpen}
            onClose={handleClose}
            onSubmit={handleSubmit}
            children={
                <>
                    <input
                        id="title"
                        className="form__data"
                        placeholder="Название"
                        type="text"
                        name="name"
                        value={cardName || ''}
                        onChange={handleCardNameChange}
                        required
                        minLength="2"
                        maxLength="30"
                    />
                    <span id="title-error" className="error"/>
                    <input
                        id="link"
                        className="form__data"
                        placeholder="Ссылка на картинку"
                        type="url"
                        name="description"
                        value={cardPhotoLink || ''}
                        onChange={handleCardPhotoLinkChange}
                        required
                    />
                    <span id="link-error" className="error"/>
                </>
            }
        />
    );
}

export default EditPlacePopup;