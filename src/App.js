import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
// import DeliveryReadyNaverUploadMain from './component/customized_delivery_ready/DeliveryReadyNaverUploadMain';
// import CusomizedDeliveryReadyNaverViewMain from './component/customized_delivery_ready/CusomizedDeliveryReadyNaverViewMain';
// import CreateCustomizedHeaderMain from './component/customized_delivery_ready/CreateCustomizedHeaderMain';
// import ModifyCustomizedHeaderMain from './component/customized_delivery_ready/ModifyCustomizedHeaderMain';
// import CustomizedExcelUploadMain from './component/ex_customized_excel/CustomizedExcelUploadMain';
// import TestMain from './component/test/TestMain';
import ExcelTranslatorMainEx from './component/ex_excel_translator/ExcelTranslatorMain';
import ExcelTranslatorMain from './component/excel_translator/ExcelTranslatorMain';

const theme = unstable_createMuiStrictModeTheme();

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
          {/* 배송준비 네이버 엑셀 - 발주서 커스터마이징 */}
          {/* <Route path="/delivery-ready/customized/upload" exact component={DeliveryReadyNaverUploadMain}></Route>
          <Route path="/delivery-ready/customized/view" exact component={CusomizedDeliveryReadyNaverViewMain}></Route>
          <Route path="/delivery-ready/customized-header/create" exact component={CreateCustomizedHeaderMain}></Route>
          <Route path="/delivery-ready/customized-header/modify" exact component={ModifyCustomizedHeaderMain}></Route>

          {/* 엑셀 변환기 - TEST*/}
          {/* <Route path="/customized-excel/upload" exact component={CustomizedExcelUploadMain}></Route> */}

          {/* TEST */}
          {/* <Route path="/test" exact component={TestMain}></Route> */}
          
          {/* 엑셀 변환기 test */}
          <Route path="/excel-translator/test" exact component={ExcelTranslatorMainEx}></Route>

          {/* 엑셀 변환기 */}
          <Route path="/excel-translator" exact component={ExcelTranslatorMain}></Route>
      </ThemeProvider>
    </Router>
  );
}

export default App;
