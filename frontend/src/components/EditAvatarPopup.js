import React,{useEffect}  from "react";
import PopupWithForm from './PopupWithForm.js'

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const handleClose = () => onClose();

    const inputAvatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: inputAvatarRef.current.value,
        });
    }

    useEffect(() => {
        inputAvatarRef.current.value = "";
    }, [isOpen]);

    return (
        <PopupWithForm

            name="avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={handleClose}
            onSubmit={handleSubmit}
            children={
                <>
                    <input
                        id="avatar"
                        className="form__data"
                        type="url"
                        name="avatar"
                        placeholder="Ссылка на фото"
                        ref={inputAvatarRef}
                        required
                        minLength="2"
                    />
                    <span id="avatar-error" className="error"></span>
                </>
            }
        />
    )

}

export default EditAvatarPopup;