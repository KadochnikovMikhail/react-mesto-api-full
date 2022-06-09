import React from 'react';
import editBtn from '../images/editbutton.svg';
import addBtn from '../images/addbutton.svg';
import Card from './Card.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);
    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img className="profile__image" alt="Фото профиля" src={currentUser.avatar}/>
                    <div className="profile__overlay" onClick={onEditAvatar}></div>
                </div>

                <div className="profile__info">
                    <div className="profile__header">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit-button" type="button">
                            <img className="profile__edit-button-image" alt="Редактировать"
                                 src={editBtn} onClick={onEditProfile}/>
                        </button>
                    </div>

                    <h2 className="profile__description">{currentUser.about}</h2>
                </div>
                <button className="profile__addbutton" type="button" onClick={onAddPlace}><img
                    className="profile__addbutton-image" alt="Добавить"
                    src={addBtn}/></button>

            </section>
            <section className="cards">
                {cards.map((item) => (

                        <Card card={item} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} key={item._id}/>

                ))}
            </section>
        </main>
    );
}

export default Main;