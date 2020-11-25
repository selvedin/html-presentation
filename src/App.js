import React from 'react'
import { Grid } from '@material-ui/core';
import Dashboard from 'components/layout/Dashboard'
import Presentation from 'components/settings/Presentation';
import { AppProvider } from 'data/AppContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import BoardComponent from 'components/tools/board/BoardComponent';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className="appGrid"
        >
          <Router>
            <Switch>
              <Route component={Presentation} path='/presentation/:id' />
              <Route component={BoardComponent} path='/draw' />
              <Route component={Dashboard} path='/' />
            </Switch>
          </Router>
        </Grid>
      </AppProvider>
    </div >
  );
}

export default App;
