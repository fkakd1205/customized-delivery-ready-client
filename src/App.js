import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import DeliveryReadyUpload from './routes/delivery_ready/DeliveryReadyUpload';
import CreateCustomTableHeader from './routes/delivery_ready/CreateCustomTableHeader';

import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';

const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
          <Route path="/delivery-ready/storage" exact component={CreateCustomTableHeader}></Route>
          <Route path="/delivery-ready" exact component={DeliveryReadyUpload}></Route>
      </ThemeProvider>
    </Router>
  );
}

export default App;
