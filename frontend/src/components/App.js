import React,{ useState, useEffect } from 'react';
import Header from './Header.js'
import MainPage from './MainPage.js'
import ImagePopup from './ImagePopup.js'
import api from '../utils/Api.js'
import auth from '../utils/Auth';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import { Route, Switch, useHistory } from 'react-router-dom'
import Register from './Register.js'
import Login from './Login.js'
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import regDone from '../images/regDone.svg'
import regFall from '../images/regFall.svg'


function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({name:'', about:'', avatar:''});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [dataInfoTooltip, setDataInfoTooltip] = useState({ text: '', image: '' });
  const history = useHistory();

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => document.removeEventListener("keydown", handleEscClose);
  }, []);

  function tokenCheck () {
    const jwt = localStorage.getItem('token');
    if (jwt){
      auth.getContent(jwt)
      .then((res) => {
        if (res){
          setEmail(res.user.email);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err)=>{
        console.log(err);
      });
    }
  }
  
  useEffect(() => {
    tokenCheck();

    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cardsData])=>{
      setCurrentUser(userData.user);
      setCards(cardsData.cards);
    })
    .catch((err)=>{
      console.log(err);
    });
    
  },[loggedIn]);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(currentUser) {
    api.editProfile(currentUser)
        .then((data)=>{
          setCurrentUser(data.user);
          closeAllPopups();
        })
        .catch((err)=>{
            console.log(err);
        });
  }

  function handleUpdateAvatar(currentUser) {
    api.updateAvatar(currentUser.avatar)
        .then((data)=>{
          setCurrentUser(data.user);
          closeAllPopups();
        })
        .catch((err)=>{
            console.log(err);
        });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard.card : c));
    })
    .catch((err)=>{
      console.log(err);
    });
  }

  function handleCardDelete(card) {
      api.removeCard(card._id)
      .then(() => {
          setCards(cards.filter(item => item._id !== card._id))
      })
      .catch((err)=>{
          console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api.addCard(card)
        .then((data)=>{
          setCards([data.card, ...cards]);
          closeAllPopups();
        })
        .catch((err)=>{
            console.log(err);
        });
  }

  function authFall() {
    setInfoTooltipOpen(true);
    setDataInfoTooltip({ text: 'Что-то пошло не так! Попробуйте ещё раз', image: regFall });
  }

  function handleRegSubmit(email, password) {
    auth.register(email, password)
        .then(()=>{
          setInfoTooltipOpen(true);
          setDataInfoTooltip({ text: 'Вы успешно зарегистрировались', image: regDone });
          history.push('/sign-in');
        })
        .catch((err)=>{
          console.log(err);
          setInfoTooltipOpen(true);
          setDataInfoTooltip({ text: 'Что-то пошло не так! Попробуйте ещё раз', image: regFall });
        });
  }

  function handleLogin(email, logState) {
    setLoggedIn(logState);
    setEmail(email);
  }

  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function onLogin(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    auth.login(email, password)
        .then((data) => {
          if (data.token) {
            localStorage.setItem('token', data.token);
            setEmail('');
            setPassword('');
            handleLogin(email, true);
            history.push('/');
          }
        })
        .catch((err) => {
          authFall();
          console.log(err);
        });
  }

  return (
      <div className='root'>
        <CurrentUserContext.Provider value={currentUser}>

          <div className="page">
            <div className="content">
              <Switch>
                <Route path="/sign-up">
                  <Header text='Войти' link='/sign-in'/>
                  <Register onRegSubmit={handleRegSubmit}/>
                </Route>
                <Route path="/sign-in">
                  <Header text='Регистрация' link='/sign-up'/>
                  <Login
                      handleEmailChange={handleEmailChange} handlePasswordChange={handlePasswordChange}
                      onLogin={onLogin} email={email} password={password}/>
                </Route>
                <ProtectedRoute
                    path="/"
                    loggedIn={loggedIn}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    email={email}
                    handleLogin={handleLogin}
                    component={MainPage}
                />
              </Switch>
            </div>

            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
            />
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
            />

            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
            />

            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
            />
            <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} caption={dataInfoTooltip.text}
                         img={dataInfoTooltip.image}/>
          </div>

        </CurrentUserContext.Provider>
      </div>
  );
}

export default App;
