import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

ReactDOM.render(
    <BrowserRouter>
        <AppBar position="fixed" style={{marginBottom: '80px'}}>
          <Toolbar>
              <Typography variant="h6" >
                 Versão de Software nos Clientes
              </Typography>          
          </Toolbar>
      </AppBar>    
       <Switch>
            <Route path="/" exact>
                <App/>
            </Route>
            <Route path="/create">
                <h1>Cadastro</h1>
            </Route>
       </Switch>
    </BrowserRouter> 

, document.getElementById('root'));