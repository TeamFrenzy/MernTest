import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import TurnoState from './context/turnos/TurnoState';
import TestHub from './components/layout/TestHub';

function App() {
  return (
    <TurnoState>
    <Router>
      <Switch>
        <Route exact path="/" component={TestHub}/>
      </Switch>
    </Router>
    </TurnoState>
  );
}

export default App;
