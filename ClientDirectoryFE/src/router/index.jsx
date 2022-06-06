import { Route, Switch, Redirect } from 'wouter';
import { Customer, CustomerDetails } from '../views';
import routes from './routes';

const ApplicationRouter = () => (
  <Switch>
    <Route path={routes.customer.all} component={Customer} />
    <Route path={routes.customer.details} component={CustomerDetails} />
    <Route path={routes.index}>
      <Redirect to={routes.customer.all} />
    </Route>
    <Route>
      <Redirect to={routes.customer.all} />
    </Route>
  </Switch>
);

export { ApplicationRouter, routes };
