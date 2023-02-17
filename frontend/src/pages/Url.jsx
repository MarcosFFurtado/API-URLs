import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import UrlTable from '../components/UrlTable'
import api, { setToken } from '../services/requests';
import '../styles/pages/login.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const { state } = useLocation();
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [failedUrlEntry, setFailedUrlEntry] = useState(false);
  const [urlEdit, setUrlEdit] = useState(false);
  const [id, setId] = useState(false);
  const [logged, setLogin] = useState(false);
  
  const validadeUrl = new RegExp(`(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?`);

  const localStorageUrls = localStorage.getItem(('lastUrls'));
  if(localStorageUrls === null) localStorage.setItem('lastUrls', JSON.stringify(state.uurls));
  const URLs = localStorage.getItem(('lastUrls'));
  const [urlArray, setUrlArray] = useState((JSON.parse(URLs)));

  const navigate = useNavigate();
  
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token') || '';
      if (!token) return navigate('/');
      setToken(token);
    })();
  }, []);
  
  const addUrl = async (event) => {
    event.preventDefault();
    try {
      if(!validadeUrl.test(url)) return setFailedUrlEntry(true);
      const body = {
        description,
        url,
      };
      await api.post('/url', body);
      const { data } = await api.get('/url').then();
      setUrlArray(data);
      localStorage.setItem('lastUrls',  JSON.stringify(data));
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
      localStorage.setItem('lastUrls',  JSON.stringify(data));
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
      const { data } = await api.get('/url');
      localStorage.setItem('lastUrls',  JSON.stringify(data));
      setUrlArray(data);
      setDescription('');
      setUrl('');
      setFailedUrlEntry(false);
    } catch (error) {
    }
  };
  
  return (
    <>
      <Header
        page="URL"
        logged={ logged }
        setLogin={ setLogin }
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
              placeholder="endereço - URL"
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