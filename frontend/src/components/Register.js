import React, { useState } from "react";
import { Link } from 'react-router-dom'; 


function Register({onRegSubmit}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function handleEmailChange(e){
        setEmail(e.target.value);
    }
    function handlePasswordChange(e){
        setPassword(e.target.value);
    }
    function handleSubmit(e){
        e.preventDefault();
        if (!email || !password){
            return;
        }
        onRegSubmit(email, password);
    }
    return (
        <div className='sign'>
            <form className="sign__form" name='login'>
                <h2 className="sign__form_title">Регистрация</h2>
                <label className="sign__form_field">
                    <input
                        id="register-email-input"
                        type="text"
                        className="sign__form_input"
                        name="register-email"
                        required
                        placeholder="Email"
                        minLength="2"
                        maxLength="30"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <span id="text-error" className="error"/>
                </label>
                <label className="sign__form_field">
                    <input
                        id="register-pass-input"
                        type="password"
                        className="sign__form_input"
                        name="register-pass"
                        required
                        placeholder="Пароль"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <span id="password-error" className="error"/>
                </label>
            </form>
            <button className="sign__button" onClick={handleSubmit} type="submit">Зарегистрироваться</button>
            <div className="sign__caption">
                <p className="sign__caption_text">Уже зарегистрированы?</p>
                <Link to="/sign-in" className="sign__caption_link">Войти</Link>
            </div>

        </div>
    );
}

export default Register;