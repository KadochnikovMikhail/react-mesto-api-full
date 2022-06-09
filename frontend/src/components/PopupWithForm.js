import closeBtn from '../images/CloseIcon.svg';


function PopupWithForm({title, name, children, isOpen,onSubmit, onClose}) {

  return (
      <div className={isOpen ? `popup ${name} popup_opened` : `popup ${name}`} >
        <div className="popup__overlay" id="overlay" onClick={onClose}></div>
        <div className="popup__container">
          <button className="popup__closebutton" id="profile-close" type="button" onClick={onClose}>
            <img className="popup__closebutton-image" alt="закрыть" src={closeBtn}/>
          </button>
          <form className="form"  name={name} onSubmit={onSubmit}>
            <div className="form__header">
              <h2 className="form__title">{title}</h2>
            </div>
            {children}

            <button className="form__buttonsave form__buttonsave_type_save"
                    type="submit">Сохранить
            </button>
          </form>
        </div>
      </div>
  )
}

export default PopupWithForm