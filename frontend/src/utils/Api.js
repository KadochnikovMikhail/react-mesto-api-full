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
            .then((response) => this._handleResponse(response))
    }


    getUserInfo() {
        return fetch(`${this._address}/users/me`, {

            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => this._handleResponse(response))
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
                about: userData.about,
            })
        })
            .then((response) => this._handleResponse(response))
    }


    addCard(cardObject) {

        return fetch(`${this._address}/cards`, {

            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                name: cardObject.name,
                link: cardObject.link
            })
        })
            .then((response) => this._handleResponse(response))
    }


    removeCard(id) {

        return fetch(`${this._address}/cards/${id}`, {

            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
        })
            .then((response) => this._handleResponse(response))
    }

    updateAvatar(userData) {
        console.log (userData)
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
            .then((response) => this._handleResponse(response))

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

    const api = new Api(baseUrl)
export default api;