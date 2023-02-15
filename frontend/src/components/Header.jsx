import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/header.css';

const Header = ({
  page,
}) => {

  return (
    <header className="common-header">
      <h1 data-testid="header__title">{ page }</h1>
    </header>
    
  );
};

Header.propTypes = {
  page: PropTypes.string.isRequired,
};

Header.defaultProps = {
};

export default Header;
