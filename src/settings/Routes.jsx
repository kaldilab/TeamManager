import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Menus from "settings/Menus";

export default function Routes() {
  return (
    <Switch>
      {Menus.map((item, index) => {
        return (
          <Route key={index} exact path={item.path}>
            <item.component />
          </Route>
        );
      })}
      <Route exact path={"/*"} render={() => <Redirect to="/notfound" />} />
    </Switch>
  );
}
