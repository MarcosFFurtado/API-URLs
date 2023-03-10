import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';
import api, { requestLogin, setToken } from '../services/requests';
import '../styles/pages/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [userUrls, setUserUrls] = useState();
  const [invalidEmail, setInalidEmail] = useState(false);

  const verifyEmail = /\S+@\S+\.\S+/.test(email);

  const login = async (event) => {
    event.preventDefault();
    if(!verifyEmail) return setInalidEmail(true);
    try {
      let { token } = await requestLogin('/login', { email, password });
      if (!token) {
        await requestLogin('/create', { email, password });
        token = await requestLogin('/login', { email, password });
      }
      setToken(token);
      localStorage.setItem('token',  token);
      const { data } = await api.get('/url');
      setUserUrls(data);
      setIsLogged(true);
      localStorage.removeItem("lastUrls");
    } catch (error) {
      setFailedTryLogin(true);
      setIsLogged(false);
    }
  };
  
  const create = async (event) => {
    event.preventDefault();
    
    try {
      const { token } = await requestLogin('/user', { email, password }); 
      setToken(token);
      setUserCreated(true);
    } catch (error) {
      setFailedTryLogin(true);
      setIsLogged(false);
    }
  };
  
  useEffect(() => {
    setFailedTryLogin(false);
  }, [email, password]);
  
  if (isLogged) return <Navigate to="/url" state={{uurls: userUrls}}/>;
  
  return (
    <>
      <Header
        page="URL - API - LOGIN"
      />
      <section className="user-login-area">
        <form>
          <h1>Área do usuário</h1>
          <label htmlFor="email-input">
            <input
              className="login__login_input"
              type="text"
              value={ email }
              onChange={ ({ target: { value } }) => setEmail(value) }
              data-testid="login__login_input"
              placeholder="email"
            />
          </label>
          <label htmlFor="password-input">
            <input
              type="password"
              value={ password }
              onChange={ ({ target: { value } }) => setPassword(value) }
              data-testid="login__password_input"
              placeholder="Senha"
            />
          </label>
          {(failedTryLogin)? (
                <p data-testid="login__input_invalid_login_alert">
                  {
                    `O endereço de e-mail ou a senha não estão corretos.
                    Por favor, tente novamente.`
                  }</p>): null}
          {(invalidEmail)? (
                <p data-testid="user__created_alert">
                  {
                    `Email com formato incorreto !`
                  }</p>): null}
          {(userCreated)? (
                <p data-testid="user__created_alert">
                  {
                    `Usuário criado com sucesso, Clique em Login para entrar!`
                  }</p>): null}
          <button
            data-testid="login__login_btn"
            type="submit"
            onClick={ (event) => login(event) }
          >
            Entrar
          </button>
          <button
            data-testid="login__login_btn"
            type="btn"
            onClick={ (event) => create(event) }
          >
            Cadastrar
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;
