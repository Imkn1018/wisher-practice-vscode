import { Button } from '@chakra-ui/react';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import WishesIndex from './components/organisms/Index/WishesIndex';
import WishesEdit from './components/Pages/Wish/Edit';
export const Routes = () => {
  return (
    <Switch>
      <Route path="/spa/wishes">
        <WishesIndex />
      </Route>
      <Route path="/spa/wishes">
        <WishesIndex />
      </Route>
      <Route exact={false} path="/spa/wish/:id/edit">
        <WishesEdit />
      </Route>
    </Switch>
  );
};
