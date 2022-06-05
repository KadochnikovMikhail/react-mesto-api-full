import React from 'react';
import trashBtn from '../images/Trash.svg';
import likeBtn from '../images/like.svg';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
        `cards__delete ${isOwn ? 'cards__delete' : 'cards__delete_hidden'}`
    );

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `cards__like-btn ${isLiked ? 'cards__like_active' : 'cards__like-btn'}`
    );

    const handleLikeClick = () => onCardLike(card);
    const handleDeleteClick = () => onCardDelete(card);

    const handleCardClick = () => onCardClick(card);


    return (
        <div className="cards__item" >
            <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}>
                <img className="cards__delete-image" alt="Удалить" src={trashBtn}/>
            </button>

            <img className="cards__image" alt={card.name} src={card.link} onClick={handleCardClick}/>
            <div className="cards__header">
                <h2 className="cards__title">{card.name}</h2>
                <div className="cards__like">
                    <button className={cardLikeButtonClassName} type="button"><img className="cards__like-image" alt="Лайк" onClick={handleLikeClick} src={likeBtn}/></button>
                    <p className="cards__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </div>
    );
}

export default Card

