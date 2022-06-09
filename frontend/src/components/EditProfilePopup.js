import React,{ useState, useContext, useEffect }  from "react";
import PopupWithForm from './PopupWithForm.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const handleClose = () => onClose();

    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser, isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    return (

        <PopupWithForm

            name="user-info"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={handleClose}
            onSubmit={handleSubmit}
            children={
                <>
                    <input
                        id="name"
                        className="form__data"
                        placeholder="Имя"
                        type="text"
                        name="name"
                        value={name || ''}
                        onChange={handleNameChange}
                        required
                        minLength="2"
                        maxLength="40"
                    />
                    <span id="name-error" className="error"></span>
                    <input
                        id="job"
                        className="form__data"
                        placeholder="О себе"
                        type="text"
                        name="description"
                        value={description || ''}
                        onChange={handleDescriptionChange}
                        required
                        minLength="2"
                        maxLength="200"
                    />
                    <span id="name-error" className="error"></span>
                </>
            }
        />
    );
}

export default EditProfilePopup;