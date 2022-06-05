import React from 'react';
import editBtn from '../images/editbutton.svg';
import addBtn from '../images/addbutton.svg';
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, cards, onAddPlace, onCardClick, onCardLike, onCardDelete}) {

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
                {/*Добрый день, прошу прощения, что прошу помощи у вас, но я правда не знаю, что мне делать с моей ошибкой.*/}
                {/*Я сам пытался очень долго ее решить и просил помощи у куратора, но даже он не нашел в ччем проблема. Я из-за этого*/}
                {/*не смог сдать вовремя работу и меня перевели на другой поток, и тут уже надо снова сдавай эту практическую работу,а я так*/}
                {/*и не понял, как ее исправить. Очень прошу помочь мне. Проблема заключется в том, что в консоли выдаетс ошибку TypeError: a.map is not a function*/}
                {/*at Le (Main.js:36:24), но я и мой куратор так и не смогли найти ее причину, надеюсь вы мне сможете помочь, еще раз прошу прощения, что приходится*/}
                {/*просить вас об этом. Ошибка в cards.map.*/}
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />
                )) }
            </section>
        </main>
    );
}

export default Main;