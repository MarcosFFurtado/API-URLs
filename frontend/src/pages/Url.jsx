import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';
import UrlTable from '../components/UrlTable'
import api from '../services/requests';
import '../styles/pages/login.css';
import { useLocation } from 'react-router-dom';

const Login = () => {
  const { state } = useLocation();
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [isLogged] = useState(false);
  const [failedUrlEntry, setFailedUrlEntry] = useState(false);
  const [urlEdit, setUrlEdit] = useState(false);
  const [urlArray, setUrlArray] = useState(state.uurls);
  const [id, setId] = useState(false);

  const validadeUrl = new RegExp(`(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?`);

  const addUrl = async (event) => {
    event.preventDefault();
    try {
      if(!validadeUrl.test(url)) return setFailedUrlEntry(true);
      const body = {
        description,
        url,
      };
      await api.post('/url', body);
      const { data } = await api.get('/url');
      setUrlArray(data);
      setDescription('');
      setUrl('');
      setFailedUrlEntry(false)
    } catch (error) {
      setFailedUrlEntry(true);
    }
  };

  const delUrl = async (url) => {
    try {
      const body = {
        url
      };
      await api.delete('/url', { data: body });
      const { data } = await api.get('/url').then();
      setUrlArray(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  async function editUrl({_id, url, description}) {
    setDescription(description);
    setUrl(url);
    setUrlEdit(true);
    setId(_id);
  };

  async function saveEdit() {
    if(!validadeUrl.test(url)) return setFailedUrlEntry(true);
    setUrlEdit(false);
    try {
      const body = {
        id,
        description,
        url,
      };
     await api.put('/url', body);
      const { data } = await api.get('/url').then();
      setUrlArray(data);
      setDescription('');
      setUrl('');
      setFailedUrlEntry(false);
    } catch (error) {
    }
  };

  if (isLogged) return <Navigate to="/urls" />;

  return (
    <>
      <Header
        page="URL"
      />
      <section className="user-login-area">
        <form>
          <h1>Cadastre a Página</h1>
          <label htmlFor="description-input">
            <input
              className="login__login_input"
              type="text"
              value={ description }
              onChange={ ({ target: { value } }) => setDescription(value) }
              data-testid="login__login_input"
              placeholder="Descrição / Nome"
            />
          </label>
          <label htmlFor="url-input">
            <input
              type="url"
              value={ url }
              onChange={ ({ target: { value } }) => setUrl(value) }
              data-testid="login__url_input"
              placeholder="endreceço - URL"
            />
          </label>
          {(failedUrlEntry)? (
                <p data-testid="login__input_invalid_login_alert">
                  {
                    `Link já esta amarzenado ou formato de link Inválido!`
                  }
                </p>
              ): null
          }
          {
            (urlEdit)? (
                <p data-testid="user__created_alert">
                  {
                    `Edite a URL acima e clique Editar para salvar as Alterações`
                  }
                </p>
              ): null
          }
          {
            (!urlEdit) ? (
          <button
            data-testid="login__login_btn"
            type="submit"
            onClick={ (event) => addUrl(event) }
          >
            Gravar
          </button>
           )
           : null
          }
          {
            (urlEdit) ? (
          <button
            data-testid="login__login_btn"
            type="btn"
            isdisabled="true"
            onClick={ () => saveEdit() }
          >
            Editar
          </button>
          ): null
         }
        </form>
        <div>
        <UrlTable urls={urlArray} delUrl={delUrl} editUrl={editUrl}/>
        </div>
      </section>
    </>
  );
};

export default Login;