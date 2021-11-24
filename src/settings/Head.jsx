import React from 'react';
import { Helmet } from 'react-helmet-async';
import Options from 'settings/Options';

export default function Head() {

  const appTitle = Options.appTitle;

  return (
    <React.Fragment>
      <Helmet>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <meta content="noindex,nofollow" name="Robots" />
        <title>{appTitle}</title>
      </Helmet>
    </React.Fragment>
  );

}