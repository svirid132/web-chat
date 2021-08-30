import { Switch, Route } from 'react-router-dom';
import SwitcherAuthorization from './containers/SwitcherAuthorization';
import SwitcherMainPage from './containers/SwitcherMainPage';

function App() {
  return (
    <Switch>
      <Route path="/messager/:id" exact>
        <SwitcherMainPage />
      </Route>
      <Route path={["/", "/:id"]} exact>
        <SwitcherAuthorization />
      </Route>
    </Switch>
  ); 
}

export default App;
