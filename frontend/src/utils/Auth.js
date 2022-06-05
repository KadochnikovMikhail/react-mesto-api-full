import {baseUrl} from "./constants";

class Auth {
    constructor(baseUrl) {


        this._addressAuth = baseUrl;
    }

    _handleResponse = (res) => {
        if (res.ok) {
            return res.json()
        }

        return Promise.reject(`Ошибка: ${res.status}`)
    }

    register(email, password) {
        return fetch(`${this._addressAuth}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "password": password,
                "email": email
            })
        })
            .then(this._handleResponse);
    };

    login(email, password) {
        return fetch(`${this._addressAuth}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "password": password,
                "email": email
            })
        })
            .then(this._handleResponse);
    };

    getContent(token) {
        return fetch(`${this._addressAuth}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(res => res.json())
            .then(data => data)
    }
}

const auth = new Auth(baseUrl)
export default auth;