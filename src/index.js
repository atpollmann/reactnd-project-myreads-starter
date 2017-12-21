import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import blueGray from 'material-ui/colors/blueGrey'
import amber from 'material-ui/colors/amber'


const theme = createMuiTheme({
  palette: {
    primary: blueGray,
    secondary: amber
  }
})

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'))
