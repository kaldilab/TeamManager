import React from 'react';
import { Link } from 'react-router-dom';
import Options from 'settings/Options';
import Navigation from 'layouts/Navigation';

export default function Header(props) {

  const appTitle = Options.appTitle;

  return (
    <React.Fragment>
      <header className="header">
        <h1 className="header__title">
          <Link to={{ pathname: '/home' }}>
            {appTitle}
          </Link>
        </h1>
        <nav className="header__nav">
          <Navigation />
        </nav>
      </header>
    </React.Fragment >
  )

}