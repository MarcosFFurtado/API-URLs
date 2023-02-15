import React from 'react';
// import PropTypes from 'prop-types';
import Loading from './Loading';

function UrlsTable ({urls, delUrl, editUrl}) {
  
  if (!urls.length) {
    return (<Loading />);
  }

  return (
    <table className="games-table">
      <thead>
        <tr>
          <th className="games-table-thead-home-team" style = {{ width:'480px'}}>Descrição da Página</th>
          <th className="games-table-thead-home-team" style = {{ width:'480px'}}>Endereço / URL</th>
          <th className="games-table-thead-empty-space">{ ' ' }</th>
        </tr>
      </thead>
      <tbody>
        {
          urls
            .map((
              url
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
                >
                  { url.url }
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
  );
};

// UrlsTable.propTypes = {
//   // currentFilter: PropTypes.string.isRequired,
// };

export default UrlsTable;
