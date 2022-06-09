import {baseUrl} from './constants.js';

class Api {
    constructor(baseUrl) {

        this._address = baseUrl;
    }

    _handleResponse = (res) => {
        if (res.ok) {
            return res.json()
        }

        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getInitialCards() {

        return fetch(`${this._address}/cards`, {

            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(this._handleResponse);
    }


    getUserInfo() {
        return fetch(`${this._address}/users/me`, {

            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(this._handleResponse);
    }


    editProfile(userData) {
        return fetch(`${this._address}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: userData.name,
          about: userData.about
        })
      })
      .then(this._handleResponse);
    }

    addCard(data){
        return fetch(`${this._address}/cards`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then(this._handleResponse);
    }

    removeCard(id){
        return fetch(`${this._address}/cards/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then(this._handleResponse);
    }

    updateAvatar(userData) {

        return fetch(`${this._address}/users/me/avatar`, {

            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                avatar: userData,

            })
        })
            .then(this._handleResponse)

    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._address}/cards/${id}/likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
        })
            .then(this._handleResponse)
    }
}

const api = new Api(baseUrl);

export default api;