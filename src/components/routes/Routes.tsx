import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from 'components/pages/Home'

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
)

export default Routes
