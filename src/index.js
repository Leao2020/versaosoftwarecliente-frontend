import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import { blue } from '@material-ui/core/colors';
// import amber from '@material-ui/core/colors/amber';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    // secondary: amber,
  },  
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
, document.getElementById('root'));