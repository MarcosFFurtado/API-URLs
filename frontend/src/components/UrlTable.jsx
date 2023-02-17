import React from 'react';

function UrlsTable ({urls, delUrl, editUrl}) {

  return (
    <div>
      {(!urls)? <div>Loading ....</div> :
    <table className="games-table">
      <thead>
        <tr>
          <th className="games-table-thead-home-team" style = {{ width:'480px'}}>Descrição da Página</th>
          <th className="games-table-thead-home-team" style = {{ width:'480px'}}>Endereço / URL</th>
          <th className="games-table-thead-empty-space">{ ' ' }</th>
        </tr>
      </thead>
      <tbody>
        {urls?.map((url
            ) => (
              <tr key={ url._id }>
                <td
                  className="games-table-tbody-home-team"
                  data-testid={ `description` }
                  style = {{ width:'480px'}}
                >
                  { url.description }
                </td>
                <td
                  className="games-table-tbody-home-team"
                  data-testid={ `url` }
                  style = {{ width:'480px'}}
                  href='true'
                >
                  <a href={ url.url }>{ url.url }</a>
                </td>
                <td className="games-table-tbody-empty-space">{ ' ' }</td>
                <td className="games-table-tbody-status">
                </td >
                <button className="games-table-tbody-home-team" type="button" style = {{backgroundColor:'grey', width:'80px'}} onClick = {() =>editUrl(url)} >
                Editar
              </button>
              <button  className="games-table-tbody-home-team" type="button" style = {{backgroundColor:'red', width:'80px'}} onClick={ () => delUrl(url.url)}>
                Deletar
              </button>
              </tr>
            ))
        }
      </tbody>
    </table>
    } 
  </div>
  );
};

export default UrlsTable;
