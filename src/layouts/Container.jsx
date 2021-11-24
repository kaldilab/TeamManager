import React from 'react';

export default function Container(props) {
  
  return (
    <React.Fragment>
      <div className="container-fluid">
        {props.children}
      </div>
    </React.Fragment>
  )

}