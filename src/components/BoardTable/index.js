import React from 'react';

export function CTBoardTable(props) {
  const { tableClass = '' } = props;
  return (
    <React.Fragment>
      <table className={`table mt-3 ${tableClass}`}>
        {props.children}
      </table>
    </React.Fragment>
  )
}

export function CTBoardTableItemNone(props) {
  return (
    <React.Fragment>
      <tr>
        <td colSpan="3" className="none">{props.text}</td>
      </tr>
    </React.Fragment>
  )
}