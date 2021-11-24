import React from 'react';
import Options from 'settings/Options';

export default function Footer(props) {

  const appTitle = Options.appTitle;
  
  return (
    <React.Fragment>
      <footer className="footer">
        <p>{appTitle} © 2021.</p>
      </footer>
    </React.Fragment>
  )

}