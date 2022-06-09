import React from "react";

function Login({onLogin, handleEmailChange, handlePasswordChange, email, password}){

    return (
        <div className='sign'>
            <form className="sign__form" name='login'>
                <h2 className="sign__form_title">Вход</h2>
                <label className="sign__form_field">
                    <input
                        id="login-email-input"
                        type="text"
                        className="sign__form_input"
                        name="login-email"
                        required
                        placeholder="Email"
                        minLength="2"
                        maxLength="30"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <span id="text-error" className="error"/>
                </label>
                <label className="popup__form-field">
                    <input
                        id="login-pass-input"
                        type="password"
                        className="sign__form_input"
                        name="login-pass"
                        required
                        placeholder="Пароль"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <span id="text-error" className="error"/>
                </label>
            </form>
            <button className="sign__button" onClick={onLogin} type="submit">Войти</button>
        </div>
    );
}

export default Login;