import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import DeliveryReadyUpload from './component/delivery_ready/DeliveryReadyUpload';
import CreateCustomTableHeader from './component/delivery_ready/CreateCustomTableHeader';

import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import DeliveryReadyNaverUploadMain from './component/customized_delivery_ready/DeliveryReadyNaverUploadMain';
import CusomizedDeliveryReadyNaverViewMain from './component/customized_delivery_ready/CusomizedDeliveryReadyNaverViewMain';

const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
          <Route path="/delivery-ready/storage" exact component={CreateCustomTableHeader}></Route>
          <Route path="/delivery-ready" exact component={DeliveryReadyUpload}></Route>
          <Route path="/delivery-ready/customized/upload" exact component={DeliveryReadyNaverUploadMain}></Route>
          <Route path="/delivery-ready/customized/view" exact component={CusomizedDeliveryReadyNaverViewMain}></Route>
      </ThemeProvider>
    </Router>
  );
}

export default App;
